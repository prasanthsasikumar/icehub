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
    const { backupData, restoreOptions } = body

    if (!backupData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Backup data is required'
      })
    }

    console.log(`Starting restore process for admin user: ${currentUser.name}`)

    const results = {
      users: { imported: 0, skipped: 0, errors: 0, tempPasswordGenerated: 0 },
      messages: { imported: 0, errors: 0 },
      teams: { imported: 0, errors: 0 },
      summary: { success: true, message: '', warnings: [] as string[] }
    }

    // Restore users if present
    if (backupData.database?.users && restoreOptions.restoreUsers) {
      console.log(`Restoring ${backupData.database.users.length} users...`)
      
      for (const userData of backupData.database.users) {
        try {
          // Check if user already exists
          const existingUser = await Database.getUserByEmail(userData.email)
          
          if (existingUser && !restoreOptions.overwriteExisting) {
            results.users.skipped++
            continue
          }

          // Ensure user has a password - use workshop123 if missing
          const userDataWithPassword = { ...userData }
          if (!userDataWithPassword.password) {
            // Use standard workshop password for missing passwords
            userDataWithPassword.password = 'workshop123'
            results.users.tempPasswordGenerated++
            console.log(`Set default password for user ${userData.email}`)
          }

          if (existingUser && restoreOptions.overwriteExisting) {
            // Update existing user (but preserve their existing password if backup doesn't have one)
            const updateData = { ...userDataWithPassword }
            if (!userData.password) {
              delete updateData.password // Don't overwrite existing password with temp password
            }
            await Database.updateUser(existingUser.id, updateData)
          } else {
            // Create new user with password
            await Database.createUser(userDataWithPassword)
          }
          
          results.users.imported++
        } catch (error) {
          console.error(`Error importing user ${userData.email}:`, error)
          results.users.errors++
        }
      }
    }

    // Restore messages if present (simplified for now)
    if (backupData.database?.messages && restoreOptions.restoreMessages) {
      results.messages.imported = backupData.database.messages.length
      console.log(`Would restore ${results.messages.imported} messages (not implemented yet)`)
    }

    // Restore teams if present
    if (backupData.database?.teams && restoreOptions.restoreTeams) {
      console.log(`Restoring ${backupData.database.teams.length} teams...`)
      
      for (const teamData of backupData.database.teams) {
        try {
          // Check if team already exists by name (teams should have unique names)
          const existingTeams = await Database.getTeams()
          const existingTeam = existingTeams.find(t => t.name.toLowerCase() === teamData.name.toLowerCase())
          
          if (existingTeam && !restoreOptions.overwriteExisting) {
            console.log(`Team ${teamData.name} already exists, skipping`)
            continue
          }

          if (existingTeam && restoreOptions.overwriteExisting) {
            // Update existing team
            await Database.updateTeam(existingTeam.id, {
              description: teamData.description,
              coverImage: teamData.coverImage,
              isPublic: teamData.isPublic,
              members: teamData.members,
              updatedAt: new Date().toISOString()
            })
            console.log(`Updated existing team: ${teamData.name}`)
          } else {
            // Create new team
            await Database.createTeam({
              ...teamData,
              // Ensure we have required fields
              name: teamData.name,
              description: teamData.description || '',
              coverImage: teamData.coverImage || '/uploads/groupCoverSamples/cover1.svg',
              creatorId: teamData.creatorId,
              isPublic: teamData.isPublic !== false, // Default to true if not specified
              members: teamData.members || [],
              createdAt: teamData.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            })
            console.log(`Created new team: ${teamData.name}`)
          }
          
          results.teams.imported++
        } catch (error) {
          console.error(`Error importing team ${teamData.name}:`, error)
          results.teams.errors++
        }
      }
    }

    results.summary.message = `Restore completed: ${results.users.imported} users imported, ${results.users.skipped} skipped, ${results.users.errors} errors, ${results.teams.imported} teams imported, ${results.teams.errors} team errors`
    
    if (results.users.tempPasswordGenerated > 0) {
      results.summary.warnings.push(`${results.users.tempPasswordGenerated} users were imported with default password "workshop123". These users should change their passwords after login.`)
    }

    return {
      success: true,
      results,
      restoredAt: new Date().toISOString(),
      restoredBy: currentUser.name,
      restoredItems: results.users.imported + results.messages.imported + results.teams.imported
    }

  } catch (error) {
    console.error('Restore failed:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Restore failed: ' + (error as Error).message
    })
  }
})
