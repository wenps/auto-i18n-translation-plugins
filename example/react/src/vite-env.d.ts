/*
 * @Date: 2025-02-10 18:58:19
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 15:35:02
 * @FilePath: /i18n_translation_vite/example/react/src/vite-env.d.ts
 */
/// <reference types="vite/client" />

// 新增全局翻译函数类型声明
interface Window {
    /** 全局国际化翻译函数 */
    $t: (key: string) => string
}
