/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-03-16 19:17:17
 * @FilePath: /i18n_translation_vite/example/vue2/vite.config.ts
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import vitePluginsAutoI18n, { YoudaoTranslator } from 'vite-auto-i18n-plugin'

const i18nPlugin = vitePluginsAutoI18n({
    targetLangList: ['ja', 'ko', 'en', 'ru'],
    translator: new YoudaoTranslator({
        appId: '6f7dd6dfaae',
        appKey: 'T40Yki1SBK682aTYBh4LZIzH'
    })
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
