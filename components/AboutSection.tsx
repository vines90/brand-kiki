import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Lightbulb, Heart } from 'lucide-react'

export default function AboutSection() {
  const { t } = useTranslation('common')

  const journeyItems = t('about.journey.items', { returnObjects: true }) as Array<{
    year: string
    event: string
    description: string
  }>

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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-text-100 dark:text-white">
              {t('about.title')}
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('about.subtitle')}
            </p>
            <p className="text-lg text-text-200 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Personal Story Bento Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bento-card lg:col-span-2 bg-gradient-to-br from-primary-300 to-primary-200 p-8 rounded-3xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-8 h-8 text-primary-100" />
                <h3 className="text-2xl font-bold text-text-100">温柔与坚韧</h3>
              </div>
              <p className="text-text-200 leading-relaxed">
                作为一名女性企业家，我始终相信温柔与坚韧可以并存，创新与责任可以同行。
                每一步成长，都是对初心的坚守，也是对品质的执着。
              </p>
            </div>

            <div className="bento-card bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-8 h-8 text-accent-100" />
                <h3 className="text-xl font-bold text-text-100 dark:text-white">创新思维</h3>
              </div>
              <p className="text-text-200 dark:text-gray-300 text-sm leading-relaxed">
                持续关注行业发展趋势，以创新思维推动企业转型升级
              </p>
            </div>

            <div className="bento-card bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-8 h-8 text-primary-200" />
                <h3 className="text-xl font-bold text-text-100 dark:text-white">全球视野</h3>
              </div>
              <p className="text-text-200 dark:text-gray-300 text-sm leading-relaxed">
                立足佛山，面向全球，致力于打造国际化的不锈钢品牌
              </p>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-text-100 dark:text-white mb-4">
                {t('about.journey.title')}
              </h3>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 dark:bg-primary-100 rounded-full"></div>

              <div className="space-y-12">
                {journeyItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-100 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10">
                      <div className="w-full h-full bg-primary-100 rounded-full animate-pulse"></div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bento-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Calendar className="w-5 h-5 text-primary-100" />
                          <span className="text-2xl font-bold text-primary-100">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-text-100 dark:text-white mb-2">
                          {item.event}
                        </h4>
                        <p className="text-text-200 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-primary-300 to-accent-200 p-12 rounded-3xl"
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-text-100 italic leading-relaxed">
              "让中国制造更有温度，让女性力量点亮行业未来"
            </blockquote>
            <cite className="text-lg text-text-200 font-semibold mt-4 block">
              — KIKI 张紫琪
            </cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 