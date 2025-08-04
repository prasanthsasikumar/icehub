<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50 flex items-center justify-center container-padding">
    <div class="text-center max-w-lg mx-auto">
      <div class="mb-6 sm:mb-8">
        <div class="text-4xl sm:text-6xl mb-4">🚀</div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">Ready to join ICE2025?</h1>
        <p class="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 leading-relaxed">
          Create your account to showcase your skills and connect with other developers.
        </p>
      </div>

      <div class="space-y-3 sm:space-y-4">
        <NuxtLink to="/register" class="block">
          <button class="hero-btn hero-btn-primary text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 shadow-lg">
            Create Your Account
          </button>
        </NuxtLink>
        
        <div class="text-sm sm:text-base text-gray-500 leading-relaxed">
          Already have an account?
          <NuxtLink to="/login" class="text-primary hover:text-primary-dark font-medium block sm:inline mt-1 sm:mt-0">
            Sign in here
          </NuxtLink>
        </div>
      </div>

      <div class="mt-8 sm:mt-12">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 transition-colors text-sm sm:text-base">
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Join Community - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Join the ICE2025 developer community. Create your profile and connect with talented professionals.'
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

.text-primary-dark {
  color: #0969da;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}
</style>
