/*
 * @Date: 2025-01-23 13:43:39
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-09 13:15:13
 * @FilePath: /i18n_translation_vite/example/webpack-react/webpack.config.js
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackPluginsAutoI18n = require('webpack-auto-i18n-plugin')

const { YoudaoTranslator } = require('webpack-auto-i18n-plugin')

const i18nPlugin = new webpackPluginsAutoI18n.default({
    globalPath: './lang',
    namespace: 'lang',
    distPath: './dist/assets',
    distKey: 'index',
    targetLangList: ['en', 'ko', 'ja', 'ru'],
    originLang: 'zh-cn',
    translator: new YoudaoTranslator({
        appId: '4cdb9baea8066fef',
        appKey: 'ONI6AerZnGRyDqr3w7UM730mPuF8mB3j'
    })
})

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        i18nPlugin
    ],
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true
    }
}
