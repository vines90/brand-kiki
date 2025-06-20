import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  MessageCircle,
  Share2,
  User,
  Tag,
  ChevronRight
} from 'lucide-react'
import Layout from '../../components/Layout'
import { Article, articles, getArticleBySlug, getRelatedArticles } from '../../data/articles'

interface ArticlePageProps {
  article: Article
  relatedArticles: Article[]
}

export default function ArticlePage({ article, relatedArticles }: ArticlePageProps) {
  const { t } = useTranslation('common')

  if (!article) {
    return <div>文章未找到</div>
  }

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
    <>
      <Head>
        <title>{article.title} - KIKI 行业观点</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:author" content={article.author.name} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:tag" content={article.tags.join(', ')} />
      </Head>

      <Layout>
        <motion.article 
          className="py-20 bg-white dark:bg-gray-900"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 面包屑导航 */}
            <motion.nav variants={itemVariants} className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-purple-600 transition-colors">
                  首页
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/#insights" className="hover:text-purple-600 transition-colors">
                  行业观点
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-white">{article.title}</span>
              </div>
            </motion.nav>

            {/* 返回按钮 */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link 
                href="/#insights"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回观点列表</span>
              </Link>
            </motion.div>

            {/* 文章头部 */}
            <motion.header variants={itemVariants} className="mb-12">
              {/* 分类标签 */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
                  {article.category}
                </span>
              </div>

              {/* 标题 */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* 摘要 */}
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {article.excerpt}
              </p>

              {/* 文章元信息 */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views}</span>
                </div>
                {article.comments && (
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{article.comments}</span>
                  </div>
                )}
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>分享</span>
                </button>
              </div>
            </motion.header>

            {/* 文章内容 */}
            <motion.div 
              variants={itemVariants} 
              className="mb-12"
            >
              <div className="prose prose-lg max-w-none dark:prose-invert prose-purple text-gray-800 dark:text-gray-200 leading-relaxed">
                <style jsx>{`
                  .prose-purple :global(h1) {
                    @apply text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0;
                  }
                  .prose-purple :global(h2) {
                    @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
                  }
                  .prose-purple :global(h3) {
                    @apply text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3;
                  }
                  .prose-purple :global(p) {
                    @apply mb-4 text-gray-700 dark:text-gray-300 leading-relaxed;
                  }
                  .prose-purple :global(ul) {
                    @apply mb-4 ml-6 space-y-2 text-gray-700 dark:text-gray-300;
                  }
                  .prose-purple :global(li) {
                    @apply relative;
                  }
                  .prose-purple :global(li::before) {
                    content: '';
                    @apply absolute -left-6 top-2 w-2 h-2 bg-purple-500 rounded-full;
                  }
                  .prose-purple :global(strong) {
                    @apply font-semibold text-gray-900 dark:text-white;
                  }
                  .prose-purple :global(blockquote) {
                    @apply border-l-4 border-purple-500 pl-6 my-6 italic text-gray-600 dark:text-gray-400;
                  }
                `}</style>
                <ReactMarkdown>
                  {article.content}
                </ReactMarkdown>
              </div>
            </motion.div>

            {/* 标签 */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center space-x-4 mb-4">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">相关标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 作者信息 */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-3xl mb-12"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {article.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 相关文章推荐 */}
            {relatedArticles.length > 0 && (
              <motion.section variants={itemVariants} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  相关文章推荐
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Link
                      key={index}
                      href={`/articles/${relatedArticle.slug}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                            {relatedArticle.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{relatedArticle.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{relatedArticle.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 返回顶部/继续阅读 */}
            <motion.div variants={itemVariants} className="text-center">
              <Link
                href="/#insights"
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>查看更多观点</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </motion.div>
          </div>
        </motion.article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = articles.flatMap((article) =>
    (locales || ['zh', 'en']).map((locale) => ({
      params: { slug: article.slug },
      locale,
    }))
  )

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  const relatedArticles = getRelatedArticles(slug, 3)

  return {
    props: {
      article,
      relatedArticles,
      ...(await serverSideTranslations(locale ?? 'zh', ['common'])),
    },
  }
} 