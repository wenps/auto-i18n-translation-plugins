/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:18:51
 * @LastEditTime: 2025-03-16 18:24:37
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/filter/visitor/StringLiteral.ts
 */
import * as types from '@babel/types'
import { baseUtils } from '../../utils/index'
import { option, TranslateTypeEnum } from '../../option'

export default function (path: any) {
    if (option.translateType === TranslateTypeEnum.SEMI_AUTO) {
        return
    }
    let { node, parent } = path
    let value = node.value

    // 定义一个包含亚洲语言代码的数组
    const asianLangs = ['zh-cn', 'ja', 'ko']
    if (asianLangs.some(lang => option.originLang.includes(lang) || option.originLang === lang)) {
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
            types.isImportDeclaration(parent) ||
            parent.key === node ||
            (types.isCallExpression(parent) &&
                extractFnName &&
                option.excludedCall.includes(extractFnName))
        )
            return
        let replaceNode
        if (types.isJSXAttribute(parent)) {
            let expression = baseUtils.createI18nTranslator(value, true)
            replaceNode = types.jSXExpressionContainer(expression)
        } else {
            replaceNode = baseUtils.createI18nTranslator(value, true)
        }
        path.replaceWith(replaceNode)
    }
}
