import fs from 'fs'
import path from 'path'
import { type Group } from '../../../server/utils/groups'

export default defineEventHandler(async (event) => {
  // Read groups from file
  const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
  const groups: Group[] = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))

  // Filter out private groups unless user is a member
  const query = getQuery(event)
  const userId = query.userId as string

  let filteredGroups = groups
  
  if (!userId) {
    // Not authenticated - only show public groups
    filteredGroups = groups.filter(group => !group.isPrivate)
  } else {
    // Authenticated - show public groups + private groups user is member of
    filteredGroups = groups.filter(group => 
      !group.isPrivate || group.members.some(member => member.userId === userId)
    )
  }

  // Return groups with member count instead of full member list for privacy
  return filteredGroups.map(group => ({
    id: group.id,
    name: group.name,
    description: group.description,
    coverImage: group.coverImage,
    createdBy: group.createdBy,
    createdAt: group.createdAt,
    memberCount: group.members.length,
    isPrivate: group.isPrivate,
    // Only show if user is member for member list
    isMember: userId ? group.members.some(member => member.userId === userId) : false
  }))
})
