<template>
  <div class="min-h-screen font-sans text-gray-700 bg-white">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025</NuxtLink>
        </div>
        <div class="nav-right">
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            <span class="hidden sm:inline">Back to Home</span>
            <span class="sm:hidden">← Home</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="section-padding">
      <div class="max-w-container mx-auto container-padding">
        <!-- Header -->
        <div class="text-center mb-8 sm:mb-12">
              <h1 class="text-3xl font-bold mb-8 text-white">ICE2025 Developers</h1>
          <p class="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover talented developers in our community. Connect, collaborate, and build amazing things together.
          </p>
        </div>

        <!-- Search and Filters -->
        <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
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

        <!-- Results Count -->
        <div class="mb-4 sm:mb-6">
          <p class="text-sm sm:text-base text-gray-600">
            Showing {{ filteredUsers.length }} of {{ users?.length || 0 }} developers
          </p>
        </div>

        <!-- Developers Grid -->
        <div v-if="filteredUsers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div v-for="user in filteredUsers" :key="user.id || user.name" class="developer-card">
            <div class="card-padding">
              <div class="flex items-center mb-4 sm:mb-5">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                  <img 
                    :src="user.image" 
                    :alt="`${user.name}'s avatar`" 
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-1 truncate">{{ user.name }}</h3>
                  <p v-if="user.affiliation" class="text-xs sm:text-sm text-primary font-medium mb-1 truncate">{{ user.affiliation }}</p>
                  <p class="text-xs sm:text-sm text-gray-500 leading-snug line-clamp-2">{{ user.bio }}</p>
                </div>
              </div>

              <!-- Skills -->
              <div class="mb-4 sm:mb-6">
                <div class="flex flex-wrap gap-1.5 sm:gap-2">
                  <span 
                    v-for="skill in getDisplaySkills(user.skills).slice(0, 4)" 
                    :key="skill" 
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="getDisplaySkills(user.skills).length > 4" class="text-gray-500 text-xs font-medium py-1">
                    +{{ getDisplaySkills(user.skills).length - 4 }} more
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <NuxtLink 
                  :to="`/profile/${encodeURIComponent(user.name)}`" 
                  class="action-btn action-btn-secondary"
                >
                  View Profile
                </NuxtLink>
                <template v-if="currentUser && user.id !== currentUser.id">
                  <NuxtLink 
                    :to="{ path: '/chat', query: { user: user.id, name: user.name } }"
                    class="action-btn action-btn-primary flex-1 text-center"
                  >
                    Message
                  </NuxtLink>
                </template>
                <template v-else-if="!currentUser">
                  <NuxtLink 
                    to="/login"
                    class="action-btn action-btn-primary flex-1 text-center"
                  >
                    Sign in to Message
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-gray-400 mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 mb-3">No developers found</h2>
          <p class="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
          <button @click="clearFilters" class="nav-button">
            Clear Filters
          </button>
        </div>

        <!-- Load More (for future pagination) -->
        <div v-if="filteredUsers.length > 0" class="text-center mt-12">
          <button class="hero-btn hero-btn-secondary" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Showing all developers
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Fetch all users
const { data: users } = await useFetch('/api/users')

// Authentication
const { user: currentUser, checkAuth } = useAuth()

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

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
  title: 'All Developers - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Browse all developers in the ICE2025 community. Find talented professionals with the skills you need.'
    }
  ]
})
</script>

<style scoped>
.developer-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.2s;
}

.developer-card:hover {
  border-color: #0d7ae4;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 122, 228, 0.1);
}

.skill-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e9ecef;
}

.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.action-btn-primary {
  background: #0d7ae4;
  color: white;
}

.action-btn-primary:hover {
  background: #0969da;
}

.action-btn-secondary {
  background: white;
  color: #666;
  border: 1px solid #e9ecef;
}

.action-btn-secondary:hover {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
