import { getUserFromRequest } from '../../../server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = getUserFromRequest(event)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }
  
  return { user }
})
