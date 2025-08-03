// Simple migration script - Insert messages only
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

async function migrateMessages() {
  console.log('🚀 Starting simple message migration...')
  
  try {
    const messages = JSON.parse(fs.readFileSync('server/data/messages.json', 'utf8'))
    console.log(`Found ${messages.length} messages to migrate`)
    
    let successCount = 0
    let errorCount = 0
    
    for (const message of messages) {
      // Clean message data
      const cleanMessage = {
        id: message.id,
        senderId: message.senderId,
        senderName: message.senderName,
        receiverId: message.receiverId,
        receiverName: message.receiverName,
        content: message.content,
        timestamp: message.timestamp,
        read: message.read || false
      }
      
      // Skip messages with missing required fields
      if (!cleanMessage.receiverId || !cleanMessage.senderId) {
        console.log(`⚠️  Skipping message ${cleanMessage.id} - missing required fields`)
        continue
      }
      
      const { error } = await supabase
        .from('messages')
        .upsert([cleanMessage], { onConflict: 'id' })
      
      if (error) {
        console.log(`❌ Error with message ${cleanMessage.id}:`, error.message)
        errorCount++
      } else {
        successCount++
        if (successCount % 10 === 0) {
          console.log(`✅ Migrated ${successCount} messages so far...`)
        }
      }
    }
    
    console.log(`🎉 Migration complete!`)
    console.log(`✅ Success: ${successCount} messages`)
    console.log(`❌ Errors: ${errorCount} messages`)
    
    // Verify total count
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
    
    console.log(`📊 Total messages in database: ${count}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

migrateMessages()
