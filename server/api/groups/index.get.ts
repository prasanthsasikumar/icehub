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
    
    if (!userId) {
      // Not authenticated - only show public groups
      filteredGroups = groups.filter((group: any) => group.isPublic)
    } else {
      // Authenticated - show public groups + private groups user is member of
      filteredGroups = groups.filter((group: any) => 
        group.isPublic || 
        (group.members && group.members.some((member: any) => member.userId === userId))
      )
    }

    // Return groups with member count instead of full member list for privacy
    return filteredGroups.map((group: any) => {
      const isMember = userId ? 
        (group.members && group.members.some((member: any) => member.userId === userId)) : false
      
      return {
        id: group.id,
        name: group.name,
        description: group.description,
        coverImage: group.coverImage || '/uploads/groupCoverSamples/cover1.svg',
        createdBy: group.creatorId,
        createdAt: group.createdAt,
        memberCount: (group.members?.length || 0),
        isPrivate: !group.isPublic, // Convert isPublic to isPrivate
        // User is considered part of group if they're a member
        isMember: isMember,
        userRole: isMember ? 'member' : null
      }
    })
  } catch (error) {
    console.error('Error fetching groups:', error)
    return []
  }
})
