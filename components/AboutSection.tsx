import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Lightbulb, Heart, TrendingUp, Users, Factory, Award } from 'lucide-react'

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

  const journeyItems = [
    {
      year: "2004",
      event: t('about.journey.items.0.event'),
      title: t('about.journey.items.0.title'),
      description: t('about.journey.items.0.description'),
      icon: "📱",
      color: "from-blue-400 to-blue-600"
    },
    {
      year: "2012",
      event: t('about.journey.items.1.event'),
      title: t('about.journey.items.1.title'),
      description: t('about.journey.items.1.description'),
      icon: "🏭",
      color: "from-green-400 to-green-600"
    },
    {
      year: "2013",
      event: t('about.journey.items.2.event'),
      title: t('about.journey.items.2.title'),
      description: t('about.journey.items.2.description'),
      icon: "🏗️",
      color: "from-yellow-400 to-orange-500"
    },
    {
      year: "2014",
      event: t('about.journey.items.3.event'),
      title: t('about.journey.items.3.title'),
      description: t('about.journey.items.3.description'),
      icon: "🚀",
      color: "from-purple-400 to-purple-600"
    },
    {
      year: "2017",
      event: t('about.journey.items.4.event'),
      title: t('about.journey.items.4.title'),
      description: t('about.journey.items.4.description'),
      icon: "📈",
      color: "from-red-400 to-red-600"
    },
    {
      year: "2022",
      event: t('about.journey.items.5.event'),
      title: t('about.journey.items.5.title'),
      description: t('about.journey.items.5.description'),
      icon: "⭐",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      year: "2025",
      event: t('about.journey.items.6.event'),
      title: t('about.journey.items.6.title'),
      description: t('about.journey.items.6.description'),
      icon: "👑",
      color: "from-pink-400 to-pink-600"
    }
  ]

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
    <section id="about" className="py-20 bg-bg-primary dark:bg-gray-900">
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

          {/* 不对称Bento Grid布局 */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左侧大卡片 - 个人创业故事 */}
            <div className="lg:col-span-8">
              <div className="bento-card-gradient h-full p-8 md:p-12 rounded-3xl shadow-2xl">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{t('about.storyTitle')}</h3>
                    <p className="text-white/80 text-lg">{t('about.storySubtitle')}</p>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/90 leading-relaxed">
                  <p className="text-lg">
                    {t('about.storyContent1')}
                  </p>
                  
                  <p className="text-lg">
                    {t('about.storyContent2')}
                  </p>
                  
                  <p className="text-lg">
                    {t('about.storyContent3')}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="bg-white/20 px-6 py-3 rounded-full">
                    <span className="text-white font-semibold">{t('about.tags.female')}</span>
                  </div>
                  <div className="bg-white/20 px-6 py-3 rounded-full">
                    <span className="text-white font-semibold">{t('about.tags.pioneer')}</span>
                  </div>
                  <div className="bg-white/20 px-6 py-3 rounded-full">
                    <span className="text-white font-semibold">{t('about.tags.leader')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧小卡片组合 */}
            <div className="lg:col-span-4 space-y-6">
              {/* 核心价值观卡片 */}
              <div className="bento-card bg-gradient-to-br from-primary-50 to-primary-100/10 p-6 rounded-3xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-primary-100" />
                  <h4 className="text-xl font-bold text-text-primary dark:text-white">{t('about.values.title')}</h4>
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
              <div className="bento-card bg-gradient-to-br from-accent-200/20 to-accent-100/10 p-6 rounded-3xl">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-8 h-8 text-accent-100" />
                  <h4 className="text-xl font-bold text-text-primary dark:text-white">{t('about.vision.title')}</h4>
                </div>
                <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </div>

              {/* 成就数据卡片 */}
              <div ref={statsRef} className="bento-card bg-gradient-to-br from-primary-200/20 to-primary-100/10 p-6 rounded-3xl">
                <h4 className="text-xl font-bold text-text-primary dark:text-white mb-4">{t('about.achievements.title')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-100 counter-animation">{counts.years}</div>
                    <div className="text-xs text-text-secondary">{t('about.achievements.years')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-100 counter-animation">{counts.employees}+</div>
                    <div className="text-xs text-text-secondary">{t('about.achievements.employees')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-100 counter-animation">{counts.revenue}亿</div>
                    <div className="text-xs text-text-secondary">{t('about.achievements.revenue')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-100 counter-animation">{counts.clients}+</div>
                    <div className="text-xs text-text-secondary">{t('about.achievements.clients')}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 创业历程时间线 */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-white mb-4">
                {t('about.journey.title')}
              </h3>
              <p className="text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
                {t('about.journey.subtitle')}
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* 时间线网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(t('about.journey.items', { returnObjects: true }) as any[]).map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10
                    }}
                    className="relative flex-shrink-0 w-80"
                  >
                    {/* 时间点 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className={`w-4 h-4 bg-gradient-to-br ${journeyItems[index]?.color || 'from-purple-400 to-purple-600'} rounded-full shadow-lg border-2 border-white dark:border-gray-900`}>
                      </div>
                    </div>

                    {/* 年份显示 */}
                    <div className={`${index % 2 === 0 ? 'mb-32' : 'mt-32'} text-center mb-4`}>
                      <div className={`inline-block px-6 py-3 bg-gradient-to-r ${journeyItems[index]?.color || 'from-purple-400 to-purple-600'} text-gray-800 dark:text-white text-2xl font-bold rounded-2xl shadow-lg`}>
                        {item.year}
                      </div>
                    </div>

                    {/* 故事卡片 */}
                    <div className={`${index % 2 === 0 ? 'mb-24' : 'mt-24'} bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500`}>
                      {/* 阶段标识 */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        {item.event}
                      </div>
                      
                      {/* 标题 */}
                      <h4 className="text-lg font-bold text-text-primary dark:text-white mb-3 leading-tight">
                        {item.title}
                      </h4>
                      
                      {/* 描述 */}
                      <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* 连接线 */}
                      {index < (t('about.journey.items', { returnObjects: true }) as any[]).length - 1 && (
                        <div className={`absolute ${index % 2 === 0 ? 'top-6' : 'bottom-6'} right-0 w-8 h-0.5 bg-gradient-to-r ${journeyItems[index]?.color || 'from-purple-400 to-purple-600'} opacity-50 transform translate-x-full`}></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 滚动提示 */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{t('about.journey.scrollHint')}</span>
                </div>
              </div>
            </div>

            {/* 成就总结 */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 text-center"
            >
              <h4 className="text-2xl font-bold text-text-primary dark:text-white mb-4">
                {t('about.journey.summary.title')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold gradient-text">21</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t('about.journey.summary.years')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">300+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t('about.journey.summary.members')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">2亿+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t('about.journey.summary.revenue')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{t('about.journey.summary.milestones')}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 