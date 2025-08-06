import { getUserFromRequest } from '../../../../server/utils/auth'
import { Database } from '../../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'PUT') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required'
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
    const body = await readBody(event)

    // Basic validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Team name is required'
      })
    }

    if (!body.description || typeof body.description !== 'string' || body.description.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Team description is required'
      })
    }

    // Check if team exists and user has permission to update it
    const team = await Database.getTeamById(teamId)
    
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Team not found'
      })
    }

    // Check if user is a team member, creator, or has admin rights
    let isMember = false
    
    // Parse members array to check membership
    if (team.members) {
      let members: any[] = []
      
      try {
        if (typeof team.members === 'string') {
          members = JSON.parse(team.members)
        } else if (Array.isArray(team.members)) {
          members = team.members
        }
      } catch (e) {
        members = []
      }

      // Ensure all members have the expected structure and check membership
      members = members.map((member: any) => {
        if (typeof member === 'string') {
          try {
            return JSON.parse(member)
          } catch {
            return null
          }
        }
        return member
      }).filter(Boolean)

      isMember = members.some((member: any) => member.userId === currentUser.id)
    }

    // Allow team members, creator, or admin to update
    if (!isMember && team.createdBy !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You do not have permission to update this team'
      })
    }

    // Update the team
    const updatedTeam = await Database.updateTeam(teamId, {
      name: body.name.trim(),
      description: body.description.trim(),
      coverImage: body.coverImage || team.coverImage,
      isPublic: body.isPrivate !== undefined ? !body.isPrivate : team.isPublic, // Convert isPrivate to isPublic
      updatedAt: new Date().toISOString()
    })

    return {
      success: true,
      team: {
        ...updatedTeam,
        isPrivate: !updatedTeam.isPublic // Convert isPublic back to isPrivate for frontend
      }
    }

  } catch (error) {
    console.error('Update team error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})