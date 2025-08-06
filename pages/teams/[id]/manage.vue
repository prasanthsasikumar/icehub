<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025</NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="nav-right hidden md:flex items-center gap-4">
          <span v-if="user" class="text-sm text-gray-600">{{ user.name }}</span>
          <NuxtLink :to="`/teams/${teamId}`" class="nav-button nav-button-secondary">
            Back to team
          </NuxtLink>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden flex items-center">
          <button 
            @click="showMobileMenu = !showMobileMenu"
            class="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg 
              :class="{'rotate-90': showMobileMenu}" 
              class="w-6 h-6 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-5 py-3 space-y-3">
          <div v-if="user" class="text-sm text-gray-600 font-medium">{{ user.name }}</div>
          <NuxtLink 
            :to="`/teams/${teamId}`" 
            class="block py-2 text-gray-700 hover:text-primary"
            @click="showMobileMenu = false"
          >
            Back to team
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg text-gray-500">Loading...</div>
    </div>

    <!-- Not Authenticated -->
    <div v-else-if="!isLoggedIn" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-blue-500 text-6xl mb-4">🔒</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Authentication Required</h1>
        <p class="text-gray-500 mb-6">Please sign in to manage teams.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- No Access -->
    <div v-else-if="teamData && !teamData.isMember" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⛔</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Access Denied</h1>
        <p class="text-gray-500 mb-6">Only team members can manage this team.</p>
        <NuxtLink :to="`/teams/${teamId}`" class="nav-button">
          Back to team
        </NuxtLink>
      </div>
    </div>

    <!-- Manage team Form -->
    <main v-else-if="teamData" class="py-12">
      <div class="max-w-4xl mx-auto px-5">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-700 mb-3">Manage team</h1>
          <p class="text-base text-gray-500">Update team information and manage members</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Settings -->
          <div class="lg:col-span-2 space-y-8">
            <!-- team Information -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-xl font-semibold text-gray-700 mb-6">team Information</h2>
              
              <form @submit.prevent="updateTeam" class="flex flex-col gap-6">
                <!-- Cover Image Upload -->
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-gray-700 text-sm mb-1">Cover Image</label>
                  <ImageUpload 
                    v-model="form.coverImage"
                    alt-text="team cover image"
                    :aspect-ratio="'16:9'"
                  />
                </div>

                <!-- team Name Input -->
                <div class="flex flex-col gap-2">
                  <label for="name" class="font-semibold text-gray-700 text-sm mb-1">team Name</label>
                  <input 
                    id="name"
                    v-model="form.name" 
                    type="text"
                    placeholder="Enter team name" 
                    required 
                    class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                  />
                </div>

                <!-- Description Input -->
                <div class="flex flex-col gap-2">
                  <label for="description" class="font-semibold text-gray-700 text-sm mb-1">Project Description</label>
                  <textarea 
                    id="description"
                    v-model="form.description" 
                    placeholder="Describe your project and goals..." 
                    rows="6"
                    required
                    class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10 resize-none"
                  ></textarea>
                </div>

                <!-- Privacy Setting -->
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-gray-700 text-sm mb-1">Privacy</label>
                  <div class="space-y-3">
                    <label class="flex items-center cursor-pointer">
                      <input 
                        v-model="form.isPrivate" 
                        :value="false"
                        type="radio" 
                        name="privacy"
                        class="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <div class="ml-3">
                        <div class="font-medium text-gray-700">Public team</div>
                        <div class="text-sm text-gray-500">Anyone can discover and join this team</div>
                      </div>
                    </label>
                    <label class="flex items-center cursor-pointer">
                      <input 
                        v-model="form.isPrivate" 
                        :value="true"
                        type="radio" 
                        name="privacy"
                        class="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <div class="ml-3">
                        <div class="font-medium text-gray-700">Private team</div>
                        <div class="text-sm text-gray-500">Only invited members can join</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Error/Success Messages -->
                <div v-if="updateError" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p class="text-red-600 text-sm">{{ updateError }}</p>
                </div>

                <div v-if="updateSuccess" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-green-600 text-sm">{{ updateSuccess }}</p>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  :disabled="updating"
                  class="bg-primary text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-primary-dark focus:outline-none focus:shadow-lg focus:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="updating">Updating...</span>
                  <span v-else>Update team</span>
                </button>
              </form>
            </div>

            <!-- Danger Zone -->
            <div class="bg-white border border-red-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-xl font-semibold text-red-700 mb-6">Danger Zone</h2>
              
              <div class="space-y-6">
                <!-- Leave team -->
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 class="font-semibold text-gray-700">Leave team</h3>
                    <p class="text-sm text-gray-600">Remove yourself from this team</p>
                  </div>
                  <button 
                    @click="showLeaveConfirm = true"
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Leave team
                  </button>
                </div>

                <!-- Delete team -->
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 class="font-semibold text-gray-700">Delete team</h3>
                    <p class="text-sm text-gray-600">Permanently delete this team and all its data</p>
                  </div>
                  <button 
                    @click="showDeleteConfirm = true"
                    class="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors font-medium"
                  >
                    Delete team
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Members Management -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Members ({{ teamData.members.length }})</h3>
              <div class="space-y-3">
                <div v-for="member in teamData.members" :key="member.userId" class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-gray-600">{{ member.userName.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-700">{{ member.userName }}</div>
                      <div class="text-xs text-gray-500">Joined {{ formatDate(member.joinedAt) }}</div>
                    </div>
                  </div>
                  <button 
                    v-if="member.userId !== user?.id && teamData.members.length > 1"
                    @click="removeMember(member.userId, member.userName)"
                    class="text-red-500 hover:text-red-700 p-1"
                    title="Remove member"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- team Stats -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">team Stats</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Created</span>
                  <span class="font-medium">{{ formatDate(teamData.createdAt) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Members</span>
                  <span class="font-medium">{{ teamData.members.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Privacy</span>
                  <span class="font-medium">{{ teamData.isPrivate ? 'Private' : 'Public' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Leave Confirmation Modal -->
    <div v-if="showLeaveConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showLeaveConfirm = false">
      <div class="bg-white rounded-xl p-6 max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Leave team</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to leave "{{ teamData?.name }}"? You'll need to be re-invited to join again.</p>
        <div class="flex gap-3 justify-end">
          <button @click="showLeaveConfirm = false" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button @click="leaveTeam" :disabled="leaving" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
            <span v-if="leaving">Leaving...</span>
            <span v-else>Leave team</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showDeleteConfirm = false">
      <div class="bg-white rounded-xl p-6 max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Delete team</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to permanently delete "{{ teamData?.name }}"? This action cannot be undone.</p>
        <div class="flex gap-3 justify-end">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button @click="deleteTeam" :disabled="deleting" class="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 disabled:opacity-50">
            <span v-if="deleting">Deleting...</span>
            <span v-else>Delete team</span>
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Get the team ID from the route
const route = useRoute()
const teamId = route.params.id

// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()
const loading = ref(true)
const showMobileMenu = ref(false)

// Form state
const form = reactive({
  name: '',
  description: '',
  coverImage: '',
  isPrivate: false
})

// State
const updating = ref(false)
const updateError = ref('')
const updateSuccess = ref('')
const leaving = ref(false)
const deleting = ref(false)
const showLeaveConfirm = ref(false)
const showDeleteConfirm = ref(false)

// Fetch team data
const { data: teamData, refresh } = await useFetch(`/api/teams/${teamId}`)

// Initialize form
const initializeForm = () => {
  if (teamData.value) {
    form.name = teamData.value.name
    form.description = teamData.value.description
    form.coverImage = teamData.value.coverImage
    form.isPrivate = teamData.value.isPrivate
  }
}

// Check authentication and initialize
onMounted(async () => {
  await checkAuth()
  initializeForm()
  loading.value = false
})

// Watch for team data changes
watch(teamData, (newData) => {
  if (newData) {
    initializeForm()
  }
}, { immediate: true })

// Update team
const updateTeam = async () => {
  if (updating.value) return

  updating.value = true
  updateError.value = ''
  updateSuccess.value = ''

  try {
    await $fetch(`/api/teams/${teamId}/update`, {
      method: 'PUT',
      body: {
        name: form.name,
        description: form.description,
        coverImage: form.coverImage,
        isPrivate: form.isPrivate
      }
    })

    updateSuccess.value = 'team updated successfully!'
    await refresh()

  } catch (err) {
    updateError.value = err.data?.message || 'Failed to update team'
  } finally {
    updating.value = false
  }
}

// Leave team
const leaveTeam = async () => {
  leaving.value = true

  try {
    await $fetch(`/api/teams/${teamId}/leave`, {
      method: 'POST'
    })

    // Redirect to teams page
    navigateTo('/teams')

  } catch (err) {
    console.error('Failed to leave team:', err)
  } finally {
    leaving.value = false
    showLeaveConfirm.value = false
  }
}

// Delete team
const deleteTeam = async () => {
  deleting.value = true

  try {
    await $fetch(`/api/teams/${teamId}/delete`, {
      method: 'DELETE'
    })

    // Redirect to teams page
    navigateTo('/teams')

  } catch (err) {
    console.error('Failed to delete team:', err)
  } finally {
    deleting.value = false
    showDeleteConfirm.value = false
  }
}

// Remove member (placeholder for future implementation)
const removeMember = (userId, userName) => {
  // This would be implemented with a remove member API
  console.log('Remove member:', userId, userName)
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
  title: computed(() => teamData.value ? `Manage ${teamData.value.name} - ICE2025` : 'Manage team - ICE2025'),
  meta: [
    {
      name: 'description',
      content: 'Manage team settings, members, and information.'
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

.text-primary {
  color: #0d7ae4;
}

.focus\:border-primary:focus {
  border-color: #0d7ae4;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}

.focus\:ring-primary:focus {
  --tw-ring-color: #0d7ae4;
}

.hover\:text-primary:hover {
  color: #0d7ae4;
}
</style>
