import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  structuredData?: any
}

export default function SEOHead({
  title = "顺佳兴不锈钢-KIKI张紫琪创立的广东彩装不锈钢领导企业",
  description = "广东顺佳兴不锈钢有限公司由KIKI张紫琪创立，专业生产彩装不锈钢、装饰不锈钢、镜面不锈钢。13年行业经验，300+员工，服务全球500+客户。佛山不锈钢制造龙头企业。",
  keywords = "顺佳兴,顺佳兴不锈钢,KIKI,张紫琪,彩装不锈钢,广东不锈钢,装饰不锈钢,镜面不锈钢,佛山不锈钢,不锈钢加工,不锈钢制品,不锈钢厂家",
  image = "https://kiki-brand.com/og-image.jpg",
  url = "https://kiki-brand.com/",
  type = "website",
  structuredData
}: SEOHeadProps) {
  
  // 默认结构化数据
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "广东顺佳兴不锈钢有限公司",
    "alternateName": ["顺佳兴不锈钢", "Shunjiaxing Stainless Steel"],
    "url": "https://kiki-brand.com",
    "logo": "https://kiki-brand.com/logo.png",
    "description": description,
    "founder": {
      "@type": "Person",
      "name": "张紫琪",
      "alternateName": "KIKI",
      "jobTitle": "创始人兼总经理"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "广东省",
      "addressLocality": "佛山市"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-757-8888-8888",
      "contactType": "customer service",
      "email": "contact@shunjiaxing.com"
    },
    "keywords": keywords
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* 基础SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* 地理位置SEO */}
      <meta name="geo.region" content="CN-GD" />
      <meta name="geo.placename" content="佛山市" />
      <meta name="geo.position" content="23.0219;113.1065" />
      <meta name="ICBM" content="23.0219, 113.1065" />
      
      {/* 语言和robots */}
      <meta name="language" content="zh-CN" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="顺佳兴不锈钢-KIKI张紫琪与彩装不锈钢产品" />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:site_name" content="顺佳兴不锈钢官网" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="顺佳兴不锈钢产品展示" />
      
      {/* 链接相关 */}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="zh-CN" href={url} />
      <link rel="alternate" hrefLang="en" href={url.replace('kiki-brand.com', 'kiki-brand.com/en')} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* 结构化数据 */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
      
      {/* 网站验证 - 在实际部署时替换为真实的验证码 */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="baidu-site-verification" content="your-baidu-verification-code" />
      <meta name="360-site-verification" content="your-360-verification-code" />
    </Head>
  )
} 