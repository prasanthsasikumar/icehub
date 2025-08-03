import fs from 'fs'
import path from 'path'
import { getUserFromRequest, type User } from '../../../server/utils/auth'

interface Message {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  receiverName: string
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  userId: string
  userName: string
  userImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check authentication
  const currentUser = getUserFromRequest(event)
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  // Read messages
  const messagesPath = path.join(process.cwd(), 'server/data/messages.json')
  const messages: Message[] = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))

  // Read users for profile info
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  // Get messages involving current user
  const userMessages = messages.filter(msg => 
    msg.senderId === currentUser.id || msg.receiverId === currentUser.id
  )

  // Group by conversation partner
  const conversationsMap = new Map<string, Conversation>()

  userMessages.forEach(msg => {
    const partnerId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId
    const partnerName = msg.senderId === currentUser.id ? msg.receiverName : msg.senderName
    
    // Find partner user info
    const partnerUser = users.find(u => u.id === partnerId)
    
    if (!conversationsMap.has(partnerId)) {
      conversationsMap.set(partnerId, {
        userId: partnerId,
        userName: partnerName,
        userImage: partnerUser?.image || 'https://via.placeholder.com/40x40/e5e7eb/9ca3af?text=User',
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0
      })
    }

    const conversation = conversationsMap.get(partnerId)!
    
    // Update last message if this is more recent
    if (!conversation.lastMessageTime || new Date(msg.timestamp) > new Date(conversation.lastMessageTime)) {
      conversation.lastMessage = msg.content
      conversation.lastMessageTime = msg.timestamp
    }

    // Count unread messages (messages sent to current user that are unread)
    if (msg.receiverId === currentUser.id && !msg.read) {
      conversation.unreadCount++
    }
  })

  // Convert to array and sort by last message time
  const conversations = Array.from(conversationsMap.values())
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())

  return {
    conversations
  }
})
