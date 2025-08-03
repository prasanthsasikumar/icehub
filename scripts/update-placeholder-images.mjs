// Migration script to replace placeholder images with proper default images
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function updatePlaceholderImages() {
  try {
    console.log('Starting migration to replace placeholder images...')
    
    // Get all users
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
    
    if (error) throw error
    
    let updatedCount = 0
    
    for (const user of users) {
      if (user.image && user.image.includes('via.placeholder.com')) {
        console.log(`Updating placeholder image for user: ${user.name}`)
        
        const { error: updateError } = await supabase
          .from('users')
          .update({ image: '/uploads/default/user-avatar.svg' })
          .eq('id', user.id)
        
        if (updateError) {
          console.error(`Failed to update user ${user.name}:`, updateError)
        } else {
          updatedCount++
        }
      }
    }
    
    console.log(`Migration completed! Updated ${updatedCount} users.`)
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

updatePlaceholderImages()
