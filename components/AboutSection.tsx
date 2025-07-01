import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, useInView } from 'framer-motion'
import { MapPin, Lightbulb, Heart, TrendingUp, Users, Award } from 'lucide-react'

export default function AboutSection() {
  const { t } = useTranslation('common')
  const [counts, setCounts] = useState({ years: 0, employees: 0, revenue: 0, clients: 0 })
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true })

  // 数字滚动动画
  useEffect(() => {
    if (isInView) {
      const targets = { years: 13, employees: 300, revenue: 2, clients: 500 }
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        setCounts({
          years: Math.floor(targets.years * easeOut),
          employees: Math.floor(targets.employees * easeOut),
          revenue: Math.floor(targets.revenue * easeOut * 10) / 10,
          clients: Math.floor(targets.clients * easeOut)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounts(targets)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" className="hidden md:block py-20 bg-bg-primary dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="section-title text-text-primary dark:text-white">
              {t('about.title')}
              <span className="gradient-text"> KIKI</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('about.subtitle')}
            </p>
            <p className="text-lg text-text-secondary dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* 重新布局：左侧故事，右侧时间线 */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* 左侧 - 个人创业故事 */}
            <div>
              <div className="bento-card-gradient h-full p-6 md:p-8 lg:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 lg:mb-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
                        {t('about.storyTitle')}
                      </h3>
                      <p className="text-white/80 text-base sm:text-lg font-medium">
                        {t('about.storySubtitle')}
                      </p>
                    </div>
                  </div>
                  
                  {/* 故事内容 - 新的个人描述 */}
                  <div className="space-y-4 lg:space-y-6">
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed font-medium">
                      {t('about.storyContent1')}
                    </p>
                    
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed font-medium">
                      {t('about.storyContent2')}
                    </p>
                    
                    <p className="text-white/95 text-base sm:text-lg leading-relaxed font-medium">
                      {t('about.storyContent3')}
                    </p>
                  </div>

                  {/* 标签优化 */}
                  <div className="mt-8 lg:mt-10 flex flex-wrap gap-3 lg:gap-4">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                      <span className="text-white font-semibold flex items-center gap-2 text-sm lg:text-base">
                        <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                        {t('about.tags.female')}
                      </span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                      <span className="text-white font-semibold flex items-center gap-2 text-sm lg:text-base">
                        <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
                        {t('about.tags.pioneer')}
                      </span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                      <span className="text-white font-semibold flex items-center gap-2 text-sm lg:text-base">
                        <Award className="w-3 h-3 lg:w-4 lg:h-4" />
                        {t('about.tags.leader')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧 - 创业时间线 */}
            <div>
              <div className="bento-card bg-white dark:bg-gray-800 h-full p-6 lg:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center">
                <div className="space-y-6 lg:space-y-8 w-full">
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.0.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.0.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.1.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.1.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.2.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.2.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.3.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.3.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.4.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.4.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.5.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.5.description')}</p>
                  </div>
                  
                  <div className="relative pl-6 lg:pl-8 border-l-2 border-primary-100/30">
                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary-100 rounded-full"></div>
                    <div className="text-sm lg:text-base font-bold text-primary-100 mb-2">{t('about.journey.items.6.year')}</div>
                    <p className="text-text-secondary dark:text-gray-300 text-sm lg:text-base leading-relaxed">{t('about.journey.items.6.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 下方三个小卡片横向排列 */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* 核心价值观卡片 */}
            <div className="bento-card bg-gradient-to-br from-primary-50 to-primary-100/10 p-4 lg:p-6 rounded-3xl sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 lg:w-8 lg:h-8 text-primary-100" />
                <h4 className="text-lg lg:text-xl font-bold text-text-primary dark:text-white">{t('about.values.title')}</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-100 rounded-full"></div>
                  <span className="text-text-secondary">{t('about.values.quality')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-100 rounded-full"></div>
                  <span className="text-text-secondary">{t('about.values.innovation')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-100 rounded-full"></div>
                  <span className="text-text-secondary">{t('about.values.integrity')}</span>
                </div>
              </div>
            </div>

            {/* 全球视野卡片 */}
            <div className="bento-card bg-gradient-to-br from-accent-200/20 to-accent-100/10 p-4 lg:p-6 rounded-3xl">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-accent-100" />
                <h4 className="text-lg lg:text-xl font-bold text-text-primary dark:text-white">{t('about.vision.title')}</h4>
              </div>
              <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                {t('about.vision.description')}
              </p>
            </div>

            {/* 成就数据卡片 */}
            <div ref={statsRef} className="bento-card bg-gradient-to-br from-primary-200/20 to-primary-100/10 p-4 lg:p-6 rounded-3xl">
              <h4 className="text-lg lg:text-xl font-bold text-text-primary dark:text-white mb-4">{t('about.achievements.title')}</h4>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-primary-100 counter-animation">{counts.years}</div>
                  <div className="text-xs text-text-secondary">{t('about.achievements.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-primary-100 counter-animation">{counts.employees}+</div>
                  <div className="text-xs text-text-secondary">{t('about.achievements.employees')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-primary-100 counter-animation">{counts.revenue}M</div>
                  <div className="text-xs text-text-secondary">{t('about.achievements.revenue')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-primary-100 counter-animation">{counts.clients}+</div>
                  <div className="text-xs text-text-secondary">{t('about.achievements.clients')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 