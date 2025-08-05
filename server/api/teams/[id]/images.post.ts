import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'
import { uploadImageBuffer } from '../../../utils/image'

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
        statusMessage: 'You must be a team member to upload images'
      })
    }

    // Parse multipart form data
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No image file provided'
      })
    }

    const imageFile = formData.find(field => field.name === 'image')
    
    if (!imageFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Image field is required'
      })
    }

    // Upload image
    const uploadResult = await uploadImageBuffer(
      imageFile.data, 
      imageFile.filename || 'team-image.jpg',
      imageFile.type || 'image/jpeg'
    )
    
    if (!uploadResult || !uploadResult.success || !uploadResult.url) {
      throw createError({
        statusCode: 500,
        statusMessage: uploadResult?.error || 'Failed to upload image'
      })
    }

    // Create image record
    const newImage = {
      team_id: teamId,
      created_by: currentUser.id,
      image_url: uploadResult.url,
      filename: uploadResult.filename
    }

    const createdImage = await Database.createteamImage(newImage)
    
    return createdImage
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error uploading team image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})
