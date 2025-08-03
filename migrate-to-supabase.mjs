// Migration script to transfer JSON data to Supabase
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_KEY are set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateData() {
  try {
    console.log('🚀 Starting data migration to Supabase...')

    // Read JSON files
    const usersPath = path.join(__dirname, 'server/data/users.json')
    const messagesPath = path.join(__dirname, 'server/data/messages.json')
    const groupsPath = path.join(__dirname, 'server/data/groups.json')
    const groupChatsPath = path.join(__dirname, 'server/data/groupChats.json')

    // Migrate Users
    console.log('📄 Migrating users...')
    if (fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
      
      for (const user of users) {
        try {
          const { data, error } = await supabase
            .from('users')
            .upsert([user], { onConflict: 'id' })
          
          if (error) {
            console.error(`Error inserting user ${user.name}:`, error)
          } else {
            console.log(`✅ Migrated user: ${user.name}`)
          }
        } catch (err) {
          console.error(`Error with user ${user.name}:`, err)
        }
      }
    }

    // Migrate Messages
    console.log('💬 Migrating messages...')
    if (fs.existsSync(messagesPath)) {
      const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'))
      
      // Batch insert messages in chunks of 100
      const chunkSize = 100
      for (let i = 0; i < messages.length; i += chunkSize) {
        const chunk = messages.slice(i, i + chunkSize)
        
        try {
          const { data, error } = await supabase
            .from('messages')
            .upsert(chunk, { onConflict: 'id' })
          
          if (error) {
            console.error(`Error inserting messages chunk ${i / chunkSize + 1}:`, error)
          } else {
            console.log(`✅ Migrated ${chunk.length} messages (chunk ${i / chunkSize + 1})`)
          }
        } catch (err) {
          console.error(`Error with messages chunk ${i / chunkSize + 1}:`, err)
        }
      }
    }

    // Migrate Groups
    console.log('👥 Migrating groups...')
    if (fs.existsSync(groupsPath)) {
      const groups = JSON.parse(fs.readFileSync(groupsPath, 'utf8'))
      
      for (const group of groups) {
        try {
          const { data, error } = await supabase
            .from('groups')
            .upsert([group], { onConflict: 'id' })
          
          if (error) {
            console.error(`Error inserting group ${group.name}:`, error)
          } else {
            console.log(`✅ Migrated group: ${group.name}`)
          }
        } catch (err) {
          console.error(`Error with group ${group.name}:`, err)
        }
      }
    }

    // Migrate Group Chats
    console.log('💬 Migrating group chats...')
    if (fs.existsSync(groupChatsPath)) {
      const groupChats = JSON.parse(fs.readFileSync(groupChatsPath, 'utf8'))
      
      for (const chat of groupChats) {
        try {
          const { data, error } = await supabase
            .from('group_chats')
            .upsert([chat], { onConflict: 'id' })
          
          if (error) {
            console.error(`Error inserting group chat ${chat.groupName}:`, error)
          } else {
            console.log(`✅ Migrated group chat: ${chat.groupName}`)
          }
        } catch (err) {
          console.error(`Error with group chat ${chat.groupName}:`, err)
        }
      }
    }

    console.log('🎉 Data migration completed!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateData()
