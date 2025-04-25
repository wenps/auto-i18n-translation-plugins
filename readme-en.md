<div align="center">
  <img src="./logo.svg" alt="auto-i18n-translation-plugins" width="300">
</div>

# 🚀 auto-i18n-translation-plugins

## 🍉 Plugin Introduction

A 🎉 **frontend auto-translation plugin** that supports all JavaScript-based frontend frameworks (like Vue2/3 and React). No source code modification needed! Easily achieve multi-language support with one click 🌐🚀. Comes with Youdao and Google translation services by default, while supporting custom translators. Compatible with major build tools like Webpack, Vite, and Rollup.

### 🎯 Key Features:

-   🛠️ **No source code changes** - Quick multi-language translation with one click
-   🌐 **Supports multiple translation services** (Google, Youdao, and custom translators)
-   🔍 **Smart detection** of text needing translation
-   🔧 **Flexible configuration options** for different project needs

Note: Youdao translation requires users to apply for their translation service - the demo keys have been exhausted.

---

## 📚 Plugin Debugging

```bash
pnpm install
pnpm run build
pnpm run preview // Don't select React, contains too much English text
```

---

## 📖 Supported Features

-   **Frameworks**: All JavaScript-based frontend frameworks (Vue2/3, React, etc.)
-   **Build Tools**: Fully compatible with Webpack, Vite, and Rollup 🚀
-   **Translation Services**: Default support for **Youdao** and **Google** translation, plus custom translators

---

## 🌟 Quick Start

### 1️⃣ Install Plugin

#### **Vite Projects:**

```bash
npm install vite-auto-i18n-plugin --save-dev
# or
yarn add vite-auto-i18n-plugin --dev
```

#### **Webpack Projects:**

```bash
npm install webpack-auto-i18n-plugin --save-dev
# or
yarn add webpack-auto-i18n-plugin --dev
```

---

### 2️⃣ Basic Configuration

#### **Vite Configuration Example** (vite.config.js):

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
        vitePluginAutoI18n({
            translator: new YoudaoTranslator({
                appId: '4cdb9baea8066fef',
                appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
            })
        })
    ]
})
```

#### **Webpack Configuration Example** (webpack.config.js):

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

### 3️⃣ Translator Configuration Examples

The plugin uses Google Translate by default (requires proxy). When Google isn't accessible, we recommend using **Youdao Translate** ✨ for better results. The plugin comes with Google, Youdao and Baidu translation built-in. For custom translators, see examples below.

Examples below use Vite - Webpack configuration is similar.

#### **Using Google Translate (default)**

```javascript
import { GoogleTranslator } from 'vite-auto-i18n-plugin'

...
translator: new GoogleTranslator({
    proxyOption: {
        host: '127.0.0.1',
        port: 8899,
        headers: {
            'User-Agent': 'Node'
        }
    }
})
...
```

#### **Using Youdao Translate**

Requires API application: [API Docs](https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html)

```javascript
import { YoudaoTranslator } from 'vite-auto-i18n-plugin'

...
translator: new YoudaoTranslator({
    appId: 'your-app-id',
    appKey: 'your-app-key'
})
...
```

#### **Baidu Translator**

Requires API application: [API Docs](https://api.fanyi.baidu.com/product/113)

```javascript
import { BaiduTranslator } from 'vite-auto-i18n-plugin'

...
translator: new BaiduTranslator({
    appId: 'your-app-id', // Baidu AppId
    appKey: 'your-app-key' // Baidu AppKey
})
...
```

#### **Volcengine AI Translator**

Supports calling `doubao` or `deepseek` for translation. AI model translation provides more accurate results than traditional API translation, but takes longer to process.
Volcengine AI model introduction: https://www.volcengine.com/docs/82379/1099455.
Requires enabling the AI service and applying for API, [API documentation](https://www.volcengine.com/docs/82379/1298454).

```javascript
import { VolcengineTranslator } from 'vite-auto-i18n-plugin'

...
translator: new VolcengineTranslator({
    apiKey: 'your-api-key',
    model: 'model-to-call, e.g. `doubao-1-5-pro-32k-250115`, please ensure the model has been enabled in console before using'
})
...
```

````

#### **Empty Translator**

If you only need to scan target language without translation, this translator will generate JSON files.

```javascript
import { EmptyTranslator } from 'vite-auto-i18n-plugin'

...
translator: new EmptyTranslator()
...
````

#### **Custom Translator**

If you have your own translation API, you can create a custom translator:

Simplest way is using the base `Translator` class:

```javascript
import { Translator } from 'vite-auto-i18n-plugin'
import axios from 'axios'

...
translator: new Translator({
    name: 'My Translator',
    // Translation method
    fetchMethod: (str, fromKey, toKey, _separator) => {
        // Actual API calls may be more complex than this example
        const myApi = 'https://www.my-i18n.cn/api/translate?from=${fromKey}&to=${toKey}&t={+new Date}'
        return axios.post(myApi, { str })
            .then(res => res.data)
    },
    // API call interval (some APIs may block frequent requests)
    interval: 1000
})
...
```

For advanced functionality, you can extend the class (though no current use cases):

```javascript
import { Translator } from 'vite-auto-i18n-plugin'

class CustomTranslator extends Translator {
    constructor () {
        super({
            name: 'My Translator',
            ...
        })
    }
}

...
translator: new CustomTranslator()
...
```

---

### 4️⃣ Project Entry Configuration 🏗️

Add this at the top of your **project entry file** (e.g., `main.js`):

```javascript
import '../lang/index.js' // 📍 Must be imported first in entry file. This file is auto-generated when running the plugin, default location is lang folder at same level as build config directory
```

