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

  try {
    // Check if user is a member of the group
    const group = await Database.getGroupById(groupId)
    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group not found'
      })
    }

    const parsedMembers = group.members ? 
      group.members.map((member: any) => {
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
        statusMessage: 'You must be a group member to upload images'
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
      imageFile.filename || 'group-image.jpg',
      imageFile.type || 'image/jpeg'
    )
    
    console.log('Upload result:', uploadResult)
    
    if (!uploadResult || !uploadResult.success || !uploadResult.url) {
      throw createError({
        statusCode: 500,
        statusMessage: uploadResult?.error || 'Failed to upload image'
      })
    }

    // Create image record
    const newImage = {
      group_id: groupId,
      created_by: currentUser.id,
      image_url: uploadResult.url,
      filename: uploadResult.filename
    }

    console.log('Creating image record:', newImage)
    const createdImage = await Database.createGroupImage(newImage)
    console.log('Created image record:', createdImage)
    
    return createdImage
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error uploading group image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})
