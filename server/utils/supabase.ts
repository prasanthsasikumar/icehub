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

  static async getUsersByIds(ids: string[]) {
    if (ids.length === 0) return []
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('id', ids)
    
    if (error) throw error
    return data || []
  }

  // Method to simulate old approach (for comparison purposes)
  static async getUsersByIdsOldWay(ids: string[]) {
    if (ids.length === 0) return []
    
    console.log(`🐌 Old approach: Making ${ids.length} individual database calls...`)
    const startTime = Date.now()
    
    const users = []
    for (const id of ids) {
      try {
        const user = await this.getUserById(id)
        if (user) {
          users.push(user)
        }
      } catch (error) {
        console.error(`Failed to get user ${id}:`, error)
      }
    }
    
    const endTime = Date.now()
    console.log(`🐌 Old approach completed in ${endTime - startTime}ms with ${ids.length} database calls`)
    
    return users
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
      
      console.log('Updating teams to remove user...')
      
      // Remove user from team members arrays
      const { data: allTeams } = await supabaseAdmin
        .from('teams')
        .select('id, members')
      
      if (allTeams) {
        for (const team of allTeams) {
          let needsUpdate = false
          let updatedMembers = team.members
          
          // Handle members array (includes both members and mentors with role property)
          if (team.members) {
            let members
            try {
              if (typeof team.members === 'string') {
                try {
                  members = JSON.parse(team.members)
                } catch (jsonError) {
                  members = []
                }
              } else if (Array.isArray(team.members)) {
                members = team.members
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
            console.log(`Updating team ${team.id} to remove user ${id}`)
            
            const { error: updateError } = await supabaseAdmin
              .from('teams')
              .update({ members: updatedMembers })  // Send as array, not JSON string
              .eq('id', team.id)
              
            if (updateError) {
              console.warn(`Error updating team ${team.id}:`, updateError)
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

  // Teams
  static async getTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getTeamById(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async createTeam(team: any) {
    // Generate a unique ID if not provided
    const teamWithId = {
      id: team.id || crypto.randomUUID(),
      ...team
    }
    
    const { data, error } = await supabase
      .from('teams')
      .insert([teamWithId])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateTeam(id: string, updates: any) {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteTeam(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  // Team Chats
  static async getTeamChats() {
    const { data, error } = await supabase
      .from('team_chats')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getTeamChatById(id: string) {
    const { data, error } = await supabase
      .from('team_chats')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  static async createTeamChat(teamChat: any) {
    // Generate a unique ID if not provided
    const teamChatWithId = {
      id: teamChat.id || crypto.randomUUID(),
      ...teamChat
    }
    
    const { data, error } = await supabase
      .from('team_chats')
      .insert([teamChatWithId])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateTeamChat(id: string, updates: any) {
    const { data, error } = await supabase
      .from('team_chats')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Team Links
  static async getTeamLinks(teamId: string) {
    const { data, error } = await supabase
      .from('team_links')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async createTeamLink(link: any) {
    // Generate a unique ID if not provided
    const linkWithId = {
      id: link.id || crypto.randomUUID(),
      ...link
    }
    
    const { data, error } = await supabase
      .from('team_links')
      .insert([linkWithId])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteTeamLink(id: string) {
    const { data, error } = await supabase
      .from('team_links')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  // Team Images
  static async getTeamImages(teamId: string) {
    const { data, error } = await supabase
      .from('team_images')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  static async createTeamImage(image: any) {
    // Generate a unique ID if not provided
    const imageWithId = {
      id: image.id || crypto.randomUUID(),
      ...image
    }
    
    const { data, error } = await supabase
      .from('team_images')
      .insert([imageWithId])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteTeamImage(id: string) {
    const { data, error } = await supabase
      .from('team_images')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  // Legacy compatibility methods for teams API
  static async getteams() {
    return this.getTeams()
  }

  static async getteamById(id: string) {
    return this.getTeamById(id)
  }

  static async createteam(team: any) {
    return this.createTeam(team)
  }

  static async updateteam(id: string, updates: any) {
    return this.updateTeam(id, updates)
  }

  static async deleteteam(id: string) {
    return this.deleteTeam(id)
  }

  static async getteamChats() {
    return this.getTeamChats()
  }

  static async getteamChatById(id: string) {
    return this.getTeamChatById(id)
  }

  static async createteamChat(teamChat: any) {
    return this.createTeamChat(teamChat)
  }

  static async updateteamChat(id: string, updates: any) {
    return this.updateTeamChat(id, updates)
  }

  static async getteamLinks(teamId: string) {
    return this.getTeamLinks(teamId)
  }

  static async createteamLink(link: any) {
    return this.createTeamLink(link)
  }

  static async deleteteamLink(id: string) {
    return this.deleteTeamLink(id)
  }

  static async getteamImages(teamId: string) {
    return this.getTeamImages(teamId)
  }

  static async createteamImage(image: any) {
    return this.createTeamImage(image)
  }

  static async deleteteamImage(id: string) {
    return this.deleteTeamImage(id)
  }

  // Backup-specific methods
  static async getAllUsers() {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getAllMessages() {
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getAllTeams() {
    const { data, error } = await supabaseAdmin
      .from('teams')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getAllTeamChats() {
    const { data, error } = await supabaseAdmin
      .from('team_chats')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getAllTeamLinks() {
    const { data, error } = await supabaseAdmin
      .from('team_links')
      .select('*')
    
    if (error) throw error
    return data || []
  }

  static async getAllTeamImages() {
    const { data, error } = await supabaseAdmin
      .from('team_images')
      .select('*')
    
    if (error) throw error
    return data || []
  }
}
