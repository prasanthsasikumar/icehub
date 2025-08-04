export default defineEventHandler(async (event) => {
  try {
    // Test environment variables
    const envStatus = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      JWT_SECRET: !!process.env.JWT_SECRET,
      BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL
    }

    // Test Supabase connection
    let supabaseStatus = 'unknown'
    try {
      const { Database } = await import('../../utils/supabase')
      const users = await Database.getUsers()
      supabaseStatus = `connected (${users.length} users)`
    } catch (error: any) {
      supabaseStatus = `error: ${error.message}`
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: envStatus,
      supabase: supabaseStatus
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Debug error: ${error.message}`
    })
  }
})
