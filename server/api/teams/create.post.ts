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

  const { name, description, coverImage, isPrivate = false } = await readBody(event)
  const isPublic = !isPrivate // Convert isPrivate to isPublic

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and description are required'
    })
  }

  try {
    // Check if team name already exists
    const existingteams = await Database.getteams()
    const existingteam = existingteams.find(g => g.name.toLowerCase() === name.toLowerCase())
    
    if (existingteam) {
      throw createError({
        statusCode: 409,
        statusMessage: 'team name already exists'
      })
    }

    // Create new team with creator as first member
    const newteam = await Database.createteam({
      name: name.trim(),
      description: description.trim(),
      coverImage: coverImage || '/uploads/teamCoverSamples/cover1.svg',
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
      message: 'team created successfully',
      team: {
        ...newteam,
        isPrivate: !newteam.isPublic // Convert isPublic to isPrivate for frontend
      }
    }
  } catch (error) {
    console.error('Error creating team:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create team'
    })
  }
})
