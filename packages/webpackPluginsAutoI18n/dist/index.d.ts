import { OptionInfo } from 'auto-i18n-plugin-core';
export * from 'auto-i18n-plugin-core';
import webpack from 'webpack';

/**
 * Webpack 插件实现，用于自动化处理国际化翻译功能
 */
declare class webpackPluginsAutoI18n {
    /**
     * 初始化插件并合并用户配置
     * @param optionInfo 用户提供的配置
     */
    constructor(optionInfo: OptionInfo);
    /**
     * Webpack 插件核心方法，用于集成到编译流程中
     * @param compiler Webpack 编译器实例
     */
    apply(compiler: webpack.Compiler): void;
}

export { webpackPluginsAutoI18n as default };
