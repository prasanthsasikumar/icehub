// Simple script to add groups to Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://jtpqdmjfocqgrgjvvqvr.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cHFkbWpmb2NxZ3JnanZ2cXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTE1MjksImV4cCI6MjA2OTc4NzUyOX0.jIDVRPz6Lsp6Sj1Ru_sGHBNZZp8HF6BKEKrRp5XEXEY'

const supabase = createClient(supabaseUrl, supabaseKey)

const groups = [
  {
    id: "group_508mw2us9",
    name: "Group 1",
    description: "This is the group 1",
    coverImage: "/uploads/groupCoverSamples/cover5.svg",
    creatorId: "e07e01d9-064c-4838-95ae-2e27ac6df861",
    isPublic: true,
    members: [
      {
        userId: "e07e01d9-064c-4838-95ae-2e27ac6df861",
        userName: "Jhon Doe",
        joinedAt: "2025-08-03T11:00:33.429Z"
      },
      {
        userId: "6fcde34e-bdff-47a2-9849-921ba50e3d3d",
        userName: "Donald Trump",
        joinedAt: "2025-08-03T11:01:14.468Z"
      },
      {
        userId: "2fe67f77-765f-49fb-af59-0d1d5d04d2a8",
        userName: "Praveen Sasikumar",
        joinedAt: "2025-08-03T11:52:26.260Z"
      },
      {
        userId: "6420bcc4-5f5a-4a10-974b-144304aab155",
        userName: "Modi Ji",
        joinedAt: "2025-08-03T12:13:37.669Z"
      }
    ]
  },
  {
    id: "group_e3wvkjtf3",
    name: "Group2",
    description: "this is group 2",
    coverImage: "/uploads/9cae9e8d-c9ba-4344-989e-845ddaf2821b.png",
    creatorId: "e07e01d9-064c-4838-95ae-2e27ac6df861",
    isPublic: true,
    members: [
      {
        userId: "e07e01d9-064c-4838-95ae-2e27ac6df861",
        userName: "Jhon Doe",
        joinedAt: "2025-08-03T11:02:41.683Z"
      },
      {
        userId: "2fe67f77-765f-49fb-af59-0d1d5d04d2a8",
        userName: "Praveen Sasikumar",
        joinedAt: "2025-08-03T12:16:26.714Z"
      },
      {
        userId: "6420bcc4-5f5a-4a10-974b-144304aab155",
        userName: "Modi Ji",
        joinedAt: "2025-08-03T12:16:46.338Z"
      }
    ]
  }
]

async function addGroups() {
  for (const group of groups) {
    console.log(`Adding group: ${group.name}`)
    
    const { data, error } = await supabase
      .from('groups')
      .insert([group])
      .select()
    
    if (error) {
      console.error(`Error adding group ${group.name}:`, error)
    } else {
      console.log(`✓ Successfully added group: ${group.name}`)
    }
  }
  
  console.log('Done!')
}

addGroups().catch(console.error)
