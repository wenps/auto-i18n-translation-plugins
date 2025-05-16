import { OptionInfo } from 'auto-i18n-plugin-core';
export * from 'auto-i18n-plugin-core';
import { Plugin } from 'vite';

declare function vitePluginsAutoI18n(optionInfo: OptionInfo): Plugin;

export { vitePluginsAutoI18n as default };
