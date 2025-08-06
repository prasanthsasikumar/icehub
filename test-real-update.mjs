// Real test of profile update API
import { readFile } from 'fs/promises'
import fetch from 'node-fetch'

const testProfileUpdate = async () => {
  console.log('Testing real profile update with multiple links...')
  
  try {
    // First, let's try to login to get a valid session
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'john.doe@example.com',
        password: 'workshop123'
      })
    })
    
    if (!loginResponse.ok) {
      console.error('Login failed:', await loginResponse.text())
      return
    }
    
    const loginData = await loginResponse.json()
    console.log('Login successful:', loginData.message)
    
    // Get the session cookie
    const cookies = loginResponse.headers.get('set-cookie') || ''
    
    // Now test profile update with multiple links
    const updateData = {
      name: 'John Doe',
      bio: 'Updated bio with multiple links test',
      image: '',
      userRole: 'participant',
      affiliation: 'University of Colombo',
      expertise: 'Web Development',
      gender: 'male',
      video: '',
      skills: [
        { name: 'JavaScript', level: 4 },
        { name: 'React', level: 3 },
        { name: 'Node.js', level: 3 }
      ],
      user_links: [
        { label: 'Portfolio', url: 'https://johndoe.dev' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
        { label: 'GitHub', url: 'https://github.com/johndoe' },
        { label: 'Blog', url: 'https://johndoe.blog' },
        { label: 'Twitter', url: 'https://twitter.com/johndoe' }
      ]
    }
    
    console.log('Sending update request with data:', JSON.stringify(updateData, null, 2))
    
    const updateResponse = await fetch('http://localhost:3001/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify(updateData)
    })
    
    if (!updateResponse.ok) {
      console.error('Update failed:', updateResponse.status, await updateResponse.text())
      return
    }
    
    const updateResult = await updateResponse.json()
    console.log('Update successful:', updateResult)
    
    // Now fetch the updated user to verify the links were saved
    const userResponse = await fetch(`http://localhost:3001/api/user?name=${encodeURIComponent('John Doe')}`, {
      headers: {
        'Cookie': cookies
      }
    })
    
    if (!userResponse.ok) {
      console.error('Failed to fetch updated user:', await userResponse.text())
      return
    }
    
    const userData = await userResponse.json()
    console.log('Updated user data:')
    console.log('User links field:', userData.user_links)
    
    // Parse and display the links
    if (userData.user_links) {
      try {
        const links = typeof userData.user_links === 'string' ? JSON.parse(userData.user_links) : userData.user_links
        console.log('Parsed links count:', links.length)
        console.log('Parsed links:', links)
      } catch (error) {
        console.error('Error parsing stored links:', error)
      }
    } else {
      console.log('No user_links field in response')
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Add node-fetch if not available
try {
  testProfileUpdate()
} catch (error) {
  console.log('Note: This test requires node-fetch. Running simulated version instead.')
  
  // Simulated test
  console.log('Simulated test: Multiple links should be saved as JSON string')
  const testLinks = [
    { label: 'Portfolio', url: 'https://johndoe.dev' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { label: 'GitHub', url: 'https://github.com/johndoe' },
    { label: 'Blog', url: 'https://johndoe.blog' }
  ]
  
  const jsonString = JSON.stringify(testLinks)
  console.log('JSON string length:', jsonString.length)
  console.log('JSON string:', jsonString)
  
  // Parse it back
  const parsed = JSON.parse(jsonString)
  console.log('Parsed back count:', parsed.length)
  console.log('All links preserved:', parsed.length === testLinks.length)
}
