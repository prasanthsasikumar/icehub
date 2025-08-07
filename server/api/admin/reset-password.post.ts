import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../../server/utils/supabase'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated and is admin
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser || currentUser.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  const { userId } = await readBody(event)

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'userId is required'
    })
  }

  try {
    // Find user in Supabase
    const user = await Database.getUserById(userId)
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Hash the default password
    const defaultPassword = 'workshop123'
    const hashedPassword = await bcrypt.hash(defaultPassword, 12)

    // Update user password in Supabase
    await Database.updateUser(userId, { 
      password: hashedPassword,
      updatedAt: new Date().toISOString()
    })

    return {
      message: `Password reset successfully for ${user.name}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  } catch (error) {
    console.error('Error resetting user password:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to reset user password'
    })
  }
})
