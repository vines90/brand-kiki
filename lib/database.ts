import { Pool } from 'pg'

const pool = new Pool({
  connectionString: 'postgresql://postgres.arezgybbrvuverzfevxk:young@905906@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool

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
  created_at?: string
  updated_at?: string
}

export async function getArticles(): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM articles ORDER BY created_at DESC')
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at ? row.created_at.toISOString() : undefined,
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined
    }))
  } finally {
    client.release()
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM articles WHERE slug = $1', [slug])
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at ? row.created_at.toISOString() : undefined,
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined
    }
  } finally {
    client.release()
  }
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM articles WHERE featured = true ORDER BY created_at DESC LIMIT 1')
    if (result.rows.length === 0) return null
    const row = result.rows[0]
    return {
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at ? row.created_at.toISOString() : undefined,
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined
    }
  } finally {
    client.release()
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM articles WHERE category = $1 ORDER BY created_at DESC', [category])
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at ? row.created_at.toISOString() : undefined,
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined
    }))
  } finally {
    client.release()
  }
}

export async function getRelatedArticles(currentSlug: string, limit: number = 3): Promise<Article[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM articles WHERE slug != $1 ORDER BY created_at DESC LIMIT $2',
      [currentSlug, limit]
    )
    return result.rows.map(row => ({
      ...row,
      tags: Array.isArray(row.tags) ? row.tags : JSON.parse(row.tags || '[]'),
      created_at: row.created_at ? row.created_at.toISOString() : undefined,
      updated_at: row.updated_at ? row.updated_at.toISOString() : undefined
    }))
  } finally {
    client.release()
  }
} 