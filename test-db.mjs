// Direct database insertion test
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestAnnouncements() {
  console.log('Creating test announcements directly in database...')

  // Simple line break test
  const simpleTest = {
    title: "Line Break Test",
    content: `Welcome to the ICE2025 Workshop!

This is the second line with a line break above.

And this is the third line.

Thank you!`,
    type: "general",
    is_pinned: false,
    is_published: true,
    author_name: "Test Admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  // Markdown test
  const markdownTest = {
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
    author_name: "Workshop Admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  try {
    // Insert simple test
    const { data: data1, error: error1 } = await supabase
      .from('announcements')
      .insert([simpleTest])
    
    if (error1) {
      console.error('Error creating simple test:', error1)
    } else {
      console.log('✅ Simple test announcement created')
    }

    // Insert markdown test
    const { data: data2, error: error2 } = await supabase
      .from('announcements')
      .insert([markdownTest])
    
    if (error2) {
      console.error('Error creating markdown test:', error2)
    } else {
      console.log('✅ Markdown test announcement created')
    }

    console.log('Done! Check http://localhost:3000 to see the results.')
  } catch (error) {
    console.error('Error:', error)
  }
}

createTestAnnouncements()
