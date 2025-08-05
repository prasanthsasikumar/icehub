export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { id } = query

  if (!id || typeof id !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing file ID'
    })
  }

  try {
    // Try multiple Google Drive URL formats
    const urls = [
      `https://lh3.googleusercontent.com/d/${id}=w400`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
      `https://drive.google.com/uc?export=view&id=${id}`
    ]

    let imageResponse: Response | null = null
    let error: Error | null = null

    // Try each URL until one works
    for (const url of urls) {
      try {
        console.log(`Trying to fetch image from: ${url}`)
        const response = await fetch(url)
        
        if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
          console.log(`Success with URL: ${url}`)
          imageResponse = response
          break
        } else {
          console.log(`Failed with URL: ${url}, status: ${response.status}`)
        }
      } catch (fetchError) {
        console.log(`Error with URL: ${url}`, fetchError)
        error = fetchError as Error
        continue
      }
    }

    if (!imageResponse || !imageResponse.ok) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found or inaccessible'
      })
    }

    // Get the image data
    const imageBuffer = await imageResponse.arrayBuffer()
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'

    // Set appropriate headers
    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24 hours
    setHeader(event, 'Access-Control-Allow-Origin', '*')

    return new Uint8Array(imageBuffer)
  } catch (error) {
    console.error('Proxy image error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch image'
    })
  }
})
