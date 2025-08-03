import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
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

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
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

  const { receiverId, content } = await readBody(event)

  if (!receiverId || !content || !content.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Receiver ID and message content are required'
    })
  }

  // Read users to get receiver info
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  const receiver = users.find(u => u.id === receiverId)
  if (!receiver) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Receiver not found'
    })
  }

  // Read messages
  const messagesPath = path.join(process.cwd(), 'server/data/messages.json')
  const messages: Message[] = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))

  // Create new message
  const newMessage: Message = {
    id: uuidv4(),
    senderId: currentUser.id,
    senderName: currentUser.name,
    receiverId,
    receiverName: receiver.name,
    content: content.trim(),
    timestamp: new Date().toISOString(),
    read: false
  }

  // Add to messages array
  messages.push(newMessage)

  // Save messages
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2))

  return {
    message: 'Message sent successfully',
    data: newMessage
  }
})
