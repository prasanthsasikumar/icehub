import bcrypt from 'bcrypt'
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
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  try {
    // Find user by email
    const user = await Database.getUserByEmail(email)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        role: user.role,
        userRole: user.userRole || 'developer'  // Default to developer if not set
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
    const { password: _, ...userWithoutPassword } = user
    return {
      success: true,
      user: userWithoutPassword,
      token
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
