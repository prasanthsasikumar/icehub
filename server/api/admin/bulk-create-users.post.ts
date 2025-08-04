import { getUserFromRequest } from '../../../server/utils/auth'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated and is admin
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  if (currentUser.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  const body = await readBody(event)
  const { users } = body

  if (!users || !Array.isArray(users) || users.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Users array is required'
    })
  }

  try {
    // Get existing users to check for duplicates
    const existingUsers = await Database.getUsers()
    const existingEmails = new Set(existingUsers.map(user => user.email.toLowerCase()))

    const newUsers = []
    const skipped = []
    const saltRounds = 10

    // Process each user
    for (const userData of users) {
      const { name, email, bio, password } = userData

      // Validate required fields
      if (!name || !email) {
        skipped.push({ email: email || 'unknown', reason: 'Missing name or email' })
        continue
      }

      // Check for duplicate email
      if (existingEmails.has(email.toLowerCase())) {
        skipped.push({ email, reason: 'Email already exists' })
        continue
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password || 'workshop123', saltRounds)

      // Create new user object
      const newUser = {
        id: uuidv4(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        bio: bio?.trim() || '',
        password: hashedPassword,
        role: 'user',
        userRole: 'developer',
        image: '/uploads/default/default_user_icon.png',
        skills: [],
        createdAt: new Date().toISOString()
      }

      // Create user in database
      await Database.createUser(newUser)
      newUsers.push(newUser)
      existingEmails.add(email.toLowerCase())
    }

    return {
      message: `Successfully created ${newUsers.length} users`,
      created: newUsers.length,
      skipped: skipped.length,
      skippedDetails: skipped
    }

  } catch (error) {
    console.error('Bulk user creation error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create users'
    })
  }
})
