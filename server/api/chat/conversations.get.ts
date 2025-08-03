import fs from 'fs'
import path from 'path'
import { getUserFromRequest, type User } from '../../../server/utils/auth'
import { type Message, type DirectConversation, type GroupConversation, type GroupChat } from '../../../server/utils/chat'
import { type Group } from '../../../server/utils/groups'

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

  // Read group chats
  const groupChatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
  const groupChats: GroupChat[] = JSON.parse(fs.readFileSync(groupChatsPath, 'utf8'))

  // Read groups for cover images
  const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
  const groups: Group[] = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))

  // Get direct messages involving current user (include messages without chatType for backward compatibility)
  const directMessages = messages.filter(msg => 
    (msg.senderId === currentUser.id || msg.receiverId === currentUser.id) && 
    (msg.chatType !== 'group' || !msg.chatType) // Include messages without chatType
  )

  // Get group messages for chats user is member of
  const userGroupChats = groupChats.filter(chat => chat.members.includes(currentUser.id))
  const groupMessages = messages.filter(msg => 
    msg.chatType === 'group' && 
    msg.chatId && 
    userGroupChats.some(chat => chat.id === msg.chatId)
  )

  // Process direct conversations
  const directConversationsMap = new Map<string, DirectConversation>()

  directMessages.forEach(msg => {
    const partnerId = msg.senderId === currentUser.id ? msg.receiverId! : msg.senderId
    const partnerName = msg.senderId === currentUser.id ? msg.receiverName! : msg.senderName
    
    // Find partner user info
    const partnerUser = users.find(u => u.id === partnerId)
    
    if (!directConversationsMap.has(partnerId)) {
      directConversationsMap.set(partnerId, {
        userId: partnerId,
        userName: partnerName,
        userImage: partnerUser?.image || 'https://via.placeholder.com/40x40/e5e7eb/9ca3af?text=User',
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0
      })
    }

    const conversation = directConversationsMap.get(partnerId)!
    
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

  // Process group conversations
  const groupConversationsMap = new Map<string, GroupConversation>()

  userGroupChats.forEach(groupChat => {
    const group = groups.find(g => g.id === groupChat.groupId)
    
    groupConversationsMap.set(groupChat.id, {
      chatId: groupChat.id,
      groupId: groupChat.groupId,
      groupName: groupChat.groupName,
      groupImage: group?.coverImage || '/uploads/groupCoverSamples/cover1.svg',
      lastMessage: '',
      lastMessageTime: groupChat.lastMessageAt,
      unreadCount: 0,
      memberCount: groupChat.members.length
    })
  })

  // Update group conversations with latest messages
  groupMessages.forEach(msg => {
    if (!msg.chatId) return
    
    const conversation = groupConversationsMap.get(msg.chatId)
    if (!conversation) return
    
    // Update last message if this is more recent
    if (!conversation.lastMessageTime || new Date(msg.timestamp) > new Date(conversation.lastMessageTime)) {
      conversation.lastMessage = msg.content
      conversation.lastMessageTime = msg.timestamp
    }

    // Count unread messages (messages not sent by current user that are unread)
    if (msg.senderId !== currentUser.id && !msg.read) {
      conversation.unreadCount++
    }
  })

  // Convert to arrays and sort by last message time
  const directConversations = Array.from(directConversationsMap.values())
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())

  const groupConversations = Array.from(groupConversationsMap.values())
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())

  return {
    directConversations,
    groupConversations
  }
})
