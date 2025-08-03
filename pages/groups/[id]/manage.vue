<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span v-if="user" class="text-sm text-gray-600">{{ user.name }}</span>
          <NuxtLink 
            v-if="groupData?.chatId" 
            :to="`/chat?chatId=${groupData.chatId}&type=group`" 
            class="nav-button nav-button-secondary"
          >
            💬 Group Chat
          </NuxtLink>
          <NuxtLink :to="`/groups/${groupId}`" class="nav-button nav-button-secondary">
            Back to Group
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
        <p class="text-gray-500 mb-6">Please sign in to manage groups.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- No Access -->
    <div v-else-if="groupData && !groupData.isMember" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⛔</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Access Denied</h1>
        <p class="text-gray-500 mb-6">Only group members can manage this group.</p>
        <NuxtLink :to="`/groups/${groupId}`" class="nav-button">
          Back to Group
        </NuxtLink>
      </div>
    </div>

    <!-- Manage Group Form -->
    <main v-else-if="groupData" class="py-12">
      <div class="max-w-4xl mx-auto px-5">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-700 mb-3">Manage Group</h1>
          <p class="text-base text-gray-500">Update group information and manage members</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Settings -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Group Information -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-xl font-semibold text-gray-700 mb-6">Group Information</h2>
              
              <form @submit.prevent="updateGroup" class="flex flex-col gap-6">
                <!-- Cover Image Upload -->
                <div class="flex flex-col gap-2">
                  <label class="font-semibold text-gray-700 text-sm mb-1">Cover Image</label>
                  <ImageUpload 
                    v-model="form.coverImage"
                    alt-text="Group cover image"
                    :aspect-ratio="'16:9'"
                  />
                </div>

                <!-- Group Name Input -->
                <div class="flex flex-col gap-2">
                  <label for="name" class="font-semibold text-gray-700 text-sm mb-1">Group Name</label>
                  <input 
                    id="name"
                    v-model="form.name" 
                    type="text"
                    placeholder="Enter group name" 
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
                        <div class="font-medium text-gray-700">Public Group</div>
                        <div class="text-sm text-gray-500">Anyone can discover and join this group</div>
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
                        <div class="font-medium text-gray-700">Private Group</div>
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
                  <span v-else>Update Group</span>
                </button>
              </form>
            </div>

            <!-- Danger Zone -->
            <div class="bg-white border border-red-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-xl font-semibold text-red-700 mb-6">Danger Zone</h2>
              
              <div class="space-y-6">
                <!-- Leave Group -->
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 class="font-semibold text-gray-700">Leave Group</h3>
                    <p class="text-sm text-gray-600">Remove yourself from this group</p>
                  </div>
                  <button 
                    @click="showLeaveConfirm = true"
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Leave Group
                  </button>
                </div>

                <!-- Delete Group -->
                <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 class="font-semibold text-gray-700">Delete Group</h3>
                    <p class="text-sm text-gray-600">Permanently delete this group and all its data</p>
                  </div>
                  <button 
                    @click="showDeleteConfirm = true"
                    class="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors font-medium"
                  >
                    Delete Group
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Members Management -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Members ({{ groupData.members.length }})</h3>
              <div class="space-y-3">
                <div v-for="member in groupData.members" :key="member.userId" class="flex items-center justify-between">
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
                    v-if="member.userId !== user?.id && groupData.members.length > 1"
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

            <!-- Group Stats -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">Group Stats</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Created</span>
                  <span class="font-medium">{{ formatDate(groupData.createdAt) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Members</span>
                  <span class="font-medium">{{ groupData.members.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Privacy</span>
                  <span class="font-medium">{{ groupData.isPrivate ? 'Private' : 'Public' }}</span>
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
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Leave Group</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to leave "{{ groupData?.name }}"? You'll need to be re-invited to join again.</p>
        <div class="flex gap-3 justify-end">
          <button @click="showLeaveConfirm = false" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button @click="leaveGroup" :disabled="leaving" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
            <span v-if="leaving">Leaving...</span>
            <span v-else>Leave Group</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showDeleteConfirm = false">
      <div class="bg-white rounded-xl p-6 max-w-md mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Delete Group</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to permanently delete "{{ groupData?.name }}"? This action cannot be undone.</p>
        <div class="flex gap-3 justify-end">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
          <button @click="deleteGroup" :disabled="deleting" class="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 disabled:opacity-50">
            <span v-if="deleting">Deleting...</span>
            <span v-else>Delete Group</span>
          </button>
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
const loading = ref(true)

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

// Fetch group data
const { data: groupData, refresh } = await useFetch(`/api/groups/${groupId}`)

// Initialize form
const initializeForm = () => {
  if (groupData.value) {
    form.name = groupData.value.name
    form.description = groupData.value.description
    form.coverImage = groupData.value.coverImage
    form.isPrivate = groupData.value.isPrivate
  }
}

// Check authentication and initialize
onMounted(async () => {
  await checkAuth()
  initializeForm()
  loading.value = false
})

// Watch for group data changes
watch(groupData, (newData) => {
  if (newData) {
    initializeForm()
  }
}, { immediate: true })

// Update group
const updateGroup = async () => {
  if (updating.value) return

  updating.value = true
  updateError.value = ''
  updateSuccess.value = ''

  try {
    await $fetch(`/api/groups/${groupId}/update`, {
      method: 'PUT',
      body: {
        name: form.name,
        description: form.description,
        coverImage: form.coverImage,
        isPrivate: form.isPrivate
      }
    })

    updateSuccess.value = 'Group updated successfully!'
    await refresh()

  } catch (err) {
    updateError.value = err.data?.message || 'Failed to update group'
  } finally {
    updating.value = false
  }
}

// Leave group
const leaveGroup = async () => {
  leaving.value = true

  try {
    await $fetch(`/api/groups/${groupId}/leave`, {
      method: 'POST'
    })

    // Redirect to groups page
    navigateTo('/groups')

  } catch (err) {
    console.error('Failed to leave group:', err)
  } finally {
    leaving.value = false
    showLeaveConfirm.value = false
  }
}

// Delete group
const deleteGroup = async () => {
  deleting.value = true

  try {
    await $fetch(`/api/groups/${groupId}/delete`, {
      method: 'DELETE'
    })

    // Redirect to groups page
    navigateTo('/groups')

  } catch (err) {
    console.error('Failed to delete group:', err)
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
  title: computed(() => groupData.value ? `Manage ${groupData.value.name} - ICEHub` : 'Manage Group - ICEHub'),
  meta: [
    {
      name: 'description',
      content: 'Manage group settings, members, and information.'
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
</style>
