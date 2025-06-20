import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // 标记客户端已经水合
    setIsHydrated(true)
    
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

  // 在水合完成前显示加载状态，避免样式闪烁
  if (!isHydrated) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-teal-700 font-medium">加载中...</p>
          </div>
        </div>
      </>
    )
  }

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