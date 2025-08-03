import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getCookie, getHeader } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const SALT_ROUNDS = 10

export interface SkillWithLevel {
  name: string
  level: number // 1-5 stars
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  image: string
  bio: string
  skills: string[] | SkillWithLevel[] // Support both formats for backward compatibility
  role: 'user' | 'admin'
  createdAt: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    }
  } catch {
    return null
  }
}

export function getUserFromRequest(event: any): AuthUser | null {
  const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
  
  if (!token) return null
  
  return verifyToken(token)
}
