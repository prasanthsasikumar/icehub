import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Get teams from Supabase
    const teams = await Database.getteams()
    
    if (!teams) {
      return []
    }

    // Filter out private teams unless user is a member
    const query = getQuery(event)
    const userId = query.userId as string

    let filteredteams = teams
    
    // Parse members arrays and determine user membership
    const processedteams = filteredteams.map((team: any) => {
      let members: any[] = []
      
      // Parse members array (could be string or array)
      try {
        if (team.members) {
          if (typeof team.members === 'string') {
            members = JSON.parse(team.members)
          } else if (Array.isArray(team.members)) {
            members = team.members
          }
        }
      } catch (e) {
        members = []
      }
      
      // Clean up members array (handle mixed string/object format)
      members = members.map((member: any) => {
        if (typeof member === 'string') {
          try {
            return JSON.parse(member)
          } catch {
            return null
          }
        }
        return member
      }).filter(Boolean)
      
      return {
        ...team,
        parsedMembers: members
      }
    })

    if (!userId) {
      // Not authenticated - only show public teams
      filteredteams = processedteams.filter((team: any) => !team.isPrivate)
    } else {
      // Authenticated - show public teams + private teams user is member of
      filteredteams = processedteams.filter((team: any) => 
        !team.isPrivate || 
        (team.parsedMembers && team.parsedMembers.some((member: any) => member.userId === userId))
      )
    }

    // Return teams with member count instead of full member list for privacy
    return filteredteams.map((team: any) => {
      const isMember = userId ? 
        (team.parsedMembers && team.parsedMembers.some((member: any) => member.userId === userId)) : false
      
      // Find user's role if they're a member
      let userRole = null
      if (isMember && team.parsedMembers) {
        const userMember = team.parsedMembers.find((member: any) => member.userId === userId)
        userRole = userMember?.role || 'member'
      }
      
      return {
        id: team.id,
        name: team.name,
        description: team.description,
        coverImage: team.coverImage || '/uploads/teamCoverSamples/cover1.svg',
        createdBy: team.createdBy,
        createdAt: team.createdAt,
        memberCount: (team.parsedMembers?.length || 0),
        isPrivate: team.isPrivate,
        isMember: isMember,
        userRole: userRole
      }
    })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
})
