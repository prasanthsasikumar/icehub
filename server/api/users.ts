import { readFile } from 'fs/promises'
import { ensureUserImage } from '../utils/image'

export default defineEventHandler(async () => {
  const data = await readFile('server/data/users.json', 'utf-8')
  const users = JSON.parse(data)
  
  // Ensure all users have valid images
  return users.map((user: any) => ({
    ...user,
    image: ensureUserImage(user.image)
  }))
})
