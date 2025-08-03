import { Database } from '../server/utils/supabase.ts'
import fs from 'fs'
import path from 'path'

async function migrateGroups() {
  try {
    console.log('Starting groups migration...')
    
    // Read groups from JSON file
    const groupsPath = path.join(process.cwd(), 'server/data/groups.json')
    const groups = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))
    
    console.log(`Found ${groups.length} groups to migrate`)
    
    // Migrate each group
    for (const group of groups) {
      try {
        console.log(`Migrating group: ${group.name}`)
        
        // Transform the group data to match Supabase schema
        const groupData = {
          id: group.id,
          name: group.name,
          description: group.description,
          cover_image: group.coverImage,
          created_by: group.createdBy,
          created_at: group.createdAt,
          is_private: group.isPrivate || false,
          chat_id: group.chatId,
          members: group.members || [],
          mentors: group.mentors || []
        }
        
        const result = await Database.createGroup(groupData)
        if (result.error) {
          console.error(`Error migrating group ${group.name}:`, result.error)
        } else {
          console.log(`✓ Successfully migrated group: ${group.name}`)
        }
      } catch (error) {
        console.error(`Error migrating group ${group.name}:`, error)
      }
    }
    
    // Also migrate group chats
    const groupChatsPath = path.join(process.cwd(), 'server/data/groupChats.json')
    let groupChats = []
    
    if (fs.existsSync(groupChatsPath)) {
      groupChats = JSON.parse(fs.readFileSync(groupChatsPath, 'utf8'))
      console.log(`Found ${groupChats.length} group chats to migrate`)
      
      for (const chat of groupChats) {
        try {
          console.log(`Migrating group chat: ${chat.id}`)
          
          const chatData = {
            id: chat.id,
            group_id: chat.groupId,
            name: chat.name,
            created_at: chat.createdAt,
            participants: chat.participants || []
          }
          
          const result = await Database.createGroupChat(chatData)
          if (result.error) {
            console.error(`Error migrating group chat ${chat.id}:`, result.error)
          } else {
            console.log(`✓ Successfully migrated group chat: ${chat.id}`)
          }
        } catch (error) {
          console.error(`Error migrating group chat ${chat.id}:`, error)
        }
      }
    }
    
    console.log('Groups migration completed!')
    
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrateGroups()
