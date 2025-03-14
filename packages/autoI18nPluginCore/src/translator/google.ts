/*
 * @Date: 2025-03-11 17:53:11
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-14 14:21:06
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/translator/google.ts
 */
import { translate } from '@vitalets/google-translate-api'
import { Translator } from './translator'
import tunnel from 'tunnel'

export interface GoogleTranslatorOption {
    proxyOption?: tunnel.ProxyOptions
}

export class GoogleTranslator extends Translator {
    constructor(option: GoogleTranslatorOption) {
        super({
            name: 'Google翻译',
            fetchMethod: async (text, fromKey, toKey) => {
                let data = await translate(text, {
                    from: fromKey,
                    to: toKey,
                    ...(option.proxyOption
                        ? {
                              fetchOptions: {
                                  agent: tunnel.httpsOverHttp({
                                      proxy: option.proxyOption
                                  })
                              }
                          }
                        : {})
                })
                return data['text'] || ''
            }
        })
    }
}
