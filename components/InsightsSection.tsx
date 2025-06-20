import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight, BookOpen, Lightbulb, TrendingUp, Users, Eye, MessageCircle } from 'lucide-react'
import { articles, getFeaturedArticle } from '../data/articles'

export default function InsightsSection() {
  const { t } = useTranslation('common')

  const featuredArticle = getFeaturedArticle()

  const categories = [
    t('insights.categories.all'),
    t('insights.categories.trends'),
    t('insights.categories.digital'),
    t('insights.categories.international'),
    t('insights.categories.leadership'),
    t('insights.categories.management'),
    t('insights.categories.sales')
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

  const getCategoryColor = (category: string) => {
    const colors = {
      "行业趋势": "bg-primary-100/10 text-primary-100 border-primary-100/20",
      "数字化": "bg-accent-100/10 text-accent-100 border-accent-100/20",
      "国际化": "bg-primary-200/10 text-primary-200 border-primary-200/20",
      "领导力": "bg-accent-300/10 text-accent-300 border-accent-300/20",
      "管理": "bg-primary-400/10 text-primary-400 border-primary-400/20",
      "销售": "bg-primary-500/10 text-primary-500 border-primary-500/20"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100/10 text-gray-500 border-gray-200/20"
  }

  return (
    <section id="insights" className="py-20 bg-white dark:bg-gray-900">
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
              {t('insights.title')}
              <span className="gradient-text"> {t('insights.titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('insights.subtitle')}
            </p>
            <p className="text-lg text-text-secondary dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('insights.description')}
            </p>
          </motion.div>

          {/* 特色文章 - 大卡片 */}
          <motion.div variants={itemVariants} className="relative">
            <Link href={`/articles/${featuredArticle.slug}`} className="block">
              <div className="bento-card-gradient p-8 md:p-12 rounded-3xl shadow-2xl text-white overflow-hidden relative group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                {/* 背景装饰 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 border border-white/30 rounded-full float-animation"></div>
                  <div className="absolute bottom-10 left-10 w-20 h-20 border border-white/30 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
                  <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/40 rounded-full pulse-slow"></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold opacity-90 bg-white/20 px-3 py-1 rounded-full">{t('insights.featured')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm opacity-80">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredArticle.views}</span>
                      </div>
                      {featuredArticle.comments && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{featuredArticle.comments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm opacity-80">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                    </div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-all duration-300"
                    >
                      <span>{t('insights.readMore')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 分类标签 */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  index === 0 
                    ? 'bg-primary-100 text-white shadow-lg' 
                    : 'bg-bg-secondary dark:bg-gray-800 text-text-secondary hover:bg-primary-100/10 hover:text-primary-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* 文章网格 - 杂志式布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.filter(article => !article.featured).map((article, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bento-card bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 group cursor-pointer h-full flex flex-col"
              >
                <Link href={`/articles/${article.slug}`} className="h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-text-light">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary dark:text-white leading-tight group-hover:text-primary-100 transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-text-secondary dark:text-gray-300 leading-relaxed text-sm">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600 mt-auto">
                    <div className="flex items-center space-x-4 text-xs text-text-light">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="text-primary-100 hover:text-primary-200 font-semibold text-sm flex items-center space-x-1 transition-colors duration-300"
                    >
                      <span>{t('insights.readMore')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* 更多文章按钮 */}
          <motion.div variants={itemVariants} className="text-center">
            <Link href="/articles" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
              {t('insights.moreArticles')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* CTA区域 */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="bento-card bg-gradient-to-r from-primary-50 via-primary-100/5 to-accent-200/10 p-12 rounded-3xl max-w-4xl mx-auto">
              <div className="mb-6">
                <Lightbulb className="w-16 h-16 text-primary-100 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-4">
                  {t('insights.cta.title')}
                </h3>
                <p className="text-lg text-text-secondary dark:text-gray-300 mb-8">
                  {t('insights.cta.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('insights.cta.placeholder')}
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-light focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <button className="btn-primary px-6 py-3 whitespace-nowrap">
                  {t('insights.cta.subscribe')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 