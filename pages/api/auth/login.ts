import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getUserByUsername, updateUserLastLogin } from '../../../lib/database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码不能为空' })
    }

    // 查找用户
    const user = await getUserByUsername(username)
    if (!user) {
      return res.status(401).json({ message: '用户名或密码错误' })
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({ message: '用户名或密码错误' })
    }

    // 更新最后登录时间
    await updateUserLastLogin(user.id)

    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: '服务器内部错误' })
  }
} 