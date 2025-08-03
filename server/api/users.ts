import { Database } from '../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const users = await Database.getUsers()
    
    // Remove passwords from all users
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
    
    return usersWithoutPasswords
  } catch (error) {
    console.error('Error fetching users:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users'
    })
  }
})
