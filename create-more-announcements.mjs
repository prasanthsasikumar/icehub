// Create additional test announcements
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createMoreAnnouncements() {
  console.log('Creating additional test announcements...')
  
  // Get the existing test admin user
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('name', 'Test Admin')
    .limit(1)
  
  if (!existingUser || existingUser.length === 0) {
    console.error('Test Admin user not found')
    return
  }
  
  const user = existingUser[0]
  console.log('Using user:', user.name, 'with ID:', user.id)

  const moreAnnouncements = [
    {
      title: "AI Workshop Materials Available",
      content: `The workshop materials are now ready!

**Download Links:**
- Session slides: [Download here](#)
- Code examples: [GitHub repo](#)
- Dataset: [Data portal](#)

Please download before the workshop starts.`,
      type: "info",
      is_pinned: false,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updated_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      title: "Venue Change Notice",
      content: `**IMPORTANT UPDATE:**

The workshop venue has been changed to:

**New Location:** Colombo Convention Centre, Hall A
**Address:** 32 Sir Marcus Fernando Mawatha, Colombo 7
**Time:** Same as before (9:00 AM)

**Parking:** Free parking available
**WiFi:** Workshop2025 / password: ice2025

We apologize for any inconvenience caused.`,
      type: "urgent",
      is_pinned: true,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      updated_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      title: "Team Formation Guidelines",
      content: `Guidelines for team formation:

1. **Team Size:** 3-4 members per team
2. **Skills Mix:** Try to have diverse skills in each team
3. **Process:** 
   - Introduction session: 30 minutes
   - Skill showcase: 15 minutes per person
   - Team selection: Open discussion

*Remember: Great projects come from great teamwork!*`,
      type: "general",
      is_pinned: false,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      updated_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      title: "Mentor Office Hours",
      content: `Our international mentors will be available for one-on-one sessions:

**Schedule:**
- **Dr. Sarah Chen** (Google AI): 2:00 PM - 4:00 PM
- **Prof. Michael Rodriguez** (MIT): 4:00 PM - 6:00 PM  
- **Ms. Priya Patel** (Microsoft Research): 6:00 PM - 8:00 PM

Book your slots through the workshop portal.`,
      type: "info",
      is_pinned: false,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      updated_at: new Date(Date.now() - 10800000).toISOString()
    },
    {
      title: "Lunch & Networking Details",
      content: `**Meal Information:**

**Lunch Menu:**
- Option 1: Sri Lankan rice & curry (vegetarian available)
- Option 2: International buffet
- Beverages: Coffee, tea, fresh juices

**Dietary Requirements:**
Please inform us of any allergies or special requirements.

**Networking Tips:**
- Bring business cards
- Use the workshop hashtag: #ICE2025
- Join our WhatsApp group: [Link](#)`,
      type: "general",
      is_pinned: false,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
      updated_at: new Date(Date.now() - 14400000).toISOString()
    },
    {
      title: "Project Submission Requirements",
      content: `**Final Project Submission Guidelines:**

**What to Submit:**
1. **Code Repository** (GitHub/GitLab)
2. **Demo Video** (max 3 minutes)
3. **Presentation Slides** (PDF format)
4. **Documentation** (README with setup instructions)

**Deadline:** August 12th, 5:00 PM

**Judging Criteria:**
- Innovation (30%)
- Technical Implementation (25%)
- Impact Potential (25%)
- Presentation (20%)

**Prizes:**
- 1st Place: LKR 100,000 + Mentorship
- 2nd Place: LKR 50,000
- 3rd Place: LKR 25,000`,
      type: "important",
      is_pinned: false,
      is_published: true,
      author_id: user.id,
      author_name: user.name,
      created_at: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
      updated_at: new Date(Date.now() - 18000000).toISOString()
    }
  ]

  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert(moreAnnouncements)
    
    if (error) {
      console.error('Error creating announcements:', error)
    } else {
      console.log(`✅ Created ${moreAnnouncements.length} additional announcements`)
      console.log('\n🎉 Total announcements should now be 8!')
      console.log('Visit http://localhost:3000 to see the "Show more" functionality.')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

createMoreAnnouncements()
