<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">{{ user?.name }}</span>
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

    <!-- Not Authenticated -->
    <div v-else-if="!isLoggedIn" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-blue-500 text-6xl mb-4">🔒</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Authentication Required</h1>
        <p class="text-gray-500 mb-6">Please sign in to update your profile.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- Profile Update Form -->
    <main v-else class="py-12">
      <div class="max-w-container mx-auto px-5">
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-700 mb-3">Update Your Profile</h1>
            <p class="text-base text-gray-500">Keep your information up to date</p>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
            <form @submit.prevent="updateProfile" class="flex flex-col gap-6">
              <!-- Name Input -->
              <div class="flex flex-col gap-2">
                <label for="name" class="font-semibold text-gray-700 text-sm mb-1">Full Name</label>
                <input 
                  id="name"
                  v-model="form.name" 
                  type="text"
                  placeholder="Enter your full name" 
                  required 
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                />
              </div>

              <!-- Bio Input -->
              <div class="flex flex-col gap-2">
                <label for="bio" class="font-semibold text-gray-700 text-sm mb-1">Bio</label>
                <textarea 
                  id="bio"
                  v-model="form.bio" 
                  placeholder="Tell us about yourself..." 
                  rows="4"
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10 resize-none"
                ></textarea>
              </div>

              <!-- Skills Input -->
              <div class="flex flex-col gap-2">
                <label for="skills" class="font-semibold text-gray-700 text-sm mb-1">Skills</label>
                <input 
                  id="skills"
                  v-model="skillsInput" 
                  type="text"
                  placeholder="e.g., JavaScript, React, Python (comma-separated)" 
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                />
                <p class="text-xs text-gray-500">Separate skills with commas</p>
              </div>

              <!-- Error/Success Messages -->
              <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{{ error }}</p>
              </div>

              <div v-if="success" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-green-600 text-sm">{{ success }}</p>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="submitting"
                class="bg-primary text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-primary-dark focus:outline-none focus:shadow-lg focus:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitting">Updating...</span>
                <span v-else>Update Profile</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()
const loading = ref(true)

// Form state
const form = reactive({
  name: '',
  bio: ''
})

const skillsInput = ref('')
const submitting = ref(false)
const error = ref('')
const success = ref('')

// Initialize form with current user data
const initializeForm = () => {
  if (user.value) {
    form.name = user.value.name || ''
    form.bio = user.value.bio || ''
    skillsInput.value = user.value.skills ? user.value.skills.join(', ') : ''
  }
}

// Check authentication and initialize
onMounted(async () => {
  await checkAuth()
  initializeForm()
  loading.value = false
})

// Watch for user changes
watch(user, (newUser) => {
  if (newUser) {
    initializeForm()
  }
})

// Update profile
const updateProfile = async () => {
  if (submitting.value || !user.value) return

  submitting.value = true
  error.value = ''
  success.value = ''

  try {
    // Parse skills
    const skills = skillsInput.value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)

    await $fetch('/api/user/update', {
      method: 'POST',
      body: {
        name: form.name,
        bio: form.bio,
        skills
      }
    })

    success.value = 'Profile updated successfully!'
    
    // Update local user state
    const { checkAuth } = useAuth()
    await checkAuth()

    // Redirect to updated profile after a moment
    setTimeout(() => {
      navigateTo(`/profile/${encodeURIComponent(form.name)}`)
    }, 1500)

  } catch (err) {
    error.value = err.data?.message || 'Failed to update profile'
  } finally {
    submitting.value = false
  }
}

// Page meta
useHead({
  title: 'Update Profile - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Update your ICEHub profile information and skills.'
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
</style>
