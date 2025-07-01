import { NextApiResponse } from 'next'
import { requireRole, AuthenticatedRequest } from '../../../lib/auth-middleware'
import { 
  getArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  Article
} from '../../../lib/database'

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        // 获取所有文章
        const articles = await getArticles()
        return res.status(200).json(articles)

      case 'POST':
        // 创建新文章
        const { 
          title, excerpt, content, category, tags, featured, slug,
          readtime, views, comments 
        } = req.body

        if (!title || !content || !slug) {
          return res.status(400).json({ message: '标题、内容和slug不能为空' })
        }

        // 生成基本数据
        const now = new Date().toISOString().split('T')[0]
        const articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'> = {
          slug,
          title,
          excerpt: excerpt || title.substring(0, 100) + '...',
          content,
          date: now,
          category: category || '未分类',
          readtime: readtime || '5分钟',
          views: views || '0',
          comments: comments || '0',
          author_name: '张紫琪 (KIKI)',
          author_bio: '广东顺佳兴不锈钢有限公司创始人，13年不锈钢行业经验',
          author_avatar: '/kiki-profile.jpg',
          tags: tags || [],
          featured: featured || false
        }

        const newArticle = await createArticle(articleData)
        return res.status(201).json(newArticle)

      case 'PUT':
        // 更新文章
        const { id } = req.query
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ message: '缺少文章ID' })
        }

        const updateData = req.body
        const updatedArticle = await updateArticle(id, updateData)
        
        if (!updatedArticle) {
          return res.status(404).json({ message: '文章未找到' })
        }

        return res.status(200).json(updatedArticle)

      case 'DELETE':
        // 删除文章
        const { id: deleteId } = req.query
        if (!deleteId || typeof deleteId !== 'string') {
          return res.status(400).json({ message: '缺少文章ID' })
        }

        const deleted = await deleteArticle(deleteId)
        if (!deleted) {
          return res.status(404).json({ message: '文章未找到' })
        }

        return res.status(200).json({ message: '文章删除成功' })

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }
  } catch (error) {
    console.error('Articles API error:', error)
    return res.status(500).json({ message: '服务器内部错误' })
  }
}

export default requireRole(['admin', 'editor'])(handler) 