import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Announcement ID is required'
    })
  }
  
  try {
    const announcement = await Database.getAnnouncementById(id)
    
    return {
      success: true,
      data: announcement
    }
  } catch (error) {
    console.error('Error fetching announcement:', error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Announcement not found'
    })
  }
})
