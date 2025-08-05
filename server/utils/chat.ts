export interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  read: boolean
  // For direct messages
  receiverId?: string
  receiverName?: string
  // For team messages
  chatId?: string
  chatType?: 'direct' | 'team'
}

export interface DirectConversation {
  userId: string
  userName: string
  userImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export interface teamConversation {
  chatId: string
  teamId: string
  teamName: string
  teamImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  memberCount: number
}

export function createMessageId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// Note: team chat functionality is now handled directly in the Supabase Database class
// through the teams table and messages table relationships
