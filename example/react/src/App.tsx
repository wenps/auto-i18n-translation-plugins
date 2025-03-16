/*
 * @Date: 2025-01-10 14:57:41
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 15:42:53
 * @FilePath: /i18n_translation_vite/example/react/src/App.tsx
 */
import './App.css'

import HelloWorld from './components/HelloWorld'

const changeLang = function (value: string) {
    window.localStorage.setItem('lang', value)
    window.location.reload()
}

function App() {
    return (
        <div className="app-container">
            <HelloWorld name="User" />
            <header data-dsa-ā>
                <h1>{$t('Welcome to My React App')}</h1>
                <nav>
                    <div className="operation">
                        <div onClick={() => changeLang('zhcn')} style={{ marginRight: '10px' }}>
                            {$t('Chinese')}
                        </div>
                        <div onClick={() => changeLang('en')} style={{ marginRight: '10px' }}>
                            {$t('English')}
                        </div>
                        <div onClick={() => changeLang('ko')} style={{ marginRight: '10px' }}>
                            {$t('Korean')}
                        </div>
                        <div onClick={() => changeLang('ja')} style={{ marginRight: '10px' }}>
                            {$t('Japanese')}
                        </div>
                    </div>
                    <ul
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            listStyle: 'none'
                        }}
                    >
                        <li>{$t('Home')}</li>
                        <li>{$t('About')}</li>
                        <li>{$t('Contact')}</li>
                    </ul>
                </nav>
            </header>
            <main>
                <div>
                    {$t(
                        'This is a simple introduction to our application. Here you can explore various features and functions provided by our app.'
                    )}
                </div>
                <p>
                    {$t(
                        'This is a more complex React component structure. It demonstrates how to organize and combine different components to build a rich user interface.'
                    )}
                </p>

                <ul>
                    <li>
                        {$t(
                            'Multiple components: We use multiple components to modularize the application, making it easier to maintain and extend.'
                        )}
                    </li>
                    <li>
                        {$t(
                            'Styled layout: We use CSS to style the components, creating a beautiful and user - friendly interface.'
                        )}
                    </li>
                    <li>
                        {$t(
                            'Navigation menu: The navigation menu provides easy access to different sections of the application.'
                        )}
                    </li>
                    <li>
                        {$t(
                            'Language switching: You can switch between different languages to meet your needs.'
                        )}
                    </li>
                </ul>
                <p>
                    {$t(
                        'Our application also supports more features, such as data storage, user interaction, etc. We are constantly working to improve and expand the functionality of the application.'
                    )}
                </p>
            </main>
            <footer>
                <p>&copy; 2025 {$t('My React App. All rights reserved.')}</p>
                <ul>
                    <li>{$t('Privacy Policy')}</li>
                    <li>{$t('Terms of Use')}</li>
                </ul>
            </footer>
        </div>
    )
}

export default App

// element-tag-marker: /Users/xiaoshanwen/Desktop/me/element-tag-marker/example/react/src/App.tsx
