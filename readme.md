<div align="center">
  <img src="./logo.svg" alt="auto-i18n-translation-plugins" width="300">
</div>

# 🚀 auto-i18n-translation-plugins

[中文文档](./readme-cn.md)

## 🍉 Plugin Introduction

🎉 **Auto Translation Plugin** for frontend languages, supports all JavaScript-based frontend frameworks (e.g., Vue2/3, React). No need to modify source code! With seamless multi-language support 🌐🚀— it integrates Youdao Translator and Google Translator by default and allows custom translators. Compatible with Webpack, Vite, Rollup, and other major build tools.

### 🎯 Key Features:

-   🛠️ **No Source Code Changes**: Instant multi-language translation;
-   🌐 **Supports Multiple Translation Services** (including Google, Youdao, or custom translators);
-   🔍 **Smart Detection** of text requiring translation;
-   🔧 **Flexible Configuration Options** to suit various project requirements.

## tips：Youdao Translation requires users to apply for Youdao translation services by themselves, and the keys in the demo have been used up.

## 📚 Plugin Debugging

```bash
  pnpm install
  pnpm run build
  pnpm run preview // no choose react
```

## 📖 Supported Features

-   **Frameworks**: Supports all frontend frameworks compiled into JS (e.g., Vue2/3, React).
-   **Build Tools**: Fully compatible with Webpack, Vite, and Rollup 🚀.
-   **Translation Services**: Supports **Youdao Translator** and **Google Translator** by default, with custom translator support.

---

## 🌟 Quick Start

### 1️⃣ Plugin Installation

#### **For Vite Projects:**

```bash
npm install vite-auto-i18n-plugin --save-dev
# or
yarn add vite-auto-i18n-plugin --dev
```

#### **For Webpack Projects:**

```bash
npm install webpack-auto-i18n-plugin --save-dev
# or
yarn add webpack-auto-i18n-plugin --dev
```

---

### 2️⃣ Basic Configuration

#### **Example for Vite** (vite.config.js):

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

#### **Example for Webpack** (webpack.config.js):

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

### 3️⃣ Translator Configuration Example

The plugin uses Google Translator by default. If proxy configuration is required, prioritize **Youdao Translator**, which provides better translation results ✨. The plugin already comes integrated with Google and Youdao Translators. For custom translators, extend the `Translator` class as shown below.

#### **Using Google Translator (default)**:

