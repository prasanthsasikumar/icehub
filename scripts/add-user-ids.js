import { readFile, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

async function addUserIds() {
  const file = 'server/data/users.json'
  
  try {
    console.log('Adding unique IDs to users...')
    
    // Read current users
    const usersData = await readFile(file, 'utf-8')
    const users = JSON.parse(usersData)
    
    let updatedCount = 0
    
    // Add ID to users who don't have one
    for (const user of users) {
      if (!user.id) {
        user.id = uuidv4()
        updatedCount++
        console.log(`✅ Added ID to ${user.name}: ${user.id}`)
      }
    }
    
    // Save updated users data
    await writeFile(file, JSON.stringify(users, null, 2))
    
    console.log(`\n🎉 Updated ${updatedCount} users with unique IDs.`)
    
  } catch (error) {
    console.error('Failed to add user IDs:', error)
  }
}

// Run the script
addUserIds()
