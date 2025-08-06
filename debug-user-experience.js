// User Experience Debug Script
// This simulates the exact user flow in the profile edit page

console.log('=== User Links Debug Test ===\n')

// Simulate user adding links through the UI
let linksList = []

function addLink() {
    linksList.push({
        label: '',
        url: ''
    })
    console.log(`Added link ${linksList.length}. Current state:`, linksList)
}

function updateLink(index, field, value) {
    linksList[index][field] = value
    console.log(`Updated link ${index} ${field} to "${value}". Current state:`, linksList)
}

function filterValidLinks() {
    const validLinks = linksList.filter(link => 
        link.label && link.label.trim() && 
        link.url && link.url.trim()
    )
    console.log('Valid links after filtering:', validLinks)
    return validLinks
}

// Simulate user workflow
console.log('1. User clicks "Add Link" 3 times')
addLink() // Link 1
addLink() // Link 2
addLink() // Link 3

console.log('\n2. User fills in only the first link completely')
updateLink(0, 'label', 'Portfolio')
updateLink(0, 'url', 'https://johndoe.dev')

console.log('\n3. User partially fills the second link (only label)')
updateLink(1, 'label', 'LinkedIn')
// User forgets to add URL for link 2

console.log('\n4. User fills the third link completely')
updateLink(2, 'label', 'GitHub')
updateLink(2, 'url', 'https://github.com/johndoe')

console.log('\n5. User clicks "Update Profile" - filtering occurs')
const validLinks = filterValidLinks()

console.log('\n6. Result: Only', validLinks.length, 'links will be saved')
console.log('This might be why user thinks "only one link gets saved"!')

console.log('\n=== Conclusion ===')
console.log('The issue might be user experience related:')
console.log('- User adds multiple link entries in the UI')
console.log('- User only fills in some of them completely')
console.log('- Only completed links (with both label and URL) get saved')
console.log('- User sees fewer links than expected and thinks there\'s a bug')

console.log('\n=== Recommendation ===')
console.log('1. Add validation feedback in the UI to show which links are incomplete')
console.log('2. Prevent saving if there are incomplete links, or')
console.log('3. Show a warning about incomplete links before saving')
