/*
 * @Date: 2025-03-31 19:05:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-31 19:52:10
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/translator/scan.ts
 */
import { SEPARATOR } from 'src/utils/translate'
import { Translator } from './translator'

export class ScanTranslator extends Translator {
    constructor(_option?: any) {
        super({
            name: '扫描插件',
            fetchMethod: async text => {
                const value = text.split(SEPARATOR).map(() => {
                    return ''
                })

                return value.join(SEPARATOR)
            },
            interval: 1000
        })
    }
}
