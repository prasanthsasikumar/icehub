import { Database } from '../../../utils/supabase'
import { getUserFromRequest } from '../../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
    })
  }

  try {
    // Get current user (optional)
    const currentUser = getUserFromRequest(event)

    // Get group from Supabase
    const group = await Database.getGroupById(groupId)
    
    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group not found'
      })
    }

    // Check if user can view this group
    const parsedMembers = group.members ? 
      group.members.map((member: any) => {
        try {
          return typeof member === 'string' ? JSON.parse(member) : member
        } catch (e) {
          console.error('Error parsing member:', member, e)
          return member
        }
      }) : []
    
    // Separate members and mentors based on role
    const regularMembers = parsedMembers.filter((member: any) => member.role !== 'mentor')
    const mentors = parsedMembers.filter((member: any) => member.role === 'mentor')
    
    const isMember = currentUser ? 
      parsedMembers.some((member: any) => member.userId === currentUser.id) : false
    
    if (!group.isPublic && !isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to private group'
      })
    }

    // Return full group details with proper field mapping
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      coverImage: group.coverImage || '/uploads/groupCoverSamples/cover1.svg',
      createdBy: group.creatorId,
      createdAt: group.createdAt,
      isPrivate: !group.isPublic, // Convert isPublic to isPrivate
      members: regularMembers,
      mentors: mentors,
      isMember: isMember,
      userRole: isMember ? 'member' : null
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error fetching group:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
