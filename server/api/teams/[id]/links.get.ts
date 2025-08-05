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
    // Get shared links for this team
    const links = await Database.getTeamLinks(teamId)
    
    return links || []
  } catch (error: any) {
    console.error('Error fetching team links:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team links'
    })
  }
})
