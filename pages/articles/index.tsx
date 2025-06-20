import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Eye, 
  ArrowLeft, 
  BookOpen, 
  Search
} from 'lucide-react'
import Layout from '../../components/Layout'
import { Article, articles } from '../../data/articles'

interface ArticlesPageProps {
  articles: Article[]
}

export default function ArticlesPage({ articles: initialArticles }: ArticlesPageProps) {
  const { t } = useTranslation('common')
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["全部", "行业趋势", "数字化", "国际化", "领导力", "管理", "销售"]

  // 筛选文章
  const filteredArticles = initialArticles.filter(article => {
    const matchesCategory = selectedCategory === "全部" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
      "行业趋势": "bg-blue-100 text-blue-700 border-blue-200",
      "数字化": "bg-primary-100/20 text-primary-100 border-primary-200",
      "国际化": "bg-green-100 text-green-700 border-green-200",
      "领导力": "bg-red-100 text-red-700 border-red-200",
      "管理": "bg-orange-100 text-orange-700 border-orange-200",
      "销售": "bg-pink-100 text-pink-700 border-pink-200"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  return (
    <>
      <Head>
        <title>行业观点 - KIKI 张紫琪</title>
        <meta name="description" content="KIKI在不锈钢行业的深度思考和专业分享，涵盖行业趋势、数字化转型、国际化发展、领导力等多个方面。" />
        <meta name="keywords" content="不锈钢行业,行业观点,女性领导力,数字化转型,国际化,制造业" />
      </Head>

      <Layout>
        <motion.div 
          className="py-20 bg-white dark:bg-gray-900"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 页面头部 */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-primary-100 hover:text-primary-200 font-medium transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回首页</span>
              </Link>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                我的
                <span className="gradient-text ml-2"> 行业观点</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                在不锈钢行业深耕13年的思考与分享，涵盖行业趋势、数字化转型、国际化发展等多个领域的深度观点。
              </p>
            </motion.div>

            {/* 筛选工具栏 */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* 搜索框 */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="搜索文章标题、内容或标签..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                  />
                </div>

                {/* 分类筛选 */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100/20 dark:hover:bg-primary-100/10 hover:text-primary-100 dark:hover:text-primary-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 结果统计 */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  共找到 <span className="font-semibold text-primary-100">{filteredArticles.length}</span> 篇文章
                  {selectedCategory !== "全部" && (
                    <span> · 分类：<span className="font-semibold">{selectedCategory}</span></span>
                  )}
                  {searchTerm && (
                    <span> · 搜索：<span className="font-semibold">"{searchTerm}"</span></span>
                  )}
                </p>
              </div>
            </motion.div>

            {/* 文章列表 */}
            <motion.div variants={itemVariants} className="space-y-8">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    没有找到相关文章
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    尝试调整搜索关键词或选择其他分类
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      variants={itemVariants}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group h-full flex flex-col"
                    >
                      <Link href={`/articles/${article.slug}`} className="h-full flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                          {/* 文章标签和阅读数 */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                              {article.category}
                            </span>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Eye className="w-3 h-3" />
                              <span>{article.views}</span>
                            </div>
                          </div>

                          {/* 文章标题 */}
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-primary-100 transition-colors duration-300">
                            {article.title}
                          </h2>

                          {/* 文章摘要 */}
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                            {article.excerpt}
                          </p>

                          {/* 标签 */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {article.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* 文章元信息 */}
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{article.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <div className="text-primary-100 group-hover:text-primary-200">
                              阅读文章 →
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>

            {/* 页面底部 */}
            <motion.div variants={itemVariants} className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100/20 dark:from-primary-500/20 dark:to-primary-400/20 p-8 rounded-3xl">
                <BookOpen className="w-12 h-12 text-primary-100 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  想要了解更多？
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  订阅我的专业观点，获取最新的行业洞察和思考分享
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="输入您的邮箱地址"
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  />
                  <button className="bg-primary-100 hover:bg-primary-200 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    订阅更新
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      articles,
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
    },
  }
} 