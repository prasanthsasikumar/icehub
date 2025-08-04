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
    // Get group images
    const images = await Database.getGroupImages(groupId)
    
    return images || []
  } catch (error: any) {
    console.error('Error fetching group images:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch group images'
    })
  }
})
