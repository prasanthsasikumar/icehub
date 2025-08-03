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

    console.log('Attempting to delete user:', userToDelete.name, userToDelete.id)

    // Delete the user
    await Database.deleteUser(userId)

    console.log('User deleted successfully:', userToDelete.name)

    return {
      success: true,
      message: `User ${userToDelete.name} has been deleted successfully`
    }
  } catch (error: any) {
    console.error('User deletion error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      statusCode: error.statusCode
    })
    
    if (error.statusCode) {
      throw error
    }
    
    // Provide more specific error message based on the error
    let errorMessage = 'Internal server error'
    if (error.code === '23503') {
      errorMessage = 'Cannot delete user due to existing data dependencies'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})
