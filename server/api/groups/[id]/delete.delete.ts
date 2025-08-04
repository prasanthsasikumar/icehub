import { getUserFromRequest } from '../../../../server/utils/auth'
import { Database } from '../../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
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

  try {
    // Get the group from Supabase
    const group = await Database.getGroupById(groupId)
    
    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group not found'
      })
    }

    // Check if user is the creator or an admin
    if (group.creatorId !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only the group creator or admin can delete this group'
      })
    }

    // Delete the group from Supabase
    await Database.deleteGroup(groupId)

    return {
      message: 'Group deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete group'
    })
  }
})
