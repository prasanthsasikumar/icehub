import { getUserFromRequest } from '../../../../server/utils/auth'
import { Database } from '../../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID is required'
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

  try {
    // Get the team from Supabase
    const team = await Database.getteamById(teamId)

    // Parse members array (includes both members and mentors with role property)
    let members: any[] = []
    
    try {
      if (team.members) {
        if (typeof team.members === 'string') {
          // Try to parse as JSON first
          try {
            members = JSON.parse(team.members)
          } catch (jsonError) {
            // If JSON parse fails, initialize as empty array
            members = []
          }
        } else if (Array.isArray(team.members)) {
          members = team.members
        } else {
          members = []
        }
      }
    } catch (e) {
      // If parsing fails, initialize as empty array
      members = []
    }

    // Ensure all members have the expected structure
    members = members.map((member: any) => {
      if (typeof member === 'string') {
        try {
          return JSON.parse(member)
        } catch {
          return null
        }
      }
      return member
    }).filter(Boolean) // Remove null entries

    // Check if user is in the team
    const memberIndex = members.findIndex((member: any) => member.userId === currentUser.id)
    
    if (memberIndex === -1) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User is not part of this team'
      })
    }

    // Remove user from members array
    members.splice(memberIndex, 1)

    // If team becomes empty, delete it
    if (members.length === 0) {
      await Database.deleteteam(teamId)
      
      return {
        message: 'Left team and team was deleted (no members left)'
      }
    } else {
      // Update the team with new members array (send as array, not JSON string)
      await Database.updateteam(teamId, {
        members: members  // Send as array, let Supabase handle JSONB conversion
      })
      
      return {
        message: 'Successfully left the team'
      }
    }
    
  } catch (error) {
    console.error('Error leaving team:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to leave team'
    })
  }
})
