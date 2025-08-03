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
          </template>
          <NuxtLink to="/groups" class="nav-button nav-button-secondary">
            Back to Groups
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="pending" class="py-20">
      <div class="max-w-4xl mx-auto px-5">
        <div class="animate-pulse">
          <div class="h-64 bg-gray-200 rounded-xl mb-8"></div>
          <div class="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-20">
      <div class="max-w-4xl mx-auto px-5 text-center">
        <div class="text-red-500 mb-4">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-700 mb-3">Group Not Found</h2>
        <p class="text-gray-500 mb-6">The group you're looking for doesn't exist or you don't have access to it.</p>
        <NuxtLink to="/groups" class="nav-button">
          Back to Groups
        </NuxtLink>
      </div>
    </div>

    <!-- Group Content -->
    <div v-else-if="data" class="pb-12">
      <!-- Group Header -->
      <div class="relative">
        <!-- Cover Image -->
        <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <img 
            :src="data.coverImage" 
            :alt="`${data.name} cover`"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <!-- Privacy Badge -->
          <div v-if="data.isPrivate" class="absolute top-6 right-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black bg-opacity-50 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Private Group
            </span>
          </div>
        </div>

        <!-- Group Info Overlay -->
        <div class="max-w-4xl mx-auto px-5">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 -mt-16 relative z-10 p-8">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-700 mb-3">{{ data.name }}</h1>
                <p class="text-gray-600 mb-4 leading-relaxed">{{ data.description }}</p>
                
                <!-- Group Stats -->
                <div class="flex flex-wrap gap-6">
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.37-.89-1.27-1.37-2.17-1.37h-2.74c-.8 0-1.54.37-2.01.99L12 10.5l-1.04-1.5c-.47-.62-1.21-.99-2.01-.99H6.21c-.9 0-1.8.48-2.17 1.37L1.5 16H4v6h2v-6h.5l1.5-3 1.5 3H12v6h4z"/>
                    </svg>
                    {{ data.members.length }} {{ data.members.length === 1 ? 'member' : 'members' }}
                  </div>
                  <div class="flex items-center text-gray-500 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Created {{ formatDate(data.createdAt) }}
                  </div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col gap-3 min-w-[200px]">
                <template v-if="data.isMember">
                  <span class="bg-green-100 text-green-700 text-center py-2 px-4 rounded-lg font-medium">
                    ✓ You're a member
                  </span>
                  <NuxtLink 
                    :to="`/groups/${groupId}/manage`"
                    class="bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Manage Group
                  </NuxtLink>
                </template>
                <template v-else-if="isLoggedIn">
                  <button 
                    @click="joinGroup"
                    :disabled="joiningGroup"
                    class="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
                  >
                    <span v-if="joiningGroup">Joining...</span>
                    <span v-else>Join Group</span>
                  </button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="bg-primary text-white text-center py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium">
                    Sign in to Join
                  </NuxtLink>
                </template>
                
                <button class="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Share Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Group Content -->
      <div class="max-w-4xl mx-auto px-5 mt-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About Section -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">About This Group</h2>
              <p class="text-gray-600 leading-relaxed">{{ data.description }}</p>
            </div>

            <!-- Project Updates (Placeholder) -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">Recent Updates</h2>
              <div class="text-center py-8 text-gray-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto mb-3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                <p>Project updates will appear here</p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Members -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Members ({{ data.members.length }})</h3>
              <div class="space-y-3">
                <div v-for="member in data.members.slice(0, 5)" :key="member.userId" class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-gray-600">{{ member.userName.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="text-sm font-medium text-gray-700 truncate">{{ member.userName }}</span>
                  </div>
                </div>
                <div v-if="data.members.length > 5" class="text-xs text-gray-500 text-center pt-2">
                  +{{ data.members.length - 5 }} more members
                </div>
              </div>
            </div>

            <!-- Group Info -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Group Info</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Privacy</span>
                  <span class="font-medium">{{ data.isPrivate ? 'Private' : 'Public' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Created</span>
                  <span class="font-medium">{{ formatDate(data.createdAt) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Members</span>
                  <span class="font-medium">{{ data.members.length }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get the group ID from the route
const route = useRoute()
const groupId = route.params.id

// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()

// State
const joiningGroup = ref(false)

// Fetch group data
const { data, pending, error, refresh } = await useFetch(`/api/groups/${groupId}`)

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

// Join group function
const joinGroup = async () => {
  if (!isLoggedIn.value) {
    navigateTo('/login')
    return
  }

  joiningGroup.value = true
  
  try {
    await $fetch(`/api/groups/${groupId}/join`, {
      method: 'POST'
    })
    
    // Refresh the group data
    await refresh()
  } catch (error) {
    console.error('Failed to join group:', error)
    // You could add a toast notification here
  } finally {
    joiningGroup.value = false
  }
}

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - ICEHub` : 'Group - ICEHub'),
  meta: [
    {
      name: 'description',
      content: computed(() => data.value ? `Join ${data.value.name} and collaborate on ${data.value.description}` : 'Developer group on ICEHub')
    }
  ]
})
</script>

<style scoped>
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
