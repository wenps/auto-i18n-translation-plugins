/*
 * @Date: 2025-03-31 19:05:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-31 19:52:10
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/translator/scan.ts
 */
import { Translator } from './translator'

export class ScanTranslator extends Translator {
    constructor(_option?: any) {
        super({
            name: '扫描插件',
            fetchMethod: async (text, _from, _to, separator) => {
                const value = text.split(separator).map(() => {
                    return ''
                })

                return value.join(separator)
            },
            interval: 1000
        })
    }
}
