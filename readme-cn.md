# 🚀 auto-i18n-translation-plugins

## 🍉 插件介绍

一个 🎉 **前端自动翻译插件**，支持所有编译成 JS 的前端框架（例如 Vue2/3 和 React）。无需修改源码，通过支持多种翻译服务，一键轻松实现多语言支持！🌐🚀 默认集成有道翻译和谷歌翻译，同时支持自定义翻译器，兼容 Webpack、Vite、Rollup 等主流构建工具。

### 🎯 核心优势：
- 🛠️ **无需改动源码**，一键快速翻译多语言；
- 🌐 **支持多种翻译服务**（包括 Google 和有道，及自定义翻译器）；
- 🔍 **智能检测**需要翻译的文本；
- 🔧 提供 **灵活的配置选项**，满足不同项目需求。

---

## 📖 支持范围

- **框架**: 支持所有编译为 JS 的前端框架（如 Vue2/3 和 React 等）。
- **构建工具**: 完美兼容 Webpack、Vite 和 Rollup 🚀。
- **翻译服务**: 默认支持 **有道翻译** 和 **谷歌翻译**，并支持自定义翻译器。

---

## 🌟 快速开始

### 1️⃣ 安装插件

#### **Vite 项目:**
```bash
npm install vite-auto-i18n-plugin --save-dev
# 或
yarn add vite-auto-i18n-plugin --dev
```

#### **Webpack 项目:**
```bash
npm install webpack-auto-i18n-plugin --save-dev
# 或
yarn add webpack-auto-i18n-plugin --dev
```

---

### 2️⃣ 基础配置

#### **Vite 配置示例** (vite.config.js)：
```javascript
import { defineConfig } from 'vite'
import vitePluginAutoI18n from 'vite-auto-i18n-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          hoistStatic: false,
          cacheHandlers: false,
        }
      }
    }),
    vitePluginAutoI18n({
      option: {
        globalPath: './lang',
        namespace: 'lang',
        distPath: './dist/assets',
        distKey: 'index',
        targetLangList: ['en', 'ko', 'ja'], // 支持多语言
        originLang: 'zh-cn', // 源语言
        translator: new YoudaoTranslator({
          appId: '4cdb9baea8066fef',
          appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
        })
      }
    })
  ]
})
```

#### **Webpack 配置示例** (webpack.config.js)：
```javascript
const webpackPluginsAutoI18n = require('webpack-auto-i18n-plugin')
const { YoudaoTranslator } = require('webpack-auto-i18n-plugin')

const i18nPlugin = new webpackPluginsAutoI18n.default({
  option: {
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/assets', 
    distKey: 'index',
    targetLangList: ['en', 'ko', 'ja', 'ru'], // 目标语言列表可随需定制
    originLang: 'zh-cn',
    translator: new YoudaoTranslator({
      appId: '4cdb9baea8066fef',
      appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
    })
  }
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

### 3️⃣ 翻译器配置示例

插件默认使用谷歌翻译。需要配置代理的情况下，可以优先选择 **有道翻译** ✨，翻译效果优秀。插件已经内置谷歌翻译和有道翻译功能。如果需要自定义翻译器，可参考继承 Translator 类的示例。

#### **使用谷歌翻译（默认）**
```javascript
translator: new GoogleTranslator({
  proxyOption: {
    host: '127.0.0.1',
    port: 8899,
    headers: {
      'User-Agent': 'Node'
    }
  }
})
```

#### **使用有道翻译**
```javascript
translator: new YoudaoTranslator({
  appId: '4cdb9baea8066fef', // 有道翻译 AppId
  appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j' // 有道翻译 AppKey
})
```

---

### 4️⃣ 项目入口配置 🏗️

请在 **项目入口文件**（如 `main.js`）的顶部引入语言配置文件：
```javascript
import './src/lang.js' // 📍 必须在入口文件中第一行引入
```

---

### 5️⃣ 语言配置文件示例 📂

创建 `src/lang.js`：
```javascript
// globalPath 配置 将生成以下两个文件
import '../../lang/index' 
import langJSON from '../../lang/index.json'

const langMap = {
  en: window?.lang?.en || _getJSONKey('en', langJSON),
  zhcn: window?.lang?.zhcn || _getJSONKey('zhcn', langJSON),
  ko: window?.lang?.ko || _getJSONKey('ko', langJSON),
  ja: window?.lang?.ja || _getJSONKey('ja', langJSON)
}
const lang = window.localStorage.getItem('lang') || 'zhcn'
window.$t.locale(langMap[lang], 'lang')
```

---

## ⚙️ 配置参数说明

| 参数             | 类型       | 必选 | 默认值                       | 描述                                                                 |
|------------------|------------|------|------------------------------|----------------------------------------------------------------------|
| translateKey     | string     | ✅    | `$t`                         | 翻译调用函数名称，例如 `$t` 表示翻译调用时的函数名                   |
| excludedCall     | string[]   | ❌    | `['$i8n', 'require', …]`     | 标记不会被翻译的函数调用列表                                         |
| excludedPattern  | RegExp[]   | ❌    | `[/\.\w+$/]`                 | 用于标记排除不翻译的字符串模式，例如文件路径中的文件后缀             |
| excludedPath     | string[]   | ❌    | `['node_modules']`           | 指定需要排除翻译的文件夹路径，例如默认会跳过 `node_modules`          |
| includePath      | RegExp[]   | ❌    | `[/src\//]`                  | 指定只翻译某些目录路径（白名单），默认为 `src`                      |
| globalPath       | string     | ❌    | `'./lang'`                   | 翻译文件配置生成路径                                               |
| distPath         | string     | ✅    | `''`                         | 打包后生成的文件位置路径                                             |
| distKey          | string     | ✅    | `'index'`                    | 打包后生成的翻译主文件名称                                           |
| namespace        | string     | ✅    | `''`                         | 项目命名空间，用于区分不同项目的翻译配置                            |
| originLang       | string     | ✅    | `'zh-cn'`                    | 源语言，翻译以此语言为基础                                           |
| targetLangList   | string[]   | ✅    | `['en']`                     | 目标语言列表，支持配置多个语言                                       |
| buildToDist      | boolean    | ❌    | `false`                      | 是否在构建结束后将最新的翻译文件打包到主包中，默认不打包            |
| translator       | Translator | ❌    | `GoogleTranslator`           | 翻译器实例                                                          |
| translatorOption | object     | ❌    | `{}`                         | 翻译器的配置项，优先级低于 `translator`                             |

---

## ❓ 为什么需要 `buildToDist`？

在 Vite 环境中，插件执行后仅会生成翻译配置文件。如果直接构建，虽然翻译配置文件已生成，但默认不会立即将之打包到主包中。⚠️ 因此提供了 `buildToDist` 选项，可在构建时主动将翻译文件打包到主包中。但需要注意，这可能导致您的项目中生成两份翻译配置文件。

---

## 🔄 如何更新翻译？

完成插件运行后，`\lang` 目录会生成两个文件：`index.js` 和 `index.json`。
- **index.js**：存储翻译相关的函数逻辑。
- **index.json**：存储翻译文本内容。

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

## 📦 示例项目

☁️ 示例项目参考仓库：[example](./example)（点击查看）

## 📜 许可证

本插件基于 **MIT License** 开源协议 🪪。自由使用，欢迎贡献！

希望它能让您的国际化开发变得更加简单和高效！🌍✨