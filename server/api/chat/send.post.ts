import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { getUserFromRequest, type User } from '../../../server/utils/auth'
import { type Message, type GroupChat, createMessageId } from '../../../server/utils/chat'

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

  const { receiverId, content, chatId, chatType } = await readBody(event)

  if (!content || !content.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message content is required'
    })
  }

  if (!receiverId && !chatId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Either receiverId or chatId is required'
    })
  }

  // Read messages
  const messagesPath = path.join(process.cwd(), 'server/data/messages.json')
  const messages: Message[] = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))

  let newMessage: Message

  if (chatId && chatType === 'group') {
    // Group message
    const groupChatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
    const groupChats: GroupChat[] = JSON.parse(fs.readFileSync(groupChatsPath, 'utf8'))
    
    const groupChat = groupChats.find(chat => chat.id === chatId)
    if (!groupChat) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group chat not found'
      })
    }

    if (!groupChat.members.includes(currentUser.id)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You are not a member of this group chat'
      })
    }

    newMessage = {
      id: createMessageId(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      chatId,
      chatType: 'group'
    }

    // Update group chat's last message time
    const chatIndex = groupChats.findIndex(chat => chat.id === chatId)
    if (chatIndex !== -1) {
      groupChats[chatIndex].lastMessageAt = newMessage.timestamp
      fs.writeFileSync(groupChatsPath, JSON.stringify(groupChats, null, 2))
    }

  } else if (receiverId) {
    // Direct message
    const usersPath = path.join(process.cwd(), 'server/data/users.json')
    const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

    const receiver = users.find(u => u.id === receiverId)
    if (!receiver) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Receiver not found'
      })
    }

    newMessage = {
      id: uuidv4(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      receiverName: receiver.name,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      chatType: 'direct'
    }
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid message parameters'
    })
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
