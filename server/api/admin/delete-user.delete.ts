import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
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

  const { userId } = await readBody(event)

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Prevent admin from deleting themselves
  if (userId === currentUser.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot delete your own account'
    })
  }

  try {
    // Check if user exists
    const userToDelete = await Database.getUserById(userId)
    if (!userToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Delete the user
    await Database.deleteUser(userId)

    return {
      success: true,
      message: `User ${userToDelete.name} has been deleted successfully`
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('User deletion error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
