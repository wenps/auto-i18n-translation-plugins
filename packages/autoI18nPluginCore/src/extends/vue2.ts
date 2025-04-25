import types from '@babel/types'
import { OptionInfo } from 'src'
import babel from '@babel/core'
export class Vue2Extends {
    public handleInitFile: any
    public handleCodeCall: any
    public handleCodeString: any
    constructor() {
        this.handleInitFile = async (source: string, path: string) => {
            let code = source

            // 检查是否已经引入了 Vue
            let importVue = false
            let hasVue = false

            const result = await babel.transformAsync(code, {
                configFile: false,
                plugins: [
                    {
                        visitor: {
                            ImportDeclaration(path: any) {
                                const { node } = path
                                if (node.source.value === 'vue') {
                                    importVue = true
                                    const specifiers = node.specifiers
                                    specifiers.forEach((specifier: any) => {
                                        if (types.isImportDefaultSpecifier(specifier)) {
                                            hasVue = true
                                        }
                                    })
                                    if (!hasVue) {
                                        hasVue = true
                                        specifiers.unshift(
                                            types.importDefaultSpecifier(types.identifier('Vue'))
                                        )
                                    }
                                }
                            }
                        }
                    }
                ]
            })
            if (importVue && result) code = result.code as string
            if (!importVue)
                code = `import Vue from 'vue'
                                    ${code}`

            return {
                path,
                source: code
            }
        }
        this.handleCodeCall = (
            config: {
                option: OptionInfo
                hash: string
                value: string
                uncodeValue: string
                namespace: string
            },
            _initFileResult: ReturnType<this['handleInitFile']>
        ) => {
            const { option, hash, value, uncodeValue, namespace } = config
            const valueExp = types.stringLiteral(value)
            valueExp.extra = {
                raw: `'${uncodeValue}'`, // 防止转码为unicode
                rawValue: value
            }
            return types.callExpression(
                types.memberExpression(
                    types.memberExpression(types.identifier('Vue'), types.identifier('prototype')),
                    types.identifier(option.translateKey as string)
                ),
                [types.stringLiteral(hash), valueExp, types.stringLiteral(namespace)]
            )
        }
        this.handleCodeString = (
            config: {
                option: OptionInfo
                hash: string
                value: string
                uncodeValue: string
                namespace: string
            },
            _initFileResult: ReturnType<this['handleInitFile']>
        ): string => {
            const { option, hash, uncodeValue, namespace } = config
            return `Vue.prototype.${option.translateKey}('${hash}','${uncodeValue}','${namespace}')`
        }
    }
}
