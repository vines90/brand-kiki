import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ChevronDown, Sparkles, Star, Award, Users } from 'lucide-react'

export default function HeroSection() {
  const { t } = useTranslation('common')
  const { i18n } = useTranslation()
  const [displayedText, setDisplayedText] = useState('')
  const fullText = t('hero.greeting')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  
  // 滚动到指定部分的函数
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  // 统一字体大小
  const getTextSizeClasses = () => {
    return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
  }
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 120)

    return () => clearInterval(interval)
  }, [fullText])

  const tags = [
    { icon: <Award className="w-4 h-4" />, text: t('hero.tags.experience'), delay: 0.2 },
    { icon: <Users className="w-4 h-4" />, text: t('hero.tags.female'), delay: 0.4 },
    { icon: <Sparkles className="w-4 h-4" />, text: t('hero.tags.leader'), delay: 0.6 },
    { icon: <Star className="w-4 h-4" />, text: t('hero.tags.quality'), delay: 0.8 }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* 全屏渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-200">
        {/* 动态渐变覆盖 - 增强对角线蔓延 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/98 via-primary-400/90 to-primary-300/85"></div>
        {/* 额外的对角线渐变层 */}
        <div className="absolute inset-0 bg-gradient-to-tl from-primary-400/80 via-transparent to-primary-500/60"></div>
      </div>

      {/* 浮动的抽象几何元素 */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full float-animation hidden md:block"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 border border-white/10 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/30 rounded-full pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-6 h-6 bg-white/20 rounded-full pulse-slow" style={{animationDelay: '3s'}}></div>
      </motion.div>

      {/* 主要内容区域 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 md:space-y-8 lg:space-y-12"
        >
          {/* 主标题组 */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <h1 className="hero-main-title text-white font-black leading-none tracking-tight">
              <span className="block">Innovation</span>
              <span className="block gradient-text-animated">KIKI</span>
            </h1>
            
            <p className="hero-tagline text-white/90 font-medium max-w-3xl mx-auto px-2">
              {t('hero.tagline')}
            </p>
          </motion.div>

          {/* 核心数据展示 */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-16 py-6 md:py-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">13+</div>
              <div className="text-sm md:text-base text-white/80 font-medium">{t('hero.years')}</div>
            </div>
            <div className="hidden sm:block w-px h-12 md:h-16 bg-white/30"></div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">300+</div>
              <div className="text-sm md:text-base text-white/80 font-medium">{t('hero.employees')}</div>
            </div>
            <div className="hidden sm:block w-px h-12 md:h-16 bg-white/30"></div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-sm md:text-base text-white/80 font-medium">{t('hero.clients')}</div>
            </div>
          </motion.div>

          {/* CTA按钮组 */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 md:pt-8 px-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#about')}
              className="btn-primary w-full sm:w-auto min-w-[200px] text-center"
            >
              <span className="flex items-center justify-center gap-2">
                {t('hero.cta.about')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#business')}
              className="btn-ghost w-full sm:w-auto min-w-[200px] text-center"
            >
              <span className="flex items-center justify-center gap-2">
                {t('hero.cta.business')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* 滚动指示器 */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* 右侧个人照片区域 */}
      <motion.div
        variants={itemVariants}
        className="relative flex justify-center lg:justify-end lg:col-span-1"
      >
        <div className="relative">
          {/* 背景装饰圆环 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent p-8">
            <div className="w-full h-full rounded-full border-2 border-white/30 border-dashed animate-spin" style={{ animationDuration: '20s' }}></div>
          </div>
          
          {/* 主照片 */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
          >
            <Image
              src="/kiki-profile.jpg"
              alt="KIKI 张紫琪"
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
              className="object-cover"
              priority
            />
            
            {/* 渐变覆盖 */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-100/20 to-transparent"></div>
          </motion.div>

          {/* 浮动装饰元素 */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-accent-100/80 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-2 -left-2 w-12 h-12 bg-primary-300/80 rounded-full flex items-center justify-center"
          >
            <Star className="w-6 h-6 text-primary-100" />
          </motion.div>
        </div>
      </motion.div>

      {/* 底部波浪过渡 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto">
          <path
            d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
            fill="white"
            className="dark:fill-gray-900"
          />
        </svg>
      </div>
    </section>
  )
} 