import fs from 'fs'
import path from 'path'
import { getUserFromRequest, type User } from '../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated and is admin
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser || currentUser.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  const { userId, newRole } = await readBody(event)

  if (!userId || !newRole || !['user', 'admin'].includes(newRole)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid userId and newRole are required'
    })
  }

  // Read users from file
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users: User[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))

  // Find user to update
  const userIndex = users.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Prevent admin from removing their own admin privileges
  if (users[userIndex].id === currentUser.id && newRole === 'user') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot remove your own admin privileges'
    })
  }

  // Update user role
  users[userIndex].role = newRole

  // Save to file
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))

  return {
    message: `User role updated to ${newRole}`,
    user: {
      id: users[userIndex].id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      role: users[userIndex].role
    }
  }
})
