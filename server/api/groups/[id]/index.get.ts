import fs from 'fs'
import path from 'path'
import { getUserFromRequest } from '../../../../server/utils/auth'
import { type Group } from '../../../../server/utils/groups'

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
    })
  }

  // Get current user (optional)
  const currentUser = getUserFromRequest(event)

  // Read groups from file
  const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
  const groups: Group[] = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))

  // Find the group
  const group = groups.find(g => g.id === groupId)
  
  if (!group) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Group not found'
    })
  }

  // Check if user can view this group
  const isMember = currentUser ? group.members.some(member => member.userId === currentUser.id) : false
  const isMentor = currentUser ? group.mentors.some(mentor => mentor.userId === currentUser.id) : false
  const isGroupMember = isMember || isMentor
  
  if (group.isPrivate && !isGroupMember) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied to private group'
    })
  }

  // Return full group details
  return {
    ...group,
    isMember: isGroupMember,
    userRole: isMember ? 'member' : (isMentor ? 'mentor' : null)
  }
})
