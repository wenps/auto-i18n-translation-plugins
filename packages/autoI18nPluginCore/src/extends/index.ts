import { OptionInfo } from 'src/option'
import { types } from '@babel/core'

// 拓展类型
export type BaseExtendsType = {
    /**
     * 处理入口文件
     * @param source - 源文件内容字符串
     * @returns 包含 source 字段的对象，source 为字符串类型
     */
    handleInitFile: (source: string, path: string) => { source: string; [key: string]: any }
    /**
     * 处理具体代码，返回函数的babel节点
     * @param option - 选项对象，包含多个参数
     * @param option.option - 选项信息，类型为 OptionInfo
     * @param option.hash - 哈希值
     * @param option.value - 默认传入的值，可能经过了 unicode 转码
     * @param option.uncodeValue - value 转码之后的值
     * @param option.namespace - 命名空间
     * @param initFileResult - 处理入口文件时返回的对象
     */
    handleCodeCall: (
        // 选项对象，包含多个参数
        option: {
            option: OptionInfo
            hash: any
            value: any
            uncodeValue: any
            namespace: any
        },
        // 处理入口文件的结果
        initFileResult: ReturnType<
            (source: string, path: string) => { source: string; [key: string]: any }
        >
    ) => types.CallExpression

    /**
     * 处理具体代码，返回字符串的babel节点
     * @param option - 选项对象，包含多个参数
     * @param option.option - 选项信息，类型为 OptionInfo
     * @param option.hash - 哈希值
     * @param option.value - 默认传入的值，可能经过了 unicode 转码
     * @param option.uncodeValue - value 转码之后的值
     * @param option.namespace - 命名空间
     * @param initFileResult - 处理入口文件时返回的对象
     */
    handleCodeString: (
        // 选项对象，包含多个参数
        option: {
            option: OptionInfo
            hash: any
            value: any
            uncodeValue: any
            namespace: any
        },
        // 处理入口文件的结果
        initFileResult: ReturnType<
            (source: string, path: string) => { source: string; [key: string]: any }
        >
    ) => string
}

export * from './vue2'
