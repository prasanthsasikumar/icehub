import { getUserFromRequest } from '../../../../utils/auth'
import { Database } from '../../../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'DELETE') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const groupId = getRouterParam(event, 'id')
  const linkId = getRouterParam(event, 'linkId')
  
  if (!groupId || !linkId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group ID and Link ID are required'
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
    // Check if user is a member of the group and owns the link (or is admin)
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
        statusMessage: 'You must be a group member to delete links'
      })
    }

    // Get the link to check ownership
    const links = await Database.getGroupLinks(groupId)
    const linkToDelete = links.find((link: any) => link.id === linkId)
    
    if (!linkToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Link not found'
      })
    }

    // Check if user owns the link or is admin
    if (linkToDelete.user_id !== currentUser.id && currentUser.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You can only delete your own links'
      })
    }

    // Delete the link
    await Database.deleteGroupLink(linkId)
    
    return { message: 'Link deleted successfully' }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error deleting group link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete shared link'
    })
  }
})
