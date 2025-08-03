import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'
import { addMemberToGroupChat } from '../../../../server/utils/chat'

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

  // Use the user's userRole to determine how they join
  const joinAsRole = currentUser.userRole === 'mentor' ? 'mentor' : 'member'

  // Check if user is already a member or mentor
  const isAlreadyMember = group.members.some(member => member.userId === currentUser.id)
  const isAlreadyMentor = group.mentors.some(mentor => mentor.userId === currentUser.id)
  
  if (isAlreadyMember || isAlreadyMentor) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User is already part of this group'
    })
  }

  // Add user to appropriate array
  if (joinAsRole === 'mentor') {
    group.mentors.push({
      userId: currentUser.id,
      userName: currentUser.name,
      joinedAt: new Date().toISOString()
    })
  } else {
    group.members.push({
      userId: currentUser.id,
      userName: currentUser.name,
      joinedAt: new Date().toISOString()
    })
  }

  // Update the group in the array
  groups[groupIndex] = group

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  // Add user to group chat
  if (group.chatId) {
    addMemberToGroupChat(group.chatId, currentUser.id)
  }

  return {
    message: 'Successfully joined the group',
    group: group
  }
})
