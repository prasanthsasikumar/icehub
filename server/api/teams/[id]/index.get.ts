import { Database } from '../../../utils/supabase'
import { getUserFromRequest } from '../../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID is required'
    })
  }

  try {
    // Get current user (optional)
    const currentUser = getUserFromRequest(event)

    // Get team from Supabase
    const team = await Database.getteamById(teamId)
    
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: 'team not found'
      })
    }

    // Check if user can view this team
    const parsedMembers = team.members ? 
      team.members.map((member: any) => {
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
    
    if (!team.isPublic && !isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to private team'
      })
    }

    // Return full team details with proper field mapping
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      coverImage: team.coverImage || '/uploads/teamCoverSamples/cover1.svg',
      createdBy: team.creatorId,
      createdAt: team.createdAt,
      isPrivate: !team.isPublic, // Convert isPublic to isPrivate
      members: regularMembers,
      mentors: mentors,
      isMember: isMember,
      userRole: isMember ? 'member' : null
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error fetching team:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
