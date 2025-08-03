import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../server/utils/auth'
import { type Group, createGroupId, getRandomGroupCover, createChatId } from '../../../server/utils/groups'
import { createGroupChat, type GroupChat } from '../../../server/utils/chat'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  const { name, description, coverImage, isPrivate } = await readBody(event)

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and description are required'
    })
  }

  // Read groups from file
  const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
  const groups: Group[] = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))

  // Check if group name already exists
  const existingGroup = groups.find(g => g.name.toLowerCase() === name.toLowerCase())
  if (existingGroup) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Group name already exists'
    })
  }

  // Create chat ID for the group
  const chatId = createChatId()

  // Create new group
  const newGroup: Group = {
    id: createGroupId(),
    name: name.trim(),
    description: description.trim(),
    coverImage: coverImage || getRandomGroupCover(),
    createdBy: currentUser.id,
    createdAt: new Date().toISOString(),
    members: [
      {
        userId: currentUser.id,
        userName: currentUser.name,
        joinedAt: new Date().toISOString()
      }
    ],
    mentors: [],
    isPrivate: isPrivate || false,
    chatId: chatId
  }

  // Create group chat
  const groupChat = createGroupChat(newGroup.id, newGroup.name, [currentUser.id])
  groupChat.id = chatId // Use the same chat ID

  // Save group
  groups.push(newGroup)
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  // Save group chat
  const chatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
  const chats: GroupChat[] = JSON.parse(fs.readFileSync(chatsPath, 'utf8'))
  chats.push(groupChat)
  fs.writeFileSync(chatsPath, JSON.stringify(chats, null, 2))

  return {
    message: 'Group created successfully',
    group: newGroup
  }
})
