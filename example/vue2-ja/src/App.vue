<!--
 * @Author: xiaoshanwen
 * @Date: 2023-11-23 15:52:50
 * @LastEditTime: 2025-03-16 18:30:14
 * @FilePath: /i18n_translation_vite/example/vue2/src/App.vue
-->
<template>
    <div id="app">
        <div v-bind="xx" class="main">
            <header class="header">
                <div class="logo">
                    <img class="logo-img" @click="goHome" :src="logoUrl" alt="ロゴ" />
                    <span @click="goHome1" class="site-name">企業ポータル</span>
                </div>
                <nav class="nav-menu">
                    <div class="operation">
                        <a-button @click="changeLang('zhcn')" style="margin-right: 10px">
                            中国語
                        </a-button>
                        <a-button @click="changeLang('en')" style="margin-right: 10px">
                            英語
                        </a-button>
                        <a-button @click="changeLang('ko')" style="margin-right: 10px">
                            韓国語
                        </a-button>
                        <a-button @click="changeLang('ja')" style="margin-right: 10px">
                            日本語
                        </a-button>
                    </div>
                    <a-button @click="navigate('products')" class="nav-item">製品サービス</a-button>
                    <a-button @click="navigate('solutions')" class="nav-item">
                        ソリューション
                    </a-button>
                    <a-button @click="navigate('about')" class="nav-item">当社について</a-button>
                    <a-button @click="navigate('contact')" class="nav-item">お問い合わせ</a-button>
                </nav>
            </header>
            <main>
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logoUrl: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
            xx: {
                name: 'element-tag-marker',
                description: 'element-tag-marker'
            }
        }
    },
    methods: {
        changeLang(value) {
            localStorage.setItem('lang', value)
            location.reload()
        },
        navigate(route) {
            this.$router.push({ name: route })
        },
        goHome1() {
            this.$router.push({ name: 'home' })
        },
        goHome() {
            this.$router.push({ name: 'about' })
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logo-img {
    height: 40px;
    margin-right: 1rem;
}

.site-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
}

.nav-menu {
    display: flex;
    gap: 1rem;
}

.nav-item {
    font-weight: 500;
}

main {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}
</style>

<!-- element-tag-marker: wenag321 -->
