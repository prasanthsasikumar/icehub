import { Database } from '../../utils/supabase'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Announcement ID is required'
    })
  }
  
  try {
    const body = await readBody(event)
    
    // Get the existing announcement to check permissions
    const existingAnnouncement = await Database.getAnnouncementById(id)
    
    // Check if user has permission to update
    if (existingAnnouncement.author_id !== user.id && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only update your own announcements'
      })
    }
    
    // Prepare updates
    const updates: any = {}
    
    if (body.title !== undefined) {
      updates.title = body.title.trim()
    }
    
    if (body.content !== undefined) {
      updates.content = body.content.trim()
    }
    
    if (body.type !== undefined) {
      // Check if user is admin for certain announcement types
      if (['important', 'urgent'].includes(body.type) && user.role !== 'admin') {
        throw createError({
          statusCode: 403,
          statusMessage: 'Only admins can create important or urgent announcements'
        })
      }
      updates.type = body.type
    }
    
    if (body.is_pinned !== undefined && user.role === 'admin') {
      updates.is_pinned = body.is_pinned
    }
    
    if (body.is_published !== undefined) {
      updates.is_published = body.is_published
    }
    
    if (body.expires_at !== undefined) {
      updates.expires_at = body.expires_at
    }
    
    const updatedAnnouncement = await Database.updateAnnouncement(id, updates)
    
    return {
      success: true,
      data: updatedAnnouncement,
      message: 'Announcement updated successfully'
    }
  } catch (error: any) {
    console.error('Error updating announcement:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update announcement'
    })
  }
})
