<template>
  <div class="min-h-screen font-sans text-gray-700 bg-white">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub</NuxtLink>
        </div>
        <div class="nav-right">
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Profile Content -->
    <main class="py-12">
      <div class="max-w-4xl mx-auto px-5">
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-20">
          <div class="animate-pulse">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div class="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-red-500 mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-700 mb-3">User Not Found</h2>
          <p class="text-gray-500 mb-6">The developer profile you're looking for doesn't exist.</p>
          <NuxtLink to="/" class="nav-button">
            Back to Home
          </NuxtLink>
        </div>

        <!-- Profile Content -->
        <div v-else-if="data" class="space-y-8">
          <!-- Profile Header -->
          <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
              <!-- Profile Image -->
              <div class="relative">
                <img 
                  :src="data.image" 
                  :alt="`${data.name}'s profile`"
                  class="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                  @error="handleImageError"
                />
                <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Profile Info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl font-bold text-gray-700 mb-3">{{ data.name }}</h1>
                <p class="text-lg text-gray-600 mb-4 leading-relaxed">{{ data.bio }}</p>
                
                <!-- Quick Stats -->
                <div class="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary">{{ getSkillsArray(data.skills).length }}</div>
                    <div class="text-sm text-gray-500 uppercase tracking-wide">Skills</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary">{{ calculateExperience(data.skills) }}</div>
                    <div class="text-sm text-gray-500 uppercase tracking-wide">Exp Level</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-primary">{{ getProfileScore(data) }}%</div>
                    <div class="text-sm text-gray-500 uppercase tracking-wide">Profile</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 justify-center md:justify-start mt-6 pt-6 border-t border-gray-100">
              <template v-if="isCurrentUser">
                <NuxtLink to="/profile/edit" class="hero-btn hero-btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                  Edit Profile
                </NuxtLink>
              </template>
              <template v-else-if="currentUser">
                <button @click="startConversation" class="hero-btn hero-btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .4-.1.5-.2L14 18h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                  Send Message
                </button>
              </template>
              <template v-else>
                <NuxtLink to="/login" class="hero-btn hero-btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Sign in to Contact
                </NuxtLink>
              </template>
              <button class="hero-btn hero-btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Save Profile
              </button>
              <button class="hero-btn hero-btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Share
              </button>
            </div>
          </div>

          <!-- Skills Section -->
          <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              Technical Skills
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="skill in getSkillsArray(data.skills)" 
                :key="getSkillName(skill)"
                class="skill-card"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ getSkillName(skill) }}</span>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in getSkillLevel(getSkillName(skill))" :key="i" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <svg v-for="i in (5 - getSkillLevel(getSkillName(skill)))" :key="`empty-${i}`" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-gray-300">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  {{ getSkillDescription(getSkillName(skill)) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Experience & Achievements -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- About Section -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                About Developer
              </h2>
              
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Bio</h3>
                  <p class="text-gray-600 leading-relaxed">{{ data.bio }}</p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Specialization</h3>
                  <p class="text-gray-600">{{ getPrimarySpecialization(data.skills) }}</p>
                </div>
                
                <div>
                  <h3 class="font-semibold text-gray-700 mb-2">Experience Level</h3>
                  <div class="flex items-center gap-2">
                    <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {{ calculateExperience(data.skills) }}
                    </span>
                    <span class="text-gray-500 text-sm">based on skill diversity</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats & Achievements -->
            <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Profile Stats
              </h2>
              
              <div class="space-y-6">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Profile Completeness</span>
                  <div class="flex items-center gap-2">
                    <div class="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        class="h-full bg-primary rounded-full transition-all duration-300" 
                        :style="{ width: `${getProfileScore(data)}%` }"
                      ></div>
                    </div>
                    <span class="text-sm font-medium">{{ getProfileScore(data) }}%</span>
                  </div>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Skill Diversity</span>
                  <span class="font-medium">{{ getSkillDiversity(data.skills) }}</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Technology Stack</span>
                  <span class="font-medium">{{ getTechStack(data.skills) }}</span>
                </div>
                
                <div class="pt-4 border-t border-gray-100">
                  <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div class="text-2xl font-bold text-green-500">✓</div>
                      <div class="text-sm text-gray-500">Verified</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-blue-500">{{ new Date().getFullYear() }}</div>
                      <div class="text-sm text-gray-500">Member Since</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Similar Developers -->
          <div class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 class="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-primary">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2 2 0 0 0 18.05 7h-2.1c-.8 0-1.54.37-2.01.99L12 10.5l-1.94-2.51A2.5 2.5 0 0 0 8.05 7h-2.1c-1.04 0-1.9.78-1.99 1.8L1.5 16H4v6h2v-6h.5l1-3 1.5 3H12v6h4zm-8-10c.83 0 1.5-.67 1.5-1.5S12.83 9 12 9s-1.5.67-1.5 1.5S11.17 12 12 12z"/>
              </svg>
              Similar Developers
            </h2>
            
            <p class="text-gray-500 text-center py-8">
              Feature coming soon - discover developers with similar skills and interests!
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Get the user name from the route
const route = useRoute()
const userName = route.params.name

// Authentication
const { user: currentUser, checkAuth } = useAuth()

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
})

