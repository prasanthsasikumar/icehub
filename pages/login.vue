<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50 flex items-center justify-center container-padding py-8">
    <div class="w-full max-w-md">
      <!-- Logo and Header -->
      <div class="text-center mb-6 sm:mb-8">
        <NuxtLink to="/" class="text-2xl sm:text-3xl font-bold text-gray-700 hover:text-primary transition-colors">
          ICE2025
        </NuxtLink>
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-700 mt-3 sm:mt-4 mb-2">Welcome back</h1>
        <p class="text-sm sm:text-base text-gray-500">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 card-padding">
        <form @submit.prevent="handleLogin" class="space-y-5 sm:space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              placeholder="Enter your email"
              :disabled="loading"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="form-input"
              placeholder="Enter your password"
              :disabled="loading"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="form-button"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </form>

        <!-- Demo Credentials -->
        <!-- <div class="mt-5 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
          <div class="text-xs sm:text-sm text-blue-700 space-y-1">
            <p><strong>Regular User:</strong></p>
            <p>Email: test@email.com</p>
            <p>Password: password</p>
            <p class="mt-2"><strong>Admin User:</strong></p>
            <p>Email: admin@ice2025.com</p>
            <p>Password: admin123</p>
          </div>
        </div> -->

        <!-- Register Link -->
        <div class="mt-5 sm:mt-6 text-center">
          <p class="text-sm sm:text-base text-gray-600">
            Don't have an account?
            <NuxtLink to="/register" class="text-primary hover:text-primary-dark font-medium block sm:inline mt-1 sm:mt-0">
              Sign up
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Form state
const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

// Handle login
const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password
      }
    })

    // Store user in a composable or global state
    const user = useState('auth.user')
    user.value = response.user

    // Redirect to home page
    await navigateTo('/')
  } catch (err) {
    error.value = err.data?.message || 'Invalid email or password'
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
    // Not logged in, stay on login page
  }
})

// Page meta
useHead({
  title: 'Sign In - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your ICE2025 account to access your participant profile and connect with other professionals.'
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
