<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">Media Gallery</span>
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg text-gray-500">Loading gallery...</div>
    </div>

    <!-- Main Content -->
    <main v-else class="py-8">
      <div class="max-w-7xl mx-auto px-5">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-gray-700 mb-4">ICE2025 Workshop Gallery</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Capturing the moments and memories from Sri Lanka's premier AI innovation workshop. 
            From brainstorming sessions to prototype demos, explore the journey of our participants and mentors.
          </p>
          <div v-if="mediaData?.totalCount" class="mt-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ mediaData.totalCount }} {{ mediaData.totalCount === 1 ? 'photo' : 'photos' }}
            </span>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div v-if="mediaData?.images?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div 
            v-for="(image, index) in mediaData.images" 
            :key="image.id"
            class="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            @click="openLightbox(index)"
          >
            <!-- Image Container -->
            <div class="aspect-square relative overflow-hidden">
              <img 
                v-if="!image.isPlaceholder"
                :src="getImageUrl(image.id)"
                :alt="image.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                @error="handleImageError"
              />
              <!-- Placeholder for demonstration -->
              <div 
                v-else
                class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
              >
                <div class="text-center">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-xs text-gray-500">{{ image.title }}</p>
                </div>
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
            </div>

            <!-- Image Info -->
            <div class="p-3">
              <h3 class="font-medium text-gray-900 text-sm truncate">{{ image.title }}</h3>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ image.description }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-gray-400 text-6xl mb-4">📸</div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No photos yet</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            The workshop gallery will be updated with photos as the event progresses. 
            Check back soon for amazing moments from ICE2025!
          </p>
        </div>
      </div>
    </main>

    <!-- Lightbox Modal -->
    <div 
      v-if="showLightbox" 
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      @click="closeLightbox"
    >
      <div class="relative max-w-5xl max-h-full" @click.stop>
        <!-- Close Button -->
        <button 
          @click="closeLightbox"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Navigation Buttons -->
        <button 
          v-if="currentImageIndex > 0"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button 
          v-if="currentImageIndex < (mediaData?.images?.length || 0) - 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Image -->
        <div v-if="currentImage" class="text-center">
          <img 
            v-if="!currentImage.isPlaceholder"
            :src="getImageUrl(currentImage.id)"
            :alt="currentImage.title"
            class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          <!-- Placeholder in lightbox -->
          <div 
            v-else
            class="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center"
          >
            <div class="text-center text-gray-600">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p>{{ currentImage.title }}</p>
            </div>
          </div>
          
          <!-- Image Info -->
          <div class="mt-4 text-white text-center">
            <h3 class="text-lg font-semibold mb-1">{{ currentImage.title }}</h3>
            <p class="text-gray-300">{{ currentImage.description }}</p>
            <p class="text-sm text-gray-400 mt-2">
              {{ currentImageIndex + 1 }} of {{ mediaData?.images?.length }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch media data
const { data: mediaResponse, pending: loading } = await useFetch('/api/media/gallery', {
  server: false,
  default: () => ({ success: true, data: { images: [], totalCount: 0 } })
})

// Reactive data
const showLightbox = ref(false)
const currentImageIndex = ref(0)

// Computed properties
const mediaData = computed(() => mediaResponse.value?.data)
const currentImage = computed(() => {
  if (mediaData.value?.images && currentImageIndex.value >= 0) {
    return mediaData.value.images[currentImageIndex.value]
  }
  return null
})

// Methods
const getImageUrl = (fileId) => {
  if (fileId.startsWith('placeholder_')) {
    // Return a placeholder image URL
    return '/uploads/default/default_user_icon.png'
  }
  
  // Use the existing proxy API for Google Drive images
  return `/api/proxy-image?id=${fileId}`
}

const openLightbox = (index) => {
  currentImageIndex.value = index
  showLightbox.value = true
  // Prevent body scroll when lightbox is open
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (mediaData.value?.images && currentImageIndex.value < mediaData.value.images.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const handleImageError = (event) => {
  console.error('Failed to load image:', event.target.src)
  // You could set a fallback image here
  event.target.src = '/uploads/default/default_user_icon.png'
}

// Handle keyboard navigation
const handleKeydown = (event) => {
  if (!showLightbox.value) return
  
  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored
  document.body.style.overflow = ''
})

// Page meta
useHead({
  title: 'Media Gallery - ICE2025 Workshop',
  meta: [
    {
      name: 'description',
      content: 'Explore photos and moments from the ICE2025 Workshop - Sri Lanka\'s premier AI innovation event.'
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