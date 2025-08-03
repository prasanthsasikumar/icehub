import { readFile, writeFile, mkdir } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

async function migrateImages() {
  const file = 'server/data/users.json'
  
  try {
    console.log('Starting image migration...')
    
    // Read current users
    const usersData = await readFile(file, 'utf-8')
    const users = JSON.parse(usersData)
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    
    let migratedCount = 0
    
    // Process each user
    for (const user of users) {
      if (user.image && user.image.startsWith('data:image/')) {
        console.log(`Migrating image for user: ${user.name}`)
        
        // Extract image data and format
        const imageMatch = user.image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
        if (imageMatch) {
          const [, format, base64Data] = imageMatch
          const imageBuffer = Buffer.from(base64Data, 'base64')

          // Generate unique filename
          const uniqueId = uuidv4()
          const fileExtension = format.toLowerCase()
          const fileName = `${uniqueId}.${fileExtension}`
          
          // Save file
          const filePath = path.join(uploadsDir, fileName)
          await writeFile(filePath, imageBuffer)

          // Update user with file URL
          user.image = `/uploads/${fileName}`
          migratedCount++
          
          console.log(`✅ Migrated ${user.name} -> ${fileName}`)
        }
      }
    }
    
    // Save updated users data
    await writeFile(file, JSON.stringify(users, null, 2))
    
    console.log(`\n🎉 Migration completed! Migrated ${migratedCount} images.`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration
migrateImages()
