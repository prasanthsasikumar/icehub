import { kv } from '@vercel/kv'

// Vercel KV database utilities
export class Database {
  static async getUsers() {
    const users = await kv.get('users')
    return users || []
  }

  static async setUsers(users: any[]) {
    await kv.set('users', users)
  }

  static async getMessages() {
    const messages = await kv.get('messages')
    return messages || []
  }

  static async setMessages(messages: any[]) {
    await kv.set('messages', messages)
  }

  static async getGroups() {
    const groups = await kv.get('groups')
    return groups || []
  }

  static async setGroups(groups: any[]) {
    await kv.set('groups', groups)
  }

  static async getGroupChats() {
    const groupChats = await kv.get('groupChats')
    return groupChats || []
  }

  static async setGroupChats(groupChats: any[]) {
    await kv.set('groupChats', groupChats)
  }
}
