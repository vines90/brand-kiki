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

export default function Home() {
  const { t } = useTranslation('common')

  // 结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "广东顺佳兴不锈钢有限公司",
    "alternateName": ["顺佳兴不锈钢", "Shunjiaxing Stainless Steel"],
    "url": "https://kiki-brand.com",
    "logo": "https://kiki-brand.com/logo.png",
    "description": "广东顺佳兴不锈钢有限公司，专业从事彩装不锈钢、装饰不锈钢、镜面不锈钢生产制造，13年行业经验，300+员工团队，服务500+全球客户",
    "founder": {
      "@type": "Person",
      "name": "张紫琪",
      "alternateName": "KIKI",
      "jobTitle": "创始人兼总经理",
      "description": "不锈钢行业女性创新领导者，13年行业经验"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "广东省",
      "addressLocality": "佛山市",
      "streetAddress": "南海区"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-757-8888-8888",
      "contactType": "customer service",
      "email": "contact@shunjiaxing.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/shunjiaxing",
      "https://www.facebook.com/shunjiaxing"
    ],
    "keywords": "顺佳兴,不锈钢,彩装不锈钢,广东不锈钢,装饰不锈钢,镜面不锈钢,不锈钢加工,不锈钢制品,佛山不锈钢,不锈钢厂家",
    "industry": "不锈钢制造业",
    "numberOfEmployees": "300+",
    "foundingDate": "2011",
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "彩装不锈钢",
          "description": "高品质彩装不锈钢板材，多种颜色可选"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Product",
          "name": "装饰不锈钢",
          "description": "精美装饰不锈钢制品，适用于建筑装饰"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product", 
          "name": "镜面不锈钢",
          "description": "高光泽镜面不锈钢，表面光洁如镜"
        }
      }
    ]
  }

  return (
    <>
      <Head>
        {/* 基础SEO */}
        <title>顺佳兴不锈钢-KIKI张紫琪创立的广东彩装不锈钢领导企业</title>
        <meta name="description" content="广东顺佳兴不锈钢有限公司由KIKI张紫琪创立，专业生产彩装不锈钢、装饰不锈钢、镜面不锈钢。13年行业经验，300+员工，服务全球500+客户。佛山不锈钢制造龙头企业。" />
        <meta name="keywords" content="顺佳兴,顺佳兴不锈钢,KIKI,张紫琪,彩装不锈钢,广东不锈钢,装饰不锈钢,镜面不锈钢,佛山不锈钢,不锈钢加工,不锈钢制品,不锈钢厂家,不锈钢公司,彩色不锈钢,不锈钢板材,不锈钢制造" />
        
        {/* 地理位置SEO */}
        <meta name="geo.region" content="CN-GD" />
        <meta name="geo.placename" content="佛山市" />
        <meta name="geo.position" content="23.0219;113.1065" />
        <meta name="ICBM" content="23.0219, 113.1065" />
        
        {/* 语言和地区 */}
        <meta name="language" content="zh-CN" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiki-brand.com/" />
        <meta property="og:title" content="顺佳兴不锈钢-KIKI张紫琪创立的广东彩装不锈钢领导企业" />
        <meta property="og:description" content="广东顺佳兴不锈钢有限公司由KIKI张紫琪创立，专业生产彩装不锈钢、装饰不锈钢、镜面不锈钢。13年行业经验，服务全球客户。" />
        <meta property="og:image" content="https://kiki-brand.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="顺佳兴不锈钢-KIKI张紫琪与彩装不锈钢产品" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:site_name" content="顺佳兴不锈钢官网" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kiki-brand.com/" />
        <meta name="twitter:title" content="顺佳兴不锈钢-KIKI张紫琪创立的广东彩装不锈钢领导企业" />
        <meta name="twitter:description" content="专业彩装不锈钢制造商，13年行业经验，服务全球客户" />
        <meta name="twitter:image" content="https://kiki-brand.com/twitter-image.jpg" />
        <meta name="twitter:image:alt" content="顺佳兴不锈钢产品展示" />
        
        {/* 移动优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="address=yes" />
        
        {/* 网站验证 */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="baidu-site-verification" content="your-baidu-verification-code" />
        <meta name="360-site-verification" content="your-360-verification-code" />
        
        {/* 链接相关 */}
        <link rel="canonical" href="https://kiki-brand.com/" />
        <link rel="alternate" hrefLang="zh-CN" href="https://kiki-brand.com/" />
        <link rel="alternate" hrefLang="en" href="https://kiki-brand.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://kiki-brand.com/" />
        
        {/* 结构化数据 */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* 额外的行业相关结构化数据 */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "顺佳兴不锈钢官网",
              "url": "https://kiki-brand.com",
              "description": "广东顺佳兴不锈钢有限公司官方网站，专业彩装不锈钢制造商",
              "publisher": {
                "@type": "Organization",
                "name": "广东顺佳兴不锈钢有限公司"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kiki-brand.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      <Layout>
        <HeroSection />
        <AboutSection />
        <InsightsSection />
        <BusinessSection />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
    },
  }
} 