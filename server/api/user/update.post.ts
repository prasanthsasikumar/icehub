import fs from 'fs'
import path from 'path'
import { getUserFromRequest, type User, type SkillWithLevel } from '../../../server/utils/auth'

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

  const { name, bio, skills, image } = await readBody(event)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  // Read users from file
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  // Find current user
  const userIndex = users.findIndex(u => u.id === currentUser.id)
  
  if (userIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Check if name is already taken by another user
  const existingUser = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.id !== currentUser.id)
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Name is already taken'
    })
  }

  // Process skills - support both old format (string[]) and new format (SkillWithLevel[])
  let processedSkills: string[] | SkillWithLevel[] = []
  
  if (Array.isArray(skills)) {
    if (skills.length > 0) {
      // Check if it's the new format with levels
      if (typeof skills[0] === 'object' && 'name' in skills[0] && 'level' in skills[0]) {
        // Validate the skill objects
        processedSkills = skills.filter((skill: any) => 
          skill.name && 
          typeof skill.name === 'string' && 
          skill.level && 
          typeof skill.level === 'number' && 
          skill.level >= 1 && 
          skill.level <= 5
        )
      } else {
        // Old format - just string array
        processedSkills = skills.filter((skill: any) => typeof skill === 'string' && skill.trim().length > 0)
      }
    }
  }

  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    name: name,
    bio: bio || '',
    image: image || users[userIndex].image, // Keep existing image if not provided
    skills: processedSkills
  }

  // Save to file
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))

  // Return updated user data (without password)
  const updatedUser = users[userIndex]
  return {
    message: 'Profile updated successfully',
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      role: updatedUser.role
    }
  }
})