// Check if viewing own profile
const isCurrentUser = computed(() => {
  return currentUser.value && currentUser.value.name === decodeURIComponent(userName)
})

// Fetch user data
const { data, pending, error } = await useFetch('/api/user', {
  query: { name: userName }
})

// Helper functions
const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/128x128/e5e7eb/9ca3af?text=Profile'
}

const startConversation = () => {
  if (!data.value) return
  
  // Navigate to chat with query params to start conversation
  navigateTo({
    path: '/chat',
    query: {
      user: data.value.id,
      name: data.value.name
    }
  })
}

const calculateExperience = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  if (skillsArray.length <= 2) return 'Beginner'
  if (skillsArray.length <= 4) return 'Intermediate'
  if (skillsArray.length <= 6) return 'Advanced'
  return 'Expert'
}

const getSkillsArray = (skills) => {
  if (!skills || !Array.isArray(skills)) return []
  
  // Check if it's the new format with objects
  if (skills.length > 0 && typeof skills[0] === 'object' && 'name' in skills[0]) {
    return skills  // Return the full objects for level display
  }
  
  // Old format - convert strings to objects with default level
  return skills.map(skill => ({ name: skill, level: 3 }))
}

const getSkillName = (skill) => {
  return typeof skill === 'string' ? skill : skill.name
}

const getSkillsStringArray = (skills) => {
  if (!skills || !Array.isArray(skills)) return []
  return skills.map(skill => getSkillName(skill))
}

const getProfileScore = (user) => {
  let score = 0
  if (user.name) score += 25
  if (user.image) score += 25
  if (user.bio && user.bio.length > 10) score += 25
  if (getSkillsStringArray(user.skills).length > 0) score += 25
  return score
}

const getSkillLevel = (skill) => {
  if (!data.value || !data.value.skills) return 3
  
  // Check if skills are in the new format with levels
  if (Array.isArray(data.value.skills) && data.value.skills.length > 0) {
    const firstSkill = data.value.skills[0]
    if (typeof firstSkill === 'object' && 'name' in firstSkill && 'level' in firstSkill) {
      // New format - find the skill and return its level
      const skillObj = data.value.skills.find(s => s.name === skill)
      return skillObj ? skillObj.level : 3
    }
  }
  
  // Old format or fallback - use the existing calculation
  const advanced = ['JavaScript', 'React', 'Vue', 'Python', 'Node.js']
  const intermediate = ['TypeScript', 'Angular', 'PHP', 'Java', 'C#']
  
  if (advanced.includes(skill)) return 4
  if (intermediate.includes(skill)) return 3
  return Math.floor(Math.random() * 3) + 2 // Random 2-4
}

const getSkillDescription = (skill) => {
  const descriptions = {
    'JavaScript': 'Modern ES6+ development',
    'React': 'Component-based UI development',
    'Vue': 'Progressive web applications',
    'Python': 'Backend & data science',
    'Node.js': 'Server-side JavaScript',
    'TypeScript': 'Type-safe development',
    'Rust': 'Systems programming',
    'PHP': 'Web backend development'
  }
  return descriptions[skill] || 'Professional experience'
}

const getPrimarySpecialization = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  const frontend = ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript']
  const backend = ['Node.js', 'Python', 'PHP', 'Java', 'C#', 'Rust']
  const mobile = ['React Native', 'Flutter', 'Swift', 'Kotlin']
  
  const frontendCount = skillsArray.filter(s => frontend.includes(s)).length
  const backendCount = skillsArray.filter(s => backend.includes(s)).length
  const mobileCount = skillsArray.filter(s => mobile.includes(s)).length
  
  if (frontendCount > backendCount && frontendCount > mobileCount) return 'Frontend Development'
  if (backendCount > frontendCount && backendCount > mobileCount) return 'Backend Development'
  if (mobileCount > 0) return 'Mobile Development'
  return 'Full Stack Development'
}

const getSkillDiversity = (skills) => {
  const skillsArray = getSkillsArray(skills)
  if (skillsArray.length <= 2) return 'Specialized'
  if (skillsArray.length <= 4) return 'Diverse'
  return 'Polyglot'
}

const getTechStack = (skills) => {
  const skillsArray = getSkillsStringArray(skills)
  const webTech = ['JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'TypeScript']
  const hasWeb = skillsArray.some(s => webTech.includes(s))
  
  if (hasWeb) return 'Web Technologies'
  return 'Mixed Technologies'
}

// Page meta
useHead({
  title: computed(() => data.value ? `${data.value.name} - ICEHub` : 'Profile - ICEHub'),
  meta: [
    {
      name: 'description',
      content: computed(() => data.value ? `View ${data.value.name}'s developer profile and skills on ICEHub` : 'Developer profile on ICEHub')
    }
  ]
})
</script>

<style scoped>
.skill-card {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  transition: all 0.2s;
}

.skill-card:hover {
  background-color: white;
  border-color: #0d7ae4;
}

/* Custom spacing utilities */
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
