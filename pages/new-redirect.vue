<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <div class="text-6xl mb-4">🚀</div>
        <h1 class="text-3xl font-bold text-gray-700 mb-4">Ready to join ICEHub?</h1>
        <p class="text-lg text-gray-500 mb-8">
          Create your account to showcase your skills and connect with other developers.
        </p>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/register" class="block">
          <button class="bg-primary text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-dark transition-colors shadow-lg">
            Create Your Account
          </button>
        </NuxtLink>
        
        <div class="text-gray-500">
          Already have an account?
          <NuxtLink to="/login" class="text-primary hover:text-primary-dark font-medium">
            Sign in here
          </NuxtLink>
        </div>
      </div>

      <div class="mt-12">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Join Community - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Join the ICEHub developer community. Create your profile and connect with talented professionals.'
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
