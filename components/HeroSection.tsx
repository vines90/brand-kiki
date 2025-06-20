import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ChevronDown, Sparkles, Star, Award, Users } from 'lucide-react'

export default function HeroSection() {
  const { t } = useTranslation('common')
  const [displayedText, setDisplayedText] = useState('')
  const fullText = t('hero.greeting')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 250])
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 150)

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
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* 全屏渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-400">
        {/* 动态渐变覆盖 */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/90 via-transparent to-primary-200/90"></div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容区域 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left space-y-8"
          >
            {/* 超大标题 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="hero-title text-white leading-none">
                KIKI
                <br />
                <span className="gradient-text-animated">
                  {displayedText}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="text-white/80"
                >
                  |
                </motion.span>
              </h1>
              
              {/* 英文副标题 */}
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
                Stainless Steel Industry Pioneer & Female Leader
              </p>
            </motion.div>

            {/* 价值主张 */}
            <motion.div variants={itemVariants}>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                {t('hero.tagline')}
              </p>
            </motion.div>

            {/* 动态标签云 */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tag.delay, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass px-4 py-2 rounded-full text-white/90 text-sm font-medium flex items-center gap-2 border border-white/20 hover:border-white/40 transition-all duration-300"
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
            className="relative flex justify-center lg:justify-end"
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