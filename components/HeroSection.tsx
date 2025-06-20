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
  const y = useTransform(scrollY, [0, 500], [0, 250])
  
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent-100/20 rounded-full blur-lg" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/15 rounded-full blur-md float-animation" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-primary-300/30 rounded-full blur-lg float-animation" style={{ animationDelay: '1s' }}></div>
        
        {/* 几何形状 */}
        <div className="absolute top-32 right-32 w-12 h-12 border-2 border-white/20 rotate-45 float-animation" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-32 w-8 h-8 border border-white/30 rounded-full pulse-slow"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* 左侧内容区域 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left space-y-6 lg:space-y-8 lg:col-span-2"
          >
            {/* 品牌标识 */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-12 bg-gradient-to-b from-accent-100 to-accent-200 rounded-full"></div>
                <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
                  Personal Brand
                </span>
              </div>
              
              {/* 优化后的主标题 */}
              <h1 className="text-white font-black leading-[0.85] tracking-tight">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  KIKI
                </span>
                <span className={`block ${getTextSizeClasses()} mt-2 lg:mt-4 gradient-text-animated font-bold whitespace-nowrap`}>
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="text-white/60 ml-1"
                  >
                    |
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* 英文副标题 - 优化排版 */}
            <motion.div variants={itemVariants}>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium tracking-wide leading-relaxed">
                Stainless Steel Industry Pioneer & Female Leader
              </p>
            </motion.div>

            {/* 价值主张 - 改进层次结构 */}
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
                {t('hero.tagline')}
              </h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                {t('hero.description')}
              </p>
            </motion.div>

            {/* 数据展示 - 新增 */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-white mb-1">{t('hero.stats.experience')}</div>
                <div className="text-white/70 text-xs lg:text-sm font-medium">{t('hero.stats.experienceLabel')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-white mb-1">{t('hero.stats.employees')}</div>
                <div className="text-white/70 text-xs lg:text-sm font-medium">{t('hero.stats.employeesLabel')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-white mb-1">{t('hero.stats.revenue')}</div>
                <div className="text-white/70 text-xs lg:text-sm font-medium">{t('hero.stats.revenueLabel')}</div>
              </div>
            </motion.div>

            {/* 动态标签云 - 优化样式 */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tag.delay, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass px-4 py-2.5 rounded-full text-white/90 text-sm font-medium flex items-center gap-2 border border-white/30 hover:border-white/50 hover:bg-white/15 transition-all duration-300 shadow-lg"
                  >
                    {tag.icon}
                    {tag.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>


          </motion.div>

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
        </div>
      </div>

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