/** 定义项目类型枚举 */
export const TypeEnum = {
    CORE: 'core',
    PLUGIN: 'plugin'
}

/** 项目类型枚举 */
export const PluginTypeEnum = {
    WEBPACK: 'webpack',
    VITE: 'vite'
}

/** 插件项目类型与目录名的映射 */
export const TypeDirNameMap = {
    [TypeEnum.CORE]: 'core',
    [PluginTypeEnum.WEBPACK]: 'webpack',
    [PluginTypeEnum.VITE]: 'vite'
}

/** 版本类型枚举 */
export const VersionTypeEnum = {
    MAJOR: 'major',
    SECONDARY: 'secondary',
    PATCH: 'patch'
}
