import { OptionInfo as OptionInfo$1 } from 'src/option';
import { types } from '@babel/core';
import tunnel from 'tunnel';
import { AxiosProxyConfig } from 'axios';
import { Node } from '@babel/types';

interface TranslatorOption {
    /** Translator版本，用于做后续的功能迭代 */
    version?: number;
    /**
     * 实际的请求方法
     * @param text 被翻译的文本
     * @param fromKey 源语言
     * @param toKey 目标语言
     * @param separator 分隔符
     * @returns 翻译后的文本
     */
    fetchMethod: (text: string, fromKey: string, toKey: string, separator: string) => Promise<string>;
    name: string;
    /** 单次最大翻译文本长度 */
    maxChunkSize?: number;
    /** 执行间隔（默认不开启） */
    interval?: number;
    /**
     * 错误处理函数，主要是打印提示
     * @param err 抛出的异常
     * @param defaultErrorHandler 默认的错误处理函数
     * @returns 如果在这里抛出异常会中断翻译
     */
    onError?: (err: unknown, defaultErrorHandler: (error: unknown) => void) => void;
}
declare class Translator {
    option: Required<TranslatorOption>;
    constructor(option: TranslatorOption);
    private defaultErrorHandler;
    private getResultOption;
    protected getErrorMessage(error: unknown): string;
    translate(text: string, fromKey: string, toKey: string, separator: string): Promise<string>;
}

interface GoogleTranslatorOption {
    proxyOption?: tunnel.ProxyOptions;
}
/**
 * 谷歌翻译器
 *
 * 基于@vitalets/google-translate-api，需要翻墙，不稳定，但是免费
 *
 * 使用方式：
 * ```ts
 * vitePluginsAutoI18n({
    ...
    translator: translator: new GoogleTranslator({
        proxyOption: {
            // 如果你本地的代理在127.0.0.0:8899
            host: '127.0.0.1',
            port: 8899,
            headers: {
                'User-Agent': 'Node'
            }
        }
    })
})
 * ```
 */
declare class GoogleTranslator extends Translator {
    constructor(option: GoogleTranslatorOption);
}

