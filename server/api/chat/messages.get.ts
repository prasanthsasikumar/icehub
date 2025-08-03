import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../server/utils/auth'
import { type Message, type GroupChat } from '../../../server/utils/chat'

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
  const { withUserId, chatId } = query

  if (!withUserId && !chatId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Either withUserId or chatId parameter is required'
    })
  }

  // Read messages
  const messagesPath = path.join(process.cwd(), 'server/data/messages.json')
  const messages: Message[] = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))

  let conversation: Message[] = []

  if (chatId) {
    // Group chat messages
    const groupChatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
    const groupChats: GroupChat[] = JSON.parse(fs.readFileSync(groupChatsPath, 'utf8'))
    
    // Check if user is member of this group chat
    const groupChat = groupChats.find(chat => chat.id === chatId)
    if (!groupChat || !groupChat.members.includes(currentUser.id)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to this group chat'
      })
    }

    // Filter group messages
    conversation = messages.filter(msg => 
      msg.chatType === 'group' && msg.chatId === chatId
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    // Mark group messages as read for current user
    const updatedMessages = messages.map(msg => {
      if (msg.chatType === 'group' && msg.chatId === chatId && msg.senderId !== currentUser.id && !msg.read) {
        return { ...msg, read: true }
      }
      return msg
    })

    // Save updated messages if there were unread messages
    if (updatedMessages.some((msg, index) => msg.read !== messages[index].read)) {
      fs.writeFileSync(messagesPath, JSON.stringify(updatedMessages, null, 2))
    }

  } else if (withUserId) {
    // Direct messages
    conversation = messages.filter(msg => 
      msg.chatType !== 'group' &&
      ((msg.senderId === currentUser.id && msg.receiverId === withUserId) ||
      (msg.senderId === withUserId && msg.receiverId === currentUser.id))
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
  }

  return {
    messages: conversation
  }
})
