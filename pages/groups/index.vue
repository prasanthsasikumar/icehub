<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <template v-if="isLoggedIn">
            <span class="text-sm text-gray-600">{{ user?.name }}</span>
            <NuxtLink to="/chat" class="nav-button nav-button-secondary">
              Messages
            </NuxtLink>
            <NuxtLink to="/groups/create" class="nav-button">
              Create Group
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-button nav-button-secondary">
              Sign In
            </NuxtLink>
          </template>
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-12">
      <div class="max-w-6xl mx-auto px-5">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-700 mb-3">Developer Groups</h1>
          <p class="text-gray-600">Join groups to collaborate on projects and connect with like-minded developers</p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-6">
              <div class="h-6 bg-gray-200 rounded mb-3"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        <!-- Groups Grid -->
        <div v-else-if="data && data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="group in data" :key="group.id" class="group-card bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <!-- Cover Image -->
            <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              <img 
                :src="group.coverImage" 
                :alt="`${group.name} cover`"
                class="w-full h-full object-cover"
              />
              <div v-if="group.isPrivate" class="absolute top-3 right-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  Private
                </span>
              </div>
            </div>

            <!-- Group Info -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ group.name }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ group.description }}</p>
              
              <!-- Stats -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center text-gray-500 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.37-.89-1.27-1.37-2.17-1.37h-2.74c-.8 0-1.54.37-2.01.99L12 10.5l-1.04-1.5c-.47-.62-1.21-.99-2.01-.99H6.21c-.9 0-1.8.48-2.17 1.37L1.5 16H4v6h2v-6h.5l1.5-3 1.5 3H12v6h4z"/>
                  </svg>
                  {{ group.memberCount }} {{ group.memberCount === 1 ? 'member' : 'members' }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ formatDate(group.createdAt) }}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <NuxtLink 
                  :to="`/groups/${group.id}`" 
                  class="flex-1 bg-primary text-white text-center py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  View Group
                </NuxtLink>
                <button 
                  v-if="!group.isMember && isLoggedIn"
                  @click="joinGroup(group.id)"
                  :disabled="joiningGroup === group.id"
                  class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  <span v-if="joiningGroup === group.id">Joining...</span>
                  <span v-else>Join</span>
                </button>
                <span 
                  v-else-if="group.isMember"
                  class="flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium"
                  :class="group.userRole === 'mentor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'"
                >
                  {{ group.userRole === 'mentor' ? '🎯 Mentor' : '👥 Member' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="mb-6 text-gray-400">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 mb-3">No groups yet</h2>
          <p class="text-base text-gray-500 mb-8">Be the first to create a developer group and start collaborating!</p>
          <NuxtLink v-if="isLoggedIn" to="/groups/create" class="bg-primary text-white px-6 py-3 rounded-lg no-underline font-semibold inline-block transition-colors hover:bg-primary-dark">Create First Group</NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()

// State
const joiningGroup = ref(null)

// Fetch groups with user context
const { data, pending, refresh } = await useFetch('/api/groups', {
  query: computed(() => ({ userId: user.value?.id }))
})

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

// Join group function
const joinGroup = async (groupId) => {
  if (!isLoggedIn.value) {
    navigateTo('/login')
    return
  }

  joiningGroup.value = groupId
  
  try {
    await $fetch(`/api/groups/${groupId}/join`, {
      method: 'POST'
    })
    
    // Refresh the groups list
    await refresh()
  } catch (error) {
    console.error('Failed to join group:', error)
    // You could add a toast notification here
  } finally {
    joiningGroup.value = null
  }
}

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Page meta
useHead({
  title: 'Groups - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Discover and join developer groups to collaborate on projects and connect with peers.'
    }
  ]
})
</script>

<style scoped>
.group-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-primary {
  background-color: #0d7ae4;
}

.bg-primary-dark {
  background-color: #0969da;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}
</style>
