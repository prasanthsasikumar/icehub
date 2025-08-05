import { getUserFromRequest } from '../../../../server/utils/auth'
import { Database } from '../../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID is required'
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
    // Get the team from Supabase
    const team = await Database.getteamById(teamId)
    
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: 'team not found'
      })
    }

    // Check if user is the creator or an admin
    if (team.creatorId !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only the team creator or admin can delete this team'
      })
    }

    // Delete the team from Supabase
    await Database.deleteteam(teamId)

    return {
      message: 'team deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting team:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete team'
    })
  }
})
