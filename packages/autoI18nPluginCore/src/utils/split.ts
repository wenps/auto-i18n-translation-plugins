/*
 * @Date: 2025-03-26 20:28:21
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-28 19:51:35
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/utils/split.ts
 */
// 插件核心文件
// 字符串切割与转换函数
import { getOriginRegex } from './base'
import * as types from '@babel/types'
import { baseUtils } from '.'

// todo 这个切割函数可以优化，性能可能很差
/**
 * 根据正则表达式分割字符串，并将符合正则的连续字符拼接起来。
 * @param str - 要分割的字符串。
 * @param separatorRegex - 用于分割字符串的正则表达式。
 * @returns 分割并拼接后的字符串数组。
 */
export function splitByRegex(str: string, separatorRegex: RegExp): string[] {
    // 定义标点符号的正则表达式
    const punctuationRegex = /[，。？！《》,.;:!?""''；‘“、0-9]/
    // 创建一个新的正则表达式，用于分割字符串
    const splitRegex = new RegExp(
        `(${separatorRegex.source}|${punctuationRegex.source})`,
        separatorRegex.flags
    )

    // 使用正则表达式分割字符串，并过滤掉空字符串
    const splitArr = str.split(splitRegex).filter(Boolean)
    const result: string[] = []
    let currentMatch = ''

    // 定义连接标点符号的正则表达式
    const connectPunctuationRegex = /[，。？！《》,.;:!?；‘“、0-9]/
    // 创建一个新的正则表达式，用于检测是否需要连接
    const connectRegex = new RegExp(
        `(${separatorRegex.source}|${connectPunctuationRegex.source})`,
        separatorRegex.flags
    )

    // 遍历分割后的数组
    for (const item of splitArr) {
        if (connectRegex.test(item)) {
            // 如果当前项符合连接条件，则将其添加到当前匹配字符串中
            currentMatch += item
        } else {
            // 如果当前匹配字符串不为空，则将其添加到结果数组中
            if (currentMatch) {
                result.push(currentMatch)
                currentMatch = ''
            }
            // 将当前项添加到结果数组中
            result.push(item)
        }
    }

    // 如果最后一个匹配字符串不为空，则将其添加到结果数组中
    if (currentMatch) {
        result.push(currentMatch)
    }

    // 再遍历一次，把不符合separatorRegex 这个正则的拼起来
    const finalResult: string[] = []
    let tempStr = ''

    for (const item of result) {
        if (separatorRegex.test(item)) {
            finalResult.push(item)
        } else {
            tempStr += item
            if (
                tempStr &&
                (result.indexOf(item) === result.length - 1 ||
                    separatorRegex.test(result[result.indexOf(item) + 1]))
            ) {
                finalResult.push(tempStr)
                tempStr = ''
            }
        }
    }

    if (tempStr) {
        finalResult.push(tempStr)
    }

    return finalResult
}

/**
 * 检查字符串是否需要切割。
 * @param str - 要检查的字符串。
 * @returns 如果字符串需要切割，则返回 true，否则返回 false。
 */
export function checkNeedSplit(str: string) {
    // 检查字符串中是否包含需要切割的特殊字符
    return (
        str.includes('\n') ||
        str.includes('\\') ||
        str.includes('\r') ||
        str.includes('\t') ||
        str.includes('\v') ||
        str.includes('\f') ||
        str.includes('>') ||
        str.includes('<')
    )
}

/**
 * @description: 将字符串数组转换为babel的模板字符串节点
 * @param {string[]} strArray - 字符串数组
 * @return {types.TemplateLiteral} - babel的模板字符串节点
 */
export function convertToTemplateLiteral(strArray: string[]): types.TemplateLiteral {
    const quasis: types.TemplateElement[] = []
    const expressions: types.Expression[] = []

    strArray.forEach((str, index) => {
        if (getOriginRegex().test(str)) {
            quasis.push(types.templateElement({ raw: '', cooked: '' }, true))
            expressions.push(baseUtils.createI18nTranslator(str, true))
        } else {
            quasis.push(types.templateElement({ raw: str, cooked: str }, false))
        }
    })

    // Ensure the number of quasis is one more than the number of expressions
    if (quasis.length === expressions.length) {
        quasis.push(types.templateElement({ raw: '', cooked: '' }, true))
    }

    return types.templateLiteral(quasis, expressions)
}
