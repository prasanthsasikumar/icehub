<template>
  <div class="min-h-screen font-sans text-gray-700 bg-white">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <h1 class="nav-logo">ICEHub</h1>
        </div>
        <div class="nav-right flex items-center gap-4">
          <template v-if="isLoggedIn">
            <span class="text-sm text-gray-600">Welcome, {{ user?.name }}</span>
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
              Join community
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-50 to-gray-200 py-20 pb-30 text-center">
      <div class="max-w-container mx-auto px-5">
        <h1 class="text-5xl font-bold text-gray-700 mb-6 leading-tight">The home for developers</h1>
        <p class="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Where organizations and developers come together to build, inspire, and innovate.</p>
        
        <div class="flex gap-4 justify-center mb-15 flex-wrap">
          <template v-if="isLoggedIn">
            <NuxtLink to="/developers" class="hero-btn hero-btn-primary">Browse developers</NuxtLink>
            <NuxtLink 
              v-if="user" 
              :to="`/profile/${encodeURIComponent(user.name)}`" 
              class="hero-btn hero-btn-secondary"
            >
              View my profile
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/register" class="hero-btn hero-btn-primary">Join community</NuxtLink>
            <NuxtLink to="/developers" class="hero-btn hero-btn-secondary">Browse developers</NuxtLink>
          </template>
        </div>

        <!-- Stats Section -->
        <div v-if="users && users.length > 0" class="mt-15">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-6">TRUSTED BY DEVELOPERS WORLDWIDE</p>
          <div class="flex justify-center gap-15 flex-wrap">
            <div class="text-center">
              <span class="block text-3xl font-bold text-primary mb-1">{{ users.length }}</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider">Developers</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-bold text-primary mb-1">{{ totalSkills }}</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider">Skills</span>
            </div>
            <div class="text-center">
              <span class="block text-3xl font-bold text-primary mb-1">50+</span>
              <span class="text-sm text-gray-500 uppercase tracking-wider">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="py-15">
      <div class="max-w-container mx-auto px-5">
        <!-- Empty State -->
        <div v-if="!users || users.length === 0" class="text-center py-20">
          <div class="mb-6 text-gray-400">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 mb-3">No developers yet</h2>
          <p class="text-base text-gray-500 mb-8">Be the first to join our developer community and showcase your skills!</p>
          <NuxtLink to="/new" class="bg-primary text-white px-6 py-3 rounded-lg no-underline font-semibold inline-block transition-colors hover:bg-primary-hover">Get Started</NuxtLink>
        </div>

        <!-- Developers Section -->
        <div v-else>
          <section class="mb-20">
            <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 class="text-3xl font-bold text-gray-700 m-0">Developers for you</h2>
              <NuxtLink to="/developers" class="text-primary no-underline font-medium text-sm hover:underline">View all developers</NuxtLink>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="user in users" :key="user.name" class="developer-card">
                <div class="p-6">
                  <div class="flex items-center mb-5">
                    <div class="w-15 h-15 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img :src="user.image" :alt="`${user.name}'s avatar`" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-semibold text-gray-700 mb-1 truncate">{{ user.name }}</h3>
                      <p class="text-sm text-gray-500 m-0 leading-snug">{{ user.bio }}</p>
                    </div>
                  </div>

                  <div class="mb-6">
                    <div class="flex flex-wrap gap-2">
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

                  <div class="flex gap-3">
                    <NuxtLink :to="`/profile/${encodeURIComponent(user.name)}`" class="action-btn action-btn-secondary">View Profile</NuxtLink>
                    <button class="action-btn action-btn-primary">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Popular Skills Section -->
          <section class="mb-20">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-3xl font-bold text-gray-700 m-0">Top developer skills</h2>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div class="bg-gray-50 px-6 py-4 grid grid-cols-[80px_1fr_120px] gap-6 font-semibold text-sm text-gray-500 uppercase tracking-wider">
                <div>Rank</div>
                <div>Skill</div>
                <div>Developers</div>
              </div>
              <div>
                <div v-for="(skill, index) in topSkills" :key="skill.name" class="px-6 py-4 grid grid-cols-[80px_1fr_120px] gap-6 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50">
                  <div class="flex items-center font-semibold text-gray-500">{{ index + 1 }}.</div>
                  <div class="flex items-center font-medium text-gray-700">{{ skill.name }}</div>
                  <div class="flex items-center justify-end text-gray-500">{{ skill.count }}</div>
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
const { user, isLoggedIn, isAdmin, logout } = useAuth()

// Check authentication on mount
onMounted(async () => {
  const { checkAuth } = useAuth()
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
  title: 'ICEHub - The home for developers',
  meta: [
    {
      name: 'description',
      content: 'Where organizations and developers come together to build, inspire, and innovate. Browse talented professionals and their skills.'
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.25rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
  
  .gap-15 {
    gap: 1.875rem;
  }
}

@media (max-width: 480px) {
  .py-20 {
    padding-top: 3.75rem;
    padding-bottom: 5rem;
  }
  
  .text-5xl {
    font-size: 1.75rem;
  }
  
  .text-xl {
    font-size: 1rem;
  }
}
</style>
