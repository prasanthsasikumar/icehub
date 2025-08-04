import { getUserFromRequest } from '../../../server/utils/auth'
import bcrypt from 'bcrypt'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }
  
  const body = await readBody(event)
  const { currentPassword, newPassword } = body

  // Validate inputs
  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Current password and new password are required'
    })
  }

  if (newPassword.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'New password must be at least 6 characters long'
    })
  }

  try {
    // Get current user data with password hash from Supabase
    const userToUpdate = await Database.getUserById(currentUser.id)
    if (!userToUpdate) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userToUpdate.password)
    if (!isCurrentPasswordValid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Current password is incorrect'
      })
    }

    // Hash new password
    const saltRounds = 10
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update user password in Supabase
    await Database.updateUser(currentUser.id, { password: hashedNewPassword })

    return { message: 'Password updated successfully' }

  } catch (error) {
    console.error('Password update error:', error)
    
    // Re-throw known errors
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update password'
    })
  }
})
