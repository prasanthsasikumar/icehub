// Script to migrate existing images to Vercel Blob
import { put } from '@vercel/blob'
import { readFileSync, readdirSync, statSync } from 'fs'
import path from 'path'

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN environment variable is required')
  process.exit(1)
}

async function migrateImages() {
  const uploadsDir = path.join(process.cwd(), 'public/uploads')
  
  console.log('Starting image migration to Vercel Blob...')
  
  async function processDirectory(dirPath, relativePath = '') {
    const items = readdirSync(dirPath)
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item)
      const stat = statSync(itemPath)
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(itemPath, path.join(relativePath, item))
      } else if (stat.isFile() && !item.startsWith('.')) {
        // Process image files
        const ext = path.extname(item).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
          try {
            console.log(`Uploading: ${relativePath ? relativePath + '/' : ''}${item}`)
            
            const fileBuffer = readFileSync(itemPath)
            const blobPath = relativePath ? `${relativePath}/${item}` : item
            
            // Determine content type
            let contentType = 'image/jpeg'
            if (ext === '.png') contentType = 'image/png'
            else if (ext === '.gif') contentType = 'image/gif'
            else if (ext === '.webp') contentType = 'image/webp'
            else if (ext === '.svg') contentType = 'image/svg+xml'
            
            const blob = await put(blobPath, fileBuffer, {
              access: 'public',
              contentType,
              token: BLOB_READ_WRITE_TOKEN
            })
            
            console.log(`✓ Uploaded: ${blobPath} -> ${blob.url}`)
            
            // Store mapping for later use
            console.log(`Mapping: /uploads/${blobPath} -> ${blob.url}`)
            
          } catch (error) {
            console.error(`Error uploading ${item}:`, error)
          }
        }
      }
    }
  }
  
  await processDirectory(uploadsDir)
  console.log('Image migration completed!')
}

migrateImages().catch(console.error)
