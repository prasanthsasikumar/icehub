import { Database } from '../../utils/supabase'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Announcement ID is required'
      })
    }
    
    // Get the announcement first to check permissions
    const announcement = await Database.getAnnouncementById(id)
    
    if (!announcement) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Announcement not found'
      })
    }
    
    // Check if user is admin or the author of the announcement
    if (user.role !== 'admin' && user.id !== announcement.author_id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only delete your own announcements or be an admin'
      })
    }
    
    const deletedAnnouncement = await Database.deleteAnnouncement(id)
    
    return {
      success: true,
      data: deletedAnnouncement,
      message: 'Announcement deleted successfully'
    }
  } catch (error: any) {
    console.error('Error deleting announcement:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete announcement'
    })
  }
})