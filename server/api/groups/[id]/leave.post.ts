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

  try {
    // Get the group from Supabase
    const group = await Database.getGroupById(groupId)

    // Parse members array (includes both members and mentors with role property)
    let members: any[] = []
    
    try {
      if (group.members) {
        if (typeof group.members === 'string') {
          // Try to parse as JSON first
          try {
            members = JSON.parse(group.members)
          } catch (jsonError) {
            // If JSON parse fails, initialize as empty array
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

    // Check if user is in the group
    const memberIndex = members.findIndex((member: any) => member.userId === currentUser.id)
    
    if (memberIndex === -1) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User is not part of this group'
      })
    }

    // Remove user from members array
    members.splice(memberIndex, 1)

    // If group becomes empty, delete it
    if (members.length === 0) {
      await Database.deleteGroup(groupId)
      
      return {
        message: 'Left group and group was deleted (no members left)'
      }
    } else {
      // Update the group with new members array (send as array, not JSON string)
      await Database.updateGroup(groupId, {
        members: members  // Send as array, let Supabase handle JSONB conversion
      })
      
      return {
        message: 'Successfully left the group'
      }
    }
    
  } catch (error) {
    console.error('Error leaving group:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to leave group'
    })
  }
})
