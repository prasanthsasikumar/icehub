import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'
import { updateGroupChatName } from '../../../../server/utils/chat'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'PUT') {
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

  // Find the group
  const groupIndex = groups.findIndex(g => g.id === groupId)
  
  if (groupIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Group not found'
    })
  }

  const group = groups[groupIndex]

  // Check if user is a member or mentor of the group
  const isMember = group.members.some(member => member.userId === currentUser.id)
  const isMentor = group.mentors.some(mentor => mentor.userId === currentUser.id)
  
  if (!isMember && !isMentor) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only group members and mentors can manage this group'
    })
  }

  // Check if group name already exists (excluding current group)
  const existingGroup = groups.find(g => g.name.toLowerCase() === name.toLowerCase() && g.id !== groupId)
  if (existingGroup) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Group name already exists'
    })
  }

  // Check if group name is changing and update chat name
  const nameChanged = group.name !== name.trim()

  // Update group data
  groups[groupIndex] = {
    ...group,
    name: name.trim(),
    description: description.trim(),
    coverImage: coverImage || group.coverImage, // Keep existing if not provided
    isPrivate: isPrivate !== undefined ? isPrivate : group.isPrivate
  }

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  // Update group chat name if changed
  if (nameChanged && group.chatId) {
    updateGroupChatName(group.chatId, name.trim())
  }

  return {
    message: 'Group updated successfully',
    group: groups[groupIndex]
  }
})
