import { getUserFromRequest, type User } from '../../../server/utils/auth'
import { ensureUserImage } from '../../../server/utils/image'
import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  const authUser = getUserFromRequest(event)
  
  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }
  
  try {
    // Get complete user data from Supabase
    const fullUser = await Database.getUserById(authUser.id)
    
    if (!fullUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    
    // Return complete user data (without password) with ensured image
    return { 
      user: {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        image: ensureUserImage(fullUser.image),
        bio: fullUser.bio,
        skills: fullUser.skills,
        role: fullUser.role,
        userRole: fullUser.userRole,
        affiliation: fullUser.affiliation,
        gender: fullUser.gender,
        createdAt: fullUser.createdAt
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user data'
    })
  }
})
