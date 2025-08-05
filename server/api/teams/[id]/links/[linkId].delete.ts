import { getUserFromRequest } from '../../../../utils/auth'
import { Database } from '../../../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const teamId = getRouterParam(event, 'id')
  const linkId = getRouterParam(event, 'linkId')
  
  if (!teamId || !linkId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID and Link ID are required'
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
    // Check if user is a member of the team and owns the link (or is admin)
    const team = await Database.getteamById(teamId)
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: 'team not found'
      })
    }

    const parsedMembers = team.members ? 
      team.members.map((member: any) => {
        try {
          return typeof member === 'string' ? JSON.parse(member) : member
        } catch (e) {
          return member
        }
      }) : []
    
    const isMember = parsedMembers.some((member: any) => member.userId === currentUser.id)
    
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You must be a team member to delete links'
      })
    }

    // Get the link to check ownership
    const links = await Database.getTeamLinks(teamId)
    const linkToDelete = links.find((link: any) => link.id === linkId)
    
    if (!linkToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Link not found'
      })
    }

    // Check if user owns the link or is admin
    if (linkToDelete.user_id !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only delete your own links'
      })
    }

    // Delete the link
    await Database.deleteteamLink(linkId)
    
    return { message: 'Link deleted successfully' }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error deleting team link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete shared link'
    })
  }
})
