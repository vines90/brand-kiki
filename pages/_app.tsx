import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 初始化主题设置
    if (typeof window !== 'undefined') {
      // 默认使用蒂芙尼蓝主题，除非用户明确设置为紫色
      const purpleTheme = localStorage.getItem('purpleTheme') === 'true'
      const darkMode = localStorage.getItem('darkMode') === 'true'
      
      // 如果是首次访问，默认使用蒂芙尼蓝主题（不添加类）
      if (localStorage.getItem('purpleTheme') === null) {
        localStorage.setItem('purpleTheme', 'false')
      }
      
      // 应用主题类
      document.documentElement.classList.toggle('theme-purple', purpleTheme)
      document.documentElement.classList.toggle('dark', darkMode)
    }

    // Only load stagewise in development mode and on the client side
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      import('@stagewise/toolbar').then(({ initToolbar }) => {
        initToolbar({
          plugins: [],
        });
      }).catch((error) => {
        console.warn('Failed to load stagewise toolbar:', error);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp) 