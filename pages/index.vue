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
            <NuxtLink to="/teams" class="nav-button nav-button-secondary">
              Teams
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
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="mobile-nav-menu">
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
          <NuxtLink @click="mobileMenuOpen = false" to="/teams" class="mobile-nav-item">
            👥 Teams
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/login" class="mobile-nav-item">
            🔑 Sign In
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/register" class="mobile-nav-item">
            ✨ Join Workshop
          </NuxtLink>
        </template>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-gray-50 to-gray-200 py-8 sm:py-12 text-center">
      <div class="max-w-container mx-auto container-padding">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-3 sm:mb-4 leading-tight">ICE2025 Workshop</h1>
        <p class="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">Join 30 selected participants in Sri Lanka's premier AI innovation workshop. Connect with international mentors and build breakthrough prototypes in 3 days.</p>
        
        <!-- Countdown Timer -->
        <div class="mb-6 sm:mb-8">
          <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 max-w-md mx-auto border border-gray-200">
            <!-- Workshop hasn't started yet -->
            <div v-if="!eventStarted">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Workshop Starts In</p>
              <div class="grid grid-cols-4 gap-2 text-center">
                <div class="bg-gray-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-primary">{{ countdown.days }}</div>
                  <div class="text-xs text-gray-500 uppercase">Days</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-primary">{{ countdown.hours }}</div>
                  <div class="text-xs text-gray-500 uppercase">Hours</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-primary">{{ countdown.minutes }}</div>
                  <div class="text-xs text-gray-500 uppercase">Min</div>
                </div>
                <div class="bg-gray-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-primary">{{ countdown.seconds }}</div>
                  <div class="text-xs text-gray-500 uppercase">Sec</div>
                </div>
              </div>
            </div>
            
            <!-- Workshop started, showing submission countdown -->
            <div v-else-if="!submissionDeadlineReached">
              <p class="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">🎉 Workshop In Progress!</p>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Final Submissions Due In</p>
              <div class="grid grid-cols-4 gap-2 text-center">
                <div class="bg-blue-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-blue-600">{{ countdown.days }}</div>
                  <div class="text-xs text-gray-500 uppercase">Days</div>
                </div>
                <div class="bg-blue-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-blue-600">{{ countdown.hours }}</div>
                  <div class="text-xs text-gray-500 uppercase">Hours</div>
                </div>
                <div class="bg-blue-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-blue-600">{{ countdown.minutes }}</div>
                  <div class="text-xs text-gray-500 uppercase">Min</div>
                </div>
                <div class="bg-blue-50 rounded p-2">
                  <div class="text-lg sm:text-xl font-bold text-blue-600">{{ countdown.seconds }}</div>
                  <div class="text-xs text-gray-500 uppercase">Sec</div>
                </div>
              </div>
            </div>
            
            <!-- Submission deadline passed -->
            <div v-else class="text-center">
              <div class="text-xl sm:text-2xl font-bold text-purple-600 mb-1">🏆 Submissions Closed!</div>
              <p class="text-sm text-gray-600">Thank you for participating in ICE2025</p>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons & Stats Combined -->
        <div class="flex flex-col items-center">
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-6 max-w-md sm:max-w-none mx-auto">
            <template v-if="isLoggedIn">
              <NuxtLink to="/participants" class="hero-btn hero-btn-primary">Explore Community</NuxtLink>
              <NuxtLink to="/teams" class="hero-btn hero-btn-secondary">View Teams</NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/register" class="hero-btn hero-btn-primary">Join Workshop</NuxtLink>
              <NuxtLink to="/teams" class="hero-btn hero-btn-secondary">Teams</NuxtLink>
              <NuxtLink to="/participants" class="hero-btn hero-btn-secondary">Community</NuxtLink>
            </template>
          </div>

          <!-- Stats Section -->
          <div v-if="users && users.length > 0" class="text-center">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Workshop by 
              <a 
                href="https://www.linkedin.com/in/prof-suranga/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-primary hover:text-primary-dark transition-colors duration-200 underline"
              >
                Prof. Suranga Nanayakkara
              </a>
            </p>
            <div class="flex justify-center gap-6 sm:gap-8 flex-wrap">
              <div class="text-center cursor-pointer transition-transform hover:scale-105" @click="scrollToSection('participants')">
                <span class="block text-xl sm:text-2xl font-bold text-primary mb-1">{{ participantCount }}</span>
                <span class="text-xs text-gray-500 uppercase tracking-wider">Participants</span>
              </div>
              <div class="text-center cursor-pointer transition-transform hover:scale-105" @click="scrollToSection('mentors')">
                <span class="block text-xl sm:text-2xl font-bold text-primary mb-1">{{ mentorCount }}</span>
                <span class="text-xs text-gray-500 uppercase tracking-wider">Mentors</span>
              </div>
              <div class="text-center cursor-pointer transition-transform hover:scale-105" @click="scrollToSection('skills')">
                <span class="block text-xl sm:text-2xl font-bold text-primary mb-1">{{ totalSkills }}</span>
                <span class="text-xs text-gray-500 uppercase tracking-wider">Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Announcements Section -->
    <Announcements :limit="2" />

    <!-- Main Content -->
    <main class="py-6 sm:py-8">
      <div class="max-w-container mx-auto container-padding">
        <!-- Empty State -->
        <div v-if="!users || users.length === 0" class="text-center py-8 sm:py-12">
          <div class="mb-4 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="mx-auto sm:w-16 sm:h-16">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No participants yet</h2>
          <p class="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">Be the first to join the ICE Workshop and showcase your AI skills!</p>
          <NuxtLink to="/new" class="bg-primary text-white px-6 py-3 rounded-lg no-underline font-semibold inline-block transition-colors hover:bg-primary-hover">Get Started</NuxtLink>
        </div>

        <!-- Participants Section -->
        <div v-else>
          <section id="participants" class="mb-8 sm:mb-12">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 m-0">Workshop Participants</h2>
              <NuxtLink to="/participants" class="text-primary no-underline font-medium text-sm hover:underline self-start sm:self-auto">View all participants</NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div v-for="user in displayedParticipants" :key="user.name" class="participant-card">
                <div class="card-padding">
                  <div class="flex items-center mb-4 sm:mb-5">
                    <div class="w-12 h-12 sm:w-15 sm:h-15 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                      <img :src="getImageUrl(user.image)" :alt="`${user.name}'s avatar`" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-1 truncate">{{ user.name }}</h3>
                      <p class="text-xs sm:text-sm text-gray-500 m-0 leading-snug line-clamp-2">{{ user.bio }}</p>
                      <p v-if="user.expertise" class="text-xs text-primary font-medium mt-1 truncate">{{ user.expertise }}</p>
                    </div>
                  </div>

                  <div class="mb-4 sm:mb-6">
                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                      <NuxtLink 
                        v-for="skill in getDisplaySkills(user.skills).slice(0, 3)" 
                        :key="skill" 
                        :to="`/skills/${encodeURIComponent(skill)}`"
                        class="skill-tag hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        {{ skill }}
                      </NuxtLink>
                      <span v-if="getDisplaySkills(user.skills).length > 3" class="text-gray-500 text-xs font-medium py-1">
                        +{{ getDisplaySkills(user.skills).length - 3 }} more
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <NuxtLink :to="`/profile/${encodeURIComponent(user.name)}`" class="action-btn action-btn-secondary">View Profile</NuxtLink>
                    <template v-if="isLoggedIn">
                      <button @click="startConversation(user)" class="action-btn action-btn-primary">Message</button>
                    </template>
                    <template v-else>
                      <NuxtLink to="/login" class="action-btn action-btn-primary">Sign in to Message</NuxtLink>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Expand Button -->
            <div v-if="shouldShowExpandButton" class="mt-4 text-center sm:hidden">
              <button 
                @click="showAllParticipants = true"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-600 font-medium transition-all duration-200 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:text-gray-700 active:scale-95"
              >
                <span>Show {{ remainingParticipantsCount }} more participants</span>
                <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>

            <!-- Mobile Collapse Button -->
            <div v-if="showAllParticipants && users && users.filter(user => { const role = user.role || ''; const userRole = user.userRole || ''; return (userRole === 'participant') || (role !== 'admin' && userRole !== 'mentor' && !userRole); }).length > 10" class="mt-4 text-center sm:hidden">
              <button 
                @click="showAllParticipants = false"
                class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-600 font-medium transition-all duration-200 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:text-gray-700 active:scale-95"
              >
                <span>Show less</span>
                <svg class="w-4 h-4 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </section>

          <!-- Mentors Section -->
          <section id="mentors" v-if="mentors && mentors.length > 0" class="mb-8 sm:mb-12">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 m-0">Workshop Mentors</h2>
              <div class="text-sm text-gray-500 self-start sm:self-auto">International experts guiding the workshop</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div v-for="mentor in mentors" :key="mentor.name" class="participant-card border-l-4 border-l-green-500">
                <div class="card-padding">
                  <div class="flex items-center mb-4 sm:mb-5">
                    <div class="w-12 h-12 sm:w-15 sm:h-15 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                      <img :src="getImageUrl(mentor.image)" :alt="`${mentor.name}'s avatar`" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-base sm:text-lg font-semibold text-gray-700 truncate">{{ mentor.name }}</h3>
                        <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                          </svg>
                          Mentor
                        </span>
                      </div>
                      <p class="text-xs sm:text-sm text-gray-500 m-0 leading-snug line-clamp-2">{{ mentor.bio }}</p>
                      <p v-if="mentor.expertise" class="text-xs text-green-600 font-medium mt-1 truncate">{{ mentor.expertise }}</p>
                    </div>
                  </div>

                  <div class="mb-4 sm:mb-6">
                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                      <NuxtLink 
                        v-for="skill in getDisplaySkills(mentor.skills).slice(0, 3)" 
                        :key="skill" 
                        :to="`/skills/${encodeURIComponent(skill)}`"
                        class="skill-tag hover:bg-green-600 hover:text-white transition-colors cursor-pointer"
                      >
                        {{ skill }}
                      </NuxtLink>
                      <span v-if="getDisplaySkills(mentor.skills).length > 3" class="text-gray-500 text-xs font-medium py-1">
                        +{{ getDisplaySkills(mentor.skills).length - 3 }} more
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <NuxtLink :to="`/profile/${encodeURIComponent(mentor.name)}`" class="action-btn action-btn-secondary">View Profile</NuxtLink>
                    <template v-if="isLoggedIn">
                      <button @click="startConversation(mentor)" class="action-btn action-btn-primary">Message</button>
                    </template>
                    <template v-else>
                      <NuxtLink to="/login" class="action-btn action-btn-primary">Sign in to Message</NuxtLink>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Popular Skills Section -->
          <section id="skills" class="mb-8 sm:mb-12">
            <div class="flex justify-between items-center mb-4 sm:mb-6">
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-700 m-0 mb-2">Top skills in the workshop</h2>
                <p class="text-sm text-gray-500">Click on any skill to discover participants with that expertise</p>
              </div>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div class="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[60px_1fr_80px] sm:grid-cols-[80px_1fr_120px] gap-3 sm:gap-6 font-semibold text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                <div>Rank</div>
                <div>Skill</div>
                <div>Participants</div>
              </div>
              <div>
                <NuxtLink 
                  v-for="(skill, index) in topSkills" 
                  :key="skill.name" 
                  :to="`/skills/${encodeURIComponent(skill.name)}`"
                  class="block px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-[60px_1fr_80px] sm:grid-cols-[80px_1fr_120px] gap-3 sm:gap-6 border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer team"
                >
                  <div class="flex items-center font-semibold text-gray-500 text-sm team-hover:text-blue-600">{{ index + 1 }}.</div>
                  <div class="flex items-center font-medium text-gray-700 text-sm sm:text-base truncate team-hover:text-blue-700">
                    {{ skill.name }}
                    <svg class="w-4 h-4 ml-2 text-gray-400 team-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <div class="flex items-center justify-end text-gray-500 text-sm team-hover:text-blue-600">{{ skill.count }}</div>
                </NuxtLink>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
