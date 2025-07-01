import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string
    username: string
    role: string
  }
}

export function withAuth(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return res.status(401).json({ message: '未提供认证令牌' })
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role
      }

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: '无效的认证令牌' })
    }
  }
}

export function requireRole(roles: string[]) {
  return (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
    return withAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: '权限不足' })
      }
      return handler(req, res)
    })
  }
} 