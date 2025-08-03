export interface GroupMember {
  userId: string
  userName: string
  joinedAt: string
}

export interface Group {
  id: string
  name: string
  description: string
  coverImage: string
  createdBy: string
  createdAt: string
  members: GroupMember[]
  isPrivate: boolean
}

export function getRandomGroupCover(): string {
  const covers = [
    '/uploads/groupCoverSamples/cover1.svg',
    '/uploads/groupCoverSamples/cover2.svg',
    '/uploads/groupCoverSamples/cover3.svg',
    '/uploads/groupCoverSamples/cover4.svg',
    '/uploads/groupCoverSamples/cover5.svg'
  ]
  
  return covers[Math.floor(Math.random() * covers.length)]
}

export function createGroupId(): string {
  return 'group_' + Math.random().toString(36).substr(2, 9)
}
