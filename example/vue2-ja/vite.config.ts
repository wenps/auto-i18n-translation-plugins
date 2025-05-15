/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-03-16 19:17:08
 * @FilePath: /i18n_translation_vite/example/vue2-ja/vite.config.ts
 */
import vitePluginsAutoI18n, { VolcengineTranslator } from 'vite-auto-i18n-plugin'
import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import path from 'path'

const i18nPlugin = vitePluginsAutoI18n({
    originLang: 'ja',
    targetLangList: ['en', 'ko', 'zhcn'],
    translator: new VolcengineTranslator({
        apiKey: '37d7eed0-83d2253df2b4',
        model: 'doubao-1.5-pro-32k-250115'
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
