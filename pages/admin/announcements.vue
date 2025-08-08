<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">Announcements Management</span>
          <NuxtLink to="/admin" class="nav-button nav-button-secondary">
            Back to Admin
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
        <div class="mb-8 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-700 mb-2">Announcements Management</h1>
            <p class="text-gray-500">Create and manage workshop announcements</p>
          </div>
          <button 
            @click="showCreateModal = true"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            New Announcement
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">📢</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ totalAnnouncements }}</div>
                <div class="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">📌</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ pinnedCount }}</div>
                <div class="text-sm text-gray-500">Pinned</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">🚨</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ urgentCount }}</div>
                <div class="text-sm text-gray-500">Urgent</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">📝</span>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-gray-900">{{ publishedCount }}</div>
                <div class="text-sm text-gray-500">Published</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Announcements List -->
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">All Announcements</h2>
          </div>
          
          <div v-if="announcements?.data && announcements.data.length > 0" class="divide-y divide-gray-200">
            <div 
              v-for="announcement in announcements.data" 
              :key="announcement.id" 
              class="p-6 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ announcement.title }}
                    </h3>
                    
                    <!-- Type Badge -->
                    <span :class="getTypeBadgeClass(announcement.type)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ announcement.type }}
                    </span>
                    
                    <!-- Pinned Badge -->
                    <span v-if="announcement.is_pinned" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      📌 Pinned
                    </span>
                    
                    <!-- Published Status -->
                    <span :class="announcement.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ announcement.is_published ? 'Published' : 'Draft' }}
                    </span>
                  </div>
                  
                  <p class="text-gray-600 mb-3 line-clamp-2">{{ announcement.content }}</p>
                  
                  <div class="flex items-center text-sm text-gray-500 gap-4">
                    <span>By {{ announcement.author_name }}</span>
                    <span>{{ formatDate(announcement.created_at) }}</span>
                    <span v-if="announcement.updated_at !== announcement.created_at">
                      Updated {{ formatDate(announcement.updated_at) }}
                    </span>
                    <span v-if="announcement.expires_at" class="text-orange-600">
                      Expires {{ formatDate(announcement.expires_at) }}
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 ml-4">
                  <button 
                    @click="editAnnouncement(announcement)"
                    class="text-blue-600 hover:text-blue-800 p-2"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  
                  <button 
                    @click="deleteAnnouncement(announcement)"
                    class="text-red-600 hover:text-red-800 p-2"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else-if="!announcements?.data || announcements.data.length === 0" class="text-center py-12">
            <div class="text-gray-400 text-6xl mb-4">📢</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
            <p class="text-gray-500 mb-4">Create your first announcement to get started</p>
            <button 
              @click="showCreateModal = true"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Announcement
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div 
      v-if="showCreateModal || showEditModal" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-auto" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-xl font-bold text-gray-800">
              {{ editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement' }}
            </h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="submitAnnouncement" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter announcement title"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                v-model="form.content"
                required
                rows="6"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter announcement content"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  v-model="form.type"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="general">General</option>
                  <option value="info">Info</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expires At (Optional)</label>
                <input
                  v-model="form.expires_at"
                  type="datetime-local"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div class="flex items-center gap-6">
              <label class="flex items-center">
                <input
                  v-model="form.is_pinned"
                  type="checkbox"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Pin this announcement</span>
              </label>
              
              <label class="flex items-center">
                <input
                  v-model="form.is_published"
                  type="checkbox"
                  class="mr-2"
                />
                <span class="text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>
            
            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="submitting"
                class="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                {{ submitting ? 'Saving...' : (editingAnnouncement ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Authentication
const { user, isLoggedIn, isAdmin, checkAuth } = useAuth()

// Check authentication
const loading = ref(true)
await checkAuth()
loading.value = false

// Data
const { data: announcements, refresh: refreshAnnouncements } = await useFetch('/api/announcements/admin', { 
  server: false, 
  default: () => ({ success: true, data: [] })
})

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingAnnouncement = ref(null)
const submitting = ref(false)

// Form data
const form = ref({
  title: '',
  content: '',
  type: 'general',
  is_pinned: false,
  is_published: true,
  expires_at: ''
})

// Computed stats
const totalAnnouncements = computed(() => {
  return announcements.value?.data?.length || 0
})

const pinnedCount = computed(() => {
  return announcements.value?.data?.filter(a => a.is_pinned).length || 0
})

const urgentCount = computed(() => {
  return announcements.value?.data?.filter(a => a.type === 'urgent').length || 0
})

const publishedCount = computed(() => {
  return announcements.value?.data?.filter(a => a.is_published).length || 0
})

// Methods
const getTypeBadgeClass = (type) => {
  const classes = {
    general: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    important: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  }
  return classes[type] || classes.general
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const editAnnouncement = (announcement) => {
  editingAnnouncement.value = announcement
  form.value = {
    title: announcement.title,
    content: announcement.content,
    type: announcement.type,
    is_pinned: announcement.is_pinned,
    is_published: announcement.is_published,
    expires_at: announcement.expires_at ? new Date(announcement.expires_at).toISOString().slice(0, 16) : ''
  }
  showEditModal.value = true
}

const deleteAnnouncement = async (announcement) => {
  if (!confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
    return
  }
  
  try {
    await $fetch(`/api/announcements/${announcement.id}`, {
      method: 'DELETE'
    })
    
    await refreshAnnouncements()
    alert('Announcement deleted successfully!')
  } catch (error) {
    console.error('Error deleting announcement:', error)
    alert('Failed to delete announcement. Please try again.')
  }
}

const submitAnnouncement = async () => {
  submitting.value = true
  
  try {
    const payload = { ...form.value }
    
    // Convert empty expires_at to null
    if (!payload.expires_at) {
      payload.expires_at = null
    } else {
      payload.expires_at = new Date(payload.expires_at).toISOString()
    }
    
    if (editingAnnouncement.value) {
      // Update existing announcement
      await $fetch(`/api/announcements/${editingAnnouncement.value.id}`, {
        method: 'PUT',
        body: payload
      })
      alert('Announcement updated successfully!')
    } else {
      // Create new announcement
      await $fetch('/api/announcements', {
        method: 'POST',
        body: payload
      })
      alert('Announcement created successfully!')
    }
    
    await refreshAnnouncements()
    closeModal()
  } catch (error) {
    console.error('Error saving announcement:', error)
    alert('Failed to save announcement. Please try again.')
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingAnnouncement.value = null
  
  // Reset form
  form.value = {
    title: '',
    content: '',
    type: 'general',
    is_pinned: false,
    is_published: true,
    expires_at: ''
  }
}

// Page meta
useHead({
  title: 'Announcements Management - ICE2025 Admin',
  meta: [
    {
      name: 'description',
      content: 'Manage workshop announcements for ICE2025'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
