import { getLangObjByJSONFileWithLangKey, initLangFile } from './utils/file.ts'
import { initLangObj, languageConfigCompletion } from './utils/translate.ts'
import { checkOption, initOption, OptionInfo } from './option.ts'

/*
 * @Author: xiaoshanwen
 * @Date: 2024-02-29 13:34:34
 * @LastEditTime: 2024-04-03 18:07:43
 * @FilePath: /i18n_translation_vite/autoI18nPluginCore/src/index.ts
 */
export * from './option.ts'
export * from './translators'
export * from './extends'
export { fileUtils, translateUtils, baseUtils, FunctionFactoryOption } from './utils'
export * as filter from './filter'

/**
 * core 初始化方法
 * @param optionInfo 用户提供的配置选项
 */
export const initCore = async (optionInfo: OptionInfo) => {
    const option = initOption(optionInfo)

    if (!checkOption()) throw new Error('Invalid option configuration')

    initLangFile()
    const originLangObj = getLangObjByJSONFileWithLangKey(option.originLang) // FIXME: 待优化
    initLangObj(originLangObj)
    await languageConfigCompletion(option.originLang)
}
