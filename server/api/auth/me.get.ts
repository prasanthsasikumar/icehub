import fs from 'fs'
import path from 'path'
import { getUserFromRequest, type User } from '../../../server/utils/auth'
import { ensureUserImage } from '../../../server/utils/image'

export default defineEventHandler(async (event) => {
  const authUser = getUserFromRequest(event)
  
  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }
  
  // Read users from file to get complete user data
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
  
  // Find the complete user data
  const fullUser = users.find(u => u.id === authUser.id)
  
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
      createdAt: fullUser.createdAt
    }
  }
})
