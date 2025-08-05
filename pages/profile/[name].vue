<template>
  <div class="min-h-screen font-sans text-gray-700 bg-white">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
                <div class="nav-left">
          <NuxtLink to="/">
            <h1 class="nav-logo">ICE2025</h1>
          </NuxtLink>
        </div>
        <div class="nav-right">
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            <span class="hidden sm:inline">Back to Home</span>
            <span class="sm:hidden">← Home</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Profile Content -->
    <main class="section-padding">
      <div class="max-w-4xl mx-auto container-padding">
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12 sm:py-20">
          <div class="animate-pulse">
            <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div class="h-6 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-32 sm:w-48 mx-auto"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 sm:py-20">
          <div class="text-red-500 mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto sm:w-16 sm:h-16">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-3">User Not Found</h2>
          <p class="text-sm sm:text-base text-gray-500 mb-6">The participant profile you're looking for doesn't exist.</p>
          <NuxtLink to="/" class="nav-button">
            Back to Home
          </NuxtLink>
        </div>

        <!-- Profile Content -->
        <div v-else-if="data" class="space-y-6 sm:space-y-8">
          <!-- Profile Header -->
          <div class="bg-white border border-gray-200 rounded-xl card-padding shadow-sm">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              <!-- Profile Image -->
              <div class="relative">
                <img 
                  :src="getImageUrl(data.image)" 
                  :alt="`${data.name}'s profile`"
                  class="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                  @error="handleImageError"
                />
                <!-- Gender-based status indicator -->
                <div class="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-white flex items-center justify-center"
                     :class="{
                       'bg-blue-500': data.gender === 'male',
                       'bg-pink-500': data.gender === 'female', 
                       'bg-purple-500': data.gender === 'non-binary' || data.gender === 'other',
                       'bg-green-500': !data.gender || data.gender === ''
                     }">
                  <!-- Male symbol -->
                  <svg v-if="data.gender === 'male'" width="12" height="12" viewBox="0 0 24 24" fill="white" class="sm:w-4 sm:h-4">
                    <path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm3-1c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1zm7-7h-5c-.6 0-1 .4-1 1s.4 1 1 1h2.6l-3.3 3.3c-.9-.6-2-.6-2.9 0-1.4 1.4-1.4 3.6 0 5s3.6 1.4 5 0c.6-.6.9-1.3.9-2.1s-.3-1.5-.9-2.1L18.6 4H19c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                  </svg>
                  <!-- Female symbol -->
                  <svg v-else-if="data.gender === 'female'" width="12" height="12" viewBox="0 0 24 24" fill="white" class="sm:w-4 sm:h-4">
                    <path d="M12 2c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm1 2h-2v3h-2v2h2v3h2v-3h2v-2h-2v-3z"/>
                  </svg>
                  <!-- Non-binary/other symbol -->
                  <svg v-else-if="data.gender === 'non-binary' || data.gender === 'other'" width="12" height="12" viewBox="0 0 24 24" fill="white" class="sm:w-4 sm:h-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"/>
                  </svg>
                  <!-- Default checkmark for verified status when no gender specified -->
                  <svg v-else width="8" height="8" viewBox="0 0 24 24" fill="white" class="sm:w-3 sm:h-3">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Profile Info -->
              <div class="flex-1 text-center md:text-left">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 mb-2 sm:mb-3">
                  <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700">{{ data.name }}</h1>
                  <!-- Mentor Badge -->
                  <div v-if="isMentor(data)" class="mentor-badge">
                    <svg class="mentor-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Mentor
                  </div>
                </div>
                <p class="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">{{ data.bio }}</p>
                
                <!-- Affiliation -->
                <div v-if="data.affiliation" class="mb-3 sm:mb-4">
                  <p class="text-sm text-gray-500 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400">
                      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    {{ data.affiliation }}
                  </p>
                </div>

                <!-- Expertise -->
                <div v-if="data.expertise" class="mb-3 sm:mb-4">
                  <p class="text-sm text-gray-500 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                    <span class="font-medium">{{ data.expertise }}</span>
                  </p>
                </div>
                
                <!-- Quick Stats -->
                <div class="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
                  <div class="text-center">
                    <div class="text-xl sm:text-2xl font-bold text-primary">{{ getSkillsArray(data.skills).length }}</div>
                    <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Skills</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl sm:text-2xl font-bold text-primary">{{ calculateExperience(data.skills) }}</div>
                    <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Exp Level</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl sm:text-2xl font-bold text-primary">{{ getProfileScore(data) }}%</div>
                    <div class="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Profile</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center md:justify-start mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
              <template v-if="isCurrentUser">
                <NuxtLink to="/profile/edit" class="hero-btn hero-btn-primary text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-5 sm:h-5">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  Edit Profile
                </NuxtLink>
              </template>
              <template v-else-if="currentUser">
                <button @click="startConversation" class="hero-btn hero-btn-primary text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-5 sm:h-5">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .4-.1.5-.2L14 18h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                  <span class="hidden sm:inline">Send Message</span>
                  <span class="sm:hidden">Message</span>
                </button>
              </template>
              <template v-else>
                <NuxtLink to="/login" class="hero-btn hero-btn-primary text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-5 sm:h-5">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span class="hidden sm:inline">Sign in to Contact</span>
                  <span class="sm:hidden">Sign in</span>
                </NuxtLink>
              </template>
              <button @click="shareProfile" class="hero-btn hero-btn-secondary text-sm sm:text-base relative" :disabled="shareLoading">
                <svg v-if="!shareLoading" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-5 sm:h-5">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                <svg v-if="shareSuccess" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="sm:w-5 sm:h-5 text-green-600">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <div v-if="shareLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span v-if="shareSuccess">Copied!</span>
                <span v-else-if="shareLoading">...</span>
                <span v-else>Share</span>
              </button>
            </div>
          </div>

          <!-- Skills Section -->
          <div class="bg-white border border-gray-200 rounded-xl card-padding shadow-sm">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-primary sm:w-6 sm:h-6">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              Technical Skills
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div 
                v-for="skill in getSkillsArray(data.skills)" 
                :key="getSkillName(skill)"
                class="skill-card"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium text-sm sm:text-base">{{ getSkillName(skill) }}</span>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in getSkillLevel(getSkillName(skill))" :key="i" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400 sm:w-3 sm:h-3">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg v-for="i in (5 - getSkillLevel(getSkillName(skill)))" :key="`empty-${i}`" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-gray-300 sm:w-3 sm:h-3">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  {{ getSkillDescription(getSkillName(skill)) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Experience & Achievements -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- About Section -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {{ isMentor(data) ? 'About Mentor' : 'About Participant' }}
              </h2>
              
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Bio</h3>
                  <p class="text-gray-600 leading-relaxed">{{ data.bio }}</p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Specialization</h3>
                  <p class="text-gray-600">{{ getPrimarySpecialization(data.skills) }}</p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Experience Level</h3>
                  <div class="flex items-center gap-2">
                    <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {{ calculateExperience(data.skills) }}
                    </span>
                    <span class="text-gray-500 text-sm">based on skill diversity</span>
                  </div>
                </div>
                
                <!-- Mentor Status -->
                <div v-if="isMentor(data)">
                  <h3 class="font-semibold text-gray-700 mb-2">Role</h3>
                  <div class="flex items-center gap-2">
                    <div class="mentor-badge">
                      <svg class="mentor-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Mentor
                    </div>
                    <span class="text-gray-500 text-sm">contact for guidance.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats & Achievements -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Profile Stats
              </h2>
              
              <div class="space-y-6">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Profile Completeness</span>
                  <div class="flex items-center gap-2">
                    <div class="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        class="h-full bg-primary rounded-full transition-all duration-300" 
                        :style="{ width: `${getProfileScore(data)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm font-medium">{{ getProfileScore(data) }}%</span>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Skill Diversity</span>
                  <span class="font-medium">{{ getSkillDiversity(data.skills) }}</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Technology Stack</span>
                  <span class="font-medium">{{ getTechStack(data.skills) }}</span>
                </div>
                
              </div>
            </div>
          </div>

                    <!-- Profile Video Section -->
          <div v-if="data.video" class="bg-white border border-gray-200 rounded-xl card-padding shadow-sm">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-primary sm:w-6 sm:h-6">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
              </svg>
              Profile Video
            </h2>
            
            <div class="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe 
                v-if="getEmbedUrl(data.video)"
                :src="getEmbedUrl(data.video)" 
                class="w-full h-full"
                frameborder="0" 
                allowfullscreen
                title="Profile Video"
              ></iframe>
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400 mx-auto mb-2">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                  <p class="text-gray-500 text-sm">
                    <a :href="data.video" target="_blank" class="text-primary hover:underline">
                      View Video
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Get the user name from the route
const route = useRoute()
const userName = route.params.name

// Authentication
const { user: currentUser, checkAuth } = useAuth()

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

// Check if viewing own profile
const isCurrentUser = computed(() => {
  return currentUser.value && currentUser.value.name === decodeURIComponent(userName)
})

// Share functionality
const shareLoading = ref(false)
const shareSuccess = ref(false)

// Fetch user data
const { data, pending, error } = await useFetch('/api/user', {
  query: { name: userName }
})

// Helper functions
const handleImageError = (event) => {
  event.target.src = '/uploads/default/user-avatar.svg'
}

// Image URL helper function for Google Drive images
const getImageUrl = (url) => {
  if (!url) return '/uploads/default/user-avatar.svg'
  
  try {
    // Handle Google Drive URLs - use our proxy API
    if (url.includes('drive.google.com')) {
      // Extract file ID from various Google Drive URL formats
      let fileId = null
      
      // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      let match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
      if (match) {
        fileId = match[1]
      } else {
        // Format: https://drive.google.com/open?id=FILE_ID
        match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
        if (match) {
          fileId = match[1]
        }
      }
      
      if (fileId) {
        console.log('Converting Google Drive URL to proxy:', url, '-> fileId:', fileId)
        // Use our server-side proxy to serve the image
        return `/api/proxy-image?id=${fileId}`
      }
    }
    
    // Return original URL for other formats (direct URLs, etc.)
    return url
  } catch (error) {
    console.error('Error parsing image URL:', error)
    return '/uploads/default/user-avatar.svg'
  }
}

const isMentor = (user) => {
  if (!user) return false
  // Check both 'role' and 'userRole' fields for mentor status
  return user.role === 'mentor' || user.userRole === 'mentor'
}

const startConversation = () => {
  if (!data.value) return
  
  // Navigate to chat with query params to start conversation
  navigateTo({
    path: '/chat',
    query: {
      user: data.value.id,
      name: data.value.name
    }
  })
}

const shareProfile = async () => {
  if (!data.value) return
  
  shareLoading.value = true
  shareSuccess.value = false
  
  try {
    const profileUrl = `${window.location.origin}/profile/${encodeURIComponent(data.value.name)}`
    const shareText = `Check out ${data.value.name}'s profile on ICE2025 Workshop`
    
    // Check if Web Share API is supported (mainly mobile devices)
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: `${data.value.name} - ICE2025 Workshop`,
          text: shareText,
          url: profileUrl
        })
        return
      } catch (shareError) {
        // If user cancels share, fall back to clipboard
        if (shareError.name !== 'AbortError') {
          console.warn('Web Share API failed:', shareError)
        }
      }
    }
    
    // Fallback to clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(profileUrl)
      shareSuccess.value = true
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        shareSuccess.value = false
      }, 2000)
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea')
      textArea.value = profileUrl
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        shareSuccess.value = true
        
        // Reset success state after 2 seconds
        setTimeout(() => {
          shareSuccess.value = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy to clipboard:', err)
        // Show a manual copy option
        alert(`Copy this link to share: ${profileUrl}`)
      } finally {
        document.body.removeChild(textArea)
      }
    }
  } catch (error) {
    console.error('Share failed:', error)
    // Show error feedback
    alert('Failed to share. Please try again.')
  } finally {
    shareLoading.value = false
  }
}

