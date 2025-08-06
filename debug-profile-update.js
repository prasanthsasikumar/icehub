// Test script to simulate profile update with links
console.log('Testing profile update with multiple links...')

// Simulate the updateProfile function behavior
const simulateUpdate = async () => {
  // Simulate linksList from the frontend
  const linksList = [
    { label: 'Portfolio', url: 'https://johndoe.dev' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { label: 'GitHub', url: 'https://github.com/johndoe' },
    { label: 'Blog', url: 'https://johndoe.blog' }
  ]
  
  console.log('Original linksList:', linksList)
  
  // Filter out empty links before sending (from frontend)
  const validLinks = linksList.filter(link => 
    link.label && link.label.trim() && 
    link.url && link.url.trim()
  )
  
  console.log('Filtered validLinks (frontend):', validLinks)
  
  // Simulate the request body
  const requestBody = {
    name: 'John Doe',
    bio: 'Test bio',
    image: '',
    userRole: 'participant',
    affiliation: 'University of Colombo',
    expertise: 'Web Development',
    gender: 'male',
    video: '',
    skills: [
      { name: 'JavaScript', level: 4 },
      { name: 'React', level: 3 }
    ],
    user_links: validLinks // This is what gets sent to the API
  }
  
  console.log('Request body:', JSON.stringify(requestBody, null, 2))
  
  // Simulate server-side processing
  console.log('\n--- Server-side processing ---')
  
  const { user_links } = requestBody
  let processedLinks = ''
  
  if (Array.isArray(user_links)) {
    console.log('Server: user_links is array, length:', user_links.length)
    
    const serverValidLinks = user_links
      .filter((link) => 
        link && 
        typeof link === 'object' &&
        link.label && 
        typeof link.label === 'string' && 
        link.label.trim().length > 0 &&
        link.url && 
        typeof link.url === 'string' && 
        link.url.trim().length > 0
      )
      .slice(0, 5)
      .map((link) => ({
        label: link.label.trim(),
        url: link.url.trim()
      }))
    
    console.log('Server: validLinks after filtering:', serverValidLinks)
    
    if (serverValidLinks.length > 0) {
      processedLinks = JSON.stringify(serverValidLinks)
    }
  }
  
  console.log('Server: Final processedLinks string length:', processedLinks.length)
  console.log('Server: Final processedLinks content:', processedLinks)
  
  return processedLinks
}

simulateUpdate().then(result => {
  console.log('\nFinal result:', result)
}).catch(error => {
  console.error('Error:', error)
})
