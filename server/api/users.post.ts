import { readFile, writeFile, mkdir } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const file = 'server/data/users.json'

  try {
    // Add unique ID to the user
    body.id = uuidv4()
    
    // If image is base64, save it as a file
    if (body.image && body.image.startsWith('data:image/')) {
      // Extract image data and format
      const imageMatch = body.image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
      if (imageMatch) {
        const [, format, base64Data] = imageMatch
        
        // Validate image format
        const allowedFormats = ['jpeg', 'jpg', 'png', 'gif', 'webp']
        if (!allowedFormats.includes(format.toLowerCase())) {
          return { success: false, error: 'Invalid image format. Allowed: JPEG, PNG, GIF, WebP' }
        }
        
        const imageBuffer = Buffer.from(base64Data, 'base64')
        
        // Validate image size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (imageBuffer.length > maxSize) {
          return { success: false, error: 'Image too large. Maximum size is 5MB' }
        }

        // Generate unique filename with timestamp for better organization
        const timestamp = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        const uniqueId = uuidv4()
        const fileExtension = format.toLowerCase() === 'jpeg' ? 'jpg' : format.toLowerCase()
        const fileName = `${timestamp}-${uniqueId}.${fileExtension}`
        
        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        await mkdir(uploadsDir, { recursive: true })
        
        // Save file
        const filePath = path.join(uploadsDir, fileName)
        await writeFile(filePath, imageBuffer)

        // Update body with file URL instead of base64
        body.image = `/uploads/${fileName}`
        
        console.log(`✅ Saved profile image: ${fileName} (${(imageBuffer.length / 1024).toFixed(1)}KB)`)
      }
    }

    const users = JSON.parse(await readFile(file, 'utf-8'))
    users.push(body)

    await writeFile(file, JSON.stringify(users, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: 'Failed to create user' }
  }
})
