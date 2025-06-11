/*
 * @Author: xiaoshanwen
 * @Date: 2023-10-12 18:00:37
 * @LastEditTime: 2023-11-02 10:36:02
 * @FilePath: /i18n_translation_vite/src/plugins/filter/index.ts
 */

import TemplateLiteral from './visitor/TemplateLiteral'
import CallExpressionFn from './visitor/CallExpression'
import StringLiteralFn from './visitor/StringLiteral'
import JSXTextFn from './visitor/JSXText'

export default function (insertOption?: any) {
    // 分别调用各个访问器函数并传入插入选项
    const stringLiteralVisitor = StringLiteralFn(insertOption)
    const jsxTextVisitor = JSXTextFn(insertOption)
    const templateLiteralVisitor = TemplateLiteral(insertOption)
    const callExpressionVisitor = CallExpressionFn(insertOption)

    // 返回一个函数，该函数返回包含访问器的对象
    return function () {
        return {
            // 定义 Babel 访问器对象
            visitor: {
                StringLiteral: stringLiteralVisitor,
                JSXText: jsxTextVisitor,
                TemplateLiteral: templateLiteralVisitor,
                CallExpression: callExpressionVisitor
            }
        }
    }
}