interface YoudaoTranslatorOption {
    appId: string;
    appKey: string;
    /** 网络代理配置 */
    proxy?: AxiosProxyConfig;
    /** 翻译api执行间隔，默认为1000 */
    interval?: number;
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
declare class YoudaoTranslator extends Translator {
    /** 有道的语言类型映射不标准，需要手动控制 */
    private readonly YOUDAO_TRANSLATE_KEY_CONVERT_MAP;
    private truncate;
    private getTranslateKey;
    constructor(option: YoudaoTranslatorOption);
}

interface BaiduTranslatorOption {
    appId: string;
    appKey: string;
    /** 网络代理配置 */
    proxy?: AxiosProxyConfig;
    /** 翻译api执行间隔，默认为1000 */
    interval?: number;
}
/**
 * 百度翻译器
 *
 * api文档：https://api.fanyi.baidu.com/product/113
 *
 * 使用方式：
 * ```ts
 * vitePluginsAutoI18n({
    ...
    translator: new BaiduTranslator({
        appId: '你申请的appId',
        appKey: '你申请的appKey'
    })
})
 * ```
 */
declare class BaiduTranslator extends Translator {
    /** 百度的语言类型映射不标准，需要手动控制 */
    protected readonly BAIDU_TRANSLATE_KEY_CONVERT_MAP: Record<string, string>;
    protected getTranslateKey(key: string): string;
    constructor(option: BaiduTranslatorOption);
}

/**
 * 空翻译器，不翻译文本，用于配合某些特殊的操作
 */
declare class EmptyTranslator extends Translator {
    constructor(option?: Partial<TranslatorOption>);
}
/** @deprecated 别名导出，兼容旧版本 */
declare const ScanTranslator: typeof EmptyTranslator;

interface VolcengineTranslatorOption {
    apiKey: string;
    /** 使用的ai模型，可选值请参阅火山引擎控制台的模型列表，如`doubao-1-5-pro-32k-250115`，并请确保使用前已在控制台开通了对应模型 */
    model: string;
    /** 对本项目的简短描述，在有描述的情况下大模型的翻译结果可能会更加准确 */
    desc?: string;
    /** 网络代理配置 */
    proxy?: AxiosProxyConfig;
    /** 翻译api执行间隔，默认为1000 */
    interval?: number;
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
declare class VolcengineTranslator extends Translator {
    constructor(option: VolcengineTranslatorOption);
}

declare enum OriginLangKeyEnum {
    ZH = "zh-cn",
    EN = "en",
    JA = "ja",
    KO = "ko",
    RU = "ru"
}

/**
 * 翻译类型枚举
 */
declare enum TranslateTypeEnum {
    FULL_AUTO = "full-auto",
    SEMI_AUTO = "semi-auto"
}

declare class Vue2Extends {
    handleInitFile: any;
    handleCodeCall: any;
    handleCodeString: any;
    constructor();
}

type BaseExtendsType = {
    /**
     * 处理入口文件
     * @param source - 源文件内容字符串
     * @returns 包含 source 字段的对象，source 为字符串类型
     */
    handleInitFile: (source: string, path: string) => {
        source: string;
        [key: string]: any;
    };
    /**
     * 处理具体代码，返回函数的babel节点
     * @param option - 选项对象，包含多个参数
     * @param option.option - 选项信息，类型为 OptionInfo
     * @param option.hash - 哈希值
     * @param option.value - 默认传入的值，可能经过了 unicode 转码
     * @param option.uncodeValue - value 转码之后的值
     * @param option.namespace - 命名空间
     * @param initFileResult - 处理入口文件时返回的对象
     */
    handleCodeCall: (option: {
        option: OptionInfo$1;
        hash: any;
        value: any;
        uncodeValue: any;
        namespace: any;
    }, initFileResult: ReturnType<(source: string, path: string) => {
        source: string;
        [key: string]: any;
    }>) => types.CallExpression;
    /**
     * 处理具体代码，返回字符串的babel节点
     * @param option - 选项对象，包含多个参数
     * @param option.option - 选项信息，类型为 OptionInfo
     * @param option.hash - 哈希值
     * @param option.value - 默认传入的值，可能经过了 unicode 转码
     * @param option.uncodeValue - value 转码之后的值
     * @param option.namespace - 命名空间
     * @param initFileResult - 处理入口文件时返回的对象
     */
    handleCodeString: (option: {
        option: OptionInfo$1;
        hash: any;
        value: any;
        uncodeValue: any;
        namespace: any;
    }, initFileResult: ReturnType<(source: string, path: string) => {
        source: string;
        [key: string]: any;
    }>) => string;
};

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
    /**
     * 翻译类型，支持全自动和半自动两种模式
     * 全自动：所有翻译任务自动完成
     * 半自动：需要人工标识
     */
    translateType: TranslateTypeEnum | string;
    /**
     * 是否重写配置文件，默认为true
     */
    rewriteConfig: boolean;
    /**
     * 通用翻译key，默认使用namespace，如果commonTranslateKey不为空，则使用commonTranslateKey
     */
    commonTranslateKey: string;
    /**
     * 实验性属性，表示是否进行深层扫描字符串，默认为 false
     * 当设置为 true 时，会对代码中的字符串进行更深入的扫描
     */
    deepScan: boolean;
    /**
     * 自定义文件拓展名数组
     */
    insertFileExtensions: string[];
    /**
     * 自定义拓展类，插件默认翻译函数挂载在window上，如果希望自定义翻译函数挂载在其他对象上，可以使用该属性
     * 注意：该属性需要继承BaseExtends类，并且需要实现handleInitFile和handleCodeCall和handleCodeString方法
     */
    translateExtends: BaseExtendsType | null;
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
interface OptionInfo extends Partial<OptionType> {
}
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

declare function getOriginRegex(): RegExp;
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
declare function createI18nTranslator(createOption: {
    value: string;
    isExpression?: boolean;
    key?: string;
    insertOption?: any;
}): any;
/**
 * @description: 生成唯一id
 * @param {string} key
 * @return {*}
 */
declare function generateId(key: string): string;
/**
 * @description: unicode转普通字符串
 * @param {string} str
 * @return {*}
 */
declare const unicodeToString: (str: string) => string;
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
declare const base_getOriginRegex: typeof getOriginRegex;
declare const base_hasOriginSymbols: typeof hasOriginSymbols;
declare const base_removeComments: typeof removeComments;
declare const base_truncate: typeof truncate;
declare const base_unicodeToString: typeof unicodeToString;
declare namespace base {
  export { base_checkAgainstRegexArray as checkAgainstRegexArray, base_cloneDeep as cloneDeep, base_createI18nTranslator as createI18nTranslator, base_extractCnStrings as extractCnStrings, base_extractFunctionName as extractFunctionName, base_extractStrings as extractStrings, base_generateId as generateId, base_getOriginRegex as getOriginRegex, base_hasOriginSymbols as hasOriginSymbols, base_removeComments as removeComments, base_truncate as truncate, base_unicodeToString as unicodeToString };
}

/**
 * @description: 新建国际化配置文件夹
 * @return {*}
 */
declare function initLangFile(): void;
/**
 * @description: 初始化翻译基础函数文件
 * @returns {void}
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
 * @param langObj
 * @param curLangObj
 * @param translateKey
 * @return
 */
declare function completionTranslateAndWriteConfigFile(langObj: Record<string, string>, curLangObj: Record<string, string>, translateKey: string): Promise<void>;

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

declare function export_default(insertOption?: any): () => {
    visitor: {
        StringLiteral: (path: any) => void;
        JSXText: (path: any) => void;
        TemplateElement: (path: any) => void;
        CallExpression: (path: any) => void;
    };
};

declare namespace index {
  export { export_default as default };
}

export { BaiduTranslator, type BaiduTranslatorOption, type BaseExtendsType, EmptyTranslator, FunctionFactoryOption, GoogleTranslator, type GoogleTranslatorOption, type OptionInfo, ScanTranslator, Translator, type TranslatorOption, VolcengineTranslator, type VolcengineTranslatorOption, Vue2Extends, YoudaoTranslator, type YoudaoTranslatorOption, base as baseUtils, checkOption, file as fileUtils, index as filter, initOption, option, translate as translateUtils };
