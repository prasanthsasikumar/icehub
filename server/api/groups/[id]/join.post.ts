import { getUserFromRequest } from '../../../../server/utils/auth'
import { Database } from '../../../../server/utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const groupId = getRouterParam(event, 'id')
  
  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID is required'
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

  console.log('Current user for group join:', currentUser)

  try {
    // Get the group from Supabase
    const group = await Database.getGroupById(groupId)

    // Use the user's userRole to determine how they join
    const joinAsRole = currentUser.userRole === 'mentor' ? 'mentor' : 'member'

    // Parse members array (mentors are stored within members with role property)
    let members: any[] = []
    
    try {
      if (group.members) {
        if (typeof group.members === 'string') {
          // Try to parse as JSON first
          try {
            members = JSON.parse(group.members)
          } catch (jsonError) {
            // If JSON parse fails, it might be a PostgreSQL array string
            // Initialize as empty array and let the update handle it
            members = []
          }
        } else if (Array.isArray(group.members)) {
          members = group.members
        } else {
          members = []
        }
      }
    } catch (e) {
      // If parsing fails, initialize as empty array
      members = []
    }

    // Ensure all members have the expected structure
    members = members.map((member: any) => {
      if (typeof member === 'string') {
        try {
          return JSON.parse(member)
        } catch {
          return null
        }
      }
      return member
    }).filter(Boolean) // Remove null entries

    // Check if user is already a member (including mentors)
    const isAlreadyMember = members.some((member: any) => member.userId === currentUser.id)
    
    if (isAlreadyMember) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User is already part of this group'
      })
    }

    // Add user to members array with appropriate role
    const newMember = {
      userId: currentUser.id,
      userName: currentUser.name || 'Unknown User',  // Add fallback for missing name
      role: joinAsRole,
      joinedAt: new Date().toISOString()
    }

    console.log('Adding new member:', newMember)
    
    // Verify the userName is not undefined
    if (!currentUser.name) {
      console.warn('Warning: currentUser.name is missing. CurrentUser:', currentUser)
    }

    members.push(newMember)

    console.log('Updated members array:', members)

    // Update the group in Supabase (store as JSONB, not as string)
    console.log('Sending to database:', { members })
    
    const updatedGroup = await Database.updateGroup(groupId, {
      members: members  // Send as array, let Supabase handle JSONB conversion
    })

    console.log('Database update result:', updatedGroup)

    return {
      message: 'Successfully joined the group',
      group: updatedGroup
    }
    
  } catch (error) {
    console.error('Error joining group:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to join group'
    })
  }
})
