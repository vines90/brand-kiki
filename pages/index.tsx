import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/Layout'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import BusinessSection from '../components/BusinessSection'
import InsightsSection from '../components/InsightsSection'
import { Article } from '../lib/database'

interface HomeProps {
  articles: Article[]
  featuredArticle: Article | null
}

export default function Home({ articles, featuredArticle }: HomeProps) {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>KIKI - 不锈钢行业创新领导者</title>
        <meta name="description" content={t('hero.description')} />
        <meta name="keywords" content="KIKI, 张紫琪, 不锈钢, 顺佳兴, stainless steel, manufacturing" />
        <meta property="og:title" content="KIKI - 不锈钢行业创新领导者" />
        <meta property="og:description" content={t('hero.description')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://kiki-brand.com" />
      </Head>
      
      <Layout>
        <HeroSection />
        <AboutSection />
        <InsightsSection articles={articles} featuredArticle={featuredArticle} />
        <BusinessSection />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { getArticles, getFeaturedArticle } = await import('../lib/database')
  
  const articles = await getArticles()
  const featuredArticle = await getFeaturedArticle()
  
  return {
    props: {
      articles,
      featuredArticle,
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
    },
  }
} 