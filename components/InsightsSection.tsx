import React from 'react'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen, Lightbulb, TrendingUp } from 'lucide-react'

export default function InsightsSection() {
  const { t } = useTranslation('common')

  const articles = t('insights.sampleArticles', { returnObjects: true }) as Array<{
    title: string
    excerpt: string
    date: string
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

  const getArticleIcon = (index: number) => {
    const icons = [<TrendingUp className="w-6 h-6" />, <Lightbulb className="w-6 h-6" />, <BookOpen className="w-6 h-6" />]
    return icons[index % icons.length]
  }

  const getArticleColor = (index: number) => {
    const colors = ['text-primary-100', 'text-accent-100', 'text-primary-200']
    return colors[index % colors.length]
  }

  const getBgColor = (index: number) => {
    const colors = ['from-primary-300/20 to-primary-200/20', 'from-accent-200/20 to-accent-100/20', 'from-primary-200/20 to-primary-100/20']
    return colors[index % colors.length]
  }

  return (
    <section id="insights" className="py-20 bg-white dark:bg-gray-900">
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
              {t('insights.title')}
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 font-semibold">
              {t('insights.subtitle')}
            </p>
            <p className="text-lg text-text-200 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              在不锈钢行业深耕13年，我对行业发展有着独特的见解和思考。
              这些观点和经验分享，旨在与同行和客户建立更深层次的信任关系。
            </p>
          </motion.div>

          {/* Featured Article - Large Bento Card */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bento-card bg-gradient-to-br from-primary-100 to-primary-200 p-12 rounded-3xl shadow-2xl text-white overflow-hidden relative group cursor-pointer">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 border border-white/30 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="w-8 h-8" />
                  <span className="text-sm font-semibold opacity-90">特色文章</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  女性领导力在制造业中的独特价值
                </h3>
                
                <p className="text-lg mb-6 opacity-90 leading-relaxed">
                  在传统制造业中，女性领导者带来的不仅仅是管理风格的差异，
                  更是思维方式和决策逻辑的创新。女性的细腻与坚韧，为传统制造业注入了新的活力。
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm opacity-80">
                    <Calendar className="w-4 h-4" />
                    <span>2024年12月</span>
                  </div>
                  
                  <button className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-all duration-300 group-hover:translate-x-2">
                    <span>{t('insights.readMore')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`bento-card bg-gradient-to-br ${getBgColor(index)} backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 group cursor-pointer`}
              >
                <div className="space-y-4">
                  <div className={`${getArticleColor(index)} mb-4`}>
                    {getArticleIcon(index)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-100 dark:text-white leading-tight group-hover:text-primary-100 transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-text-200 dark:text-gray-300 leading-relaxed text-sm">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2 text-xs text-text-200 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                    
                    <button className="text-primary-100 hover:text-primary-200 font-semibold text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300">
                      <span>{t('insights.readMore')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insights Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-card bg-gradient-to-br from-primary-300 to-primary-200 p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl font-bold text-primary-100 mb-2">50+</div>
              <div className="text-text-100 font-semibold">发表文章</div>
              <div className="text-text-200 text-sm mt-2">深度行业观点分享</div>
            </div>
            
            <div className="bento-card bg-gradient-to-br from-accent-200 to-accent-100 p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl font-bold text-accent-100 mb-2">10万+</div>
              <div className="text-text-100 font-semibold">阅读量</div>
              <div className="text-text-200 text-sm mt-2">获得行业广泛关注</div>
            </div>
            
            <div className="bento-card bg-gradient-to-br from-primary-200 to-primary-100 p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl font-bold text-primary-200 mb-2">13年</div>
              <div className="text-text-100 font-semibold">行业经验</div>
              <div className="text-text-200 text-sm mt-2">深度洞察分享</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-text-100 dark:bg-gray-800 text-white p-12 rounded-3xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              想了解更多行业洞察？
            </h3>
            <p className="text-lg mb-8 opacity-90">
              订阅KIKI的专业观点，获取最新的不锈钢行业趋势和发展动态
            </p>
            <button className="inline-flex items-center space-x-3 bg-primary-100 hover:bg-primary-200 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg">
              <span>订阅更新</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 