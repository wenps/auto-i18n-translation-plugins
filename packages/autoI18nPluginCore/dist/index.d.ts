import { Node } from '@babel/types';
import tunnel from 'tunnel';
import { AxiosProxyConfig } from 'axios';

declare enum OriginLangKeyEnum {
    ZH = "zh-cn",
    EN = "en"
}

interface TranslatorOption {
    /** 实际的请求方法 */
    fetchMethod: (text: string, fromKey: string, toKey: string) => Promise<string>;
    name?: string;
    /** 执行间隔（默认不开启） */
    interval?: number;
}
declare class Translator {
    protected option: TranslatorOption;
    constructor(option: TranslatorOption);
    protected getErrorMessage(error: unknown): string;
    translate(text: string, fromKey: string, toKey: string): Promise<string>;
}

interface GoogleTranslatorOption {
    proxyOption: tunnel.ProxyOptions;
}
declare class GoogleTranslator extends Translator {
    constructor(option: GoogleTranslatorOption);
}

interface YoudaoTranslatorOption {
    appId: string;
    appKey: string;
    proxy?: AxiosProxyConfig;
    /** 翻译api执行间隔，默认为1000 */
    interval?: number;
}
declare class YoudaoTranslator extends Translator {
    /** 有道的语言类型映射不标准，需要手动控制 */
    private readonly YOUDAO_TRANSLATE_KEY_CONVERT_MAP;
    private truncate;
    private getTranslateKey;
    constructor(option: YoudaoTranslatorOption);
}

type index$1_GoogleTranslator = GoogleTranslator;
declare const index$1_GoogleTranslator: typeof GoogleTranslator;
type index$1_GoogleTranslatorOption = GoogleTranslatorOption;
type index$1_Translator = Translator;
declare const index$1_Translator: typeof Translator;
type index$1_TranslatorOption = TranslatorOption;
type index$1_YoudaoTranslator = YoudaoTranslator;
declare const index$1_YoudaoTranslator: typeof YoudaoTranslator;
type index$1_YoudaoTranslatorOption = YoudaoTranslatorOption;
declare namespace index$1 {
  export { index$1_GoogleTranslator as GoogleTranslator, type index$1_GoogleTranslatorOption as GoogleTranslatorOption, index$1_Translator as Translator, type index$1_TranslatorOption as TranslatorOption, index$1_YoudaoTranslator as YoudaoTranslator, type index$1_YoudaoTranslatorOption as YoudaoTranslatorOption };
}

/**
 * 默认插件配置选项
 */
declare const DEFAULT_OPTION: {
    /** 翻译调用函数，默认为 $t */
    translateKey: string;
    /** 标记不翻译调用函数列表，避免某些调用被错误翻译 */
    excludedCall: string[];
    /** 标记不用翻译的字符串模式数组，默认是匹配文件扩展名 */
    excludedPattern: RegExp[];
    /** 排查不需要翻译的目录下的文件路径（黑名单）, 默认不处理node_modules */
    excludedPath: string[];
    /** 指定需要翻译文件的目录路径正则（白名单） */
    includePath: RegExp[];
    /** 配置文件生成位置，默认为 './lang' */
    globalPath: string;
    /** 打包后生成文件的位置，例如 './dist/assets' */
    distPath: string;
    /** 打包后生成文件的主文件名称，默认是 'index' */
    distKey: string;
    /** 来源语言，默认是中文 */
    originLang: OriginLangKeyEnum | string;
    /** 翻译目标语言列表，默认包含英文 */
    targetLangList: string[];
    /** 语言key，用于请求谷歌api和生成配置文件下对应语言的内容文件 */
    langKey: string[];
    /** 命名空间，防止全局命名冲突 */
    namespace: string;
    /** 是否在构建结束之后将最新的翻译重新打包到主包中，默认不打包 */
    buildToDist: boolean;
    /** 默认使用 Google 翻译器 */
    translator: Translator;
    /** 翻译器配置选项，优先级低于translator */
    translatorOption: TranslatorOption | undefined;
};
/**
 * 类型定义：插件配置选项类型
 */
type OptionType = typeof DEFAULT_OPTION;
/**
 * 全局插件配置实例，复制自默认配置
 */
declare let option: OptionType;
/**
 * 类型定义：用户传入的配置选项
 */
type OptionInfo = {
    option: Partial<OptionType>;
};
/**
 * 初始化插件配置选项
 * @param optionInfo 用户提供的配置选项
 */
