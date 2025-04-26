/*
 * @Date: 2025-02-06 16:17:56
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-09 13:15:24
 * @FilePath: /i18n_translation_vite/example/webpack-vue2/webpack.config.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const webpackPluginsAutoI18n = require('webpack-auto-i18n-plugin')

const { EmptyTranslator, Vue2Extends } = require('webpack-auto-i18n-plugin')

const i18nPlugin = new webpackPluginsAutoI18n.default({
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/assets',
    distKey: 'index',
    rewriteConfig: false,
    targetLangList: ['en', 'ko', 'ja', 'ru'],
    originLang: 'zh-cn',
    translateExtends: new Vue2Extends(),
    translator: new EmptyTranslator({})
})

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        i18nPlugin
    ],
    devServer: {
        port: 3000,
        hot: true
    }
}
