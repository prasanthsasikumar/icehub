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
                    ✓ You're a {{ data.userRole || 'member' }}
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

            <!-- Shared Links & Resources -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">Shared Links & Resources</h2>
              
              <!-- Add Link Form (for members only) -->
              <div v-if="data.isMember" class="mb-6 p-4 bg-gray-50 rounded-lg">
                <div class="flex flex-col gap-3">
                  <textarea
                    v-model="newLinkText"
                    placeholder="Share links, resources, or any useful information with the group..."
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                  <div class="flex justify-end">
                    <button
                      @click="addSharedLink"
                      :disabled="!newLinkText.trim() || addingLink"
                      class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                    >
                      <span v-if="addingLink">Adding...</span>
                      <span v-else>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Shared Links List -->
              <div v-if="sharedLinks.length > 0" class="space-y-4">
                <div v-for="link in sharedLinks" :key="link.id" class="p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ link.content }}</p>
                      <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{{ link.userName }}</span>
                      </div>
                    </div>
                    <button
                      v-if="data.isMember && (link.userId === user?.id || user?.role === 'admin')"
                      @click="deleteSharedLink(link.id)"
                      class="text-gray-400 hover:text-red-500 ml-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto mb-3">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <p>No shared links yet</p>
                <p v-if="data.isMember" class="text-xs mt-1">Be the first to share something useful!</p>
              </div>
            </div>

            <!-- Image Gallery -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">Image Gallery</h2>
              
              <!-- Upload Image Form (for members only) -->
              <div v-if="data.isMember" class="mb-6">
                <div class="flex items-center gap-3">
                  <input
                    type="file"
                    ref="imageInput"
                    @change="handleImageUpload"
                    accept="image/*"
                    class="hidden"
                  />
                  <button
                    @click="$refs.imageInput.click()"
                    :disabled="uploadingImage"
                    class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21,15 16,10 5,21"/>
                    </svg>
                    <span v-if="uploadingImage">Uploading...</span>
                    <span v-else>Upload Image</span>
                  </button>
                </div>
              </div>

              <!-- Image Grid -->
              <div v-if="groupImages.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="image in groupImages" :key="image.id" class="relative group">
                  <img
                    :src="image.image_url"
                    :alt="`Uploaded by user`"
                    class="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                    @click="openImageModal(image)"
                  />
                  <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <p class="truncate">{{ image.filename }}</p>
                  </div>
                  <button
                    v-if="data.isMember && (image.created_by === user?.id || user?.role === 'admin')"
                    @click="deleteImage(image.id)"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div v-else class="text-center py-8 text-gray-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto mb-3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <p>No images shared yet</p>
                <p v-if="data.isMember" class="text-xs mt-1">Share your first image with the group!</p>
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

            <!-- Mentors -->
            <div v-if="data.mentors && data.mentors.length > 0" class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span>🎯</span>
                Mentors ({{ data.mentors.length }})
              </h3>
              <div class="space-y-3">
                <div v-for="mentor in data.mentors.slice(0, 5)" :key="mentor.userId" class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-blue-600">{{ mentor.userName.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="text-sm font-medium text-gray-700 truncate">{{ mentor.userName }}</span>
                    <div class="text-xs text-blue-600">Mentor</div>
                  </div>
                </div>
                <div v-if="data.mentors.length > 5" class="text-xs text-gray-500 text-center pt-2">
                  +{{ data.mentors.length - 5 }} more mentors
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
                <div v-if="data.mentors && data.mentors.length > 0" class="flex justify-between">
                  <span class="text-gray-500">Mentors</span>
                  <span class="font-medium">{{ data.mentors.length }}</span>
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

// Shared links state
const newLinkText = ref('')
const addingLink = ref(false)
const sharedLinks = ref([])

// Image gallery state
const uploadingImage = ref(false)
const groupImages = ref([])
const selectedImage = ref(null)

// Fetch group data
const { data, pending, error, refresh } = await useFetch(`/api/groups/${groupId}`)

// Fetch shared links and images
const { data: linksData, refresh: refreshLinks } = await useFetch(`/api/groups/${groupId}/links`)
const { data: imagesData, refresh: refreshImages } = await useFetch(`/api/groups/${groupId}/images`)

// Watch for data changes
watch([linksData, imagesData], ([links, images]) => {
  if (links) sharedLinks.value = links
  if (images) groupImages.value = images
}, { immediate: true })

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

// Shared links functions
const addSharedLink = async () => {
  if (!newLinkText.value.trim() || addingLink.value) return

  addingLink.value = true
  
  try {
    await $fetch(`/api/groups/${groupId}/links`, {
      method: 'POST',
      body: {
        content: newLinkText.value.trim()
      }
    })
    
    newLinkText.value = ''
    await refreshLinks()
  } catch (error) {
    console.error('Failed to add shared link:', error)
    alert('Failed to add shared link')
  } finally {
    addingLink.value = false
  }
}

const deleteSharedLink = async (linkId) => {
  if (!confirm('Are you sure you want to delete this shared link?')) return

  try {
    await $fetch(`/api/groups/${groupId}/links/${linkId}`, {
      method: 'DELETE'
    })
    
    await refreshLinks()
  } catch (error) {
    console.error('Failed to delete shared link:', error)
    alert('Failed to delete shared link')
  }
}

// Image gallery functions
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || uploadingImage.value) return

  uploadingImage.value = true

  try {
    const formData = new FormData()
    formData.append('image', file)

    await $fetch(`/api/groups/${groupId}/images`, {
      method: 'POST',
      body: formData
    })

    // Clear the file input
    event.target.value = ''
    await refreshImages()
  } catch (error) {
    console.error('Failed to upload image:', error)
    alert('Failed to upload image')
  } finally {
    uploadingImage.value = false
  }
}

const deleteImage = async (imageId) => {
  if (!confirm('Are you sure you want to delete this image?')) return

  try {
    await $fetch(`/api/groups/${groupId}/images/${imageId}`, {
      method: 'DELETE'
    })
    
    await refreshImages()
  } catch (error) {
    console.error('Failed to delete image:', error)
    alert('Failed to delete image')
  }
}

const openImageModal = (image) => {
  selectedImage.value = image
  // You could implement a modal here if needed
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
