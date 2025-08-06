// Simple database query to check user links storage
console.log('This script would help verify how user links are actually stored in the database.')
console.log('To debug the issue:')
console.log('1. Try creating/updating a user profile with multiple links via the UI')
console.log('2. Check the server console logs for the debug output we added')
console.log('3. Check the actual database to see what\'s stored in the user_links column')
console.log('')
console.log('Expected behavior:')
console.log('- Multiple links should be stored as a JSON string')
console.log('- Example: [{"label":"Portfolio","url":"https://example.com"},{"label":"GitHub","url":"https://github.com/user"}]')
console.log('')
console.log('If only one link is showing up, possible causes:')
console.log('1. Frontend not sending all links (check browser network tab)')
console.log('2. Server processing filtering out links (check server logs)')
console.log('3. Database constraint or issue (check DB directly)')
console.log('4. Display logic not parsing/showing all links (check getUserLinks function)')

// Let's also create a direct test of the getUserLinks function
const testGetUserLinks = () => {
  console.log('\n--- Testing getUserLinks function ---')
  
  const getUserLinks = (userLinks) => {
    if (!userLinks) return []
    
    try {
      const links = typeof userLinks === 'string' ? JSON.parse(userLinks) : userLinks
      
      if (Array.isArray(links)) {
        const filteredLinks = links.filter(link => link && link.label && link.url)
        return filteredLinks
      }
      
      return []
    } catch (error) {
      console.error('Error parsing user links:', error)
      return []
    }
  }
  
  // Test with JSON string (how it's stored in DB)
  const testJsonString = '[{"label":"Portfolio","url":"https://johndoe.dev"},{"label":"LinkedIn","url":"https://linkedin.com/in/johndoe"},{"label":"GitHub","url":"https://github.com/johndoe"}]'
  const result1 = getUserLinks(testJsonString)
  console.log('Test 1 - JSON string input:')
  console.log('Input:', testJsonString)
  console.log('Output:', result1)
  console.log('Count:', result1.length)
  
  // Test with array (fresh data)
  const testArray = [
    { label: 'Portfolio', url: 'https://johndoe.dev' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { label: 'GitHub', url: 'https://github.com/johndoe' }
  ]
  const result2 = getUserLinks(testArray)
  console.log('\nTest 2 - Array input:')
  console.log('Input:', testArray)
  console.log('Output:', result2)
  console.log('Count:', result2.length)
  
  // Test with invalid data
  const result3 = getUserLinks('invalid json')
  console.log('\nTest 3 - Invalid JSON:')
  console.log('Output:', result3)
  console.log('Count:', result3.length)
}

testGetUserLinks()
