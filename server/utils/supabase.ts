import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Admin client with service role key for elevated permissions
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

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
      console.log(`Starting cascade deletion for user: ${id}`)
      
      // Delete user's messages (both sent and received) using admin client
      console.log('Deleting user messages...')
      
      const { error: sentMessagesError } = await supabaseAdmin
        .from('messages')
        .delete()
        .eq('senderId', id)
      
      if (sentMessagesError) {
        console.warn('Error deleting sent messages:', sentMessagesError)
      }

      const { error: receivedMessagesError } = await supabaseAdmin
        .from('messages')
        .delete()
        .eq('receiverId', id)
      
      if (receivedMessagesError) {
        console.warn('Error deleting received messages:', receivedMessagesError)
      }
      
      console.log('Updating groups to remove user...')
      
      // Remove user from group members arrays
      const { data: allGroups } = await supabaseAdmin
        .from('groups')
        .select('id, members')
      
      if (allGroups) {
        for (const group of allGroups) {
          let needsUpdate = false
          let updatedMembers = group.members
          
          // Handle members array (includes both members and mentors with role property)
          if (group.members) {
            let members
            try {
              if (typeof group.members === 'string') {
                try {
                  members = JSON.parse(group.members)
                } catch (jsonError) {
                  members = []
                }
              } else if (Array.isArray(group.members)) {
                members = group.members
              } else {
                members = []
              }
            } catch (e) {
              members = []
            }
            
            if (Array.isArray(members)) {
              // Clean up the members array - handle mixed string/object format
              const cleanMembers = members.map((member: any) => {
                if (typeof member === 'string') {
                  try {
                    return JSON.parse(member)
                  } catch {
                    return null
                  }
                }
                return member
              }).filter(Boolean)
              
              // Filter out the user
              const filteredMembers = cleanMembers.filter((member: any) => member.userId !== id)
              if (filteredMembers.length !== cleanMembers.length) {
                updatedMembers = filteredMembers
                needsUpdate = true
              }
            }
          }
          
          if (needsUpdate) {
            console.log(`Updating group ${group.id} to remove user ${id}`)
            
            const { error: updateError } = await supabaseAdmin
              .from('groups')
              .update({ members: updatedMembers })  // Send as array, not JSON string
              .eq('id', group.id)
              
            if (updateError) {
              console.warn(`Error updating group ${group.id}:`, updateError)
            }
          }
        }
      }
      
      // First, check if the user exists
      console.log(`Checking if user exists: ${id}`)
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (checkError) {
        console.log('User check error:', checkError)
        if (checkError.code === 'PGRST116') {
          throw new Error('User not found')
        }
        throw checkError
      }
      
      console.log('User found:', existingUser)
      
      // Finally, delete the user using admin client for elevated permissions
      console.log(`Attempting to delete user with admin client: ${id}`)
      
      const { data: deleteData, error: deleteError, count } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id)
      
      console.log('Admin delete result:', { data: deleteData, error: deleteError, count })
      
      if (deleteError) {
        console.log('Admin delete error details:', deleteError)
        throw deleteError
      }
      
      // Verify the user was actually deleted
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      console.log('User lookup after admin delete:', { data, error })
      
      // If user still exists, the delete didn't work
      if (data && !error) {
        throw new Error('Admin delete operation failed - user still exists')
      }
      
      console.log('User successfully deleted with admin privileges')
      return { id, message: 'User deleted successfully' }
      
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
