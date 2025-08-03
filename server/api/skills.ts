import { readFile } from 'fs/promises'
export default defineEventHandler(async () => {
  const data = await readFile('server/data/skills.txt', 'utf-8')
  return data.split(',').map(s => s.trim())
})
