import { readFile } from 'fs/promises'

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
    const file = 'server/data/users.json'
    const users = JSON.parse(await readFile(file, 'utf-8'))
    
    let user = null
    
    // Find user by ID first (more reliable), then by name
    if (id) {
      user = users.find(u => u.id === id.toString())
    } else if (name) {
      user = users.find(u => 
        u.name.toLowerCase() === decodeURIComponent(name.toString()).toLowerCase()
      )
    }
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    return user
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
