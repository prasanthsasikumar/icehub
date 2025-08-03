<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50 flex items-center justify-center py-12">
    <div class="w-full max-w-md">
      <!-- Logo and Header -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-3xl font-bold text-gray-700 hover:text-primary transition-colors">
          ICEHub
        </NuxtLink>
        <h1 class="text-2xl font-semibold text-gray-700 mt-4 mb-2">Create your account</h1>
        <p class="text-gray-500">Join the developer community</p>
      </div>

      <!-- Registration Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your full name"
              :disabled="loading"
            />
          </div>

          <!-- Profile Picture Upload -->
          <div>
            <ImageUpload 
              v-model="form.image"
              alt-text="Profile picture"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email address"
              :disabled="loading"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password (min 6 characters)"
              :disabled="loading"
            />
          </div>

          <!-- Bio Field -->
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              v-model="form.bio"
              rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Tell us about yourself..."
              :disabled="loading"
            ></textarea>
          </div>

          <!-- User Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Join as
            </label>
            <div class="space-y-3">
              <label class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{ 'border-primary bg-blue-50': form.userRole === 'developer' }">
                <input 
                  type="radio" 
                  v-model="form.userRole" 
                  value="developer" 
                  class="mt-1"
                  :disabled="loading"
                />
                <div class="flex-1">
                  <div class="font-medium text-gray-700 flex items-center gap-2">
                    <span>👨‍💻</span>
                    Developer
                  </div>
                  <div class="text-sm text-gray-500 mt-1">I'm looking to learn, collaborate, and work on projects with others.</div>
                </div>
              </label>
              
              <label class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" :class="{ 'border-primary bg-blue-50': form.userRole === 'mentor' }">
                <input 
                  type="radio" 
                  v-model="form.userRole" 
                  value="mentor" 
                  class="mt-1"
                  :disabled="loading"
                />
                <div class="flex-1">
                  <div class="font-medium text-gray-700 flex items-center gap-2">
                    <span>🎯</span>
                    Mentor
                  </div>
                  <div class="text-sm text-gray-500 mt-1">I want to guide and support other developers in their journey.</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Skills Field -->
          <div>
            <label for="skills" class="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <input
              id="skills"
              v-model="skillsInput"
              type="text"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="e.g., JavaScript, React, Python (comma-separated)"
              :disabled="loading"
            />
            <p class="text-xs text-gray-500 mt-1">Separate skills with commas</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Create account</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Already have an account?
            <NuxtLink to="/login" class="text-primary hover:text-primary-dark font-medium">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Form state
const form = reactive({
  name: '',
  email: '',
  password: '',
  bio: '',
  image: '',
  userRole: 'developer' // Default to developer
})

const skillsInput = ref('')
const loading = ref(false)
const error = ref('')

// Handle registration
const handleRegister = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    // Parse skills from input
    const skills = skillsInput.value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)

    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        image: form.image,
        userRole: form.userRole,
        skills
      }
    })

    // Store user in global state
    const user = useState('auth.user')
    user.value = response.user

    // Redirect to home page
    await navigateTo('/')
  } catch (err) {
    error.value = err.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
onMounted(async () => {
  try {
    const response = await $fetch('/api/auth/me')
    if (response.user) {
      await navigateTo('/')
    }
  } catch {
    // Not logged in, stay on register page
  }
})

// Page meta
useHead({
  title: 'Sign Up - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Create your ICEHub account to showcase your skills and connect with other developers.'
    }
  ]
})
</script>

<style scoped>
.text-primary {
  color: #0d7ae4;
}

.text-primary-dark {
  color: #0969da;
}

.bg-primary {
  background-color: #0d7ae4;
}

.bg-primary-dark {
  background-color: #0969da;
}

.focus\:border-primary:focus {
  border-color: #0d7ae4;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}
</style>
