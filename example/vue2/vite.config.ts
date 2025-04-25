/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-03-17 01:12:44
 * @FilePath: /i18n_translation_vite/example/vue2/vite.config.ts
 */
import vitePluginsAutoI18n, { EmptyTranslator, Vue2Extends } from 'vite-auto-i18n-plugin'
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import path from 'path'

const i18nPlugin = vitePluginsAutoI18n({
    rewriteConfig: false,
    targetLangList: ['en'],
    translator: new EmptyTranslator({}),
    translateExtends: new Vue2Extends()
})

export default defineConfig({
    resolve: {
        // 设置目录别名
        alias: {
            // 键必须以斜线开始和结束
            '@': path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            core: path.resolve(__dirname, './src/core'),
            assets: path.resolve(__dirname, './src/assets'),
            interface: path.resolve(__dirname, './src/interface'),
            plugins: path.resolve(__dirname, './src/plugins')
        }
    },
    plugins: [vue(), i18nPlugin]
})
