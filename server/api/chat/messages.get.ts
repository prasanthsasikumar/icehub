import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../server/utils/auth'

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

  const query = getQuery(event)
  const { withUserId } = query

  if (!withUserId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'withUserId parameter is required'
    })
  }

  // Read messages
  const messagesPath = path.join(process.cwd(), 'server/data/messages.json')
  const messages: Message[] = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))

  // Filter messages between current user and specified user
  const conversation = messages.filter(msg => 
    (msg.senderId === currentUser.id && msg.receiverId === withUserId) ||
    (msg.senderId === withUserId && msg.receiverId === currentUser.id)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  // Mark messages as read (messages received by current user)
  const updatedMessages = messages.map(msg => {
    if (msg.receiverId === currentUser.id && msg.senderId === withUserId && !msg.read) {
      return { ...msg, read: true }
    }
    return msg
  })

  // Save updated messages if there were unread messages
  if (updatedMessages.some((msg, index) => msg.read !== messages[index].read)) {
    fs.writeFileSync(messagesPath, JSON.stringify(updatedMessages, null, 2))
  }

  return {
    messages: conversation
  }
})
