/*
 * @Author: xiaoshanwen
 * @Date: 2024-04-06 15:47:14
 * @LastEditTime: 2025-03-16 18:18:28
 * @FilePath: /i18n_translation_vite/packages/autoI18nPluginCore/src/constants/translate.ts
 */
import { OriginLangKeyEnum } from 'src/enums/language'

export const REGEX_MAP = {
    [OriginLangKeyEnum.ZH]: /[\u4e00-\u9fff]/,
    [OriginLangKeyEnum.EN]: /[a-zA-Z]/,
    [OriginLangKeyEnum.JA]: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/, // 日语假名和汉字
    [OriginLangKeyEnum.KO]: /[\uAC00-\uD7A3]/, // 韩语字母
    [OriginLangKeyEnum.RU]: /[йцукенгшщзхъфывапролджэячсмитьбюё .-]{1,}/ // 俄语字母
}
