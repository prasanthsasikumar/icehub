import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'

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

  // Check if user is a member
  const memberIndex = group.members.findIndex(member => member.userId === currentUser.id)
  
  if (memberIndex === -1) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User is not a member of this group'
    })
  }

  // Remove user from group
  group.members.splice(memberIndex, 1)

  // If group becomes empty, delete it
  if (group.members.length === 0) {
    groups.splice(groupIndex, 1)
  } else {
    groups[groupIndex] = group
  }

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  return {
    message: group.members.length === 0 ? 'Left group and group was deleted (no members left)' : 'Successfully left the group'
  }
})
