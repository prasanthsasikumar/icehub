// Check Supabase groups table schema
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://riidfopyyahcqneguhzl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaWRmb3B5eWFoY3FuZWd1aHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzM1MzksImV4cCI6MjA2OTgwOTUzOX0.KNx1JWX0510dF2I4I8NZglf-ewbRbsf9zQIa_Nzmu-0'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  // Try to get groups (which will return empty but show us any errors)
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .limit(1)
  
  console.log('Data:', data)
  console.log('Error:', error)
  
  // Let's also try a simple insert with minimal data to see what columns are expected
  const testInsert = await supabase
    .from('groups')
    .insert([{ 
      id: 'test_group_1',
      name: 'Test Group',
      description: 'Test description',
      creatorId: '2fe67f77-765f-49fb-af59-0d1d5d04d2a8' // Use existing user ID
    }])
    .select()
  
  console.log('Test insert data:', testInsert.data)
  console.log('Test insert error:', testInsert.error)
}

checkSchema().catch(console.error)
