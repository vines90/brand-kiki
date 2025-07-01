import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { put } from '@vercel/blob'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// 禁用默认的body parser，使用formidable处理multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
}

// 验证token
function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (error) {
    return null
  }
}

// 生成文件路径
function generateFilePath(originalName: string, category: string = 'other'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  const ext = originalName.split('.').pop() || ''
  return `${category}/${timestamp}-${random}.${ext}`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 验证认证
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' })
    }

    const user = verifyToken(token)
    if (!user) {
      return res.status(401).json({ message: '无效的认证令牌' })
    }

    // 解析表单数据
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    })

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err)
        else resolve([fields, files])
      })
    })

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file
    if (!uploadedFile) {
      return res.status(400).json({ message: '没有上传文件' })
    }

    const file = uploadedFile as File
    const category = (Array.isArray(fields.category) ? fields.category[0] : fields.category) || 'other'
    
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.mimetype || '')) {
      return res.status(400).json({ message: '不支持的文件类型' })
    }

    // 读取文件内容
    const fileBuffer = fs.readFileSync(file.filepath)
    
    // 生成文件路径
    const filePath = generateFilePath(file.originalFilename || 'unnamed', category)
    
    // 上传到Vercel Blob
    const blob = await put(filePath, fileBuffer, {
      access: 'public',
      contentType: file.mimetype || 'application/octet-stream',
    })

    // 清理临时文件
    fs.unlinkSync(file.filepath)

    // 返回文件信息
    const fileInfo = {
      filename: filePath.split('/').pop(),
      original_name: file.originalFilename,
      url: blob.url,
      file_size: file.size,
      mime_type: file.mimetype,
      category: category,
    }

    res.status(200).json(fileInfo)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: '文件上传失败' })
  }
} 