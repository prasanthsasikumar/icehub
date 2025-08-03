import fs from 'fs'
import path from 'path'
import { verifyPassword, generateToken, type User } from '../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  // Read users from file
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  // Find user by email
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    })
  }

  // Verify password
  const isValidPassword = await verifyPassword(password, user.password)

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password'
    })
  }

  // Generate token
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })

  // Set cookie
  setCookie(event, 'auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  // Return user data (without password)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      bio: user.bio,
      skills: user.skills,
      role: user.role
    },
    token
  }
})
