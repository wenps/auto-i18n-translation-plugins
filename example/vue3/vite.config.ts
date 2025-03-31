/*
 * @Author: xiaoshanwen
 * @Date: 2023-08-10 17:12:17
 * @LastEditTime: 2025-03-31 20:00:05
 * @FilePath: /i18n_translation_vite/example/vue3/vite.config.ts
 */
import vitePluginsAutoI18n, { ScanTranslator } from 'vite-auto-i18n-plugin'
import createVuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'

const i18nPlugin = vitePluginsAutoI18n({
    deepScan: true,
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/assets',
    distKey: 'index',
    targetLangList: ['en'],
    originLang: 'zh-cn',
    translator: new ScanTranslator({})
})

const vuePlugin = createVuePlugin({
    // include: [/\.vue$/],
    // template: {
    //     compilerOptions: {
    //         hoistStatic: false,
    //         cacheHandlers: false
    //     }
    // }
})
// 默认谷歌
// const i18nPlugin = vitePluginsAutoI18n({
//     option: {
//         globalPath: './lang',
//         namespace: 'lang',
//         distPath: './dist/assets',
//         distKey: 'index',
//         targetLangList: ['en', 'ko', 'ja']
//     }
// })

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
    plugins: [vuePlugin, i18nPlugin]
})
