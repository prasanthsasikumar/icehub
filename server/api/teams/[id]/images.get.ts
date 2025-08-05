import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID is required'
    })
  }

  try {
    // Get team images
    const images = await Database.getTeamImages(teamId)
    
    return images || []
  } catch (error: any) {
    console.error('Error fetching team images:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team images'
    })
  }
})
