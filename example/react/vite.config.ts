/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 15:58:26
 * @FilePath: /i18n_translation_vite/example/react/vite.config.ts
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginsAutoI18n, { TranslateTypeEnum, YoudaoTranslator } from 'vite-auto-i18n-plugin'

const i18nPlugin = vitePluginsAutoI18n({
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/assets',
    distKey: 'index',
    targetLangList: ['zh-cn', 'ko', 'ja'],
    originLang: 'en',
    translator: new YoudaoTranslator({
        appId: '4cdb9baea8066fef',
        appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
    }),
    translateType: TranslateTypeEnum.SEMI_AUTO
})

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: '/',
        https: false
    },
    plugins: [react(), i18nPlugin]
})