```javascript
// Using Google Translator by default，If you use Google Translate in China, you need to configure a proxy.
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

#### **Using Youdao Translator**:

```javascript
translator: new YoudaoTranslator({
    appId: '4cdb9baea8066fef', // Youdao Translator AppId
    appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j' // Youdao Translator AppKey
})
```

#### **Using Baidu Translator**

```javascript
translator: new BaiduTranslator({
    appId: 'xxx', // 百度翻译 AppId
    appKey: 'xxx' // 百度翻译 AppKey
})
```

#### **Using Scan Translator** (If you only need to scan the target language without translation, this translator will generate a JSON file)

```javascript
translator: new ScanTranslator({})
```

---

### 4️⃣ Entry File Configuration 🏗️

Ensure to include the language configuration file at the top of your **project entry file** (e.g., `main.js`):

```javascript
import '../lang/index.js' // 📍 It must be introduced in the first line of the entry file. This file will be automatically generated when running the plug-in. By default, it is in the lang folder at the same level as the packaging configuration directory, and the index.js in it is the configuration file.
```

---

## ⚙️ Configuration Parameters

| Parameter        | Type       | Required | Default                  | Description                                                                        |
| ---------------- | ---------- | -------- | ------------------------ | ---------------------------------------------------------------------------------- |
| translateType    | string     | ❌       | `full-auto`              | Translation status, with two default options: `full-auto` and `semi-auto`.         |
| translateKey     | string     | ✅       | `$t`                     | The function name for calling translations, defaults to`$t`.                       |
| translateType    | string     | ❌       | `full-auto`              | Translation status, with two default options: `full-auto` and `semi-auto`.         |
| excludedCall     | string[]   | ❌       | `['$i8n', 'require', …]` | A list of function calls excluded from translation.                                |
| excludedPattern  | RegExp[]   | ❌       | `[/\.\w+$/]`             | Regular expressions to exclude certain patterns, e.g., file paths.                 |
| excludedPath     | string[]   | ❌       | `['node_modules']`       | Exclude files under specified directories (e.g.,`node_modules`).                   |
| includePath      | RegExp[]   | ❌       | `[/src\//]`              | Define a whitelist for directories/files to translate (`src` by default).          |
| globalPath       | string     | ❌       | `'./lang'`               | The path where translation configuration files are generated.                      |
| distPath         | string     | ✅       | `''`                     | The directory where the translation files are built.                               |
| distKey          | string     | ✅       | `'index'`                | The name of the main translation file after bundling.                              |
| namespace        | string     | ✅       | `'lang'`                 | The project namespace, helpful for avoiding global conflicts.                      |
| originLang       | string     | ✅       | `'zh-cn'`                | The source language for translation.                                               |
| targetLangList   | string[]   | ✅       | `['en']`                 | A list of target languages for translation.                                        |
| buildToDist      | boolean    | ❌       | `false`                  | Whether to bundle translation files into the main build bundle.                    |
| translator       | Translator | ❌       | `GoogleTranslator`       | The translation instance.                                                          |
| translatorOption | Object     | ❌       | `{}`                     | Additional configuration for the translator (lower precedence).                    |
| rewriteConfig    | boolean    | ❌       | `true`                   | Whether to rewrite the configuration file every time the plugin runs               |
| deepScan         | boolean    | ❌       | `false`                  | An experimental property that indicates whether to perform a deep scan of strings. |

---

## 🔍 What's the function of the `deepScan` option?

`deepScan` is an experimental property used to control whether the plugin performs a deep scan of strings.
By default, the plugin scans strings or template strings. If there is even one target language within them, the entire string will be included. For example:

```js
;`<div>
    <p>你好</p>
</div>`
```

Since there is a Chinese character in it, the entire string will be scanned, which may lead to inaccurate translation. Since we only want to translate the string '你好', we can set `deepScan` to `true`. The plugin will split the string, reassemble it into a template string, and only translate the matching strings. For example:

```js
;`<div>
    <p>${$t('你好')}</p>
</div>`
```

In this way, only the string '你好' will be translated, rather than the entire string.

---

## 👋 The Function of the `translateType` Option

`translateType` is a newly added property in v1.0.11, with two optional values: `full-auto` and `semi-auto`.

`full-auto` represents fully automatic translation. By default, it only supports four source languages: Chinese, Japanese, Korean, and Russian.

`semi-auto` represents semi-automatic translation, which supports all source languages.

When using `semi-auto`, users need to manually wrap the target characters with `translateKey`, such as `$t('hello')`. The plugin will then automatically complete the translation.

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

In Vite environments, the plugin only generates translation configuration files when executed. These files are not bundled immediately into the main package. ⚠️ To address this, `buildToDist` bundles the translation files into the main build upon generation. Note: This might result in duplicate translation configuration files.

---

## 🔄 How to Update Translations?

After executing the plugin, two files will be generated in the `\lang` directory:

-   **index.js**: Contains translation-related functions.
-   **index.json**: Stores the translation text content.

If you need to update translations, directly modify the `index.json` file and save the changes.

---

## ⚠️ Important Notes

1. **Proxy Requirements**

    - For domestic users, **Youdao Translator** is highly recommended.
    - Using Google Translator in regions like China requires proxy configuration.
    - The default proxy port is **7890**, but it can be customized via the `proxyOption`.

2. **Translation Rate Limits**

    - Google Translator is a free service but may impose restrictions for excessive requests 🔒.
    - Add sufficient time intervals between consecutive translation requests 💡.

3. **Translation Update Mechanism**

    - The `globalPath` directory contains `index.json`, which is the core translation file.
    - Modify and save the `index.json` to instantly update translation content.

---

## 📦 User Group

wx group

![wx](./wx.jpg)

---

## 📦 Example Project

☁️ See the example project here: [example](./example) (click to view).

---

## 📜 License

This plugin is available under the **MIT License** 🪪. Free to use, and contributions are welcome!

We hope this plugin makes internationalization development easier and more efficient for you! 🌍✨

---

## ✨ Update

Since version 1.0.5, users only need to import the `index.js` file in the folder generated by the plugin into the entry file, and there is no need to manually build the language switching function file. 👏

---

## 🎆 authors

Original authors: wenps、xu-code、Caleb-Xu、Winfans

## Changelog

### v1.0.22 (Stable Version)

-   Added a scanning translator.

### v1.0.21 (Stable Version)

-   Added deep scanning.

### v1.0.20 (Stable Version)

-   Fixed the issue of filtering function exceptions and added an option to overwrite the generated configuration file.

### v1.0.19 (Stable Version)

-   Made the configuration file compatible with older versions.

### v1.0.18 (Stable Version)

-   Fixed the issue of optional chaining causing runtime exceptions in lower versions of Node.

### v1.0.17 (Stable Version)

-   Support basic SSR (experimental)

### v1.0.16 (Stable Version)

-   Fixed known issues (Vue 3 comment nodes).

### v1.0.15 (Stable Version)

-   Added Baidu Translator.

### v1.0.14 (Stable Version)

-   Fixed the issue where new language types were not automatically segmented.
-   Added support for Japanese, Korean, and Russian in the automatic translation feature.

### v1.0.13 (Stable Version)

-   Fixed known issues.

### v1.0.12 (Unstable Version)

-   Optimized types.

### v1.0.11

-   Fixed known bugs.
-   Added a new translation status option to support semi-automatic mode.

```js
// Users can wrap the text to be translated with translateKey
// For example: $t('hello'), the plugin will scan these texts and implement automatic translation

$t('hello')
```
