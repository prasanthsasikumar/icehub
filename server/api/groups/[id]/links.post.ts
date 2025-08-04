import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'

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

  const body = await readBody(event)
  const { content } = body

  if (!content || !content.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Content is required'
    })
  }

  try {
    // Check if user is a member of the group
    const group = await Database.getGroupById(groupId)
    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Group not found'
      })
    }

    const parsedMembers = group.members ? 
      group.members.map((member: any) => {
        try {
          return typeof member === 'string' ? JSON.parse(member) : member
        } catch (e) {
          return member
        }
      }) : []
    
    const isMember = parsedMembers.some((member: any) => member.userId === currentUser.id)
    
    if (!isMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You must be a group member to share links'
      })
    }

    // Create shared link
    const newLink = {
      group_id: groupId,
      created_by: currentUser.id,
      content: content.trim()
    }

    const createdLink = await Database.createGroupLink(newLink)
    
    return createdLink
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error creating group link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create shared link'
    })
  }
})
