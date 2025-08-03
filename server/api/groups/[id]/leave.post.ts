import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'
import { removeMemberFromGroupChat, type GroupChat } from '../../../../server/utils/chat'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
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

  // Read groups from file
  const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
  const groups: Group[] = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))

  // Find the group
  const groupIndex = groups.findIndex(g => g.id === groupId)
  
  if (groupIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Group not found'
    })
  }

  const group = groups[groupIndex]

  // Check if user is a member or mentor
  const memberIndex = group.members.findIndex(member => member.userId === currentUser.id)
  const mentorIndex = group.mentors.findIndex(mentor => mentor.userId === currentUser.id)
  
  if (memberIndex === -1 && mentorIndex === -1) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User is not part of this group'
    })
  }

  // Remove user from group chat first
  if (group.chatId) {
    removeMemberFromGroupChat(group.chatId, currentUser.id)
  }

  // Remove user from appropriate array
  if (memberIndex !== -1) {
    group.members.splice(memberIndex, 1)
  }
  if (mentorIndex !== -1) {
    group.mentors.splice(mentorIndex, 1)
  }

  // If group becomes empty (no members and no mentors), delete it and its chat
  if (group.members.length === 0 && group.mentors.length === 0) {
    groups.splice(groupIndex, 1)
    
    // Delete the empty group chat
    if (group.chatId) {
      const chatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
      const chats: GroupChat[] = JSON.parse(fs.readFileSync(chatsPath, 'utf8'))
      const updatedChats = chats.filter(chat => chat.id !== group.chatId)
      fs.writeFileSync(chatsPath, JSON.stringify(updatedChats, null, 2))
    }
  } else {
    groups[groupIndex] = group
  }

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  return {
    message: (group.members.length === 0 && group.mentors.length === 0) ? 'Left group and group was deleted (no members left)' : 'Successfully left the group'
  }
})
