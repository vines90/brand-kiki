import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  const { t } = useTranslation('common')

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: t('hero.stats.experience'),
      label: t('hero.stats.experienceLabel'),
      color: 'text-primary-100'
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: t('hero.stats.revenue'),
      label: t('hero.stats.revenueLabel'),
      color: 'text-accent-100'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: t('hero.stats.employees'),
      label: t('hero.stats.employeesLabel'),
      color: 'text-primary-200'
    }
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-bg-100 via-primary-300/20 to-bg-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-32 right-20 w-96 h-96 bg-primary-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh]"
        >
          {/* Left Side - Magazine Style Text Layout */}
          <div className="col-span-12 lg:col-span-7 space-y-12 lg:space-y-16 relative">

            {/* Main Title - Magazine Style */}
            <div className="relative mb-8 lg:mb-12">
              <motion.div
                variants={itemVariants}
                className="relative z-10"
              >
                {/* Chinese Name - Large Impact */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-text-100 dark:text-white leading-none tracking-tighter transform -rotate-2 mb-6 lg:mb-8">
                  {t('hero.name')}
                </h1>
                
                {/* English Name Overlay */}
                <div className="absolute top-2 lg:top-4 right-0 transform rotate-12 opacity-60">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-primary-100 italic">
                    {t('hero.nameEn')}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Title and Subtitle - Magazine Article Style */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 lg:space-y-8 relative"
            >
              <div className="bg-gradient-to-r from-primary-100 to-accent-100 text-white p-6 lg:p-8 rounded-3xl transform rotate-1 shadow-2xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  {t('hero.title')}
                </h2>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Subtitle with Magazine Quote Style */}
              <div className="relative bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-lg transform -rotate-1 border-l-4 border-primary-100">
                <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-200 dark:text-gray-300 italic leading-relaxed">
                  "{t('hero.subtitle')}"
                </blockquote>
                <div className="absolute -top-3 left-6 w-6 h-6 bg-primary-100 rounded-full"></div>
              </div>
            </motion.div>

            {/* Description with Magazine Column Style */}
            <motion.div
              variants={itemVariants}
              className="bg-primary-300/20 backdrop-blur-sm p-6 lg:p-8 rounded-2xl"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-100 dark:text-white leading-relaxed font-medium">
                {t('hero.description')}
              </p>
            </motion.div>

            {/* Magazine Style Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 lg:gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-2xl shadow-lg flex items-center space-x-3 lg:space-x-4 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}
                >
                  <div className={`${stat.color} p-2 lg:p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-text-100 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-text-200 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Magazine Cover Photo */}
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Main Photo - Clean and Simple */}
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500 w-full max-w-md lg:max-w-lg">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/kiki-profile.png"
                    alt="KIKI - Zhang Ziqi"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle Photo Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        className="absolute bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
          <div className="w-1 h-8 bg-gradient-to-b from-primary-100 to-accent-100 rounded-full mx-auto"></div>
        </div>
      </motion.div>
    </section>
  )
} 