declare function initOption(optionInfo: OptionInfo): void;
/**
 * 校验插件配置选项是否完整有效
 * @returns {boolean} 校验结果，完整返回 true，否则返回 false
 */
declare function checkOption(): boolean;

/**
 * @description: 是否包含来源语言字符
 * @param {string} code
 * @return {*}
 */
declare function hasOriginSymbols(code: string): boolean;
/**
 * @description: 过滤注释
 * @param {string} code
 * @return {*}
 */
declare const removeComments: (code: string) => string;
/**
 * @description: 用于判断提供的值是否符合正则表达式数组中的任一规则，符合则跳过
 * @param {*} value
 * @param {*} regexArray
 * @return {*}
 */
declare function checkAgainstRegexArray(value: string, regexArray: string[] | RegExp[]): boolean;
/**
 * @description: 用于解析抽象语法树中的调用表达式，并提取出调用的名称，如a.b.c() 取 c。
 * @param {any} node
 * @return {*}
 */
declare function extractFunctionName(node: Node): string;
/**
 * @description: 提取文件的中文部分
 * @param {string} fileContent
 * @return {*}
 */
declare const extractCnStrings: (fileContent: string) => string[];
/**
 * @description: 提取文件指定部分内容
 * @param {string} fileContent
 * @param {any} regex
 * @return {*}
 */
declare function extractStrings(fileContent: string, regex: any): string[];
/**
 * @description: 生成i8n翻译函数
 * @param {string} value
 * @param {boolean} isExpression
 * @param {string} key
 * @return {*}
 */
declare function createI18nTranslator(value: string, isExpression?: boolean, key?: string): any;
/**
 * @description: 生成唯一id
 * @param {string} key
 * @return {*}
 */
declare function generateId(key: string): string;
/**
 * @description: unicode转中文
 * @param {string} str
 * @return {*}
 */
declare const unicodeToChinese: (str: string) => string;
/**
 * @description: 有道翻译 标识截取
 * @param {string} q
 * @return {*}
 */
declare function truncate(q: string): string;
declare function cloneDeep<T>(value: T, cache?: WeakMap<object, any>): T;

declare const base_checkAgainstRegexArray: typeof checkAgainstRegexArray;
declare const base_cloneDeep: typeof cloneDeep;
declare const base_createI18nTranslator: typeof createI18nTranslator;
declare const base_extractCnStrings: typeof extractCnStrings;
declare const base_extractFunctionName: typeof extractFunctionName;
declare const base_extractStrings: typeof extractStrings;
declare const base_generateId: typeof generateId;
declare const base_hasOriginSymbols: typeof hasOriginSymbols;
declare const base_removeComments: typeof removeComments;
declare const base_truncate: typeof truncate;
declare const base_unicodeToChinese: typeof unicodeToChinese;
declare namespace base {
  export { base_checkAgainstRegexArray as checkAgainstRegexArray, base_cloneDeep as cloneDeep, base_createI18nTranslator as createI18nTranslator, base_extractCnStrings as extractCnStrings, base_extractFunctionName as extractFunctionName, base_extractStrings as extractStrings, base_generateId as generateId, base_hasOriginSymbols as hasOriginSymbols, base_removeComments as removeComments, base_truncate as truncate, base_unicodeToChinese as unicodeToChinese };
}

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
declare function initLangFile(): void;
/**
 * @description: 生成国际化基础调用函数文件
 * @return {*}
 */
declare function initTranslateBasicFnFile(): void;
/**
 * @description: 生成国际化JSON文件
 * @return {*}
 */
declare function initLangTranslateJSONFile(): void;
/**
 * @description: 读取国际化JSON文件
 * @return {*}
 */
declare function getLangTranslateJSONFile(): string;
/**
 * @description: 基于langKey获取JSON配置文件中对应语言对象
 * @param {string} key
 * @return {*}
 */
declare function getLangObjByJSONFileWithLangKey(key: string, insertJSONObj?: object | undefined): any;
/**
 * @description: 设置国际化JSON文件
 * @return {*}
 */
declare function setLangTranslateJSONFile(obj: object): void;
/**
 * @description: 构建时把lang配置文件设置到打包后到主文件中
 * @return {*}
 */
declare function buildSetLangConfigToIndexFile(): void;

