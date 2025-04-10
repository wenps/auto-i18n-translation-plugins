export const TypeEnum = {
    CORE: 'core',
    PLUGIN: 'plugin'
}

export const PluginTypeEnum = {
    WEBPACK: 'webpack',
    VITE: 'vite'
}

export const TypeDirNameMap = {
    [TypeEnum.CORE]: 'autoI18nPluginCore',
    [PluginTypeEnum.WEBPACK]: 'webpackPluginsAutoI18n',
    [PluginTypeEnum.VITE]: 'vitePluginsAutoI18n'
}
