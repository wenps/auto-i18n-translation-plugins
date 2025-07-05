<div align="center">
  <img src="./logo.svg" alt="auto-i18n-translation-plugins" width="300">
</div>

# 🚀 auto-i18n-translation-plugins

[English Documentation](./readme-en.md)

## 🍉 插件介绍

一个 🎉 **前端自动翻译插件**，支持所有编译成 JS 的前端框架（例如 Vue2/3 和 React）。无需修改源码，通过支持多种翻译服务，一键轻松实现多语言支持！🌐🚀 默认集成有道翻译和谷歌翻译，同时支持自定义翻译器，兼容 Webpack、Vite、Rollup 等主流构建工具。

### 🎯 核心优势：

-   🛠️ **无需改动源码**，一键快速翻译多语言；
-   🌐 **支持多种翻译服务**（包括 Google 和有道，及自定义翻译器）；
-   🔍 **智能检测**需要翻译的文本；
-   🔧 提供 **灵活的配置选项**，满足不同项目需求。

tips：有道翻译需要用户自己去申请有道的翻译服务，demo里面的key已经被用完了。

---

## 📚 插件调试

```bash
  pnpm install
  pnpm run build
  pnpm run preview // 别选react，里面太多英文不好扫
```

---

## 📖 支持范围

-   **框架**: 支持所有编译为 JS 的前端框架（如 Vue2/3 和 React 等）。
-   **构建工具**: 完美兼容 Webpack、Vite 和 Rollup 🚀。
-   **翻译服务**: 默认支持 **有道翻译** 和 **谷歌翻译**，并支持自定义翻译器。

---

## 🌟 快速开始 🚀

### 1️⃣ 安装插件 📦

#### **🌐 Vite 项目:**

```bash
npm install vite-auto-i18n-plugin --save-dev
# 或
yarn add vite-auto-i18n-plugin --dev
```

#### **🛠️ Webpack 项目:**

```bash
npm install webpack-auto-i18n-plugin --save-dev
# 或
yarn add webpack-auto-i18n-plugin --dev
```

---

### 2️⃣ 语言切换 🌐

#### ⚙️ 基础切换

```js
window.localStorage.setItem('lang', value)
window.location.reload()

// value 是 语言映射对象 的  key 值
// 映射对象默认存在于 lang/index.js 文件下，可以看里面的这部分代码
const langMap = {
  'en': (),
  'zhcn': ()
}
```

#### 📲 即时切换语言

如果不想通过页面刷新来切换语言，可以直接通过 `$changeLang` 来修改语言，再重新渲染对应组件

```js
window.$changeLang('en')
```

例如在 Vue2 中，可以通过以下方式进行语言无刷切换：

```Html
<template>
    <div id="app" v-if="isShow">
        <button @click="changeLang('en')">切换到英文</button>
        <button @click="changeLang('zh-cn')">切换到中文</button>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        changeLang(lang) {
            window.$changeLang(lang)
            this.isShow = false
            this.$nextTick(() => {
                this.isShow = true
            })
        }
    }
}
</script>
```

#### 🔄 替换语言包

如果想修改内置生成的语言包，可以直接修改全局对象里面的 langMap，例如：

```js
window.langMap = {
    en: {
        zccsau6: 'hello'
    },
    'zh-cn': {
        zccsau6: '你好'
    }
}
```

然后再通过上述的**即时切换语言**的方式进行刷新即可。

---

### 3️⃣ 基础配置 🔧

#### **Vite 配置示例** (vite.config.js):

```javascript
import vitePluginsAutoI18n, { YoudaoTranslator } from 'vite-auto-i18n-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    hoistStatic: false,
                    cacheHandlers: false
                }
            }
        }),
        vitePluginsAutoI18n({
            translator: new YoudaoTranslator({
                appId: '4cdb9baea8066fef',
                appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
            })
        })
    ]
})
```

#### **Webpack 配置示例** (webpack.config.js):

```javascript
const webpackPluginsAutoI18n = require('webpack-auto-i18n-plugin')
const { YoudaoTranslator } = require('webpack-auto-i18n-plugin')

const i18nPlugin = new webpackPluginsAutoI18n.default({
    translator: new YoudaoTranslator({
        appId: '4cdb9baea8066fef',
        appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
    })
})

module.exports = {
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        i18nPlugin
    ]
}
```

