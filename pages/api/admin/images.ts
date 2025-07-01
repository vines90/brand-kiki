import { NextApiResponse } from 'next'
import { requireRole, AuthenticatedRequest } from '../../../lib/auth-middleware'
import { 
  getImages, 
  createImage, 
  deleteImage,
  Image
} from '../../../lib/database'

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        // 获取图片列表
        const { category } = req.query
        const images = await getImages(category as string)
        return res.status(200).json(images)

      case 'POST':
        // 添加图片记录
        const { 
          filename, original_name, url, category: imgCategory, 
          description, alt_text, file_size, mime_type, width, height 
        } = req.body

        if (!filename || !url || !file_size || !mime_type) {
          return res.status(400).json({ message: '缺少必要的图片信息' })
        }

        const imageData: Omit<Image, 'id' | 'created_at' | 'updated_at'> = {
          filename,
          original_name: original_name || filename,
          url,
          category: imgCategory || 'other',
          description,
          alt_text,
          file_size: parseInt(file_size),
          mime_type,
          width: width ? parseInt(width) : undefined,
          height: height ? parseInt(height) : undefined
        }

        const newImage = await createImage(imageData)
        return res.status(201).json(newImage)

      case 'DELETE':
        // 删除图片
        const { id } = req.query
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ message: '缺少图片ID' })
        }

        const deleted = await deleteImage(id)
        if (!deleted) {
          return res.status(404).json({ message: '图片未找到' })
        }

        return res.status(200).json({ message: '图片删除成功' })

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }
  } catch (error) {
    console.error('Images API error:', error)
    return res.status(500).json({ message: '服务器内部错误' })
  }
}

export default requireRole(['admin', 'editor'])(handler) 