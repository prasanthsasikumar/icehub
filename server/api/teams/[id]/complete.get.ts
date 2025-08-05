import { Database } from '../../../utils/supabase'
import { getUserFromRequest } from '../../../utils/auth'

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

    // Fetch all data in parallel for better performance
    const queryStartTime = Date.now()
    const [team, links, images] = await Promise.all([
      Database.getteamById(teamId),
      Database.getTeamLinks(teamId).catch(() => []), // Fallback to empty array on error
      Database.getTeamImages(teamId).catch(() => [])  // Fallback to empty array on error
    ])
    
    const dbTime = Date.now() - queryStartTime
    console.log(`🚀 Complete endpoint: Database queries completed in ${dbTime}ms`)
    
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
    
    // Get user details for all members to determine their roles
    const membersWithRoles: any[] = []
    const mentors: any[] = []
    
    console.log(`🚀 Database Optimization: Fetching user details for ${parsedMembers.length} members in batch`)
    const userQueryStartTime = Date.now()
    
    // Batch fetch all user details in a single query
    const userIds = parsedMembers.map((member: any) => member.userId)
    const userDetails = await Database.getUsersByIds(userIds)
    
    const userQueryTime = Date.now() - userQueryStartTime
    console.log(`✅ Batch query completed in ${userQueryTime}ms. Retrieved ${userDetails.length} user records`)
    
    // Create a map for quick lookup of user details
    const userDetailsMap = new Map()
    userDetails.forEach(user => {
      userDetailsMap.set(user.id, user)
    })
    
    // Process members with their roles
    for (const member of parsedMembers) {
      try {
        const userDetail = userDetailsMap.get(member.userId)
        if (userDetail) {
          const memberWithRole = {
            ...member,
            userRole: userDetail.userRole || 'participant'
          }
          
          if (userDetail.userRole === 'mentor') {
            mentors.push(memberWithRole)
          } else {
            membersWithRoles.push(memberWithRole)
          }
        } else {
          // If we can't find user details, treat as regular member
          membersWithRoles.push(member)
        }
      } catch (error) {
        console.error('Error processing member:', member.userId, error)
        // If we can't process member, treat as regular member
        membersWithRoles.push(member)
      }
    }
    
    const isMember = currentUser ? 
      parsedMembers.some((member: any) => member.userId === currentUser.id) : false
    
    if (!team.isPublic && !isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied to private team'
      })
    }

    // Return complete team data with all related information
    return {
      team: {
        id: team.id,
        name: team.name,
        description: team.description,
        coverImage: team.coverImage || '/uploads/teamCoverSamples/cover1.svg',
        createdBy: team.creatorId,
        createdAt: team.createdAt,
        isPrivate: !team.isPublic, // Convert isPublic to isPrivate
        members: membersWithRoles,
        mentors: mentors,
        isMember: isMember,
        userRole: isMember ? 'member' : null
      },
      links: links || [],
      images: images || []
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error fetching complete team data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
