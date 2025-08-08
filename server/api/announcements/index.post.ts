import { Database } from '../../utils/supabase'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  
  try {
    const body = await readBody(event)
    
    // Validate required fields
    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
      })
    }
    
    // Check if user is admin for certain announcement types
    if (['important', 'urgent'].includes(body.type) && user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Only admins can create important or urgent announcements'
      })
    }
    
    const announcement = {
      title: body.title.trim(),
      content: body.content.trim(),
      type: body.type || 'general',
      author_id: user.id,
      author_name: user.name,
      is_pinned: user.role === 'admin' ? (body.is_pinned || false) : false,
      is_published: body.is_published !== false, // Default to true
      expires_at: body.expires_at || null
    }
    
    const createdAnnouncement = await Database.createAnnouncement(announcement)
    
    return {
      success: true,
      data: createdAnnouncement,
      message: 'Announcement created successfully'
    }
  } catch (error: any) {
    console.error('Error creating announcement:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create announcement'
    })
  }
})
