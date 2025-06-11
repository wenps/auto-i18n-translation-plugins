// 代码灵感来自https://github.com/dadidi9900/auto-plugins-json-translate/blob/main/src/services/translationService.ts
import axios, { AxiosProxyConfig } from 'axios'
import { generateId } from 'src/utils/base'
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
    insertOption?: {
        [key: string]: any
    }
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
                const sourceMap = Object.fromEntries(textArr.map(text => [generateId(text), text]))
                const data = {
                    model: option.model,
                    messages: [
                        {
                            role: 'system',
                            content: `
                                ###
                                假如你是一个专业的翻译助手，你将根据一个${option.desc ? option.desc + '的' : ''}web项目中使用的文本组成的JSON对象，来解决将数组每个成员从源语言A翻译成目标语言B并返回翻译后的JSON对象的任务。根据以下规则一步步执行：
                                1. 明确源语言A和目标语言B。
                                2. 对JSON对象中数组的每个成员进行从源语言A到目标语言B的翻译。
                                3. 将翻译后的内容以JSON对象格式返回。

                                参考例子：
                                示例1：
                                输入：zh-cn -> en { "awfgx": "你好", "qwfga": "世界" }
                                输出：{ "awfgx": "Hello", "qwfga": "World" }

                                示例2：
                                输入：de -> fr { "gweaq": "Hallo", "wtrts": "Welt" }
                                输出：{ "gweaq": "Bonjour", "wtrts": "Monde" }

                                请回答问题：
                                输入：源语言A -> 目标语言B { "wghhj": "XXX" }
                                输出：

                                要求：
                                1 以JSON对象格式输出
                                2 JSON对象中每个成员为翻译后的内容
                                ###
                            `
                        },
                        {
                            role: 'user',
                            content: `${fromKey} -> ${toKey} ${JSON.stringify(sourceMap)}`
                        }
                    ],
                    ...(option.insertOption || {})
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

                let resultTextArr = Array.from(textArr).fill('')
                const content = response.data.choices[0].message.content
                try {
                    let resultMap: unknown
                    try {
                        resultMap = JSON.parse(content)
                    } catch (error) {
                        throw new Error('大模型返回文本解析失败')
                    }
                    if (typeof resultMap !== 'object' || !resultMap) {
                        throw new Error('大模型返回文本解析后类型不正确')
                    }
                    const isMiss = Object.keys(resultMap).some(key => !(key in sourceMap))
                    if (isMiss) {
                        throw new Error('大模型返回文本内容不完整')
                    }
                    resultTextArr = textArr.map(
                        text => (resultMap as Record<string, string>)[generateId(text)]
                    ) // 用textArr遍历，保证顺序
                } catch (error) {
                    const message = error instanceof Error ? error.message : '未知错误'
                    console.warn('⚠', message)
                    console.warn('⚠ 返回的文本内容：', content)
                    console.warn('⚠ 原文本内容：', JSON.stringify(sourceMap))
                }

                return resultTextArr.join(separator)
            },
            onError: (error, cb) => {
                cb(error)
                console.error(
                    '请确保在火山引擎控制台开通了对应模型，且有足够的token余额。控制台地址：https://console.volcengine.com/ark/'
                )
            },
            maxChunkSize: 1000, // 太长可能会导致返回文本不完整
            interval: option.interval ?? 1000
        })
    }
}
