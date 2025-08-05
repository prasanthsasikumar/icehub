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
  const imageId = getRouterParam(event, 'imageId')
  
  if (!teamId || !imageId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID and Image ID are required'
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
    // Check if user is a member of the team
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
        statusMessage: 'You must be a team member to delete images'
      })
    }

    // Get the image to check ownership
    const images = await Database.getTeamImages(teamId)
    const imageToDelete = images.find((image: any) => image.id === imageId)
    
    if (!imageToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found'
      })
    }

    // Check if user owns the image or is admin
    if (imageToDelete.user_id !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only delete your own images'
      })
    }

    // Delete the image
    await Database.deleteteamImage(imageId)
    
    return { message: 'Image deleted successfully' }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error deleting team image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete image'
    })
  }
})
