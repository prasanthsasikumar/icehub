export interface teamMember {
  userId: string
  userName: string
  role?: string
  joinedAt: string
}

export interface team {
  id: string
  name: string
  description: string
  coverImage: string
  creatorId: string
  isPublic: boolean
  members: teamMember[]
  createdAt: string
  updatedAt: string
}

export function getRandomteamCover(): string {
  const covers = [
    '/uploads/teamCoverSamples/cover1.svg',
    '/uploads/teamCoverSamples/cover2.svg',
    '/uploads/teamCoverSamples/cover3.svg',
    '/uploads/teamCoverSamples/cover4.svg',
    '/uploads/teamCoverSamples/cover5.svg'
  ]
  
  return covers[Math.floor(Math.random() * covers.length)]
}

export function createteamId(): string {
  return 'team_' + Math.random().toString(36).substr(2, 9)
}
