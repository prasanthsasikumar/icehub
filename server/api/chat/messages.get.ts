/**
 * Get messages for a conversation
 * GET /api/chat/messages?withUserId=USER_ID
 */

import { requireAuth } from '../../utils/auth'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const currentUser = await requireAuth(event)
    
    // Get query parameters
    const query = getQuery(event)
    const { withUserId } = query
    
    if (!withUserId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'withUserId parameter is required'
      })
    }

    // Get messages between current user and the specified user
    const allMessages = await Database.getMessages()
    
    // Filter messages between the two users
    const messages = allMessages.filter((message: any) => 
      (message.senderId === currentUser.id && message.receiverId === withUserId) ||
      (message.senderId === withUserId && message.receiverId === currentUser.id)
    ).sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    return {
      success: true,
      messages
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Get messages error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})