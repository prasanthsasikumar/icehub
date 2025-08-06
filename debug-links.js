// Debug script to test user links functionality
console.log('Testing user links processing...')

// Simulate the processing logic from the API
function processUserLinks(user_links) {
  console.log('Input user_links:', user_links)
  
  let processedLinks = ''
  
  if (Array.isArray(user_links)) {
    const validLinks = user_links
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
      .slice(0, 5) // Limit to 5 links
      .map((link) => ({
        label: link.label.trim(),
        url: link.url.trim()
      }))
    
    console.log('Filtered validLinks:', validLinks)
    
    if (validLinks.length > 0) {
      processedLinks = JSON.stringify(validLinks)
    }
  }
  
  console.log('Final processedLinks:', processedLinks)
  return processedLinks
}

// Test cases
const testCases = [
  // Test 1: Multiple valid links
  [
    { label: 'Portfolio', url: 'https://example.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/user' },
    { label: 'GitHub', url: 'https://github.com/user' }
  ],
  
  // Test 2: Mix of valid and invalid links
  [
    { label: 'Portfolio', url: 'https://example.com' },
    { label: '', url: 'https://invalid.com' }, // Empty label
    { label: 'Valid Link', url: '' }, // Empty URL
    { label: 'GitHub', url: 'https://github.com/user' }
  ],
  
  // Test 3: Empty array
  [],
  
  // Test 4: Non-array input
  'invalid input'
]

testCases.forEach((testCase, index) => {
  console.log(`\n--- Test Case ${index + 1} ---`)
  processUserLinks(testCase)
})
