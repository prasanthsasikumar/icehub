// Test script to verify Vercel Blob token
import { put } from '@vercel/blob'

const token = process.env.BLOB_READ_WRITE_TOKEN

console.log('Token exists:', !!token)
console.log('Token length:', token?.length)
console.log('Token preview:', token?.substring(0, 20) + '...')

try {
  // Try to upload a simple test blob
  const blob = await put('test.txt', 'Hello World', {
    access: 'public',
    token: token
  })
  
  console.log('Success! Test blob URL:', blob.url)
} catch (error) {
  console.error('Error:', error.message)
  console.error('Full error:', error)
}
