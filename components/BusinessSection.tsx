import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Factory, Award, Zap, Shield, Users, TrendingUp, Globe, Target, CheckCircle } from 'lucide-react'

export default function BusinessSection() {
  const { t } = useTranslation('common')

  const stats = [
    { icon: <Factory className="w-8 h-8" />, value: "10,000", suffix: '㎡', label: t('business.stats.base') },
    { icon: <Users className="w-8 h-8" />, value: "300", suffix: '+', label: t('business.stats.team') },
    { icon: <TrendingUp className="w-8 h-8" />, value: "200", suffix: 'M+', label: t('business.stats.revenue') },
    { icon: <Globe className="w-8 h-8" />, value: "500", suffix: '+', label: t('business.stats.clients') }
  ]

  const advantages = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: t('business.advantages.innovation.title'),
      description: t('business.advantages.innovation.description'),
      highlights: Array.isArray(t('business.advantages.innovation.highlights', { returnObjects: true })) 
        ? t('business.advantages.innovation.highlights', { returnObjects: true }) as string[]
        : []
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: t('business.advantages.quality.title'), 
      description: t('business.advantages.quality.description'),
      highlights: Array.isArray(t('business.advantages.quality.highlights', { returnObjects: true })) 
        ? t('business.advantages.quality.highlights', { returnObjects: true }) as string[]
        : []
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: t('business.advantages.service.title'),
      description: t('business.advantages.service.description'),
      highlights: Array.isArray(t('business.advantages.service.highlights', { returnObjects: true })) 
        ? t('business.advantages.service.highlights', { returnObjects: true }) as string[]
        : []
    }
  ]

  const products = [
    {
      name: t('business.products.waterWave.name'),
      image: "/images/products/不锈钢水波纹板.png",
      description: t('business.products.waterWave.description'),
      features: Array.isArray(t('business.products.waterWave.features', { returnObjects: true })) 
        ? t('business.products.waterWave.features', { returnObjects: true }) as string[]
        : [],
      category: t('business.products.waterWave.category')
    },
    {
      name: t('business.products.vintage.name'),
      image: "/images/products/不锈钢做旧板.png", 
      description: t('business.products.vintage.description'),
      features: Array.isArray(t('business.products.vintage.features', { returnObjects: true })) 
        ? t('business.products.vintage.features', { returnObjects: true }) as string[]
        : [],
      category: t('business.products.vintage.category')
    },
    {
      name: t('business.products.copper.name'), 
      image: "/images/products/不锈钢仿铜板.png",
      description: t('business.products.copper.description'),
      features: Array.isArray(t('business.products.copper.features', { returnObjects: true })) 
        ? t('business.products.copper.features', { returnObjects: true }) as string[]
        : [],
      category: t('business.products.copper.category')
    },
    {
      name: t('business.products.mirror.name'),
      image: "/images/products/不锈钢镜面板.png",
      description: t('business.products.mirror.description'),
      features: Array.isArray(t('business.products.mirror.features', { returnObjects: true })) 
        ? t('business.products.mirror.features', { returnObjects: true }) as string[]
        : [],
      category: t('business.products.mirror.category')
    },
    {
      name: t('business.products.etching.name'),
      image: "/images/products/不锈钢蚀刻板.png",
      description: t('business.products.etching.description'),
      features: Array.isArray(t('business.products.etching.features', { returnObjects: true })) 
        ? t('business.products.etching.features', { returnObjects: true }) as string[]
        : [],
      category: t('business.products.etching.category')
    }
  ]

  const factoryImages = [
    {
      name: t('business.factory.facilities.main.name'),
      image: "/images/factory/总厂.png",
      description: t('business.factory.facilities.main.description'),
      specs: Array.isArray(t('business.factory.facilities.main.specs', { returnObjects: true })) 
        ? t('business.factory.facilities.main.specs', { returnObjects: true }) as string[]
        : []
    },
    {
      name: t('business.factory.facilities.plating.name'),
      image: "/images/factory/电镀加工厂.png", 
      description: t('business.factory.facilities.plating.description'),
      specs: Array.isArray(t('business.factory.facilities.plating.specs', { returnObjects: true })) 
        ? t('business.factory.facilities.plating.specs', { returnObjects: true }) as string[]
        : []
    },
    {
      name: t('business.factory.facilities.mirror.name'),
      image: "/images/factory/镜面加工厂.png",
      description: t('business.factory.facilities.mirror.description'),
      specs: Array.isArray(t('business.factory.facilities.mirror.specs', { returnObjects: true })) 
        ? t('business.factory.facilities.mirror.specs', { returnObjects: true }) as string[]
        : []
    }
  ]

  return (
    <section id="business" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 className="section-title text-text-primary dark:text-white">
              {t('business.title')}
              <span className="gradient-text"> {t('business.titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('business.subtitle')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('business.description')}
            </p>
          </div>

          {/* 企业实力数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg text-center border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-primary-100 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 核心优势 */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('business.advantages.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('business.advantages.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="text-primary-100 mb-6">
                    {advantage.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {advantage.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {advantage.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary-100/20 dark:bg-primary-100/10 text-primary-100 dark:text-primary-200 text-sm font-medium rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 生产基地展示 */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('business.factory.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('business.factory.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {factoryImages.map((factory, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={factory.image}
                      alt={factory.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-primary-100 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('business.factory.badge')}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {factory.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {factory.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(factory.specs || []).map((spec, idx) => (
                        <div key={idx} className="flex items-center space-x-1 text-xs text-primary-100">
                          <CheckCircle className="w-3 h-3" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 产品展示 */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('business.productDisplay.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('business.productDisplay.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-100/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary-200" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 认证展示 */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-12 rounded-3xl max-w-4xl mx-auto">
              <Award className="w-20 h-20 text-primary-100 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('business.certifications.title')}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('business.certifications.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <Target className="w-12 h-12 text-primary-100 mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">ISO 9001</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{t('business.certifications.quality')}</div>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">ISO 14001</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{t('business.certifications.environment')}</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">CE</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{t('business.certifications.ce')}</div>
                </div>
              </div>

              <div className="inline-block">
                <Image
                  src="/images/honors/质量管理体系认证-英文.png"
                  alt="质量管理体系认证"
                  width={300}
                  height={220}
                  sizes="300px"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 