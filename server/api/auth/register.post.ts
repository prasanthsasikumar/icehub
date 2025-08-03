import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { Database } from '../../utils/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const body = await readBody(event)
  const { name, email, password, bio, skills } = body

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required'
    })
  }

  try {
    // Check if user already exists
    const existingUser = await Database.getUserByEmail(email)
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      image: 'https://via.placeholder.com/150x150/e5e7eb/9ca3af?text=User',
      bio: bio || '',
      skills: skills || [],
      role: 'user',
      createdAt: new Date().toISOString()
    }

    const createdUser = await Database.createUser(newUser)

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: createdUser.id, 
        email: createdUser.email, 
        role: createdUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = createdUser
    return {
      success: true,
      user: userWithoutPassword,
      token
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
