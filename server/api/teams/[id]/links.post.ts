import { getUserFromRequest } from '../../../utils/auth'
import { Database } from '../../../utils/supabase'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const teamId = getRouterParam(event, 'id')
  
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'team ID is required'
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
    // Check if user is a member of the team
    const team = await Database.getteamById(teamId)
    if (!team) {
      throw createError({
        statusCode: 404,
        statusMessage: 'team not found'
      })
    }

    const parsedMembers = team.members ? 
      team.members.map((member: any) => {
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
        statusMessage: 'You must be a team member to share links'
      })
    }

    // Create shared link
    const newLink = {
      team_id: teamId,
      created_by: currentUser.id,
      content: content.trim()
    }

    const createdLink = await Database.createteamLink(newLink)
    
    return createdLink
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error creating team link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create shared link'
    })
  }
})
