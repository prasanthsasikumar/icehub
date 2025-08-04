// Test script to debug image upload issue
// Run this in the browser console after registering a user with an image

async function testImageUpload() {
  console.log('Testing image upload flow...')
  
  // Test 1: Check if upload endpoint is working
  try {
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: testImage,
        filename: 'test.png'
      })
    })
    
    const uploadResult = await uploadResponse.json()
    console.log('Upload test result:', uploadResult)
    
    // Test 2: Check if the uploaded image URL is accessible
    if (uploadResult.success && uploadResult.url) {
      const imageResponse = await fetch(uploadResult.url)
      console.log('Image accessibility test:', {
        url: uploadResult.url,
        status: imageResponse.status,
        accessible: imageResponse.ok
      })
    }
    
  } catch (error) {
    console.error('Upload test failed:', error)
  }
}

// Test 3: Check recent users to see if images are being saved
async function checkRecentUsers() {
  try {
    const usersResponse = await fetch('/api/users')
    const users = await usersResponse.json()
    
    console.log('Recent users with images:', users.slice(0, 5).map(user => ({
      name: user.name,
      hasImage: !!user.image,
      imageUrl: user.image,
      isDefault: user.image?.includes('default')
    })))
  } catch (error) {
    console.error('Users check failed:', error)
  }
}

// Run tests
testImageUpload()
checkRecentUsers()
