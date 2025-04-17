/*
 * @Date: 2025-03-31 19:05:57
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-31 19:52:10
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/translator/scan.ts
 */
import { Translator, TranslatorOption } from './translator'

/**
 * 空翻译器，不翻译文本，用于配合某些特殊的操作
 */
export class EmptyTranslator extends Translator {
    constructor(option: Partial<TranslatorOption> = {}) {
        const resultOption: TranslatorOption = {
            name: '空翻译器',
            fetchMethod: async (text, _from, _to, separator) => {
                // 相当于把翻译结果统一设置为空串
                const value = text.split(separator).fill('')
                return value.join(separator)
            },
            ...option
        }
        super(resultOption)
    }
    // TODO: 后续可以作为基类，提供更多的配置选项
}

/** @deprecated 别名导出，兼容旧版本 */
export const ScanTranslator = EmptyTranslator
