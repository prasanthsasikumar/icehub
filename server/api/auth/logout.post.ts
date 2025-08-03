export default defineEventHandler(async (event) => {
  // Clear auth cookie
  deleteCookie(event, 'auth-token')
  
  return { message: 'Logged out successfully' }
})