const { data: users } = await useFetch('/api/users')

// Authentication
const { user, isLoggedIn, isAdmin, logout, checkAuth } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Mobile participants expansion state
const showAllParticipants = ref(false)
const isMobile = ref(false)

// Countdown functionality
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})
const eventStarted = ref(false)
const submissionDeadlineReached = ref(false)

// Target date: August 8th, 2025 at 8:00 AM Sri Lanka Time (UTC+5:30)
const targetDate = new Date('2025-08-09T08:00:00+05:30')
// Final submission deadline: August 12th, 2025 at 5:00 PM Sri Lanka Time (UTC+5:30)
const submissionDeadline = new Date('2025-08-12T17:00:00+05:30')

const updateCountdown = () => {
  const now = new Date()
  const workshopDistance = targetDate.getTime() - now.getTime()
  const submissionDistance = submissionDeadline.getTime() - now.getTime()
  
  // Check if workshop has started but submission deadline hasn't passed
  if (workshopDistance < 0 && submissionDistance > 0) {
    eventStarted.value = true
    submissionDeadlineReached.value = false
    
    // Calculate countdown to submission deadline
    countdown.value = {
      days: Math.floor(submissionDistance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((submissionDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((submissionDistance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((submissionDistance % (1000 * 60)) / 1000)
    }
  } else if (submissionDistance < 0) {
    // Both workshop started and submission deadline passed
    eventStarted.value = true
    submissionDeadlineReached.value = true
  } else {
    // Workshop hasn't started yet
    eventStarted.value = false
    submissionDeadlineReached.value = false
    
    // Calculate countdown to workshop start
    countdown.value = {
      days: Math.floor(workshopDistance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((workshopDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((workshopDistance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((workshopDistance % (1000 * 60)) / 1000)
    }
  }
}

// Smooth scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Check authentication on both server and client
await checkAuth()

// Also check on mount for client-side navigation
onMounted(async () => {
  await checkAuth()
  
  // Initialize countdown
  updateCountdown()
  
  // Update countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000)
  
  // Set initial mobile state
  isMobile.value = window.innerWidth < 640
  
  // Listen for resize events to update mobile state
  const handleResize = () => {
    isMobile.value = window.innerWidth < 640
    // Reset expansion state when switching to desktop
    if (!isMobile.value) {
      showAllParticipants.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    clearInterval(countdownInterval)
  })
})

// Handle logout
const handleLogout = async () => {
  await logout()
}

// Handle starting a conversation
const startConversation = async (targetUser) => {
  if (!user.value) {
    await navigateTo('/login')
    return
  }
  
  // Use user ID if available, otherwise use name as identifier
  const userId = targetUser.id || targetUser.name
  
  // Navigate to chat with query parameters to start conversation
  await navigateTo(`/chat?user=${encodeURIComponent(userId)}&name=${encodeURIComponent(targetUser.name)}`)
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

// Image URL helper function for Google Drive images
const getImageUrl = (url) => {
  if (!url) return '/uploads/default/default_user_icon.png'
  
  try {
    // Handle Google Drive URLs - use our proxy API
    if (url.includes('drive.google.com')) {
      // Extract file ID from various Google Drive URL formats
      let fileId = null
      
      // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      let match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)
      if (match) {
        fileId = match[1]
      } else {
        // Format: https://drive.google.com/open?id=FILE_ID
        match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
        if (match) {
          fileId = match[1]
        }
      }
      
      if (fileId) {
        // console.log('Converting Google Drive URL to proxy:', url, '-> fileId:', fileId)
        // Use our server-side proxy to serve the image
        return `/api/proxy-image?id=${fileId}`
      }
    }
    
    // Return original URL for other formats (direct URLs, etc.)
    return url
  } catch (error) {
    console.error('Error parsing image URL:', error)
    return '/uploads/default/default_user_icon.png'
  }
}

// Computed properties
const totalSkills = computed(() => {
  if (!users.value) return 0
  const allSkills = users.value.flatMap(user => getDisplaySkills(user.skills))
  return new Set(allSkills).size
})

// Mobile-specific computed property for displayed participants
const displayedParticipants = computed(() => {
  if (!users.value) return []
  
  // Filter to show only regular participants (exclude admins and mentors)
  const regularParticipants = users.value.filter(user => {
    const role = user.role || ''
    const userRole = user.userRole || ''
    // Include users who are explicitly participants, or users without specific roles (default participants)
    return (userRole === 'participant') || (role !== 'admin' && userRole !== 'mentor' && !userRole)
  })
  
  // On mobile, show only first 10 unless expanded
  if (isMobile.value && !showAllParticipants.value && regularParticipants.length > 10) {
    return regularParticipants.slice(0, 10)
  }
  
  return regularParticipants
})

const shouldShowExpandButton = computed(() => {
  if (!users.value) return false
  const regularParticipants = users.value.filter(user => {
    const role = user.role || ''
    const userRole = user.userRole || ''
    // Include users who are explicitly participants, or users without specific roles (default participants)
    return (userRole === 'participant') || (role !== 'admin' && userRole !== 'mentor' && !userRole)
  })
  return isMobile.value && regularParticipants.length > 10 && !showAllParticipants.value
})

// Separate mentors from regular participants
const mentors = computed(() => {
  if (!users.value) return []
  return users.value.filter(user => {
    const userRole = user.userRole || ''
    return userRole === 'mentor'
  })
})

const participantCount = computed(() => {
  if (!users.value) return 0
  return users.value.filter(user => {
    const role = user.role || ''
    const userRole = user.userRole || ''
    // Include users who are explicitly participants, or users without specific roles (default participants)
    return (userRole === 'participant') || (role !== 'admin' && userRole !== 'mentor' && !userRole)
  }).length
})

const mentorCount = computed(() => {
  return mentors.value.length
})

const remainingParticipantsCount = computed(() => {
  if (!users.value || participantCount.value <= 10) return 0
  return participantCount.value - 10
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
      content: 'Join 30 selected participants in Sri Lanka\'s premier AI innovation workshop led by Professor Suranga Nannayakara from NUS. Connect with mentors and build breakthrough prototypes in 3 days.'
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
  line-clamp: 2;
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
