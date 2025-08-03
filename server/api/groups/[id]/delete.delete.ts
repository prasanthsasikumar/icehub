import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
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

  // Check if user is a member of the group
  const isMember = group.members.some(member => member.userId === currentUser.id)
  
  if (!isMember) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only group members can delete this group'
    })
  }

  // Remove the group
  groups.splice(groupIndex, 1)

  // Save to file
  fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 2))

  return {
    message: 'Group deleted successfully'
  }
})
