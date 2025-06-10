/*
 * @Date: 2025-02-14 10:48:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-31 02:15:23
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/utils/file.ts
 */
import { jsonFormatter } from './json'
import { generateId } from './base'
import { option } from '../option'
import path from 'path'
import fs from 'fs'

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
export function initLangFile() {
    if (!fs.existsSync(option.globalPath)) {
        fs.mkdirSync(option.globalPath) // 创建lang文件夹
    }
    initLangTranslateJSONFile()
    initTranslateBasicFnFile()
}
/**
 * @description: 初始化翻译基础函数文件
 * @returns {void}
 */
export function initTranslateBasicFnFile() {
    // 从配置选项中获取必要的配置信息
    const { translateKey, namespace, originLang, targetLangList, commonTranslateKey } = option
    // 生成语言映射列表
    const langMapList = [...targetLangList, originLang]
        // 去除语言代码中的连字符
        .map(item => {
            return [item.replace('-', ''), item]
        })
        // 构建语言映射项
        .map(item => {
            return `'${item[0]}': (globalThis && globalThis.${namespace} && globalThis.${namespace}.${item[0]}) ? globalThis.${namespace}.${item[0]} : globalThis._getJSONKey('${item[1]}', langJSON)`
        })
        // 用逗号和换行符连接所有映射项
        .join(',\n')
    // 构建翻译基础函数的文本内容
    const translateBasicFnText = `
    // 导入国际化JSON文件
    import langJSON from './index.json'
    (function () {
    // 定义翻译函数
    let ${translateKey} = function (key, val, nameSpace) {
      // 获取指定命名空间下的语言包
      const langPackage = ${translateKey}[nameSpace];
      // 返回翻译结果，如果不存在则返回默认值
      return (langPackage || {})[key] || val;
    };
    // 定义简单翻译函数，直接返回传入的值
    let $${translateKey} = function (val) {
      return val;
    };
    globalThis.$deepScan = function (val) {
      return val;
    };
    globalThis.$iS = function (val, args) {
        // 如果参数不是字符串或数组，直接返回原值
        if (typeof val !== 'string' || !Array.isArray(args)) {
            return val;
        }
        try {
            // 使用更安全的正则表达式替换方式
            return val.replace(/\\$\\{(\\d+)\\}/g, (match, index) => {
                // 将index转换为数字
                const position = parseInt(index, 10);
                // 如果args[position]存在则替换，否则保留原占位符
                return args[position] !== undefined ? String(args[position]) : match;
            });
        } catch (error) {
            console.warn('字符串替换过程出现异常:', error);
            return val;
        }
    }
    // 定义设置语言包的方法
    ${translateKey}.locale = function (locale, nameSpace) {
      // 将指定命名空间下的语言包设置为传入的locale
      ${translateKey}[nameSpace] = locale || {};
    };
    // 将翻译函数挂载到globalThis对象上，如果已经存在则使用已有的
    globalThis.${translateKey} = globalThis.${translateKey} || ${translateKey};
    // 将简单翻译函数挂载到globalThis对象上
    globalThis.$${translateKey} = $${translateKey};
    // 定义从JSON文件中获取指定键的语言对象的方法
    globalThis._getJSONKey = function (key, insertJSONObj = undefined) {
        // 获取JSON对象
        const JSONObj = insertJSONObj;
        // 初始化语言对象
        const langObj = {};
        // 遍历JSON对象的所有键
        Object.keys(JSONObj).forEach((value) => {
            // 将每个语言的对应键值添加到语言对象中
            langObj[value] = JSONObj[value][key];
        });
        // 返回语言对象
        return langObj;
    };
    })();
    // 定义语言映射对象
    const langMap = {
        ${langMapList}
    };
    globalThis.langMap = langMap;
    // 存储语言是否存在
    // 判断 globalThis.localStorage.getItem 是否为函数
    const isFunction = (fn) => {
        return typeof fn === 'function';
    };
    
    const withStorageLang = isFunction && globalThis && globalThis.localStorage && 
    isFunction(globalThis.localStorage.getItem) && globalThis.localStorage.getItem('${namespace}');
    const withStorageCommonLang = isFunction && globalThis && globalThis.localStorage && 
    isFunction(globalThis.localStorage.getItem) && globalThis.localStorage.getItem('${commonTranslateKey}');
    // 从本地存储中获取通用语言，如果不存在则使用空字符串
    const commonLang = withStorageCommonLang ? globalThis.localStorage.getItem('${commonTranslateKey}') : '';
    // 从本地存储中获取当前语言，如果不存在则使用源语言
    const baseLang = withStorageLang ? globalThis.localStorage.getItem('${namespace}') : '${originLang.replace('-', '')}';
    const lang = commonLang ? commonLang : baseLang;
    // 根据当前语言设置翻译函数的语言包
    globalThis.${translateKey}.locale(globalThis.langMap[lang], '${namespace}');
    globalThis.$changeLang = (lang) => {
        globalThis.${translateKey}.locale(globalThis.langMap[lang], '${namespace}');
    };
  `
    // 构建翻译基础函数文件的路径
    const indexPath = path.join(option.globalPath, 'index.js')

    // 文件已存在 同时 不重写配置，那么这里就结束
    if (fs.existsSync(indexPath) && !option.rewriteConfig) return

    // 新增哈希比对逻辑

    // 标记是否需要更新文件
    let needUpdate = true
    if (fs.existsSync(indexPath)) {
        // 检查文件是否已存在
        // 生成新内容的哈希值
        const currentHash = generateId(translateBasicFnText)
        // 读取现有文件内容
        const existingContent = fs.readFileSync(indexPath, 'utf-8')
        // 生成现有内容的哈希值
        const existingHash = generateId(existingContent)
        // 判断是否需要更新文件
        needUpdate = currentHash !== existingHash
    }

    // 如果需要更新文件，则写入新内容
    if (needUpdate) {
        fs.writeFileSync(indexPath, translateBasicFnText)
    }
}
/**
 * @description: 生成国际化JSON文件
 * @return {*}
 */
