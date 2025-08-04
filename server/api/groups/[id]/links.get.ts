import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
    })
  }

  try {
    // Get shared links for this group
    const links = await Database.getGroupLinks(groupId)
    
    return links || []
  } catch (error: any) {
    console.error('Error fetching group links:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch group links'
    })
  }
})
