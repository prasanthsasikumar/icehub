export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  console.log('Test upload request received:', {
    hasImage: !!body.image,
    imageFormat: body.image ? body.image.substring(0, 50) + '...' : 'none',
    imageLength: body.image ? body.image.length : 0
  })
  
  return {
    success: true,
    received: {
      hasImage: !!body.image,
      imageLength: body.image ? body.image.length : 0,
      imageStart: body.image ? body.image.substring(0, 50) : null
    }
  }
})
