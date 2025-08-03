// Migration script to replace placeholder images with proper default images
import { Database } from '../server/utils/supabase.js'

async function updatePlaceholderImages() {
  try {
    console.log('Starting migration to replace placeholder images...')
    
    // Get all users
    const users = await Database.getUsers()
    
    let updatedCount = 0
    
    for (const user of users) {
      if (user.image && user.image.includes('via.placeholder.com')) {
        console.log(`Updating placeholder image for user: ${user.name}`)
        
        await Database.updateUser(user.id, {
          image: '/uploads/default/user-avatar.svg'
        })
        
        updatedCount++
      }
    }
    
    console.log(`Migration completed! Updated ${updatedCount} users.`)
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

updatePlaceholderImages()
