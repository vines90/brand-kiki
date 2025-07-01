import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres.arezgybbrvuverzfevxk:young@905906@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
})

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  readtime: string
  views: string
  comments?: string
  author_name: string
  author_bio: string
  author_avatar: string
  tags: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Image {
  id: string
  filename: string
  original_name: string
  url: string
  category: 'product' | 'factory' | 'article' | 'other'
  description?: string
  alt_text?: string
  file_size: number
  mime_type: string
  width?: number
  height?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  username: string
  password_hash: string
  role: 'admin' | 'editor'
  last_login?: string
  created_at: string
  updated_at: string
}

// 文章相关函数
export async function getArticles(): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT * FROM articles 
      ORDER BY created_at DESC
    `)
    
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }))
  } finally {
    client.release()
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM articles WHERE slug = $1',
      [slug]
    )
    
    if (result.rows.length === 0) return null
    
    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM articles WHERE featured = true ORDER BY created_at DESC LIMIT 1'
    )
    
    if (result.rows.length === 0) return null
    
    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM articles WHERE category = $1 ORDER BY created_at DESC',
      [category]
    )
    
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }))
  } finally {
    client.release()
  }
}

export async function getRelatedArticles(currentSlug: string, limit: number = 3): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT * FROM articles 
      WHERE slug != $1 
      ORDER BY created_at DESC 
      LIMIT $2
    `, [currentSlug, limit])
    
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }))
  } finally {
    client.release()
  }
}

// 新增：文章管理函数
export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  const client = await pool.connect()
  try {
    const id = Date.now().toString()
    const result = await client.query(`
      INSERT INTO articles (
        id, slug, title, excerpt, content, date, category, readtime, views, comments,
        author_name, author_bio, author_avatar, tags, featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `, [
      id, article.slug, article.title, article.excerpt, article.content,
      article.date, article.category, article.readtime, article.views, article.comments,
      article.author_name, article.author_bio, article.author_avatar,
      JSON.stringify(article.tags), article.featured
    ])
    
    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function updateArticle(id: string, article: Partial<Article>): Promise<Article | null> {
  const client = await pool.connect()
  try {
    const updates = []
    const values = []
    let paramCount = 1

    Object.entries(article).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        if (key === 'tags') {
          updates.push(`${key} = $${paramCount}`)
          values.push(JSON.stringify(value))
        } else {
          updates.push(`${key} = $${paramCount}`)
          values.push(value)
        }
        paramCount++
      }
    })

    if (updates.length === 0) return null

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(id)

    const result = await client.query(`
      UPDATE articles 
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values)

    if (result.rows.length === 0) return null

    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function deleteArticle(id: string): Promise<boolean> {
  const client = await pool.connect()
  try {
    const result = await client.query('DELETE FROM articles WHERE id = $1', [id])
    return (result.rowCount ?? 0) > 0
  } finally {
    client.release()
  }
}

// 图片管理函数
export async function getImages(category?: string): Promise<Image[]> {
  const client = await pool.connect()
  try {
    let query = 'SELECT * FROM images ORDER BY created_at DESC'
    let params: any[] = []

    if (category) {
      query = 'SELECT * FROM images WHERE category = $1 ORDER BY created_at DESC'
      params = [category]
    }

    const result = await client.query(query, params)
    
    return result.rows.map(row => ({
      ...row,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }))
  } finally {
    client.release()
  }
}

export async function createImage(image: Omit<Image, 'id' | 'created_at' | 'updated_at'>): Promise<Image> {
  const client = await pool.connect()
  try {
    const id = Date.now().toString()
    const result = await client.query(`
      INSERT INTO images (
        id, filename, original_name, url, category, description, alt_text,
        file_size, mime_type, width, height
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      id, image.filename, image.original_name, image.url, image.category,
      image.description, image.alt_text, image.file_size, image.mime_type,
      image.width, image.height
    ])
    
    const row = result.rows[0]
    return {
      ...row,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function deleteImage(id: string): Promise<boolean> {
  const client = await pool.connect()
  try {
    const result = await client.query('DELETE FROM images WHERE id = $1', [id])
    return (result.rowCount ?? 0) > 0
  } finally {
    client.release()
  }
}

// 用户认证函数
export async function getUserByUsername(username: string): Promise<User | null> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    
    if (result.rows.length === 0) return null
    
    const row = result.rows[0]
    return {
      ...row,
      created_at: row.created_at.toISOString(),
      updated_at: row.updated_at.toISOString()
    }
  } finally {
    client.release()
  }
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [userId]
    )
  } finally {
    client.release()
  }
} 