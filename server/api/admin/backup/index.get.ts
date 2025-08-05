import { getUserFromRequest } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated and is admin
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  if (currentUser.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required'
    })
  }

  try {
    // Return mock backup history for now
    // In a real implementation, you'd store backup metadata in the database
    const backupHistory = [
      {
        id: 'backup-2025-08-05-120000',
        type: 'full',
        createdAt: '2025-08-05T12:00:00.000Z',
        createdBy: 'Admin User',
        size: '15.2 MB',
        includeFiles: true,
        includePasswords: false,
        status: 'completed'
      }
    ]

    return {
      success: true,
      backups: backupHistory,
      totalBackups: backupHistory.length
    }

  } catch (error) {
    console.error('Error fetching backup history:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch backup history'
    })
  }
})
