import { v4 as uuidv4 } from 'uuid'
import { put } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'

// Utility function to get default user image
export const getDefaultUserImage = () => {
  return '/uploads/default/user-avatar.svg'
}

// Function to ensure user has a valid image
export const ensureUserImage = (userImage: string | null | undefined) => {
  if (!userImage || userImage.includes('via.placeholder.com') || userImage.includes('placeholder')) {
    return getDefaultUserImage()
  }
  return userImage
}

// Function to upload image from Buffer data (for multipart form uploads)
export const uploadImageBuffer = async (imageBuffer: Buffer, filename: string, contentType: string) => {
  try {
    if (!imageBuffer || imageBuffer.length === 0) {
      return {
        success: false,
        error: 'Invalid image data'
      }
    }

    // Generate unique filename
    const uniqueId = uuidv4()
    const fileExtension = contentType.split('/')[1] || 'jpg'
    const uniqueFilename = `${Date.now()}-${uniqueId}.${fileExtension}`
    
    // Check if we're in production (Vercel)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
    
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      // Use Vercel Blob in production
      const blob = await put(uniqueFilename, imageBuffer, {
        access: 'public',
        contentType: contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN
      })

      return {
        success: true,
        url: blob.url,
        filename: uniqueFilename
      }
    } else {
      // Use local storage in development
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadsDir, { recursive: true })
      
      const filePath = path.join(uploadsDir, uniqueFilename)
      await fs.writeFile(filePath, imageBuffer)

      const publicUrl = `/uploads/${uniqueFilename}`
      
      return {
        success: true,
        url: publicUrl,
        filename: uniqueFilename
      }
    }

  } catch (error) {
    console.error('Image upload error:', error)
    return {
      success: false,
      error: 'Failed to upload image'
    }
  }
}

// Function to upload image - same logic as upload.post.ts
export const uploadImage = async (imageData: string, filename?: string) => {
  try {
    if (!imageData || !imageData.startsWith('data:image/')) {
      return {
        success: false,
        error: 'Invalid image data'
      }
    }

    // Extract image data and format
    const imageMatch = imageData.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
    if (!imageMatch) {
      return {
        success: false,
        error: 'Invalid image format'
      }
    }

    const [, format, base64Data] = imageMatch
    const imageBuffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const uniqueId = uuidv4()
    const fileExtension = format.toLowerCase()
    const fileName = filename || `${uniqueId}.${fileExtension}`
    
    // Check if we're in production (Vercel)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
    
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      // Use Vercel Blob in production
      const blob = await put(fileName, imageBuffer, {
        access: 'public',
        contentType: `image/${format}`,
        token: process.env.BLOB_READ_WRITE_TOKEN
      })

      return {
        success: true,
        url: blob.url,
        filename: fileName
      }
    } else {
      // Use local storage in development
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadsDir, { recursive: true })
      
      const filePath = path.join(uploadsDir, fileName)
      await fs.writeFile(filePath, imageBuffer)

      const publicUrl = `/uploads/${fileName}`
      
      return {
        success: true,
        url: publicUrl,
        filename: fileName
      }
    }

  } catch (error) {
    console.error('Image upload error:', error)
    return {
      success: false,
      error: 'Failed to upload image'
    }
  }
}
