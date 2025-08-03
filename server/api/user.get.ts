import { Database } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { name, id } = query

  if (!name && !id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User name or ID is required'
    })
  }

  try {
    let user = null
    
    // Find user by ID first (more reliable), then by name
    if (id) {
      user = await Database.getUserById(id.toString())
    } else if (name) {
      user = await Database.getUserByName(decodeURIComponent(name.toString()))
    }
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user'
    })
  }
})
