import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
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

  const { name, description, coverImage, isPublic = true } = await readBody(event)

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and description are required'
    })
  }

  try {
    // Check if group name already exists
    const existingGroups = await Database.getGroups()
    const existingGroup = existingGroups.find(g => g.name.toLowerCase() === name.toLowerCase())
    
    if (existingGroup) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Group name already exists'
      })
    }

    // Create new group with creator as first member
    const newGroup = await Database.createGroup({
      name: name.trim(),
      description: description.trim(),
      coverImage: coverImage || '/uploads/groupCoverSamples/cover1.svg',
      creatorId: currentUser.id,
      isPublic,
      members: [
        {
          userId: currentUser.id,
          userName: currentUser.name,
          joinedAt: new Date().toISOString()
        }
      ]
    })

    return {
      message: 'Group created successfully',
      group: newGroup
    }
  } catch (error) {
    console.error('Error creating group:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create group'
    })
  }
})
