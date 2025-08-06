// Test script to check if /api/auth/me returns user_links
console.log('Testing /api/auth/me endpoint for user_links field...')

const testAuthMeEndpoint = async () => {
  try {
    console.log('Note: This test requires being logged in.')
    console.log('To test manually:')
    console.log('1. Open browser console on http://localhost:3001/profile/edit')
    console.log('2. Run: fetch("/api/auth/me").then(r => r.json()).then(console.log)')
    console.log('3. Check if the response includes user_links field')
    console.log('')
    console.log('Expected response structure:')
    console.log('{')
    console.log('  user: {')
    console.log('    id: "...",')
    console.log('    name: "...",')
    console.log('    email: "...",')
    console.log('    // ... other fields ...')
    console.log('    user_links: "[{\"label\":\"...\",\"url\":\"...\"}]", // This should be present')
    console.log('    createdAt: "..."')
    console.log('  }')
    console.log('}')
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testAuthMeEndpoint()
