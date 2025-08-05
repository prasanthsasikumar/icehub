<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span v-if="user" class="text-sm text-gray-600">{{ user.name }}</span>
          <NuxtLink to="/teams" class="nav-button nav-button-secondary">
            Back to Teams
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
        <p class="text-gray-500 mb-6">Please sign in to create a team.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- Create Team Form -->
    <main v-else class="py-12">
      <div class="max-w-2xl mx-auto px-5">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold text-gray-700 mb-3">Create a New Team</h1>
          <p class="text-base text-gray-500">Start a community around your project or interests</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
          <form @submit.prevent="createTeam" class="flex flex-col gap-6">
            
            <!-- Cover Image Upload -->
            <div class="flex flex-col gap-2">
              <label class="font-semibold text-gray-700 text-sm mb-1">Cover Image (Optional)</label>
              <ImageUpload 
                v-model="form.coverImage"
                alt-text="Team cover image"
                :aspect-ratio="'16:9'"
              />
              <p class="text-xs text-gray-500">Upload a cover image or we'll assign a beautiful default one</p>
            </div>

            <!-- Team Name Input -->
            <div class="flex flex-col gap-2">
              <label for="name" class="font-semibold text-gray-700 text-sm mb-1">Team Name</label>
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
                placeholder="Describe your project, goals, and what kind of collaborators you're looking for..." 
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
                    <div class="font-medium text-gray-700">Public Team</div>
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
                    <div class="font-medium text-gray-700">Private Team</div>
                    <div class="text-sm text-gray-500">Only invited members can join</div>
                  </div>
                </label>
              </div>
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
              <span v-if="submitting">Creating Team...</span>
              <span v-else>Create Team</span>
            </button>
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
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

const submitting = ref(false)
const error = ref('')
const success = ref('')

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
  loading.value = false
})

// Create team
const createTeam = async () => {
  if (submitting.value || !user.value) return

  submitting.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await $fetch('/api/teams/create', {
      method: 'POST',
      body: {
        name: form.name,
        description: form.description,
        coverImage: form.coverImage,
        isPrivate: form.isPrivate
      }
    })

    success.value = 'Team created successfully!'
    
    // Redirect to the new team after a moment
    setTimeout(() => {
      navigateTo(`/teams/${response.team.id}`)
    }, 1500)

  } catch (err) {
    error.value = err.data?.message || 'Failed to create team'
  } finally {
    submitting.value = false
  }
}

// Page meta
useHead({
  title: 'Create Team - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Create a new participant team to collaborate on projects and connect with peers.'
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