declare const file_buildSetLangConfigToIndexFile: typeof buildSetLangConfigToIndexFile;
declare const file_getLangObjByJSONFileWithLangKey: typeof getLangObjByJSONFileWithLangKey;
declare const file_getLangTranslateJSONFile: typeof getLangTranslateJSONFile;
declare const file_initLangFile: typeof initLangFile;
declare const file_initLangTranslateJSONFile: typeof initLangTranslateJSONFile;
declare const file_initTranslateBasicFnFile: typeof initTranslateBasicFnFile;
declare const file_setLangTranslateJSONFile: typeof setLangTranslateJSONFile;
declare namespace file {
  export { file_buildSetLangConfigToIndexFile as buildSetLangConfigToIndexFile, file_getLangObjByJSONFileWithLangKey as getLangObjByJSONFileWithLangKey, file_getLangTranslateJSONFile as getLangTranslateJSONFile, file_initLangFile as initLangFile, file_initLangTranslateJSONFile as initLangTranslateJSONFile, file_initTranslateBasicFnFile as initTranslateBasicFnFile, file_setLangTranslateJSONFile as setLangTranslateJSONFile };
}

declare const SEPARATOR = "\n\u2507\u2507\u2507\n";
declare const SPLIT_SEPARATOR_REGEX: RegExp;
type langObj = {
    [key: string]: string;
};
declare let langObj: langObj;
/**
 * @description: 设置翻译对象属性
 * @param {string} key
 * @param {string} value
 * @return {*}
 */
declare function setLangObj(key: string, value: string): void;
/**
 * @description: 读取翻译对象
 * @return {*}
 */
declare function getLangObj(): langObj;
/**
 * @description: 初始化翻译对象
 * @param {langObj} obj
 * @return {*}
 */
declare function initLangObj(obj: langObj): void;
/**
 * 自动生成多语言配置文件的核心方法
 *
 * 主要流程：
 * 1. 加载现有翻译文件
 * 2. 对比找出新增需要翻译的内容
 * 3. 分块并行翻译所有目标语言
 * 4. 合并翻译结果并生成最终配置文件
 *
 * 异常处理：
 * - 翻译结果不完整时中断流程
 * - 文件读写失败时明确报错
 */
declare function autoTranslate(): Promise<void>;
/**
 * @description: 新增语言类型配置补全
 * @param {any} obj
 * @return {*}
 */
declare function languageConfigCompletion(obj: any): void;
/**
 * @description: 补全新增语言翻译写入函数
 * @param {any} langObj
 * @param {any} curLangObj
 * @param {string} translateKey
 * @return {*}
 */
declare function completionTranslateAndWriteConfigFile(langObj: any, curLangObj: any, translateKey: string): Promise<void>;

declare const translate_SEPARATOR: typeof SEPARATOR;
declare const translate_SPLIT_SEPARATOR_REGEX: typeof SPLIT_SEPARATOR_REGEX;
declare const translate_autoTranslate: typeof autoTranslate;
declare const translate_completionTranslateAndWriteConfigFile: typeof completionTranslateAndWriteConfigFile;
declare const translate_getLangObj: typeof getLangObj;
declare const translate_initLangObj: typeof initLangObj;
declare const translate_langObj: typeof langObj;
declare const translate_languageConfigCompletion: typeof languageConfigCompletion;
declare const translate_setLangObj: typeof setLangObj;
declare namespace translate {
  export { translate_SEPARATOR as SEPARATOR, translate_SPLIT_SEPARATOR_REGEX as SPLIT_SEPARATOR_REGEX, translate_autoTranslate as autoTranslate, translate_completionTranslateAndWriteConfigFile as completionTranslateAndWriteConfigFile, translate_getLangObj as getLangObj, translate_initLangObj as initLangObj, translate_langObj as langObj, translate_languageConfigCompletion as languageConfigCompletion, translate_setLangObj as setLangObj };
}

declare class FunctionFactoryOption {
    static originLang: string;
}

declare function export_default$4(path: any): void;

declare function export_default$3(path: any): void;

declare function export_default$2(path: any): void;

declare function export_default$1(path: any): void;

declare function export_default(): {
    visitor: {
        StringLiteral: typeof export_default$4;
        JSXText: typeof export_default$1;
        TemplateElement: typeof export_default$2;
        CallExpression: typeof export_default$3;
    };
};

declare namespace index {
  export { export_default as default };
}

export { FunctionFactoryOption, GoogleTranslator, type OptionInfo, Translator, type TranslatorOption, YoudaoTranslator, base as baseUtils, checkOption, file as fileUtils, index as filter, initOption, option, translate as translateUtils, index$1 as translator };
