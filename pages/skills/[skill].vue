<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
        <div class="nav-left">
          <h1 class="nav-logo">ICE2025</h1>
        </div>
        <div class="nav-right hidden sm:flex items-center gap-2 sm:gap-4">
          <template v-if="isLoggedIn">
            <span class="text-xs sm:text-sm text-gray-600 hidden md:inline">Welcome, {{ user?.name }}</span>
            <NuxtLink to="/teams" class="nav-button nav-button-secondary">
              Teams
            </NuxtLink>
            <NuxtLink to="/chat" class="nav-button nav-button-secondary">
              Messages
            </NuxtLink>
            <NuxtLink 
              v-if="user" 
              :to="`/profile/${encodeURIComponent(user.name)}`" 
              class="nav-button nav-button-secondary"
            >
              My Profile
            </NuxtLink>
            <NuxtLink 
              v-if="isAdmin" 
              to="/admin" 
              class="nav-button nav-button-secondary"
            >
              Admin
            </NuxtLink>
            <button @click="handleLogout" class="nav-button nav-button-secondary">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-button nav-button-secondary">
              Sign In
            </NuxtLink>
            <NuxtLink to="/register" class="nav-button">
              Join Workshop
            </NuxtLink>
          </template>
        </div>
        
        <!-- Mobile menu button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="mobile-nav-toggle"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Mobile menu -->
        <div v-show="mobileMenuOpen" class="mobile-nav-menu">
          <template v-if="isLoggedIn">
            <NuxtLink @click="mobileMenuOpen = false" to="/teams" class="mobile-nav-item">
              👥 Teams
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/chat" class="mobile-nav-item">
              💬 Messages
            </NuxtLink>
            <NuxtLink 
              v-if="user"
              @click="mobileMenuOpen = false" 
              :to="`/profile/${encodeURIComponent(user.name)}`" 
              class="mobile-nav-item"
            >
              👤 My Profile
            </NuxtLink>
            <NuxtLink 
              v-if="isAdmin"
              @click="mobileMenuOpen = false" 
              to="/admin" 
              class="mobile-nav-item"
            >
              ⚙️ Admin
            </NuxtLink>
            <button @click="handleLogout; mobileMenuOpen = false" class="mobile-nav-item">
              🚪 Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink @click="mobileMenuOpen = false" to="/login" class="mobile-nav-item">
              🔑 Sign In
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/register" class="mobile-nav-item">
              ✨ Join Workshop
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-container mx-auto container-padding py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-4">
            <NuxtLink 
              to="/" 
              class="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </NuxtLink>
          </div>
          
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ skillName }}</h1>
              <p class="text-gray-600">
                {{ usersWithSkill.length }} participant{{ usersWithSkill.length !== 1 ? 's' : '' }} 
                {{ usersWithSkill.length === 1 ? 'has' : 'have' }} this skill
              </p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.692-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Unable to load participants</h3>
          <p class="text-gray-600 mb-4">{{ error.message || 'Something went wrong' }}</p>
          <button @click="refresh" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="usersWithSkill.length === 0" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No participants found</h3>
          <p class="text-gray-600">No workshop participants currently have "{{ skillName }}" as a skill.</p>
        </div>

        <!-- Users Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="user in usersWithSkill" 
            :key="user.id"
            class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Profile Header -->
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                <img 
                  :src="user.image || '/uploads/default/default_user_icon.png'" 
                  :alt="user.name"
                  class="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  @error="$event.target.src = '/uploads/default/default_user_icon.png'"
                />
                <!-- Gender Symbol -->
                <div v-if="user.gender" class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="user.gender === 'male' ? 'bg-blue-500' : user.gender === 'female' ? 'bg-pink-500' : 'bg-purple-500'">
                  <span v-if="user.gender === 'male'">♂</span>
                  <span v-else-if="user.gender === 'female'">♀</span>
                  <span v-else>⚧</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-800 truncate">{{ user.name }}</h3>
                <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                <p v-if="user.affiliation" class="text-xs text-gray-400 truncate mt-1">{{ user.affiliation }}</p>
                <p v-if="user.expertise" class="text-xs text-primary font-medium truncate mt-1">{{ user.expertise }}</p>
              </div>
            </div>

            <!-- Role Badge -->
            <div class="mb-4">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-blue-100 text-blue-800': user.role === 'admin',
                  'bg-green-100 text-green-800': user.role === 'mentor',
                  'bg-gray-100 text-gray-800': user.role === 'user'
                }"
              >
                {{ user.role === 'admin' ? '👑 Admin' : user.role === 'mentor' ? '🎓 Mentor' : '👤 Participant' }}
              </span>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="skill in getDisplaySkills(user.skills).slice(0, 4)" 
                  :key="skill"
                  class="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                  :class="{ 'bg-primary text-white': skill === skillName }"
                >
                  {{ skill }}
                </span>
                <span v-if="getDisplaySkills(user.skills).length > 4" class="text-gray-500 text-xs font-medium py-1">
                  +{{ getDisplaySkills(user.skills).length - 4 }} more
                </span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="flex gap-2">
              <NuxtLink 
                :to="`/profile/${encodeURIComponent(user.name)}`"
                class="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                View Profile
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Get the skill parameter from the route
const route = useRoute()
const skillName = decodeURIComponent(route.params.skill)

// Authentication
const { user, isLoggedIn, isAdmin, logout, checkAuth } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Fetch all users
const { data: allUsers, pending, error, refresh } = await useFetch('/api/users')

// Check authentication
await checkAuth()
onMounted(async () => {
  await checkAuth()
})

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Helper function to get skill names from both formats
const getDisplaySkills = (skills) => {
  if (!skills || !Array.isArray(skills)) return []
  
  // Check if it's the new format with objects
  if (skills.length > 0 && typeof skills[0] === 'object' && 'name' in skills[0]) {
    return skills.map(skill => skill.name)
  }
  
  // Old format - already strings
  return skills
}

// Filter users who have the specific skill
const usersWithSkill = computed(() => {
  if (!allUsers.value) return []
  
  return allUsers.value.filter(user => {
    const userSkills = getDisplaySkills(user.skills)
    return userSkills.some(skill => 
      skill.toLowerCase() === skillName.toLowerCase()
    )
  })
})

// Page meta
useHead({
  title: `${skillName} - ICE2025 Workshop`,
  meta: [
    {
      name: 'description',
      content: `Discover workshop participants with ${skillName} skills in the ICE2025 AI innovation workshop.`
    }
  ]
})
</script>

<style scoped>
/* Ensure mobile menu appears above other content */
.mobile-nav-menu {
  z-index: 60;
}
</style>
