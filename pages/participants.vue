<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
        <div class="nav-left">
          <NuxtLink to="/">
            <h1 class="nav-logo">ICE2025</h1>
          </NuxtLink>
        </div>
        <div class="nav-right hidden sm:flex items-center gap-2 sm:gap-4">
          <template v-if="currentUser">
            <span class="text-xs sm:text-sm text-gray-600 hidden md:inline">Welcome, {{ currentUser?.name }}</span>
            <NuxtLink to="/teams" class="nav-button nav-button-secondary">
              Teams
            </NuxtLink>
            <NuxtLink to="/chat" class="nav-button nav-button-secondary">
              Messages
            </NuxtLink>
            <NuxtLink 
              v-if="currentUser" 
              :to="`/profile/${encodeURIComponent(currentUser.name)}`" 
              class="nav-button nav-button-secondary"
            >
              My Profile
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
          <template v-if="currentUser">
            <NuxtLink @click="mobileMenuOpen = false" to="/teams" class="mobile-nav-item">
              👥 Teams
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/chat" class="mobile-nav-item">
              💬 Messages
            </NuxtLink>
            <NuxtLink 
              v-if="currentUser"
              @click="mobileMenuOpen = false" 
              :to="`/profile/${encodeURIComponent(currentUser.name)}`" 
              class="mobile-nav-item"
            >
              👤 My Profile
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">ICE2025 Community</h1>
              <p class="text-gray-600">
                {{ filteredUsers.length }} member{{ filteredUsers.length !== 1 ? 's' : '' }} 
                {{ filteredUsers.length === 1 ? 'is' : 'are' }} in our community
              </p>
            </div>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="mb-6 sm:mb-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Find Participants</h3>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by name, skills, or affiliation..."
                class="form-input"
              />
            </div>
            <select
              v-model="skillFilter"
              class="form-input sm:w-auto"
            >
              <option value="">All Skills</option>
              <option v-for="skill in allSkills" :key="skill" :value="skill">
                {{ skill }}
              </option>
            </select>
            <select
              v-model="affiliationFilter"
              class="form-input sm:w-auto"
            >
              <option value="">All Affiliations</option>
              <option v-for="affiliation in allAffiliations" :key="affiliation" :value="affiliation">
                {{ affiliation }}
              </option>
            </select>
          </div>
        </div>

        <!-- Results Count -->
        <div class="mb-4 sm:mb-6">
          <p class="text-sm sm:text-base text-gray-600">
            Showing {{ filteredUsers.length }} of {{ users?.length || 0 }} participants
          </p>
        </div>

        <!-- Participants Grid -->
        <div v-if="filteredUsers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="user in filteredUsers" 
            :key="user.id || user.name" 
            class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Profile Header -->
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                <img 
                  :src="user.image || '/uploads/default/default_user_icon.png'" 
                  :alt="`${user.name}'s avatar`" 
                  class="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  @error="handleImageError"
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

            <!-- Bio -->
            <div v-if="user.bio" class="mb-4">
              <p class="text-sm text-gray-600 line-clamp-2">{{ user.bio }}</p>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="skill in getDisplaySkills(user.skills).slice(0, 4)" 
                  :key="skill"
                  class="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                >
                  {{ skill }}
                </span>
                <span v-if="getDisplaySkills(user.skills).length > 4" class="text-gray-500 text-xs font-medium py-1">
                  +{{ getDisplaySkills(user.skills).length - 4 }} more
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <NuxtLink 
                :to="`/profile/${encodeURIComponent(user.name)}`" 
                class="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
              >
                View Profile
              </NuxtLink>
              <template v-if="currentUser && user.id !== currentUser.id">
                <NuxtLink 
                  :to="{ path: '/chat', query: { user: user.id, name: user.name } }"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Message
                </NuxtLink>
              </template>
              <template v-else-if="!currentUser">
                <NuxtLink 
                  to="/login"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Sign in
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-gray-400 mb-4">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No participants found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
          <button @click="clearFilters" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Clear Filters
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
// Fetch all users
const { data: users } = await useFetch('/api/users')

// Authentication
const { user: currentUser, checkAuth, logout } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Check authentication on mount
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

// Reactive filters
const searchQuery = ref('')
const skillFilter = ref('')
const affiliationFilter = ref('')

// Computed properties
const allSkills = computed(() => {
  if (!users.value) return []
  const skills = new Set()
  users.value.forEach(user => {
    getDisplaySkills(user.skills).forEach(skill => skills.add(skill))
  })
  return Array.from(skills).sort()
})

const allAffiliations = computed(() => {
  if (!users.value) return []
  const affiliations = new Set()
  users.value.forEach(user => {
    if (user.affiliation && user.affiliation.trim()) {
      affiliations.add(user.affiliation.trim())
    }
  })
  return Array.from(affiliations).sort()
})

const filteredUsers = computed(() => {
  if (!users.value) return []
  
  return users.value.filter(user => {
    const userSkills = getDisplaySkills(user.skills)
    
    // Search by name or skills
    const matchesSearch = !searchQuery.value || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      userSkills.some(skill =>
        skill.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) ||
      user.bio.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (user.affiliation && user.affiliation.toLowerCase().includes(searchQuery.value.toLowerCase()))    // Filter by skill
    const matchesSkill = !skillFilter.value || 
      userSkills.includes(skillFilter.value)
    
    // Filter by affiliation
    const matchesAffiliation = !affiliationFilter.value || 
      (user.affiliation && user.affiliation.trim() === affiliationFilter.value)
    
    return matchesSearch && matchesSkill && matchesAffiliation
  })
})

// Methods
const handleImageError = (event) => {
  event.target.src = '/uploads/default/user-avatar.svg'
}

const clearFilters = () => {
  searchQuery.value = ''
  skillFilter.value = ''
  affiliationFilter.value = ''
}

// Page meta
useHead({
  title: 'All Participants - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Browse all participants in the ICE2025 community. Find talented professionals with the skills you need.'
    }
  ]
})
</script>

<style scoped>
/* Ensure mobile menu appears above other content */
.mobile-nav-menu {
  z-index: 60;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
