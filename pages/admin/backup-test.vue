<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 px-4">
      <h1 class="text-3xl font-bold text-gray-900">Backup Test Page</h1>
      <p class="mt-4 text-lg text-gray-600">This is a simple test page to verify routing works.</p>
      
      <div class="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">User Status</h2>
        <p>Logged in: {{ isLoggedIn }}</p>
        <p>Is Admin: {{ isAdmin }}</p>
        <p>User: {{ user?.email || 'Not logged in' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple auth check
const { user, isLoggedIn, isAdmin, checkAuth } = useAuth()

onMounted(async () => {
  await checkAuth()
})

useHead({
  title: 'Backup Test - ICE2025 Admin'
})
</script>
