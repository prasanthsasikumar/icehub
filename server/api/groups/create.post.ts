import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../server/utils/auth'
import { type Group, createGroupId, getRandomGroupCover } from '../../../server/utils/groups'

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
    isPrivate: isPrivate || false
  }

  // Add to groups array
  groups.push(newGroup)

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  return {
    message: 'Group created successfully',
    group: newGroup
  }
})
