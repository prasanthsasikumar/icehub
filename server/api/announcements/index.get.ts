import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const announcements = await Database.getAnnouncements()
    
    return {
      success: true,
      data: announcements
    }
  } catch (error) {
    console.error('Error fetching announcements:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch announcements'
    })
  }
})
