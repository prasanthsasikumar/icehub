import { Database } from '../../utils/supabase'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  
  try {
    // Check if user is admin
    if (user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }
    
    const announcements = await Database.getAllAnnouncements()
    
    return {
      success: true,
      data: announcements
    }
  } catch (error: any) {
    console.error('Error fetching all announcements for admin:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch announcements'
    })
  }
})
