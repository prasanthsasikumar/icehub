<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub Admin</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">Admin Panel</span>
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg text-gray-500">Loading...</div>
    </div>

    <!-- Access Denied -->
    <div v-else-if="!isAdmin" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Access Denied</h1>
        <p class="text-gray-500 mb-6">You need admin privileges to access this page.</p>
        <NuxtLink to="/" class="nav-button">
          Return Home
        </NuxtLink>
      </div>
    </div>

    <!-- Admin Content -->
    <main v-else class="py-12">
      <div class="max-w-container mx-auto px-5">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-700 mb-2">User Management</h1>
          <p class="text-gray-500">Manage users and their information</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-primary mb-1">{{ users?.length || 0 }}</div>
            <div class="text-sm text-gray-500">Total Users</div>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-green-600 mb-1">{{ adminCount }}</div>
            <div class="text-sm text-gray-500">Admin Users</div>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-blue-600 mb-1">{{ regularCount }}</div>
            <div class="text-sm text-gray-500">Regular Users</div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-700">All Users</h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          :src="user.image" 
                          :alt="`${user.name}'s avatar`" 
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ user.bio }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex flex-wrap gap-1 max-w-xs">
                      <span 
                        v-for="skill in user.skills.slice(0, 3)" 
                        :key="typeof skill === 'string' ? skill : skill.name"
                        class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {{ typeof skill === 'string' ? skill : skill.name }}
                        <span v-if="typeof skill === 'object' && skill.level" class="ml-1 text-xs opacity-75">
                          ({{ skill.level }})
                        </span>
                      </span>
                      <span v-if="user.skills.length > 3" class="text-xs text-gray-400">
                        +{{ user.skills.length - 3 }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <NuxtLink 
                      :to="`/profile/${encodeURIComponent(user.name)}`"
                      class="text-primary hover:text-primary-dark"
                    >
                      View
                    </NuxtLink>
                    <button 
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      v-if="user.id !== currentUser?.id"
                      @click="toggleRole(user)"
                      class="text-purple-600 hover:text-purple-900"
                    >
                      {{ user.role === 'admin' ? 'Make User' : 'Make Admin' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Check authentication and admin status
const { user: currentUser, isLoggedIn, isAdmin, checkAuth } = useAuth()
const loading = ref(true)

// Fetch users data
const { data: users, refresh: refreshUsers } = await useFetch('/api/users')

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
  loading.value = false
})

// Computed properties
const adminCount = computed(() => {
  return users.value?.filter(user => user.role === 'admin').length || 0
})

const regularCount = computed(() => {
  return users.value?.filter(user => user.role === 'user').length || 0
})

// Methods
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/40x40/e5e7eb/9ca3af?text=User'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

const editUser = (user) => {
  // For now, just redirect to profile
  navigateTo(`/profile/${encodeURIComponent(user.name)}`)
}

const toggleRole = async (user) => {
  if (!confirm(`Are you sure you want to change ${user.name}'s role to ${user.role === 'admin' ? 'user' : 'admin'}?`)) {
    return
  }

  try {
    await $fetch('/api/admin/toggle-role', {
      method: 'POST',
      body: {
        userId: user.id,
        newRole: user.role === 'admin' ? 'user' : 'admin'
      }
    })
    
    // Refresh users data
    await refreshUsers()
  } catch (error) {
    alert('Failed to update user role')
  }
}

// Redirect if not admin
watch([isLoggedIn, isAdmin], ([loggedIn, admin]) => {
  if (!loading.value && (!loggedIn || !admin)) {
    navigateTo('/login')
  }
})

// Page meta
useHead({
  title: 'Admin Panel - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Admin panel for managing ICEHub users and content.'
    }
  ]
})
</script>

<style scoped>
.text-primary {
  color: #0d7ae4;
}

.text-primary-dark {
  color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}
</style>
