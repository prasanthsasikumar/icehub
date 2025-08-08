// Check existing users
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkUsers() {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, name, email, role')
    .limit(10)
  
  if (error) {
    console.error('Error:', error)
    return
  }
  
  console.log('Existing users:')
  users.forEach(user => {
    console.log(`- ${user.name} (${user.email}) - Role: ${user.role || 'none'}`)
  })
}

checkUsers()
