import { readFile, writeFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const file = 'server/data/users.json'

  const users = JSON.parse(await readFile(file, 'utf-8'))
  users.push(body)

  await writeFile(file, JSON.stringify(users, null, 2))
  return { success: true }
})
