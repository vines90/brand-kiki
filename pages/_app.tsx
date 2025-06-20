import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
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