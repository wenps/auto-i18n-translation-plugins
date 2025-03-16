/*
 * @Date: 2025-01-20 18:08:10
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 15:43:41
 * @FilePath: /i18n_translation_vite/example/react/src/components/HelloWorld.tsx
 */
import React from 'react'

interface HelloWorldProps {
    name?: string
}

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

export default HelloWorld
// element-tag-marker: /Users/xiaoshanwen/Desktop/me/element-tag-marker/example/react/src/components/HelloWorld.tsx