export function initLangTranslateJSONFile() {
    const indexPath = path.join(option.globalPath, 'index.json')
    if (!fs.existsSync(indexPath)) {
        // 不存在就创建
        fs.writeFileSync(indexPath, JSON.stringify({})) // 创建
    }
}

/**
 * @description: 读取国际化JSON文件
 * @return {*}
 */
export function getLangTranslateJSONFile() {
    const filePath = path.join(option.globalPath, 'index.json')
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        return content
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log('❌读取JSON配置文件异常，文件不存在')
        } else {
            console.log('❌读取JSON配置文件异常，无法读取文件')
        }
        return JSON.stringify({})
    }
}

/**
 * @description: 基于langKey获取JSON配置文件中对应语言对象
 * @param {string} key
 * @return {*}
 */
export function getLangObjByJSONFileWithLangKey(
    key: string,
    insertJSONObj: object | undefined = undefined
) {
    const JSONObj = insertJSONObj || JSON.parse(getLangTranslateJSONFile())
    const langObj: any = {}
    Object.keys(JSONObj).forEach(value => {
        langObj[value] = JSONObj[value][key]
    })
    return langObj
}

/**
 * @description: 设置国际化JSON文件
 * @return {*}
 */
export function setLangTranslateJSONFile(obj: object) {
    const filePath = path.join(option.globalPath, 'index.json')
    const jsonObj = jsonFormatter(obj)
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, jsonObj)
    } else {
        console.log('❌JSON配置文件写入异常，文件不存在')
    }
}

/**
 * @description: 构建时把lang配置文件设置到打包后到主文件中
 * @return {*}
 */
export function buildSetLangConfigToIndexFile() {
    if (!option.buildToDist) return
    let langObjMap: any = {}
    option.langKey.forEach(item => {
        langObjMap[item] = getLangObjByJSONFileWithLangKey(item)
    })
    if (fs.existsSync(option.distPath)) {
        fs.readdir(option.distPath, (err, files) => {
            if (err) {
                console.error('❌构建文件夹为空，翻译配置无法写入')
                return
            }

            files.forEach(file => {
                if (file.startsWith(option.distKey) && file.endsWith('.js')) {
                    const filePath = path.join(option.distPath, file)
                    fs.readFile(filePath, 'utf-8', (err, data) => {
                        if (err) {
                            console.log(filePath)
                            console.error('❌构建主文件不存在，翻译配置无法写入')
                            return
                        }
                        let buildLangConfigString = ''
                        Object.keys(langObjMap).forEach(item => {
                            buildLangConfigString =
                                buildLangConfigString +
                                `globalThis['${option.namespace}']['${item}']=${JSON.stringify(langObjMap[item])};`
                        })
                        try {
                            // 翻译配置写入主文件
                            fs.writeFileSync(
                                filePath,
                                `globalThis['${option.namespace}']={};${buildLangConfigString}` +
                                    data
                            )
                            console.info('恭喜：翻译配置写入构建主文件成功🌟🌟🌟')
                        } catch (err) {
                            console.error('翻译配置写入构建主文件失败:', err)
                        }
                    })
                }
            })
        })
    }
}
