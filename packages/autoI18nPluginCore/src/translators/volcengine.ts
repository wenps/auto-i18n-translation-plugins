// 代码灵感来自https://github.com/dadidi9900/auto-plugins-json-translate/blob/main/src/services/translationService.ts
import axios, { AxiosProxyConfig } from 'axios'
import { Translator } from './translator'

export interface VolcengineTranslatorOption {
    apiKey: string
    /** 使用的ai模型，可选值请参阅火山引擎控制台的模型列表，如`doubao-1-5-pro-32k-250115`，并请确保使用前已在控制台开通了对应模型 */
    model: string
    /** 对本项目的简短描述，在有描述的情况下大模型的翻译结果可能会更加准确 */
    desc?: string
    /** 网络代理配置 */
    proxy?: AxiosProxyConfig
    /** 翻译api执行间隔，默认为1000 */
    interval?: number
}

/**
 * 火山引擎翻译器，内置豆包、deepseek等模型
 * 
 * 火山引擎大模型介绍：https://www.volcengine.com/docs/82379/1099455
 * 
 * api文档：https://www.volcengine.com/docs/82379/1298454
 * 
 * 使用方式：
 * ```ts
 * vitePluginsAutoI18n({
    ...
    translator: new VolcengineTranslator({
        apiKey: '你申请的apiKey',
        model: '你要调用的模型，如：`doubao-1-5-pro-32k-250115`，请确保使用前已在控制台开通了对应模型'
    })
})
 * ```
 */
export class VolcengineTranslator extends Translator {
    constructor(option: VolcengineTranslatorOption) {
        super({
            name: '火山引擎ai翻译',
            fetchMethod: async (text, fromKey, toKey, separator) => {
                let salt = new Date().getTime()
                const textArr = text.split(separator)
                const data = {
                    model: option.model,
                    messages: [
                        {
                            role: 'system',
                            content: `首先，你是一个专业的翻译助手。有一个web项目，${option.desc ? `它的开发者是这么描述它的：${option.desc}。` : ''}现在我将这个项目中所使用的web抽成一个文本数组。你需要请将数组的每个成员从原语言${fromKey}翻译成目标语言${toKey}，并直接返回翻译后的文本数组，不要包含任何解释。`
                        },
                        { role: 'user', content: JSON.stringify(textArr) }
                    ]
                }
                const response = await axios.post(
                    `https://ark.cn-beijing.volces.com/api/v3/chat/completions?t=${salt}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${option.apiKey}`
                        },
                        proxy: option.proxy
                    }
                )
                try {
                    return (JSON.parse(response.data.choices[0].message.content) as string[]).join(
                        separator
                    )
                } catch (error) {
                    console.error('🚀 ~ VolcengineTranslator ~ fetchMethod: ~ error:', error)
                    return text
                }
            },
            onError: (error, cb) => {
                cb(error)
                console.error(
                    '请确保在火山引擎控制台开通了对应模型，且有足够的token余额。控制台地址：https://console.volcengine.com/ark/'
                )
            },
            maxChunkSize: 10000,
            interval: option.interval ?? 1000
        })
    }
}
