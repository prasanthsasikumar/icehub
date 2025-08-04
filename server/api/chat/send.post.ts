/**
 * Send a message
 * POST /api/chat/send
 */

import { requireAuth } from '../../utils/auth'
import { Database } from '../../utils/supabase'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const currentUser = await requireAuth(event)
    
    // Get request body
    const body = await readBody(event)
    const { content, receiverId, chatType } = body
    
    if (!content || !content.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message content is required'
      })
    }
    
    if (chatType !== 'direct') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Only direct messages are supported'
      })
    }
    
    if (!receiverId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'receiverId is required for direct messages'
      })
    }

    // Get receiver information
    const receiver = await Database.getUserById(receiverId)
    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Receiver not found'
      })
    }

    // Create new message
    const newMessage = {
      id: uuidv4(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: receiverId,
      receiverName: receiver.name, // Add receiver name
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false
    }

    // Save message to database
    await Database.createMessage(newMessage)

    return {
      success: true,
      message: newMessage
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Send message error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})