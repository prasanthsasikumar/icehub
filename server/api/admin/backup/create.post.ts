import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
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
    const body = await readBody(event)
    const backupType = body.type || 'full'
    const includeFiles = body.includeFiles !== false
    const includePasswords = body.includePasswords === true

    console.log(`Creating ${backupType} backup for admin user: ${currentUser.name}`)

    // Create backup data structure
    const backupData: any = {
      metadata: {
        id: `backup-${Date.now()}`,
        type: backupType,
        createdAt: new Date().toISOString(),
        createdBy: currentUser.name,
        includeFiles,
        includePasswords,
        version: '1.0.0'
      },
      database: {},
      externalResources: {}
    }

    // Export database data
    if (backupType === 'full' || backupType === 'database' || backupType === 'users') {
      // Export users
      const users = await Database.getAllUsers()
      const processedUsers = users.map((user: any) => {
        const userCopy = { ...user }
        if (!includePasswords) {
          delete userCopy.password
        }
        return userCopy
      })
      backupData.database.users = processedUsers

      if (backupType === 'full' || backupType === 'database') {
        // Export other tables with error handling
        try {
          backupData.database.messages = await Database.getAllMessages()
        } catch (error) {
          console.warn('Could not export messages:', error)
          backupData.database.messages = []
        }

        try {
          backupData.database.teams = await Database.getAllTeams()
        } catch (error) {
          console.warn('Could not export teams:', error)
          backupData.database.teams = []
        }

        try {
          backupData.database.team_chats = await Database.getAllTeamChats()
        } catch (error) {
          console.warn('Could not export team chats:', error)
          backupData.database.team_chats = []
        }

        try {
          backupData.database.team_links = await Database.getAllTeamLinks()
        } catch (error) {
          console.warn('Could not export team links:', error)
          backupData.database.team_links = []
        }

        try {
          backupData.database.team_images = await Database.getAllTeamImages()
        } catch (error) {
          console.warn('Could not export team images:', error)
          backupData.database.team_images = []
        }
      }

      // Create external resources catalog
      backupData.externalResources = createExternalResourcesCatalog(processedUsers)
    }

    // Add restore instructions
    backupData.restoreInstructions = createRestoreInstructions(backupType, includeFiles, includePasswords)

    // Return the backup data object (Nuxt will handle JSON serialization)
    return backupData

  } catch (error) {
    console.error('Backup creation error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create backup: ' + (error as Error).message
    })
  }
})

// Create catalog of external resources
function createExternalResourcesCatalog(users: any[]) {
  const externalResources: any = {
    googleDriveLinks: [],
    userLinks: [],
    videoLinks: []
  }

  for (const user of users) {
    // Collect Google Drive image links
    if (user.image && user.image.includes('drive.google.com')) {
      externalResources.googleDriveLinks.push({
        userId: user.id,
        userName: user.name,
        type: 'profile_image',
        url: user.image
      })
    }

    // Collect video links
    if (user.video && user.video.trim()) {
      externalResources.videoLinks.push({
        userId: user.id,
        userName: user.name,
        url: user.video
      })
    }

    // Collect user links
    if (user.user_links) {
      try {
        const links = typeof user.user_links === 'string' ? JSON.parse(user.user_links) : user.user_links
        if (Array.isArray(links) && links.length > 0) {
          externalResources.userLinks.push({
            userId: user.id,
            userName: user.name,
            links: links
          })
        }
      } catch (error) {
        console.warn(`Error parsing user links for ${user.name}:`, error)
      }
    }
  }

  return externalResources
}

// Generate restore instructions
function createRestoreInstructions(type: string, includeFiles: boolean, includePasswords: boolean): string {
  return `# ICE2025 Backup Restore Instructions

## Backup Information
- Type: ${type}
- Files Included: ${includeFiles ? 'Yes' : 'No'}
- Passwords Included: ${includePasswords ? 'Yes' : 'No'}
- Created: ${new Date().toISOString()}

## Restore Process

### 1. Database Restoration

#### Users Table
Use the admin bulk import feature with the data from database.users array

#### Other Tables
Import data from:
- database.messages
- database.teams
- database.team_chats
- database.team_links
- database.team_images

### 2. External Resources

Check externalResources for:
- Google Drive links that need to be accessible
- User-submitted external links  
- Video links (YouTube, Google Drive, etc.)

### 3. Post-Restore Steps

1. Verify database connections
2. Test file uploads and image serving
3. Check user authentication (${includePasswords ? 'passwords included' : 'passwords need to be reset'})
4. Validate external link accessibility

## Support

For technical support, contact the system administrator.
Created by ICE2025 Backup System v1.0.0
`
}
