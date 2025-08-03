import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { hashPassword, generateToken, type User } from '../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const { name, email, password, bio, skills, image } = await readBody(event)

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required'
    })
  }

  // Read existing users
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Email already registered'
    })
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Create new user
  const newUser: User = {
    id: uuidv4(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    image: image || 'https://via.placeholder.com/150x150/e5e7eb/9ca3af?text=User',
    bio: bio || '',
    skills: Array.isArray(skills) ? skills : [],
    role: 'user',
    createdAt: new Date().toISOString()
  }

  // Add to users array
  users.push(newUser)

  // Save to file
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))

  // Generate token
  const token = generateToken({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
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
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      bio: newUser.bio,
      skills: newUser.skills,
      role: newUser.role
    },
    token
  }
})
