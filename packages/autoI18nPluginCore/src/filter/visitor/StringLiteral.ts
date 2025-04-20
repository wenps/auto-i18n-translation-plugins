/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-03-31 02:28:53
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/filter/visitor/StringLiteral.ts
 */
import { baseUtils, splitUtils } from 'src/utils'
import { TranslateTypeEnum } from 'src/enums'
import * as types from '@babel/types'
import { option } from 'src/option'

export default function (insertOption: any) {
    return function (path: any) {
        if (option.translateType === TranslateTypeEnum.SEMI_AUTO) {
            return
        }
        let { node, parent } = path
        let value = node.value

        // 定义一个包含亚洲语言代码的数组
        const asianLangs = ['zh-cn', 'ja', 'ko']
        if (
            asianLangs.some(lang => option.originLang.includes(lang) || option.originLang === lang)
        ) {
            try {
                value = baseUtils.unicodeToString(value)
            } catch (error) {
                console.log('转换异常')
            }
        }
        if (
            baseUtils.hasOriginSymbols(value) &&
            option.excludedPattern.length &&
            !baseUtils.checkAgainstRegexArray(value, [...option.excludedPattern])
        ) {
            // 获取真实调用函数
            const extractFnName = baseUtils.extractFunctionName(parent)

            // 防止导入语句，只处理那些当前节点不是键值对的键的字符串字面量，调用语句判断当前调用语句是否包含需要过滤的调用语句
            if (
                parent?.callee?.property?.name === option.translateKey ||
                types.isImportDeclaration(parent) ||
                parent.key === node ||
                (types.isCallExpression(parent) &&
                    extractFnName &&
                    (option.excludedCall.includes(extractFnName) ||
                        (extractFnName?.split('.')?.pop() &&
                            option.excludedCall.includes(extractFnName?.split('.')?.pop() || ''))))
            )
                return
            let replaceNode
            if (option.deepScan && splitUtils.checkNeedSplit(value)) {
                replaceNode = splitUtils.convertToTemplateLiteral(
                    splitUtils.splitByRegex(value, baseUtils.getOriginRegex()),
                    insertOption
                )
            } else if (types.isJSXAttribute(parent)) {
                let expression = baseUtils.createI18nTranslator({
                    insertOption,
                    value,
                    isExpression: true
                })
                replaceNode = types.jSXExpressionContainer(expression)
            } else {
                replaceNode = baseUtils.createI18nTranslator({
                    insertOption,
                    value,
                    isExpression: true
                })
            }
            path.replaceWith(replaceNode)
        }
    }
}
