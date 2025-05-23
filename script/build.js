/*
 * @Date: 2024-12-07 16:03:52
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-02-10 19:18:47
 * @FilePath: /i18n_translation_vite/script/build.js
 */
// @ts-check
import { PluginTypeEnum, TypeDirNameMap, TypeEnum } from './enums.js'
import { select } from '@inquirer/prompts' // 使用 import 引入 select 函数
import shell from 'shelljs' // 使用 import 引入 shelljs 模块

const parseArgsToMap = () => {
    const args = new Map()

    process.argv.forEach(arg => {
        const [key, value] = arg.split('=')
        args.set(key, value)
    })
    return args
}

// 解析命令行参数
const argMap = parseArgsToMap()

const run = async () => {
    // 自带指令 d 标识开发模式
    const isDev = argMap.has('d')
    const runBuild = () => {
        const buildCmd = 'pnpm build' + (isDev ? ' -w' : '')
        shell.exec(buildCmd, { async: isDev })
    }

    const choices = Object.values(PluginTypeEnum).map(pluginType => {
        return {
            name: pluginType,
            value: TypeDirNameMap[pluginType]
        }
    })
    choices.unshift({ name: 'all', value: 'all' })
    let dir
    // 自带指令 p 标识指定插件类型
    if (argMap.has('p')) {
        dir = choices.find(choice => choice.name === argMap.get('p'))?.value
    }
    if (!dir) {
        dir = await select({
            message: 'please select plugin type ——',
            choices,
            default: choices[0].value
        }).catch(() => {})
        if (!dir) return
    }
    let dirs = [dir]
    if (dir === 'all') {
        dirs = Object.values(PluginTypeEnum).map(pluginType => TypeDirNameMap[pluginType])
    }
    dirs.unshift(TypeDirNameMap[TypeEnum.CORE]) // 需要先打包core

    const startTimeStamp = Date.now()
    if (!isDev) {
        console.info(`开始打包...`)
    }

    dirs.forEach(dir => {
        shell.cd(`packages/${dir}`)
        shell.cp('../../readme*', '.')
        runBuild()
        shell.cd('../../')
    })

    if (!isDev) {
        console.info(`打包完成，耗时：${(Date.now() - startTimeStamp) / 1000}秒`)
    }
}

run()
