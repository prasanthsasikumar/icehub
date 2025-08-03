import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Get groups from Supabase
    const groups = await Database.getGroups()
    
    if (!groups) {
      return []
    }

    // Filter out private groups unless user is a member
    const query = getQuery(event)
    const userId = query.userId as string

    let filteredGroups = groups
    
    // Parse members arrays and determine user membership
    const processedGroups = filteredGroups.map((group: any) => {
      let members: any[] = []
      
      // Parse members array (could be string or array)
      try {
        if (group.members) {
          if (typeof group.members === 'string') {
            members = JSON.parse(group.members)
          } else if (Array.isArray(group.members)) {
            members = group.members
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
        ...group,
        parsedMembers: members
      }
    })

    if (!userId) {
      // Not authenticated - only show public groups
      filteredGroups = processedGroups.filter((group: any) => !group.isPrivate)
    } else {
      // Authenticated - show public groups + private groups user is member of
      filteredGroups = processedGroups.filter((group: any) => 
        !group.isPrivate || 
        (group.parsedMembers && group.parsedMembers.some((member: any) => member.userId === userId))
      )
    }

    // Return groups with member count instead of full member list for privacy
    return filteredGroups.map((group: any) => {
      const isMember = userId ? 
        (group.parsedMembers && group.parsedMembers.some((member: any) => member.userId === userId)) : false
      
      // Find user's role if they're a member
      let userRole = null
      if (isMember && group.parsedMembers) {
        const userMember = group.parsedMembers.find((member: any) => member.userId === userId)
        userRole = userMember?.role || 'member'
      }
      
      return {
        id: group.id,
        name: group.name,
        description: group.description,
        coverImage: group.coverImage || '/uploads/groupCoverSamples/cover1.svg',
        createdBy: group.createdBy,
        createdAt: group.createdAt,
        memberCount: (group.parsedMembers?.length || 0),
        isPrivate: group.isPrivate,
        isMember: isMember,
        userRole: userRole
      }
    })
  } catch (error) {
    console.error('Error fetching groups:', error)
    return []
  }
})
