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
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
      {/* 全屏渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-400 to-primary-200">
        {/* 动态渐变覆盖 - 增强对角线蔓延 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/98 via-primary-400/90 to-primary-300/85"></div>
        {/* 额外的对角线渐变层 */}
        <div className="absolute inset-0 bg-gradient-to-tl from-primary-400/80 via-transparent to-primary-500/60"></div>
      </div>

      {/* 浮动的抽象几何元素 - 移动端简化 */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 border border-white/20 rounded-full float-animation hidden sm:block"></div>
        <div className="absolute bottom-16 right-16 sm:bottom-32 sm:right-32 w-48 h-48 sm:w-96 sm:h-96 border border-white/10 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 sm:w-4 sm:h-4 bg-white/30 rounded-full pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-white/40 rounded-full pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 sm:w-6 sm:h-6 bg-white/20 rounded-full pulse-slow" style={{animationDelay: '3s'}}></div>
      </motion.div>

      {/* 主要内容区域 */}
      <div className="relative max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-6rem)]"
        >
          {/* 左侧内容区 */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* 主标题组 */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="hero-main-title text-white font-black leading-none tracking-tight">
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Innovation</span>
                <span className="block gradient-text-animated text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2">KIKI</span>
              </h1>
              
              <p className="hero-tagline text-white/90 font-medium max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-0">
                {t('hero.tagline')}
              </p>
            </div>

            {/* 核心数据展示 - 移动端优化 */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 py-4 sm:py-6 md:py-8">
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">13+</div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 font-medium">{t('hero.years')}</div>
              </div>
              <div className="hidden sm:block w-px h-8 sm:h-12 md:h-16 bg-white/30"></div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">300+</div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 font-medium">{t('hero.employees')}</div>
              </div>
              <div className="hidden sm:block w-px h-8 sm:h-12 md:h-16 bg-white/30"></div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 font-medium">{t('hero.clients')}</div>
              </div>
            </div>

            {/* CTA按钮组 - 移动端优化 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center pt-2 sm:pt-4 md:pt-8 px-2 sm:px-0">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#about')}
                className="btn-primary w-full sm:w-auto min-w-[180px] sm:min-w-[200px] text-center text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-8"
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
                className="btn-ghost w-full sm:w-auto min-w-[180px] sm:min-w-[200px] text-center text-sm sm:text-base font-semibold py-3 sm:py-4 px-6 sm:px-8"
              >
                <span className="flex items-center justify-center gap-2">
                  {t('hero.cta.business')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* 右侧个人照片区域 - 移动端优化 */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* 背景装饰圆环 - 移动端缩小 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent p-4 sm:p-6 md:p-8">
                <div className="w-full h-full rounded-full border-2 border-white/30 border-dashed animate-spin" style={{ animationDuration: '20s' }}></div>
              </div>
              
              {/* 主照片 - 移动端响应式尺寸 */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
              >
                <Image
                  src="/kiki-profile.jpg"
                  alt="KIKI 张紫琪"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-center"
                  priority
                />
                
                {/* 悬浮标签 - 移动端简化 */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 浮动标签 - 移动端调整位置 */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-2 top-8 sm:-left-4 sm:top-12 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-lg"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">13年经验</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -right-2 bottom-8 sm:-right-4 sm:bottom-12 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-2 shadow-lg"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">女性领导者</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* 滚动指示器 - 仅在大屏显示 */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
            onClick={() => scrollToSection('#about')}
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 