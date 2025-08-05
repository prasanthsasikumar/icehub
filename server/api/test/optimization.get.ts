import { Database } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // Get a sample of user IDs to test with
    const allUsers = await Database.getUsers()
    const sampleUserIds = allUsers.slice(0, 10).map(user => user.id) // Test with 10 users
    
    if (sampleUserIds.length === 0) {
      return {
        message: 'No users found to test with',
        oldApproach: null,
        newApproach: null,
        improvement: null
      }
    }

    console.log(`\n🔥 DATABASE OPTIMIZATION COMPARISON TEST`)
    console.log(`Testing with ${sampleUserIds.length} user IDs`)
    console.log(`===========================================`)

    // Test old approach (individual calls)
    const oldStartTime = Date.now()
    await Database.getUsersByIdsOldWay(sampleUserIds)
    const oldEndTime = Date.now()
    const oldDuration = oldEndTime - oldStartTime

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 100))

    // Test new approach (batch call)
    const newStartTime = Date.now()
    await Database.getUsersByIds(sampleUserIds)
    const newEndTime = Date.now()
    const newDuration = newEndTime - newStartTime

    const improvement = ((oldDuration - newDuration) / oldDuration * 100).toFixed(1)
    const speedup = (oldDuration / newDuration).toFixed(1)

    console.log(`\n📊 PERFORMANCE COMPARISON RESULTS:`)
    console.log(`Old approach (${sampleUserIds.length} individual calls): ${oldDuration}ms`)
    console.log(`New approach (1 batch call): ${newDuration}ms`)
    console.log(`Performance improvement: ${improvement}% faster (${speedup}x speedup)`)
    console.log(`Database calls reduced from ${sampleUserIds.length} to 1`)
    console.log(`===========================================\n`)

    return {
      message: 'Database optimization comparison completed',
      testUserIds: sampleUserIds.length,
      oldApproach: {
        duration: oldDuration,
        databaseCalls: sampleUserIds.length,
        method: 'Individual getUserById() calls'
      },
      newApproach: {
        duration: newDuration,
        databaseCalls: 1,
        method: 'Batch getUsersByIds() call'
      },
      improvement: {
        percentFaster: `${improvement}%`,
        speedupFactor: `${speedup}x`,
        callsReduced: `${sampleUserIds.length} calls → 1 call`
      }
    }
  } catch (error) {
    console.error('Error in optimization test:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Test failed'
    })
  }
})
