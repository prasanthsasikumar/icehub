// Test script to create announcements with line breaks and markdown
// Using global fetch (available in Node 18+)

const BASE_URL = 'http://localhost:3000';

async function createTestAnnouncement() {
  // Test announcement with line breaks and markdown
  const testAnnouncement = {
    title: "Workshop Schedule Update",
    content: `## Important Schedule Changes

**Day 1 - August 9th:**
- 9:00 AM - Registration and Welcome
- 10:00 AM - Opening Keynote by Prof. Suranga
- 12:00 PM - Networking Lunch

**Day 2 - August 10th:**
- 9:00 AM - Team Formation
- 1:00 PM - Project Development
- 6:00 PM - Progress Review

Please note the following:
1. All sessions are **mandatory**
2. Bring your laptop and chargers
3. Lunch will be provided

For questions, contact the organizing team.

*Good luck with your projects!*`,
    type: "important",
    is_pinned: true,
    is_published: true,
    author_name: "Workshop Admin"
  };

  try {
    console.log('Creating test announcement...');
    const response = await fetch(`${BASE_URL}/api/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testAnnouncement)
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Test announcement created successfully!');
    } else {
      console.log('❌ Failed to create announcement:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createSimpleTestAnnouncement() {
  // Simple test with line breaks only
  const simpleTest = {
    title: "Simple Line Break Test",
    content: `Welcome to the ICE2025 Workshop!

This is the second line with a line break above.

And this is the third line.

Thank you!`,
    type: "general",
    is_pinned: false,
    is_published: true,
    author_name: "Test Admin"
  };

  try {
    console.log('Creating simple test announcement...');
    const response = await fetch(`${BASE_URL}/api/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simpleTest)
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Simple test announcement created successfully!');
    } else {
      console.log('❌ Failed to create simple announcement:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run both tests
async function runTests() {
  await createSimpleTestAnnouncement();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  await createTestAnnouncement();
}

runTests();
