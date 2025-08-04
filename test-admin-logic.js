// Test script to validate admin toggle functionality
console.log('Testing admin toggle logic...')

// Test data
const testUsers = [
  { id: '1', name: 'John Admin', role: 'admin' },
  { id: '2', name: 'Jane User', role: 'user' },
  { id: '3', name: 'Bob Mentor', role: 'mentor' }
]

// Frontend toggle logic
const getRoleToggleText = (currentRole) => {
  switch (currentRole) {
    case 'admin':
      return 'Remove Admin'
    case 'user':
    case 'mentor':
    default:
      return 'Make Admin'
  }
}

const getRoleStyle = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800'
    case 'mentor':
      return 'bg-blue-100 text-blue-800'
    case 'user':
    default:
      return 'bg-green-100 text-green-800'
  }
}

// Backend toggle logic
const getNewRole = (currentRole) => {
  return currentRole === 'admin' ? 'user' : 'admin'
}

// Test each user
testUsers.forEach(user => {
  console.log(`\n--- ${user.name} (${user.role}) ---`)
  console.log(`Button text: "${getRoleToggleText(user.role)}"`)
  console.log(`Style: ${getRoleStyle(user.role)}`)
  console.log(`New role would be: ${getNewRole(user.role)}`)
})

console.log('\n✅ Logic validation complete!')
