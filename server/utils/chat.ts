import fs from 'fs'
import path from 'path'
import { createChatId } from './groups'

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
  // For group messages
  chatId?: string
  chatType?: 'direct' | 'group'
}

export interface GroupChat {
  id: string
  groupId: string
  groupName: string
  members: string[] // Array of user IDs
  createdAt: string
  lastMessageAt: string
}

export interface DirectConversation {
  userId: string
  userName: string
  userImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export interface GroupConversation {
  chatId: string
  groupId: string
  groupName: string
  groupImage: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  memberCount: number
}

export function createMessageId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export function createGroupChat(groupId: string, groupName: string, memberIds: string[]): GroupChat {
  return {
    id: createChatId(),
    groupId,
    groupName,
    members: memberIds,
    createdAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString()
  }
}

export function addMemberToGroupChat(chatId: string, userId: string): void {
  const chatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
  const chats: GroupChat[] = JSON.parse(fs.readFileSync(chatsPath, 'utf8'))
  
  const chatIndex = chats.findIndex(chat => chat.id === chatId)
  if (chatIndex !== -1 && !chats[chatIndex].members.includes(userId)) {
    chats[chatIndex].members.push(userId)
    fs.writeFileSync(chatsPath, JSON.stringify(chats, null, 2))
  }
}

export function removeMemberFromGroupChat(chatId: string, userId: string): void {
  const chatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
  const chats: GroupChat[] = JSON.parse(fs.readFileSync(chatsPath, 'utf8'))
  
  const chatIndex = chats.findIndex(chat => chat.id === chatId)
  if (chatIndex !== -1) {
    chats[chatIndex].members = chats[chatIndex].members.filter(id => id !== userId)
    fs.writeFileSync(chatsPath, JSON.stringify(chats, null, 2))
  }
}

export function updateGroupChatName(chatId: string, newGroupName: string): void {
  const chatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
  const chats: GroupChat[] = JSON.parse(fs.readFileSync(chatsPath, 'utf8'))
  
  const chatIndex = chats.findIndex(chat => chat.id === chatId)
  if (chatIndex !== -1) {
    chats[chatIndex].groupName = newGroupName
    fs.writeFileSync(chatsPath, JSON.stringify(chats, null, 2))
  }
}
