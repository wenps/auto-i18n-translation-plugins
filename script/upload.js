/*
 * @Date: 2025-02-06 18:58:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-11 11:23:25
 * @FilePath: /i18n_translation_vite/script/upload.js
 */
// 设置发包分支 npm config set publish-branch beta 默认是main
// script/upload.js
// @ts-check
import { TypeDirNameMap } from './enums.js'
import { writeFile } from 'fs/promises'
import shell from 'shelljs'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

// 获取当前工作目录
// const currentDir = shell.pwd().stdout;

// 定义版本类型枚举
const VersionTypeEnum = {
    MAJOR: 'major',
    SECONDARY: 'secondary',
    PATCH: 'patch',
    BETA: 'beta'
}

// 定义构建命令
const buildCmd = 'pnpm run build'

// 定义发布命令
const publishCmd = 'pnpm publish'

/**
 * 主函数，负责执行打包、修改版本号、提交代码和上传包的操作
 */
const run = async () => {
    // 批量打包
    console.log(chalk.green`\n开始打包\n`)
    for (let key in TypeDirNameMap) {
        shell.exec(`cd ${`packages/${TypeDirNameMap[key]}`} && ${buildCmd}`)
    }
    console.log(chalk.green`\n打包完成!\n`)

    // 特性版本
    const versionType = process.argv[2] || VersionTypeEnum.PATCH

    console.log(chalk.green`\n开始修改版本号\n`)

    // TODO: 这里可以优化
    // 遍历每个项目并修改版本号
    for (let key in TypeDirNameMap) {
        await generateVersion(versionType, TypeDirNameMap[key])
    }
    const newVersion = await generateVersion(versionType) // 顺便改一下根目录的版本号
    console.log(chalk.green`\n修改完成!\n`)

    // 提交代码
    await commitCode(newVersion)

    // 上传包
    uploadPackage(versionType)
}

/**
 * 提交代码到 Git 仓库
 */
// git push
const commitCode = async newVersion => {
    console.log(chalk.green`\n开始提交代码!\n`)
    shell.exec(` git config --global user.email "2534491497@qq.com" \
        && git config --global user.name "wenps" \
        && git add . \
        && git commit -m 'feat: update version' -n \
        `)
    // 尝试推送，如果超过 30 秒则跳过
    try {
        await execWithTimeout(`git push`, 30000)
        console.log(chalk.green`\n提交完成!\n`)
    } catch (error) {
        console.warn(chalk.yellow`\n推送超时，跳过推送步骤：`, error.message)
    }
}

/**
 * 获取package.json文件路径
 * @param {string} pkgName 包名，如果不传表示根目录
 * @returns {string} package.json 文件的路径
 */
const getPackageJsonPath = (pkgName = '') => {
    const currentDir = process.cwd() // 或通过 shell.pwd().stdout 修剪换行符后获取路径
    return pkgName
        ? path.join(currentDir, 'packages', pkgName, 'package.json')
        : path.join(currentDir, 'package.json')
}

/**
 * 生成并修改版本号
 * @param {string} versionType - 版本类型（MAJOR, SECONDARY, PATCH）
 * @param {string} pkgName - 包名
 */
const generateVersion = async (versionType, pkgName = '') => {
    // 读取 package.json 文件
    let pkg = await readPackageJson(pkgName)

    /** @type {string} */
    const initVersion = pkg.version
    let version = initVersion

    // 根据版本类型修改版本号
    if (versionType === VersionTypeEnum.BETA) {
        // 判断当前版本是否包含 -beta
        if (!version.includes('-beta')) {
            version = `${version}-beta1`
        } else {
            // 提取 -beta 后面的数字
            const match = version.match(/-beta(\d+)/)
            if (match) {
                const betaNumber = parseInt(match[1], 10)
                // 累加 beta 版本号
                version = version.replace(/-beta(\d+)/, `-beta${betaNumber + 1}`)
            }
        }
    } else {
        if (version.includes('-beta')) {
            version = version.replace(/-beta(\d+)/, '')
        }
        if (versionType === VersionTypeEnum.MAJOR) {
            version = version.replace(
                /(\d+)(\.\d+\.\d+)/,
                (_, prefix) => `${Number(prefix + 1)}.0.0`
            )
        } else if (versionType === VersionTypeEnum.SECONDARY) {
            version = version.replace(
                /(\d+\.)(\d+)(\.\d+)/,
                (_, prefix, number) => `${prefix}${Number(number) + 1}.0`
            )
        } else {
            version = version.replace(
                /(\d+\.\d+\.)(\d+)/,
                (_, prefix, number) => `${prefix}${Number(number) + 1}`
            )
        }
    }

    // 更新 package.json 中的版本号
    pkg.version = version
    console.log(chalk.blue(`\n${pkgName} 当前版本号：${initVersion} 修改为 ${version}`))

    // 写入更新后的 package.json 文件
    await writeFile(getPackageJsonPath(pkgName), JSON.stringify(pkg, null, 4))

    return version
}

/**
 * 上传包到包管理器
 */
const uploadPackage = versionType => {
    console.log(chalk.green`\n开始上传包\n`)

    for (let key in TypeDirNameMap) {
        const tag = versionType === VersionTypeEnum.BETA ? '--tag beta' : ''
        shell.exec(`cd ${`packages/${TypeDirNameMap[key]}`} && ${publishCmd} ${tag}`)
    }
}

/** 动态读取 package.json 文件的函数 */
const readPackageJson = async (pkgName = '') => {
    const packageJsonPath = getPackageJsonPath(pkgName)

    try {
        // 使用 promises 中的 readFile 异步读取 JSON 文件
        const fileContent = await fs.promises.readFile(packageJsonPath, 'utf-8')
        // 将文件内容解析为 JSON 后返回
        return JSON.parse(fileContent)
    } catch (error) {
        console.error(`Error reading JSON file from ${packageJsonPath}`, error)
        throw error
    }
}

/**
 * 执行 shell 命令的辅助函数，带有超时控制
 * @param {string} command 要执行的命令
 * @param {number} timeout 超时时间（毫秒）
 * @returns {Promise<string>} 命令输出
 */
const execWithTimeout = (command, timeout) => {
    return new Promise((resolve, reject) => {
        const child = shell.exec(command, { async: true, silent: true }, (code, stdout, stderr) => {
            if (code === 0) {
                resolve(stdout)
            } else {
                reject(new Error(`Command "${command}" failed with code ${code}: ${stderr}`))
            }
        })

        // 设置超时定时器
        setTimeout(() => {
            child.kill() // 超时则杀掉子进程
            reject(new Error(`Command "${command}" timed out after ${timeout}ms`))
        }, timeout)
    })
}

// 执行主函数
run()
