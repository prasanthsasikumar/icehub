import { v4 as uuidv4 } from 'uuid'
import { put } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { image, filename } = body

    if (!image || !image.startsWith('data:image/')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid image data'
      })
    }

    // Extract image data and format
    const imageMatch = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
    if (!imageMatch) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid image format'
      })
    }

    const [, format, base64Data] = imageMatch
    const imageBuffer = Buffer.from(base64Data, 'base64')

    // Generate unique filename
    const uniqueId = uuidv4()
    const fileExtension = format.toLowerCase()
    const fileName = `${uniqueId}.${fileExtension}`
    
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
    console.error('File upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})
