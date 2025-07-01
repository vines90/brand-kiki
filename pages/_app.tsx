import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Analytics } from '@vercel/analytics/next'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 初始化主题设置 - 使用更快的方式
    const initTheme = () => {
      // 默认使用蒂芙尼蓝主题，除非用户明确设置为紫色
      const purpleTheme = localStorage.getItem('purpleTheme') === 'true'
      const darkMode = localStorage.getItem('darkMode') === 'true'
      
      // 如果是首次访问，默认使用蒂芙尼蓝主题（不添加类）
      if (localStorage.getItem('purpleTheme') === null) {
        localStorage.setItem('purpleTheme', 'false')
      }
      
      // 立即应用主题类，不等待状态更新
      if (purpleTheme) {
        document.documentElement.classList.add('theme-purple')
      } else {
        document.documentElement.classList.remove('theme-purple')
      }
      
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    if (typeof window !== 'undefined') {
      // 立即执行，不等待下一个tick
      initTheme()
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
      <Analytics />
    </>
  )
}

export default appWithTranslation(MyApp) 