import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ArrowLeft, Eye, Image, Upload, X, Copy, Plus } from 'lucide-react'

interface ImageFile {
  id: string
  filename: string
  original_name: string
  url: string
  category: string
  description?: string
  alt_text?: string
  created_at: string
}

export default function NewArticle() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [images, setImages] = useState<ImageFile[]>([])
  const [imageFilter, setImageFilter] = useState('all')
  const [uploadingImage, setUploadingImage] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // 检查认证状态
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      loadImages()
    }
  }, [])

  // 加载图片列表
  const loadImages = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/images', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const imageData = await response.json()
        setImages(imageData)
      }
    } catch (error) {
      console.error('Load images error:', error)
    }
  }

  // 根据标题生成slug
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  // 自动生成slug
  useEffect(() => {
    if (title && !slug) {
      setSlug(generateSlug(title))
    }
  }, [title])

  // 快速上传图片
  const handleQuickUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const token = localStorage.getItem('adminToken')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', 'article')

      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!uploadResponse.ok) {
        throw new Error('上传失败')
      }

      const fileInfo = await uploadResponse.json()

      const imageResponse = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filename: fileInfo.filename,
          original_name: fileInfo.original_name,
          url: fileInfo.url,
          category: 'article',
          description: '',
          alt_text: file.name.replace(/\.[^/.]+$/, ''),
          file_size: fileInfo.file_size,
          mime_type: fileInfo.mime_type
        })
      })

      if (imageResponse.ok) {
        const newImage = await imageResponse.json()
        setImages(prev => [newImage, ...prev])
        insertImageToEditor(newImage.url, newImage.alt_text || newImage.original_name)
        return newImage
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('图片上传失败，请重试')
    } finally {
      setUploadingImage(false)
    }
  }

  // 处理文件上传
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('图片大小不能超过10MB')
      return
    }

    await handleQuickUpload(file)
  }

  // 插入图片到编辑器
  const insertImageToEditor = (url: string, alt: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const markdownImage = `![${alt}](${url})`
    
    const newContent = content.substring(0, start) + markdownImage + content.substring(end)
    setContent(newContent)

    // 设置光标位置到插入内容的末尾
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length)
    }, 10)
  }

  // 复制图片URL到剪贴板
  const copyImageUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      alert('图片URL已复制到剪贴板')
    } catch (error) {
      console.error('Copy failed:', error)
      alert('复制失败，请手动复制')
    }
  }

  // 过滤图片
  const filteredImages = images.filter(image => {
    if (imageFilter === 'all') return true
    return image.category === imageFilter
  })

  // 保存文章
  const handleSave = async () => {
    if (!title || !content) {
      alert('标题和内容不能为空')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          slug: slug || generateSlug(title),
          excerpt: excerpt || title.substring(0, 100) + '...',
          content,
          category: category || '未分类',
          tags: tagsArray,
          featured,
          readtime: `${Math.ceil(content.length / 500)}分钟`,
          views: '0',
          comments: '0'
        })
      })

      if (response.ok) {
        alert('文章保存成功！')
        router.push('/admin')
      } else {
        const data = await response.json()
        alert(`保存失败: ${data.message}`)
      }
    } catch (error) {
      console.error('Save article error:', error)
      alert('保存失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>新建文章 - 管理后台</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 顶部工具栏 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>返回</span>
                </button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  新建文章
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isPreview ? '编辑' : '预览'}</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? '保存中...' : '保存'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 主编辑区 */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {/* 标题 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      文章标题
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="请输入文章标题..."
                    />
                  </div>

                  {/* Slug */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="文章URL标识符..."
                    />
                  </div>

                  {/* 摘要 */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      文章摘要
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="简要描述文章内容..."
                    />
                  </div>

                  {/* 内容编辑器 */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        文章内容 (支持Markdown)
                      </label>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowImageModal(true)}
                          className="inline-flex items-center space-x-1 px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                        >
                          <Image className="w-3 h-3" />
                          <span>选择图片</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="inline-flex items-center space-x-1 px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{uploadingImage ? '上传中...' : '快速上传'}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                    {!isPreview ? (
                      <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={20}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                        placeholder="使用Markdown格式编写文章内容..."
                      />
                    ) : (
                      <div className="w-full min-h-[500px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 侧边栏设置 */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    文章设置
                  </h3>

                  {/* 分类 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      分类
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">选择分类</option>
                      <option value="技术创新">技术创新</option>
                      <option value="行业深度分析">行业深度分析</option>
                      <option value="产品展示">产品展示</option>
                      <option value="公司新闻">公司新闻</option>
                      <option value="市场动态">市场动态</option>
                    </select>
                  </div>

                  {/* 标签 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      标签 (用逗号分隔)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="不锈钢, 装饰板, 技术"
                    />
                  </div>

                  {/* 特色文章 */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600 text-primary-100 focus:ring-primary-100"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        设为特色文章
                      </span>
                    </label>
                  </div>

                  {/* 提示信息 */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                      Markdown 提示
                    </h4>
                    <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                      <li># 标题1, ## 标题2</li>
                      <li>**粗体**, *斜体*</li>
                      <li>[链接](URL)</li>
                      <li>![图片](URL)</li>
                      <li>- 列表项</li>
                      <li>| 表格 | 单元格 |</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 图片选择模态框 */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={() => setShowImageModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 模态框头部 */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    选择图片
                  </h3>
                  <div className="flex items-center space-x-4">
                    {/* 分类过滤 */}
                    <select
                      value={imageFilter}
                      onChange={(e) => setImageFilter(e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="all">所有图片</option>
                      <option value="article">文章配图</option>
                      <option value="product">产品图片</option>
                      <option value="factory">工厂图片</option>
                      <option value="other">其他</option>
                    </select>
                    <button
                      onClick={() => setShowImageModal(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 图片网格 */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {filteredImages.length === 0 ? (
                    <div className="text-center py-12">
                      <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {imageFilter === 'all' ? '暂无图片' : `暂无${imageFilter}分类的图片`}
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200"
                      >
                        <Upload className="w-4 h-4" />
                        <span>上传图片</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredImages.map((image) => (
                        <div
                          key={image.id}
                          className="group relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary-100 transition-all"
                        >
                          <img
                            src={image.url}
                            alt={image.alt_text || image.original_name}
                            className="w-full h-32 object-cover"
                            loading="lazy"
                          />
                          
                          {/* 悬停时显示的操作按钮 */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  insertImageToEditor(image.url, image.alt_text || image.original_name)
                                  setShowImageModal(false)
                                }}
                                className="px-3 py-1 bg-primary-100 text-white text-xs rounded-md hover:bg-primary-200 transition-colors"
                                title="插入到文章"
                              >
                                插入
                              </button>
                              <button
                                onClick={() => copyImageUrl(image.url)}
                                className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 transition-colors"
                                title="复制链接"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* 图片信息 */}
                          <div className="p-2">
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {image.original_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {image.category}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 模态框底部 */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    共 {filteredImages.length} 张图片
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{uploadingImage ? '上传中...' : '上传新图片'}</span>
                    </button>
                    <button
                      onClick={() => setShowImageModal(false)}
                      className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200"
                    >
                      关闭
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
} 