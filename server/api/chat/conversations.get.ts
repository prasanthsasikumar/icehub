/**
 * Get user conversations
 * GET /api/chat/conversations
 */

import { requireAuth } from '../../utils/auth'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Check authentication
    const currentUser = await requireAuth(event)

    let directConversations: any[] = []

    // Get all users for user information
    const users = await Database.getUsers()

    // Get direct message conversations
    try {
      const messages = await Database.getMessages()
      
      // team messages by conversation (sender-receiver pairs)
      const conversationMap = new Map()
      
      messages.forEach((message: any) => {
        // Create conversation key (sorted to ensure consistency)
        const participants = [message.senderId, message.receiverId].sort()
        const conversationKey = participants.join('-')
        
        // Only include conversations where current user is a participant
        if (participants.includes(currentUser.id)) {
          if (!conversationMap.has(conversationKey)) {
            conversationMap.set(conversationKey, {
              id: conversationKey,
              type: 'direct',
              participants,
              messages: [],
              lastMessage: null,
              createdAt: message.timestamp,
              updatedAt: message.timestamp
            })
          }
          
          const conversation = conversationMap.get(conversationKey)
          conversation.messages.push(message)
          
          // Update last message if this is more recent
          if (!conversation.lastMessage || new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
            conversation.lastMessage = message
            conversation.updatedAt = message.timestamp
          }
        }
      })
      
      // Convert to the format expected by the client
      directConversations = Array.from(conversationMap.values()).map((conversation: any) => {
        // Find the other participant (not current user)
        const otherUserId = conversation.participants.find((id: string) => id !== currentUser.id)
        const otherUser = users.find(u => u.id === otherUserId)
        
        return {
          userId: otherUserId,
          userName: otherUser?.name || 'Unknown User',
          userImage: otherUser?.image || '/uploads/default/user-avatar.svg',
          lastMessage: conversation.lastMessage?.content || '',
          lastMessageTime: conversation.lastMessage?.timestamp || conversation.createdAt,
          unreadCount: 0, // TODO: Implement unread count logic
          type: 'direct'
        }
      })
    } catch (error) {
      console.log('No messages found or error reading them:', error)
    }

    return {
      success: true,
      directConversations,
      teamConversations: [] // Empty array since we removed team chat
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Get conversations error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
