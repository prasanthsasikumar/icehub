<template>
  <div class="flex flex-col gap-3 sm:gap-4">
    <label class="font-semibold text-gray-700 text-sm">Profile Picture</label>
    
    <!-- Current Image Display -->
    <div v-if="imageUrl" class="flex items-center gap-3 sm:gap-4">
      <img 
        :src="imageUrl" 
        :alt="altText || 'Profile picture'"
        class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
        @error="handleImageError"
      />
      <button 
        @click="removeImage"
        type="button"
        class="text-red-600 hover:text-red-700 text-sm font-medium touch-target"
      >
        Remove Image
      </button>
    </div>

    <!-- Upload Options -->
    <div class="flex flex-col gap-2 sm:gap-3">
      <!-- File Upload Button -->
      <button
        @click="triggerFileUpload"
        type="button"
        class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base touch-target"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        Upload Image
      </button>

      <!-- Camera Capture Button (only on mobile/supported devices) -->
      <button
        v-if="supportsCameraCapture"
        @click="captureImage"
        type="button"
        class="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base touch-target"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        Take Photo
      </button>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      :capture="captureMode"
      @change="handleFileSelect"
      class="hidden"
    />

    <!-- Upload Progress -->
    <div v-if="uploading" class="flex items-center gap-2 text-sm text-gray-600">
      <div class="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
      Uploading image...
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <!-- Help Text -->
    <p class="text-xs text-gray-500 leading-relaxed">
      Recommended: Square image, max 5MB. Supports JPG, PNG, GIF.
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  altText: {
    type: String,
    default: 'Profile picture'
  }
})

const emit = defineEmits(['update:modelValue'])

// Reactive state
const fileInput = ref(null)
const uploading = ref(false)
const error = ref('')
const captureMode = ref(null)

// Computed
const imageUrl = computed(() => props.modelValue)
const supportsCameraCapture = computed(() => {
  // Check if device supports camera capture
  return typeof navigator !== 'undefined' && 
         navigator.mediaDevices && 
         navigator.mediaDevices.getUserMedia
})

// Methods
const triggerFileUpload = () => {
  captureMode.value = null
  fileInput.value?.click()
}

const captureImage = () => {
  captureMode.value = 'environment' // Use rear camera
  fileInput.value?.click()
}

const handleFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select a valid image file'
    return
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    error.value = 'Image must be smaller than 5MB'
    return
  }

  error.value = ''
  uploading.value = true

  try {
    // Convert to base64
    const base64 = await fileToBase64(file)
    
    // Upload to server
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: {
        image: base64,
        filename: file.name
      }
    })

    // Update model value with the uploaded image URL
    emit('update:modelValue', response.url)
    
  } catch (err) {
    console.error('Upload error:', err)
    error.value = err.data?.message || 'Failed to upload image. Please try again.'
  } finally {
    uploading.value = false
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const removeImage = () => {
  emit('update:modelValue', '')
  error.value = ''
}

const handleImageError = (event) => {
  // Fallback to placeholder if image fails to load
  event.target.src = '/uploads/default/user-avatar.svg'
}

// Helper function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
</script>