---

## ⚙️ Configuration Parameters

| Parameter        | Type       | Required | Default                  | Description                                              |
| ---------------- | ---------- | -------- | ------------------------ | -------------------------------------------------------- |
| translateType    | string     | ❌       | `full-auto`              | Translation mode: `full-auto` or `semi-auto`             |
| translateKey     | string     | ✅       | `$t`                     | Translation function name (e.g., `$t`)                   |
| excludedCall     | string[]   | ❌       | `['$i8n', 'require', …]` | Function calls to exclude from translation               |
| excludedPattern  | RegExp[]   | ❌       | `[/\.\w+$/]`             | Patterns to exclude (e.g., file extensions)              |
| excludedPath     | string[]   | ❌       | `['node_modules']`       | Directories to exclude (e.g., `node_modules`)            |
| includePath      | RegExp[]   | ❌       | `[/src\//]`              | Whitelist of directories to include (default: `src`)     |
| globalPath       | string     | ❌       | `'./lang'`               | Path for translation config files                        |
| distPath         | string     | ✅       | `''`                     | Output path for built files                              |
| distKey          | string     | ✅       | `'index'`                | Main translation file name                               |
| namespace        | string     | ✅       | `lang`                   | Project namespace for distinguishing translation configs |
| originLang       | string     | ✅       | `'zh-cn'`                | Source language                                          |
| targetLangList   | string[]   | ✅       | `['en']`                 | Target languages                                         |
| buildToDist      | boolean    | ❌       | `false`                  | Whether to bundle translation files into main build      |
| translator       | Translator | ❌       | `GoogleTranslator`       | Translator instance                                      |
| translatorOption | object     | ❌       | `{}`                     | Translator options (lower priority than `translator`)    |
| rewriteConfig    | boolean    | ❌       | `true`                   | Whether to rewrite config file on each plugin run        |
| deepScan         | boolean    | ❌       | `false`                  | Experimental: Whether to perform deep string scanning    |
| commonTranslateKey | string | ❌   | `''`                     | General translation key                             |
| insertFileExtensions | string[] | ❌   | `[]`                     | List of file extensions to insert translation code into |

---

## 🔍 What does `deepScan` do?

`deepScan` is an experimental property controlling whether the plugin performs deep string scanning.

By default, the plugin scans strings/template strings - if any target language text is found, the entire string is included:

```js
;`<div>
    <p>你好</p>
</div>`
```

Since there's Chinese text, the whole string would be included, potentially causing inaccurate translation. With `deepScan` enabled, the plugin splits and reconstructs template strings, only translating matching text:

```js
;`<div>
    <p>${$t('你好')}</p>
</div>`
```

Now only '你好' gets translated, not the entire string.

---

## 👋 `translateType` Functionality

Added in v1.0.11, with two options:

`full-auto`: Fully automatic translation (default supports Chinese, Japanese, Korean, Russian)

`semi-auto`: Semi-automatic translation (supports all source languages)

In `semi-auto` mode, users must wrap target text with `translateKey` (e.g., `$t('hello')`), which the plugin will then translate.

Example:

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

## ❓ Why `buildToDist`?

In Vite, the plugin only generates translation config files. Without `buildToDist`, these files won't be bundled. ⚠️ Enabling this bundles them but may create duplicate config files.

---

## 🔄 How to Update Translations?

After running the plugin, two files are generated in `\lang`:

-   **index.js**: Translation function logic
-   **index.json**: Translation content

To update translations, simply modify `index.json`.

---

## ⚠️ Usage Notes

1. **Proxy Requirements**

    - In China, **Youdao Translate** is strongly recommended
    - Google Translate requires proxy configuration
    - Default proxy port: **7890** (customizable via `proxyOption`)

2. **Translation Frequency**

    - Google Translate is free but may limit frequent requests 🔒
    - Set reasonable intervals between requests 💡

3. **Translation Updates**
    - `index.json` in `globalPath` is the core translation file
    - Changes take effect immediately after saving

---

## 📦 User Group

WeChat Group

![wx](./wx.jpg)

---

## 📦 Example Project

Example project: [example](./example) (click to view)

## 📜 License

MIT License 🪪 - Free to use and contribute!

May this plugin make your i18n development easier and more efficient! 🌍✨

---

## ✨ Update

Since v1.0.5, simply import the generated `index.js` in your entry file - no need to manually create language switching functions. 👏

---

## 🎆 Authors

Original authors: wenps, xu-code, Caleb-Xu, Winfans

## Changelog


### v1.0.26 (Recommended Version)

- Added custom extension arrays

### v1.0.25 (Recommended Version)

- Added a universal translation key


### v1.0.24 (Recommended Version)

- Fixed the exception issue in semi-automatic mode

### v1.0.23 (Recommended Version)

-   Fixed a major bug in packaging and writing.

### v1.0.22

-   Added scan translator

### v1.0.21

-   Added deep scanning

### v1.0.20

-   Fixed filter function issues and added config overwrite option

### v1.0.19

-   Backward compatibility for config files

### v1.0.18

-   Fixed optional chaining issues in older Node versions

### v1.0.17

-   Basic SSR support (experimental)

### v1.0.16

-   Fixed Vue3 comment node issues

### v1.0.15

-   Added Baidu Translate

### v1.0.14

-   Fixed new language type segmentation
-   Added Japanese, Korean, Russian support

### v1.0.13

-   Bug fixes

### v1.0.12

-   Type optimizations

### v1.0.11

-   Bug fixes
-   Added `translateType` option for semi-auto mode

```js
// Users can wrap text with translateKey
// e.g., $t('hello') - plugin will scan and translate these
$t('hello')
```
