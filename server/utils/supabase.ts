import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database interface for the app
export class Database {
  // Users
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  static async getUserByName(name: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  static async createUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateUser(id: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteUser(id: string) {
    // First, delete related data to avoid foreign key constraints
    
    try {
      // Delete user's messages
      const { error: messagesError } = await supabase
        .from('messages')
        .delete()
        .eq('userId', id)
      
      if (messagesError) {
        console.warn('Error deleting user messages:', messagesError)
      }
      
      // Handle groups created by this user
      // Option 1: Delete groups created by this user
      const { error: groupsError } = await supabase
        .from('groups')
        .delete()
        .eq('creatorId', id)
      
      if (groupsError) {
        console.warn('Error deleting user groups:', groupsError)
      }
      
      // Remove user from group members arrays
      // This is more complex as members might be stored as JSON arrays
      const { data: allGroups } = await supabase
        .from('groups')
        .select('id, members')
      
      if (allGroups) {
        for (const group of allGroups) {
          if (group.members) {
            let members
            try {
              members = typeof group.members === 'string' 
                ? JSON.parse(group.members) 
                : group.members
            } catch (e) {
              members = []
            }
            
            if (Array.isArray(members) && members.includes(id)) {
              const updatedMembers = members.filter(memberId => memberId !== id)
              await supabase
                .from('groups')
                .update({ members: JSON.stringify(updatedMembers) })
                .eq('id', group.id)
            }
          }
        }
      }
      
      // Finally, delete the user
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
      
    } catch (error) {
      console.error('Error in deleteUser:', error)
      throw error
    }
  }

  // Messages
  static async getMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: true })
    
    if (error) throw error
    return data || []
  }

  static async getMessagesBetweenUsers(userId1: string, userId2: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(senderId.eq.${userId1},receiverId.eq.${userId2}),and(senderId.eq.${userId2},receiverId.eq.${userId1})`)
      .order('timestamp', { ascending: true })
    
    if (error) throw error
    return data || []
  }

  static async createMessage(message: any) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Groups
  static async getGroups() {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getGroupById(id: string) {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async createGroup(group: any) {
    const { data, error } = await supabase
      .from('groups')
      .insert([group])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateGroup(id: string, updates: any) {
    const { data, error } = await supabase
      .from('groups')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteGroup(id: string) {
    const { data, error } = await supabase
      .from('groups')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  // Group Chats
  static async getGroupChats() {
    const { data, error } = await supabase
      .from('group_chats')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getGroupChatById(id: string) {
    const { data, error } = await supabase
      .from('group_chats')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async createGroupChat(groupChat: any) {
    const { data, error } = await supabase
      .from('group_chats')
      .insert([groupChat])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateGroupChat(id: string, updates: any) {
    const { data, error } = await supabase
      .from('group_chats')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
