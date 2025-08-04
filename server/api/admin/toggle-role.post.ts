import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../../server/utils/supabase'

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

  const { userId, newRole } = await readBody(event)

  if (!userId || !newRole || !['user', 'admin'].includes(newRole)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid userId and newRole are required'
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

    // Prevent admin from removing their own admin privileges
    if (user.id === currentUser.id && newRole === 'user') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cannot remove your own admin privileges'
      })
    }

    // Update user role in Supabase
    const updatedUser = await Database.updateUser(userId, { role: newRole })

    return {
      message: `User role updated to ${newRole}`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    }
  } catch (error) {
    console.error('Error updating user role:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user role'
    })
  }
})
