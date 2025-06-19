import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Factory, Award, Zap, Shield, Users, TrendingUp } from 'lucide-react'

export default function BusinessSection() {
  const { t } = useTranslation('common')

  const advantages = t('business.advantages.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  const products = [
    {
      name: t('business.products.waterWave'),
      image: '/images/products/不锈钢水波纹板.png',
      description: '优雅的水波纹理，适用于高端装饰'
    },
    {
      name: t('business.products.vintage'),
      image: '/images/products/不锈钢做旧板.png',
      description: '复古质感，展现时光沉淀的美感'
    },
    {
      name: t('business.products.copper'),
      image: '/images/products/不锈钢仿铜板.png',
      description: '仿铜效果，兼具美观与实用性'
    },
    {
      name: t('business.products.mirror'),
      image: '/images/products/不锈钢镜面板.png',
      description: '镜面光泽，提升空间视觉效果'
    },
    {
      name: t('business.products.etching'),
      image: '/images/products/不锈钢蚀刻板.png',
      description: '精细蚀刻工艺，展现精湛技术'
    }
  ]

  const factoryImages = [
    {
      name: '总厂',
      image: '/images/factory/总厂.png',
      description: '现代化生产基地'
    },
    {
      name: '电镀加工厂',
      image: '/images/factory/电镀加工厂.png',
      description: '专业电镀生产线'
    },
    {
      name: '镜面加工厂',
      image: '/images/factory/镜面加工厂.png',
      description: '精密镜面处理工艺'
    }
  ]

  const stats = [
    { icon: <Factory className="w-8 h-8" />, value: '10,000㎡', label: '生产基地', color: 'text-primary-100' },
    { icon: <Users className="w-8 h-8" />, value: '300+', label: '专业团队', color: 'text-accent-100' },
    { icon: <TrendingUp className="w-8 h-8" />, value: '2亿+', label: '年营收', color: 'text-primary-200' },
    { icon: <Award className="w-8 h-8" />, value: '13年+', label: '行业经验', color: 'text-accent-200' }
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
    <section id="business" className="py-20 bg-bg-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-20"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-text-100 dark:text-white">
              {t('business.title')}
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('business.subtitle')}
            </p>
          </motion.div>

          {/* Company Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bento-card bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-text-100 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-text-200 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Core Advantages */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-text-100 dark:text-white mb-8">
                {t('business.advantages.title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bento-card bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {index === 0 && <Zap className="w-8 h-8 text-primary-100 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 1 && <Shield className="w-8 h-8 text-accent-100 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 2 && <Award className="w-8 h-8 text-primary-200 group-hover:scale-110 transition-transform duration-300" />}
                    <h4 className="text-xl font-bold text-text-100 dark:text-white">
                      {advantage.title}
                    </h4>
                  </div>
                  <p className="text-text-200 dark:text-gray-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Factory Showcase */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-text-100 dark:text-white mb-8">
                生产基地展示
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {factoryImages.map((factory, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bento-card bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={factory.image}
                      alt={factory.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-text-100 dark:text-white mb-2">
                      {factory.name}
                    </h4>
                    <p className="text-text-200 dark:text-gray-300">
                      {factory.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Showcase */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-text-100 dark:text-white mb-8">
                {t('business.products.title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bento-card bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-text-100 dark:text-white text-center">
                      {product.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certification */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-primary-300 to-primary-200 p-12 rounded-3xl"
          >
            <div className="max-w-4xl mx-auto">
              <Award className="w-16 h-16 text-primary-100 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-text-100 mb-4">
                质量管理体系认证
              </h3>
              <p className="text-lg text-text-200 mb-6">
                获得ISO质量管理体系认证，确保每一件产品都符合国际标准
              </p>
              <div className="inline-block">
                <Image
                  src="/images/honors/质量管理体系认证-英文.png"
                  alt="质量管理体系认证"
                  width={200}
                  height={150}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 