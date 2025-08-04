import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../utils/supabase'

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

  const { userId, groupId, role } = await readBody(event)

  if (!userId || !groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID and Group ID are required'
    })
  }

  console.log('Admin adding user to group:', { userId, groupId, role, adminId: currentUser.id })

  try {
    // Get the group from Supabase
    const group = await Database.getGroupById(groupId)
    
    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group not found'
      })
    }

    // Get the user to be added
    const userToAdd = await Database.getUserById(userId)
    
    if (!userToAdd) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Parse members array
    let members: any[] = []
    
    try {
      if (group.members) {
        if (typeof group.members === 'string') {
          try {
            // First try to parse as a JSON array
            members = JSON.parse(group.members)
          } catch (jsonError) {
            console.log('Failed to parse as JSON, attempting manual parsing...')
            // Handle malformed array that might be a mix of JSON strings and objects
            members = []
          }
        } else if (Array.isArray(group.members)) {
          members = group.members
        }
      }
    } catch (e) {
      console.error('Error parsing members:', e)
      members = []
    }

    // Ensure all members are proper objects and clean up the format
    const cleanMembers: any[] = []
    
    for (const member of members) {
      try {
        let cleanMember: any = null
        
        if (typeof member === 'string') {
          // Try to parse string members
          try {
            cleanMember = JSON.parse(member)
          } catch {
            console.warn('Skipping unparseable member string:', member)
            continue
          }
        } else if (typeof member === 'object' && member !== null) {
          cleanMember = member
        }
        
        // Ensure the member has the required structure
        if (cleanMember && (cleanMember.id || cleanMember.userId)) {
          // Normalize the member object structure
          const normalizedMember = {
            id: cleanMember.id || cleanMember.userId,
            userId: cleanMember.userId || cleanMember.id,
            name: cleanMember.name || cleanMember.userName,
            userName: cleanMember.userName || cleanMember.name,
            email: cleanMember.email,
            image: cleanMember.image,
            role: cleanMember.role || 'member',
            joinedAt: cleanMember.joinedAt || new Date().toISOString()
          }
          
          cleanMembers.push(normalizedMember)
        }
      } catch (error) {
        console.warn('Error processing member:', member, error)
        continue
      }
    }
    
    members = cleanMembers
    console.log('Cleaned members array:', members.length, 'valid members')

    // Check if user is already a member
    const existingMember = members.find((member: any) => 
      member && (member.id === userId || member.userId === userId)
    )

    if (existingMember) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User is already a member of this group'
      })
    }

    // Add new member with specified role (default to member if not provided)
    const memberRole = role || (userToAdd.userRole === 'mentor' ? 'mentor' : 'member')
    
    const newMember = {
      id: userToAdd.id,
      userId: userToAdd.id, // Include both for compatibility
      name: userToAdd.name,
      userName: userToAdd.name, // Include both for compatibility
      email: userToAdd.email,
      image: userToAdd.image,
      role: memberRole,
      joinedAt: new Date().toISOString(),
      addedBy: currentUser.id // Track who added this user
    }

    members.push(newMember)

    // Update the group with new members - use JSONB format for PostgreSQL
    const updatedGroup = await Database.updateGroup(groupId, {
      members: members // Pass as an array, not JSON string
    })

    console.log('Successfully added user to group:', {
      groupId,
      userId,
      role: memberRole,
      totalMembers: members.length
    })

    return {
      success: true,
      message: `${userToAdd.name} has been added to ${group.name} as ${memberRole}`,
      group: updatedGroup,
      newMember
    }

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error adding user to group:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to add user to group'
    })
  }
})
