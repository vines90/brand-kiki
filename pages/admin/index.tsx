import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Upload
} from 'lucide-react'

interface User {
  id: string
  username: string
  role: string
}

interface Article {
  id: string
  title: string
  category: string
  date: string
  featured: boolean
  views: string
}

interface ImageFile {
  id: string
  filename: string
  original_name: string
  url: string
  category: string
  description?: string
  alt_text?: string
  file_size?: number
  mime_type?: string
  width?: number
  height?: number
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('articles')
  const [articles, setArticles] = useState<Article[]>([])
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 检查认证状态
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    console.log('Admin token:', token ? 'exists' : 'missing')
    console.log('Admin user data:', userData ? 'exists' : 'missing')

    if (!token || !userData) {
      console.log('Redirecting to login - missing auth data')
      router.push('/admin/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      console.log('Parsed user:', parsedUser)
      setUser(parsedUser)
      loadData()
    } catch (error) {
      console.error('Parse user data error:', error)
      router.push('/admin/login')
    }
  }, [router])

  // 加载数据
  const loadData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      console.log('Loading data with token:', token ? 'exists' : 'missing')
      
      // 加载文章
      console.log('Fetching articles...')
      const articlesResponse = await fetch('/api/admin/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('Articles response status:', articlesResponse.status)
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json()
        console.log('Articles loaded:', articlesData.length)
        setArticles(articlesData)
      } else {
        console.error('Articles fetch failed:', await articlesResponse.text())
      }

      // 加载图片
      console.log('Fetching images...')
      const imagesResponse = await fetch('/api/admin/images', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('Images response status:', imagesResponse.status)
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json()
        console.log('Images loaded:', imagesData.length)
        setImages(imagesData)
      } else {
        console.error('Images fetch failed:', await imagesResponse.text())
      }
    } catch (error) {
      console.error('Load data error:', error)
    } finally {
      setLoading(false)
    }
  }

  // 退出登录
  const handleLogout = () => {
    console.log('Logout button clicked')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  // 删除文章
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/articles?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id))
      } else {
        alert('删除失败')
      }
    } catch (error) {
      console.error('Delete article error:', error)
      alert('删除失败')
    }
  }

  // 删除图片
  const handleDeleteImage = async (id: string) => {
    if (!confirm('确定要删除这张图片吗？')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/images?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setImages(images.filter(image => image.id !== id))
      } else {
        alert('删除失败')
      }
    } catch (error) {
      console.error('Delete image error:', error)
      alert('删除失败')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-100 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>内容管理后台 - KIKI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* 顶部导航 */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  内容管理后台
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  欢迎，{user?.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* 侧边栏 */}
          <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen border-r border-gray-200 dark:border-gray-700">
            <nav className="p-6">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('articles')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'articles'
                        ? 'bg-primary-100 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>文章管理</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('images')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'images'
                        ? 'bg-primary-100 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Image className="w-5 h-5" />
                    <span>图片管理</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 p-6">
            {activeTab === 'articles' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* 文章管理 */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    文章管理
                  </h2>
                  <button
                    onClick={() => router.push('/admin/articles/new')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>新建文章</span>
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">标题</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">分类</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">日期</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {articles.map((article) => (
                          <tr key={article.id}>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{article.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{article.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{article.date}</td>
                            <td className="px-6 py-4 text-sm">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteArticle(article.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'images' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* 图片管理 */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    图片管理
                  </h2>
                  <button
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.multiple = true
                      input.accept = 'image/*'
                      input.onchange = async (e) => {
                        const files = (e.target as HTMLInputElement).files
                        if (!files) return
                        
                        const token = localStorage.getItem('adminToken')
                        let uploadedCount = 0
                        
                        for (const file of Array.from(files)) {
                          const formData = new FormData()
                          formData.append('file', file)
                          formData.append('category', 'other')
                          
                          try {
                            const uploadResponse = await fetch('/api/admin/upload', {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${token}` },
                              body: formData
                            })
                            
                            if (!uploadResponse.ok) continue
                            
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
                                category: 'other',
                                description: '',
                                alt_text: file.name.replace(/\.[^/.]+$/, ''),
                                file_size: fileInfo.file_size,
                                mime_type: fileInfo.mime_type
                              })
                            })
                            
                            if (imageResponse.ok) {
                              uploadedCount++
                            }
                          } catch (error) {
                            console.error('Upload error:', error)
                          }
                        }
                        
                        alert(`成功上传 ${uploadedCount} 张图片！`)
                        loadData()
                      }
                      input.click()
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>上传图片</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {images.map((image) => (
                    <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden group">
                      <div className="relative">
                        <img src={image.url} alt={image.original_name} className="w-full h-48 object-cover" />
                        {/* 悬停时显示的操作按钮 */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <button
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(image.url)
                                  alert('图片URL已复制到剪贴板')
                                } catch (error) {
                                  console.error('Copy failed:', error)
                                  alert('复制失败')
                                }
                              }}
                              className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                              title="复制URL"
                            >
                              复制URL
                            </button>
                            <button
                              onClick={() => window.open(image.url, '_blank')}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                              title="查看原图"
                            >
                              查看
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
                          {image.original_name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {image.category} • {(image.created_at) ? new Date(image.created_at).toLocaleDateString() : ''}
                        </p>
                        {/* 显示图片URL（截取部分） */}
                        <div className="mb-2">
                          <p className="text-xs text-gray-400 truncate font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {image.url}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(`![${image.alt_text || image.original_name}](${image.url})`)
                                alert('Markdown格式已复制到剪贴板')
                              } catch (error) {
                                console.error('Copy failed:', error)
                                alert('复制失败')
                              }
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            复制Markdown
                          </button>
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </>
  )
} 