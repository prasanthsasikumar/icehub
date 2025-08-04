<template>
  <div class="min-h-screen font-sans text-gray-700 bg-white">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
        <div class="nav-left">
          <h1 class="nav-logo">ICE2025</h1>
        </div>
        <div class="nav-right hidden sm:flex items-center gap-2 sm:gap-4">
          <template v-if="isLoggedIn">
            <span class="text-xs sm:text-sm text-gray-600 hidden md:inline">Welcome, {{ user?.name }}</span>
            <NuxtLink to="/groups" class="nav-button nav-button-secondary">
              Groups
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
            <NuxtLink to="/groups" class="nav-button nav-button-secondary">
              Groups
            </NuxtLink>
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
            <NuxtLink @click="mobileMenuOpen = false" to="/groups" class="mobile-nav-item">
              👥 Groups
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
            <NuxtLink @click="mobileMenuOpen = false" to="/groups" class="mobile-nav-item">
              👥 Groups
            </NuxtLink>
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

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-50 to-gray-200 section-padding text-center">
      <div class="max-w-container mx-auto container-padding">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 mb-4 sm:mb-6 leading-tight">ICE2025 Workshop</h1>
        <p class="text-lg sm:text-xl text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto">Join 30 selected participants in Sri Lanka's premier AI innovation workshop. Connect with international mentors and build breakthrough products in just 3 days.</p>
        
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-15 max-w-md sm:max-w-none mx-auto">
          <template v-if="isLoggedIn">
            <NuxtLink to="/developers" class="hero-btn hero-btn-primary">Meet Participants</NuxtLink>
            <NuxtLink 
              v-if="user" 
              :to="`/profile/${encodeURIComponent(user.name)}`" 
              class="hero-btn hero-btn-secondary"
            >
              View my profile
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/register" class="hero-btn hero-btn-primary">Join Workshop</NuxtLink>
            <NuxtLink to="/developers" class="hero-btn hero-btn-secondary">Meet Participants</NuxtLink>
          </template>
        </div>

        <!-- Stats Section -->
        <div v-if="users && users.length > 0" class="mt-8 sm:mt-15">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 sm:mb-6">
            ICE2025 WORKSHOP BY 
            <a 
              href="https://www.linkedin.com/in/prof-suranga/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-primary hover:text-primary-dark transition-colors duration-200 underline"
            >
              SURANGA NANAYAKKARA
            </a>
          </p>
          <div class="flex justify-center gap-8 sm:gap-15 flex-wrap">
            <div class="text-center">
              <span class="block text-2xl sm:text-3xl font-bold text-primary mb-1">{{ users.length }}</span>
              <span class="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Participants</span>
            </div>
            <div class="text-center">
              <span class="block text-2xl sm:text-3xl font-bold text-primary mb-1">{{ totalSkills }}</span>
              <span class="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">AI Skills</span>
            </div>
            <div class="text-center">
              <span class="block text-2xl sm:text-3xl font-bold text-primary mb-1">3</span>
              <span class="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="section-padding">
      <div class="max-w-container mx-auto container-padding">
        <!-- Empty State -->
        <div v-if="!users || users.length === 0" class="text-center py-12 sm:py-20">
          <div class="mb-6 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto sm:w-16 sm:h-16">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">No participants yet</h2>
          <p class="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto">Be the first to join the ICE Workshop and showcase your AI skills!</p>
          <NuxtLink to="/new" class="bg-primary text-white px-6 py-3 rounded-lg no-underline font-semibold inline-block transition-colors hover:bg-primary-hover">Get Started</NuxtLink>
        </div>

        <!-- Developers Section -->
        <div v-else>
          <section class="mb-12 sm:mb-20">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 m-0">Workshop Participants</h2>
              <NuxtLink to="/developers" class="text-primary no-underline font-medium text-sm hover:underline self-start sm:self-auto">View all participants</NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div v-for="user in users" :key="user.name" class="developer-card">
                <div class="card-padding">
                  <div class="flex items-center mb-4 sm:mb-5">
                    <div class="w-12 h-12 sm:w-15 sm:h-15 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                      <img :src="user.image" :alt="`${user.name}'s avatar`" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-1 truncate">{{ user.name }}</h3>
                      <p class="text-xs sm:text-sm text-gray-500 m-0 leading-snug line-clamp-2">{{ user.bio }}</p>
                    </div>
                  </div>

                  <div class="mb-4 sm:mb-6">
                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                      <span 
                        v-for="skill in getDisplaySkills(user.skills).slice(0, 6)" 
                        :key="skill" 
                        class="skill-tag"
                      >
                        {{ skill }}
                      </span>
                      <span v-if="getDisplaySkills(user.skills).length > 6" class="text-gray-500 text-xs font-medium py-1">
                        +{{ getDisplaySkills(user.skills).length - 6 }} more
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <NuxtLink :to="`/profile/${encodeURIComponent(user.name)}`" class="action-btn action-btn-secondary">View Profile</NuxtLink>
                    <button class="action-btn action-btn-primary">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Popular Skills Section -->
          <section class="mb-12 sm:mb-20">
            <div class="flex justify-between items-center mb-6 sm:mb-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 m-0">Top AI skills in the workshop</h2>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div class="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[60px_1fr_80px] sm:grid-cols-[80px_1fr_120px] gap-3 sm:gap-6 font-semibold text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                <div>Rank</div>
                <div>Skill</div>
                <div>Participants</div>
              </div>
              <div>
                <div v-for="(skill, index) in topSkills" :key="skill.name" class="px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[60px_1fr_80px] sm:grid-cols-[80px_1fr_120px] gap-3 sm:gap-6 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50">
                  <div class="flex items-center font-semibold text-gray-500 text-sm">{{ index + 1 }}.</div>
                  <div class="flex items-center font-medium text-gray-700 text-sm sm:text-base truncate">{{ skill.name }}</div>
                  <div class="flex items-center justify-end text-gray-500 text-sm">{{ skill.count }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { data: users } = await useFetch('/api/users')

// Authentication
const { user, isLoggedIn, isAdmin, logout, checkAuth } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Check authentication on both server and client
await checkAuth()

// Also check on mount for client-side navigation
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

// Computed properties
const totalSkills = computed(() => {
  if (!users.value) return 0
  const allSkills = users.value.flatMap(user => getDisplaySkills(user.skills))
  return new Set(allSkills).size
})

const topSkills = computed(() => {
  if (!users.value) return []
  
  const skillCounts = {}
  users.value.forEach(user => {
    getDisplaySkills(user.skills).forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1
    })
  })
  
  return Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

// Page meta
useHead({
  title: 'ICE2025 Workshop - AI Innovation in Sri Lanka',
  meta: [
    {
      name: 'description',
      content: 'Join 30 selected participants in Sri Lanka\'s premier AI innovation workshop led by Professor Suranga Nannayakara from NUS. Connect with international mentors and build breakthrough products in just 3 days.'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ]
})
</script>

<style scoped>
/* Custom spacing utilities not available in default Tailwind */
.mb-15 {
  margin-bottom: 3.75rem;
}

.mt-15 {
  margin-top: 3.75rem;
}

.py-15 {
  padding-top: 3.75rem;
  padding-bottom: 3.75rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.py-30 {
  padding-bottom: 7.5rem;
}

.gap-15 {
  gap: 3.75rem;
}

.w-15 {
  width: 3.75rem;
}

.h-15 {
  height: 3.75rem;
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .mb-15 {
    margin-bottom: 2rem;
  }
  
  .mt-15 {
    margin-top: 2rem;
  }
  
  .gap-15 {
    gap: 2rem;
  }
}

/* Line clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure mobile menu appears above other content */
.mobile-nav-menu {
  z-index: 60;
}

/* Smooth transitions for mobile interactions */
@media (hover: none) {
  .hover\:shadow-xl:hover {
    box-shadow: none;
  }
  
  .hover\:-translate-y-0\.5:hover {
    transform: none;
  }
}
</style>