const calculateExperience = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  if (skillsArray.length <= 2) return 'Beginner'
  if (skillsArray.length <= 4) return 'Intermediate'
  if (skillsArray.length <= 6) return 'Advanced'
  return 'Expert'
}

const getSkillsArray = (skills) => {
  if (!skills || !Array.isArray(skills)) return []
  
  // Check if it's the new format with objects
  if (skills.length > 0 && typeof skills[0] === 'object' && 'name' in skills[0]) {
    return skills  // Return the full objects for level display
  }
  
  // Old format - convert strings to objects with default level
  return skills.map(skill => ({ name: skill, level: 3 }))
}

const getSkillName = (skill) => {
  return typeof skill === 'string' ? skill : skill.name
}

const getSkillsStringArray = (skills) => {
  if (!skills || !Array.isArray(skills)) return []
  return skills.map(skill => getSkillName(skill))
}

const getProfileScore = (user) => {
  let score = 0
  if (user.name) score += 20
  if (user.image) score += 20
  if (user.bio && user.bio.length > 10) score += 20
  if (getSkillsStringArray(user.skills).length > 0) score += 20
  if (user.expertise && user.expertise.length > 0) score += 20
  return score
}

const getSkillLevel = (skill) => {
  if (!data.value || !data.value.skills) return 3
  
  // Check if skills are in the new format with levels
  if (Array.isArray(data.value.skills) && data.value.skills.length > 0) {
    const firstSkill = data.value.skills[0]
    if (typeof firstSkill === 'object' && 'name' in firstSkill && 'level' in firstSkill) {
      // New format - find the skill and return its level
      const skillObj = data.value.skills.find(s => s.name === skill)
      return skillObj ? skillObj.level : 3
    }
  }
  
  // Old format or fallback - use the existing calculation
  const advanced = ['JavaScript', 'React', 'Vue', 'Python', 'Node.js']
  const intermediate = ['TypeScript', 'Angular', 'PHP', 'Java', 'C#']
  
  if (advanced.includes(skill)) return 4
  if (intermediate.includes(skill)) return 3
  return Math.floor(Math.random() * 3) + 2 // Random 2-4
}

