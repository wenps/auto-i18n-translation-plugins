import axios, { AxiosProxyConfig } from 'axios'
import { Translator } from './translator'
import CryptoJS from 'crypto-js'

export interface YoudaoTranslatorOption {
    appId: string
    appKey: string
    /** 网络代理配置 */
    proxy?: AxiosProxyConfig
    /** 翻译api执行间隔，默认为1000 */
    interval?: number
    insertOption?: {
        [key: string]: any
    }
}

/**
 * 有道翻译器
 * 
 * api文档：https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html
 * 
 * 使用方式：
 * ```ts
 * vitePluginsAutoI18n({
    ...
    translator: new YoudaoTranslator({
        appId: '你申请的appId',
        appKey: '你申请的appKey'
    })
})
 * ```
 */
export class YoudaoTranslator extends Translator {
    /** 有道的语言类型映射不标准，需要手动控制 */
    private readonly YOUDAO_TRANSLATE_KEY_CONVERT_MAP: Record<string, string> = {
        'zh-cn': 'zh-CHS',
        'zh-tw': 'zh-CHT'
    }

    private truncate(q: string) {
        // 检查输入字符串的长度
        if (q.length <= 20) {
            // 如果长度小于等于20，直接返回原字符串
            return q
        } else {
            // 如果长度大于20，截取前10个字符和后10个字符，并在中间插入长度信息
            const len = q.length
            return q.substring(0, 10) + len + q.substring(len - 10)
        }
    }

    private getTranslateKey(key: string) {
        return this.YOUDAO_TRANSLATE_KEY_CONVERT_MAP[key] || key
    }

    constructor(option: YoudaoTranslatorOption) {
        super({
            name: '有道翻译',
            fetchMethod: async (text, fromKey, toKey) => {
                let salt = new Date().getTime()
                let curTime = Math.round(new Date().getTime() / 1000)
                let str = option.appId + this.truncate(text) + salt + curTime + option.appKey
                let sign = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex)

                const data = {
                    q: text,
                    appKey: option.appId,
                    salt,
                    from: this.getTranslateKey(fromKey),
                    to: this.getTranslateKey(toKey),
                    sign,
                    signType: 'v3',
                    curtime: curTime,
                    ...(option.insertOption || {})
                }
                const response = await axios.post('https://openapi.youdao.com/api', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    proxy: option.proxy
                })
                // 请求成功，返回响应数据
                return response.data.translation?.[0] || ''
            },
            onError: (error, cb) => {
                cb(error)
                console.error(
                    '请前往有道翻译官方申请翻译key，默认会有50的额度，并请检查额度是否充足。'
                )
            },
            interval: option.interval ?? 1000
        })
    }
}
