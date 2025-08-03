import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

async function migrateUsers() {
  const usersPath = path.join(process.cwd(), 'server/data/users.json')
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
  
  // Hash password for all users
  const defaultPassword = await bcrypt.hash('password', SALT_ROUNDS)
  
  const migratedUsers = await Promise.all(users.map(async (user, index) => {
    return {
      ...user,
      email: user.email || 'test@email.com',
      password: defaultPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    }
  }))
  
  // Add admin user
  const adminPassword = await bcrypt.hash('admin123', SALT_ROUNDS)
  migratedUsers.push({
    id: 'admin-user-001',
    name: 'Administrator',
    email: 'admin@icehub.com',
    password: adminPassword,
    image: '/uploads/default/user-avatar.svg',
    bio: 'System Administrator with full access to manage users and content.',
    skills: ['System Administration', 'User Management', 'Security'],
    role: 'admin',
    createdAt: new Date().toISOString()
  })
  
  fs.writeFileSync(usersPath, JSON.stringify(migratedUsers, null, 2))
  console.log('✅ Users migrated successfully!')
  console.log('📧 Admin email: admin@icehub.com')
  console.log('🔑 Admin password: admin123')
  console.log('👥 Regular users email: test@email.com')
  console.log('🔑 Regular users password: password')
}

migrateUsers().catch(console.error)
