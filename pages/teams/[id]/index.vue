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
          <template v-if="isLoggedIn">
            <span class="text-sm text-gray-600">{{ user?.name }}</span>
            <NuxtLink to="/chat" class="nav-button nav-button-secondary">
              Messages
            </NuxtLink>
          </template>
          <NuxtLink to="/teams" class="nav-button nav-button-secondary">
            Back to teams
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
          <template v-if="isLoggedIn">
            <div class="text-sm text-gray-600 font-medium">{{ user?.name }}</div>
            <NuxtLink 
              to="/chat" 
              class="block py-2 text-gray-700 hover:text-primary"
              @click="showMobileMenu = false"
            >
              Messages
            </NuxtLink>
          </template>
          <NuxtLink 
            to="/teams" 
            class="block py-2 text-gray-700 hover:text-primary"
            @click="showMobileMenu = false"
          >
            Back to teams
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
        <h2 class="text-2xl font-bold text-gray-700 mb-3">team Not Found</h2>
        <p class="text-gray-500 mb-6">The team you're looking for doesn't exist or you don't have access to it.</p>
        <NuxtLink to="/teams" class="nav-button">
          Back to teams
        </NuxtLink>
      </div>
    </div>

    <!-- team Content -->
    <div v-else-if="data" class="pb-12">
      <!-- team Header -->
      <div class="relative">
        <!-- Cover Image -->
        <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <img 
            :src="data.coverImage" 
            :alt="`${data.name} cover`"
            class="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div class="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <!-- Privacy Badge -->
          <div v-if="data.isPrivate" class="absolute top-6 right-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black bg-opacity-50 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Private team
            </span>
          </div>
        </div>

        <!-- team Info Overlay -->
        <div class="max-w-4xl mx-auto px-5">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 -mt-16 relative z-10 p-8">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-700 mb-3">{{ data.name }}</h1>
                <p class="text-gray-600 mb-4 leading-relaxed">{{ data.description.split('.')[0] }}</p>
                
                <!-- team Stats -->
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
                    :to="`/teams/${teamId}/manage`"
                    class="bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Manage Team
                  </NuxtLink>
                </template>
                <template v-else-if="isLoggedIn">
                  <button 
                    @click="jointeam"
                    :disabled="joiningteam"
                    class="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
                  >
                    <span v-if="joiningteam">Joining...</span>
                    <span v-else>Join team</span>
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

      <!-- team Content -->
      <div class="max-w-4xl mx-auto px-5 mt-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About Section -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">About This team</h2>
              <p class="text-gray-600 leading-relaxed">{{ data.description }}</p>
            </div>

            <!-- Shared Links & Resources -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">Shared Links & Resources</h2>
              
              <!-- Add Link Form (for members and admins) -->
              <div v-if="data.isMember || user?.role === 'admin'" class="mb-6 p-4 bg-gray-50 rounded-lg">
                <div class="flex flex-col gap-3">
                  <textarea
                    v-model="newLinkText"
                    placeholder="Share links, resources, or any useful information with the team..."
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

              <!-- Loading skeleton for links -->
              <div v-if="!linksData && !sharedLinks.length" class="space-y-4">
                <div v-for="i in 2" :key="i" class="animate-pulse">
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>

              <!-- Shared Links List -->
              <div v-else-if="sharedLinks.length > 0" class="space-y-4">
                <div v-for="link in sharedLinks" :key="link.id" class="p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-700 break-words overflow-wrap-anywhere" v-html="formatLinkContent(link.content)"></div>
                      <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{{ link.userName }}</span>
                      </div>
                    </div>
                    <button
                      v-if="data.isMember || user?.role === 'admin' && (link.userId === user?.id || user?.role === 'admin')"
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
                <p v-if="data.isMember || user?.role === 'admin'" class="text-xs mt-1">Be the first to share something useful!</p>
              </div>
            </div>

            <!-- Image Gallery -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-700 mb-4">Image Gallery</h2>
              
              <!-- Upload Image Form (for members and admins) -->
              <div v-if="data.isMember || user?.role === 'admin'" class="mb-6">
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

              <!-- Loading skeleton for images -->
              <div v-if="!imagesData && !teamImages.length" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="i in 6" :key="i" class="animate-pulse">
                  <div class="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              </div>

              <!-- Image Grid -->
              <div v-else-if="teamImages.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="image in teamImages" :key="image.id" class="relative team">
                  <img
                    :src="image.image_url"
                    :alt="`Uploaded by user`"
                    class="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                    loading="lazy"
                    @click="openImageModal(image)"
                  />
                  <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg opacity-0 team-hover:opacity-100 transition-opacity">
                    <p class="truncate">{{ image.filename }}</p>
                  </div>
                  <button
                    v-if="data.isMember || user?.role === 'admin' && (image.created_by === user?.id || user?.role === 'admin')"
                    @click="deleteImage(image.id)"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 team-hover:opacity-100 transition-opacity"
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
                <p v-if="data.isMember || user?.role === 'admin'" class="text-xs mt-1">Share your first image with the team!</p>
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

            <!-- team Info -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4">team Info</h3>
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

            <!-- Team Skills -->
            <div v-if="teamSkills.length > 0" class="bg-white rounded-xl border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span>🛠️</span>
                Team Skills ({{ teamSkills.length }})
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in teamSkills" 
                  :key="skill"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
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

