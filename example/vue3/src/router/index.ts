/*
 * @Date: 2025-01-23 18:13:25
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-31 10:30:26
 * @FilePath: /i18n_translation_vite/example/vue3/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import '../resource.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/products',
            name: 'Products',
            component: Products
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        }
    ]
})

export default router
// element-tag-marker: u3820c29