const getSkillDescription = (skill) => {
  const descriptions = {
    'JavaScript': 'Modern ES6+ development',
    'React': 'Component-based UI development',
    'Vue': 'Progressive web applications',
    'Python': 'Backend & data science',
    'Node.js': 'Server-side JavaScript',
    'TypeScript': 'Type-safe development',
    'Rust': 'Systems programming',
    'PHP': 'Web backend development'
  }
  return descriptions[skill] || 'Professional experience'
}

const getPrimarySpecialization = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  const frontend = ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript']
  const backend = ['Node.js', 'Python', 'PHP', 'Java', 'C#', 'Rust']
  const mobile = ['React Native', 'Flutter', 'Swift', 'Kotlin']
  
  const frontendCount = skillsArray.filter(s => frontend.includes(s)).length
  const backendCount = skillsArray.filter(s => backend.includes(s)).length
  const mobileCount = skillsArray.filter(s => mobile.includes(s)).length
  
  if (frontendCount > backendCount && frontendCount > mobileCount) return 'Frontend Development'
  if (backendCount > frontendCount && backendCount > mobileCount) return 'Backend Development'
  if (mobileCount > 0) return 'Mobile Development'
  return 'Full Stack Development'
}

const getSkillDiversity = (skills) => {
  const skillsArray = getSkillsArray(skills)
  if (skillsArray.length <= 2) return 'Specialized'
  if (skillsArray.length <= 4) return 'Diverse'
  return 'Polyglot'
}

const getTechStack = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  const webTech = ['JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'TypeScript']
  const hasWeb = skillsArray.some(s => webTech.includes(s))
  
  if (hasWeb) return 'Web Technologies'
  return 'Mixed Technologies'
}

// Video URL helper function
const getEmbedUrl = (url) => {
  if (!url) return null
  
  try {
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/)
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview`
      }
    }
    
    // Handle YouTube URLs
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = null
      if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1]?.split('&')[0]
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0]
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com/')) {
      const match = url.match(/vimeo\.com\/(\d+)/)
      if (match) {
        return `https://player.vimeo.com/video/${match[1]}`
      }
    }
    
    // Return null if no recognized pattern (will show fallback link)
    return null
  } catch (error) {
    console.error('Error parsing video URL:', error)
    return null
  }
}

// Page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - ICE2025` : 'Profile - ICE2025'),
  meta: [
    {
      name: 'description',
      content: computed(() => data.value ? `View ${data.value.name}'s participant profile and skills on ICE2025` : 'Participant profile on ICE2025')
    }
  ]
})
</script>

<style scoped>
.skill-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  transition: all 0.2s;
}

.skill-card:hover {
  background-color: white;
  border-color: #0d7ae4;
}

/* Custom spacing utilities */
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