// State
const joiningteam = ref(false)
const showMobileMenu = ref(false)

// Shared links state
const newLinkText = ref('')
const addingLink = ref(false)
const sharedLinks = ref([])

// Image gallery state
const uploadingImage = ref(false)
const teamImages = ref([])
const selectedImage = ref(null)

// Fetch team data first (critical for initial render)
const { data, pending, error, refresh } = await useFetch(`/api/teams/${teamId}`)

// Fetch shared links and images with lazy loading (better UX)
const { data: linksData, refresh: refreshLinks } = await useLazyFetch(`/api/teams/${teamId}/links`)
const { data: imagesData, refresh: refreshImages } = await useLazyFetch(`/api/teams/${teamId}/images`)

// Watch for data changes
watch([linksData, imagesData], ([links, images]) => {
  if (links) sharedLinks.value = links
  if (images) teamImages.value = images
}, { immediate: true })

// Computed property for unique team skills
const teamSkills = computed(() => {
  if (!data.value) return []
  
  const allSkills = new Set()
  
  // Helper function to extract skill names from both formats
  const extractSkillName = (skill) => {
    if (typeof skill === 'string') {
      return skill
    } else if (typeof skill === 'object' && skill.name) {
      return skill.name
    }
    return null
  }
  
  // Add skills from regular members
  if (data.value.members) {
    data.value.members.forEach(member => {
      if (member.skills && Array.isArray(member.skills)) {
        member.skills.forEach(skill => {
          const skillName = extractSkillName(skill)
          if (skillName) allSkills.add(skillName)
        })
      }
    })
  }
  
  // Add skills from mentors
  if (data.value.mentors) {
    data.value.mentors.forEach(mentor => {
      if (mentor.skills && Array.isArray(mentor.skills)) {
        mentor.skills.forEach(skill => {
          const skillName = extractSkillName(skill)
          if (skillName) allSkills.add(skillName)
        })
      }
    })
  }
  
  // Convert Set to Array and sort alphabetically
  return Array.from(allSkills).sort()
})

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

// Join team function
const jointeam = async () => {
  if (!isLoggedIn.value) {
    navigateTo('/login')
    return
  }

  joiningteam.value = true
  
  try {
    await $fetch(`/api/teams/${teamId}/join`, {
      method: 'POST'
    })
    
    // Refresh the team data
    await refresh()
  } catch (error) {
    console.error('Failed to join team:', error)
    // You could add a toast notification here
  } finally {
    joiningteam.value = false
  }
}

// Shared links functions
const addSharedLink = async () => {
  if (!newLinkText.value.trim() || addingLink.value) return

  addingLink.value = true
  
  try {
    await $fetch(`/api/teams/${teamId}/links`, {
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
    await $fetch(`/api/teams/${teamId}/links/${linkId}`, {
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

    await $fetch(`/api/teams/${teamId}/images`, {
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
    await $fetch(`/api/teams/${teamId}/images/${imageId}`, {
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

// Helper function to format link content and make URLs clickable
const formatLinkContent = (content) => {
  if (!content) return ''
  
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g
  
  // Replace URLs with clickable links
  const formattedContent = content.replace(urlRegex, (url) => {
    // Remove trailing punctuation that might not be part of the URL
    const cleanUrl = url.replace(/[.,;:!?)]+$/, '')
    const trailingPunc = url.slice(cleanUrl.length)
    
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-dark underline break-all">${cleanUrl}</a>${trailingPunc}`
  })
  
  // Preserve line breaks
  return formattedContent.replace(/\n/g, '<br>')
}

// Page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - ICE2025` : 'team - ICE2025'),
  meta: [
    {
      name: 'description',
      content: computed(() => data.value ? `Join ${data.value.name} and collaborate on ${data.value.description}` : 'Participant team on ICE2025')
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

.text-primary {
  color: #0d7ae4;
}

.text-primary-dark {
  color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}

/* Text wrapping utilities for long URLs and content */
.break-words {
  word-break: break-word;
}

.overflow-wrap-anywhere {
  overflow-wrap: anywhere;
}

.break-all {
  word-break: break-all;
}
</style>
