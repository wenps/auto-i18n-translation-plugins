/*
 * @Date: 2025-02-10 18:58:20
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-09 15:00:45
 * @FilePath: /i18n_translation_vite/example/vue3/src/main.js
 */

import '../lang/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
// element-tag-marker: qwz4q121