---

### 4️⃣ 翻译器配置示例 🛠️

插件默认使用谷歌翻译（默认配置代理端口7890）。在网络不支持访问谷歌的情况下，我们推荐使用 **有道翻译** ✨，其翻译效果优秀。目前插件已经内置谷歌、有道和百度翻译功能。如果需要自定义翻译器，可参考下方的示例。

以下示例以 `vite` 为例，`webpack` 与其类似。

#### **使用谷歌翻译（默认）**

```javascript
import { GoogleTranslator } from 'vite-auto-i18n-plugin'

...
translator: new GoogleTranslator({
    proxyOption: {
        host: '127.0.0.1',
        port: 7890,
        headers: {
            'User-Agent': 'Node'
        }
    }
})
...
```

#### **使用有道翻译**

需要申请api，[api文档](https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html)。

```javascript
import { YoudaoTranslator } from 'vite-auto-i18n-plugin'

...
translator: new YoudaoTranslator({
    appId: '你申请的appId',
    appKey: '你申请的appKey'
})
...
```

#### **百度翻译器**

需要申请api，[api文档](https://api.fanyi.baidu.com/product/113)。

```javascript
import { BaiduTranslator } from 'vite-auto-i18n-plugin'

...
translator: new BaiduTranslator({
    appId: '你申请的appId', // 百度翻译 AppId
    appKey: '你申请的appKey' // 百度翻译 AppKey
})
...
```

#### **火山引擎AI翻译器**

支持调用 `doubao` 或 `deepseek` 进行翻译，AI大模型的翻译效果会比传统的API翻译更准确，但耗时较长。
火山引擎大模型介绍：https://www.volcengine.com/docs/82379/1099455。
需要开通大模型服务并申请API，[api文档](https://www.volcengine.com/docs/82379/1298454)。

```javascript
import { VolcengineTranslator } from 'vite-auto-i18n-plugin'

...
translator: new VolcengineTranslator({
    apiKey: '你申请的apiKey',
    model: '你要调用的模型，如：`doubao-1-5-pro-32k-250115`，请确保使用前已在控制台开通了对应模型'
})
...
```

#### **空翻译器**

如果只需要扫描目标语言，不进行翻译，该翻译器会生成 JSON 文件。

```javascript
import { EmptyTranslator } from 'vite-auto-i18n-plugin'

...
translator: new EmptyTranslator()
...
```

#### **自定义翻译器**

如果你有一个自用的翻译接口，可以通过以下方式自定义翻译器——

最简单的方式是使用 `Translator` 基类定义翻译器实例。

```javascript
import { Translator } from 'vite-auto-i18n-plugin'
import axios from 'axios'

...
translator: new Translator({
    name: '我的翻译器',
    // 翻译的方法
    fetchMethod: (str, fromKey, toKey, _separator) => {
        // 实际的接口调用可能比示例更复杂，具体可参考源码中YoudaoTranslator的实现，路径：packages\autoI18nPluginCore\src\translators\youdao.ts
        const myApi = 'https://www.my-i18n.cn/api/translate?from=${fromKey}&to=${toKey}&t={+new Date}'
        return axios.post(myApi, { str })
            .then(res => res.data)
    },
    // 接口触发间隔，有些接口频繁触发会被拉黑，请根据实际情况设置一个合理的接口触发间隔
    interval: 1000
})
...
```

如果需要更高阶的功能，可以使用继承，不过目前无相关场景。

```javascript
import { Translator } from 'vite-auto-i18n-plugin'

class CustomTranslator extends Translator {
    constructor () {
        super({
            name: '我的翻译器',
            ...
        })
    }
}

...
translator: new CustomTranslator()
...
```

---

### 5️⃣ 项目入口配置 🏗️

请在**项目入口文件**（如 `main.js`）的顶部引入语言配置文件：

```javascript
import '../lang/index.js' // 📍 必须在入口文件中第一行引入，文件会在运行插件时自动生成，默认位于打包配置目录同层的lang文件夹中，其中的index.js就是配置文件
```

---

## ⚙️ 配置参数说明

| 参数                 | 类型       | 必选 | 默认值                   | 描述                                                               |
| -------------------- | ---------- | ---- | ------------------------ | ------------------------------------------------------------------ |
| enabled              | boolean    | ❌   | `true`                   | 是否触发翻译。                                                     |
| translateType        | string     | ❌   | `full-auto`              | 翻译状态，默认有两种可选`full-auto` 和 `semi-auto` 。              |
| translateKey         | string     | ✅   | `$t`                     | 翻译调用函数名称，例如`$t` 表示翻译调用时的函数名                  |
| excludedCall         | string[]   | ❌   | `['$i8n', 'require', …]` | 标记不会被翻译的函数调用列表                                       |
| excludedPattern      | RegExp[]   | ❌   | `[/\.\w+$/]`             | 用于标记排除不翻译的字符串模式，例如文件路径中的文件后缀           |
| excludedPath         | string[]   | ❌   | `['node_modules']`       | 指定需要排除翻译的文件夹路径，例如默认会跳过`node_modules`         |
| includePath          | RegExp[]   | ❌   | `[/src\//]`              | 指定只翻译某些目录路径（白名单），默认为`src`                      |
| globalPath           | string     | ❌   | `'./lang'`               | 翻译文件配置生成路径                                               |
| distPath             | string     | ✅   | `''`                     | 打包后生成的文件位置路径                                           |
| distKey              | string     | ✅   | `'index'`                | 打包后生成的翻译主文件名称                                         |
| namespace            | string     | ✅   | `lang`                   | 项目命名空间，用于区分不同项目的翻译配置                           |
| originLang           | string     | ✅   | `'zh-cn'`                | 源语言，翻译以此语言为基础                                         |
| targetLangList       | string[]   | ✅   | `['en']`                 | 目标语言列表，支持配置多个语言                                     |
| buildToDist          | boolean    | ❌   | `false`                  | 是否在构建结束后将最新的翻译文件打包到主包中，默认不打包           |
| translator           | Translator | ❌   | `GoogleTranslator`       | 翻译器实例                                                         |
| translatorOption     | object     | ❌   | `{}`                     | 翻译器的配置项，优先级低于`translator`                             |
| rewriteConfig        | boolean    | ❌   | `true`                   | 插件每次运行时是否重写配置文件                                     |
| deepScan             | boolean    | ❌   | `false`                  | 实验性属性，表示是否进行深层扫描字符串                             |
| commonTranslateKey   | string     | ❌   | `''`                     | 通用翻译key                                                        |
| insertFileExtensions | string[]   | ❌   | `[]`                     | 要插入翻译代码的文件扩展名列表                                     |
| isClear              | boolean    | ❌   | `false`                  | 是否清除已经不在上下文中的内容（清除项目中不再使用到的源语言键值对） |

---

## 🔍 deepScan 选项的作用？

`deepScan` 是一个实验性的属性，用于控制插件是否进行深层扫描字符串。
默认情况下，插件会扫描字符串或者模版字符串，只需要里面存在一个目标语言就会被扫进去，比如：

```js
;`<div>
    <p>你好</p>
</div>`
```

因为里面有一个中文，所以整个字符串会被扫进去，可能会导致翻译不准确，因为我们只想翻译`你好`这个字符串，所以我们可以设置`deepScan`为`true`，插件会对字符串进行切割，重新拼接成模版字符串，值对符合的字符串进行翻译，比如：

```js
;`<div>
    <p>${$t('你好')}</p>
</div>`
```

这样就只会翻译`你好`这个字符串，而不会翻译整个字符串。

---

## 👋 translateType 选项的作用

`translateType` 是 v1.0.11 新增的属性，有两个可选值`full-auto` 和 `semi-auto` 。

`full-auto` 第一个是全自动翻译，默认来源语言只支持`中日韩俄`四种语言。

`semi-auto` 第二个半自动翻译，支持所有来源语言。

使用 `semi-auto` 时，用户需要主动去使用`translateKey`对目标字符进行包裹，比如 \$t('hello')，插件会自动完成翻译。

例子：

```js
const HelloWorld: React.FC<HelloWorldProps> = ({ name = 'World' }) => {
    return (
        <div className="hello-world">
            <h1>
                {$t('Hello,')} {name}!
            </h1>
            <p>{$t('Welcome to our application')}</p>
        </div>
    )
}

```

---

## ❓ 为什么需要 `buildToDist`？

在 Vite 环境中，插件执行后仅会生成翻译配置文件。如果直接构建，虽然翻译配置文件已生成，但默认不会立即将之打包到主包中。⚠️ 因此提供了 `buildToDist` 选项，可在构建时主动将翻译文件打包到主包中。但需要注意，这可能导致您的项目中生成两份翻译配置文件。

---

## 🔄 如何更新翻译？

完成插件运行后，`\lang` 目录会生成两个文件：`index.js` 和 `index.json`。

-   **index.js**：存储翻译相关的函数逻辑。
-   **index.json**：存储翻译文本内容。

如果需要更新翻译内容，可以直接修改 `index.json` 文件内容。

---

## ⚠️ 使用注意事项

1. **代理要求**

    - 国内使用，强烈推荐使用**有道翻译**
    - 使用谷歌翻译的功能时，国内用户必须配置代理环境。
    - 默认代理端口为 **7890**。
    - 可通过 `proxyOption` 参数自定义代理端口。

2. **翻译频率**

    - 谷歌翻译是免费服务，但频繁请求可能触发使用限制 🔒。
    - 建议设置一个适当的时间间隔再发起新的翻译请求 💡。

3. **翻译更新机制**

    - `globalPath` 目录中的 `index.json` 是核心翻译文件。
    - 修改并保存后，您的翻译内容将立即更新。

---

## 📦 用户群

微信群

![wx](./wx.jpg)

---

## 📦 示例项目

☁️ 示例项目参考仓库：[example](./example)（点击查看）

## 📜 许可证

本插件基于 **MIT License** 开源协议 🪪。自由使用，欢迎贡献！

希望它能让您的国际化开发变得更加简单和高效！🌍✨

---

## ✨ 更新

自 1.0.5 版本起，用户只需在入口文件中引入插件生成文件夹下的 `index.js` 文件，无需再手动构建语言切换函数文件。👏

---

## 🎆 作者

原始作者：wenps、xu-code、Caleb-Xu、Winfans

## 更新日志

### v1.1.5 (推荐版本)

-   支持插值翻译

### v1.1.4 (推荐版本)

-   修复排除函数处理模版字符串异常问题
-   谷歌新增interval配置
-   新增翻译器支持自定义接口入参

### v1.1.3 (推荐版本)

-   新增无刷更新语言能力及最佳实践

### v1.1.2

-   修复ai翻译异常

### v1.1.1

-   新增翻译禁用功能

### v1.1.0

-   新增ai翻译器
-   新增翻译插件vue2拓展插件机制

### v1.0.26 (推荐版本)

-   新增自定义拓展名数组

### v1.0.25 (推荐版本)

-   新增通用翻译key

### v1.0.24 (推荐版本)

-   修复半自动模式异常问题

### v1.0.23 (推荐版本)

-   修复打包写入重大bug

### v1.0.22

-   新增扫描翻译器

### v1.0.21

-   新增深度扫描

### v1.0.20

-   修复过滤函数异常问题，以及补充是否覆盖生成配置文件项

### v1.0.19

-   配置文件兼容旧版本

### v1.0.18

-   修复了低版本 Node 中可选链操作导致运行时异常的问题。

### v1.0.17

-   支持基本的服务器端渲染（实验性）

### v1.0.16

-   修复已知问题（vue3注释节点）

### v1.0.15

-   新增百度翻译

### v1.0.14

-   修复新增语言类型，不主动切割问题
-   自动翻译能力新增日语，韩语，俄语

### v1.0.13

-   已知问题修复

### v1.0.12

-   优化类型

### v1.0.11

-   修复已知缺陷
-   新增翻译状态选项，支持半自动状态

```js
// 用户可以用 translateKey 包裹需要翻译的文案
// 如：$t('hello')，插件会扫描这些文案并实现自动翻译

$t('hello')
```
