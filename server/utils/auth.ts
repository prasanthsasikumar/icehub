import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getCookie, getHeader, createError } from 'h3'

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
  userRole: 'participant' | 'mentor' // User's role in community
  affiliation?: string
  expertise?: string
  gender?: string
  video?: string
  createdAt: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  userRole: 'participant' | 'mentor'
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
      role: user.role,
      userRole: user.userRole
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
      role: decoded.role,
      userRole: decoded.userRole || 'participant' // Default to participant for existing users
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

export async function requireAuth(event: any): Promise<AuthUser> {
  const user = getUserFromRequest(event)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }
  
  return user
}
