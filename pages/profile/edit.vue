<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICEHub</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">{{ user?.name }}</span>
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg text-gray-500">Loading...</div>
    </div>

    <!-- Not Authenticated -->
    <div v-else-if="!isLoggedIn" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-blue-500 text-6xl mb-4">🔒</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Authentication Required</h1>
        <p class="text-gray-500 mb-6">Please sign in to update your profile.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- Profile Update Form -->
    <main v-else class="py-12">
      <div class="max-w-container mx-auto px-5">
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-700 mb-3">Update Your Profile</h1>
            <p class="text-base text-gray-500">Keep your information up to date</p>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
            <form @submit.prevent="updateProfile" class="flex flex-col gap-6">
              <!-- Profile Picture Upload -->
              <div class="flex flex-col gap-2">
                <ImageUpload 
                  v-model="form.image"
                  alt-text="Profile picture"
                />
              </div>

              <!-- Name Input -->
              <div class="flex flex-col gap-2">
                <label for="name" class="font-semibold text-gray-700 text-sm mb-1">Full Name</label>
                <input 
                  id="name"
                  v-model="form.name" 
                  type="text"
                  placeholder="Enter your full name" 
                  required 
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                />
              </div>

              <!-- Bio Input -->
              <div class="flex flex-col gap-2">
                <label for="bio" class="font-semibold text-gray-700 text-sm mb-1">Bio</label>
                <textarea 
                  id="bio"
                  v-model="form.bio" 
                  placeholder="Tell us about yourself..." 
                  rows="4"
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10 resize-none"
                ></textarea>
              </div>

              <!-- User Role Input -->
              <div class="flex flex-col gap-2">
                <label for="userRole" class="font-semibold text-gray-700 text-sm mb-1">Community Role</label>
                <select 
                  id="userRole"
                  v-model="form.userRole" 
                  class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                >
                  <option value="developer">Developer</option>
                  <option value="mentor">Mentor</option>
                </select>
                <p class="text-xs text-gray-500">
                  Choose your primary role in the community. Mentors can guide other developers and have special privileges in groups.
                </p>
              </div>

              <!-- Skills Input -->
              <div class="flex flex-col gap-2">
                <label for="skills" class="font-semibold text-gray-700 text-sm mb-1">Skills</label>
                
                <!-- Skills List -->
                <div v-if="skillsList.length > 0" class="space-y-3 mb-4">
                  <div 
                    v-for="(skill, index) in skillsList" 
                    :key="index"
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <input 
                      v-model="skill.name"
                      type="text"
                      placeholder="Skill name"
                      class="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary"
                    />
                    <div class="flex items-center gap-2">
                      <span class="text-sm text-gray-600">Level:</span>
                      <div class="flex items-center gap-1">
                        <button
                          v-for="level in 5"
                          :key="level"
                          type="button"
                          @click="setSkillLevel(index, level)"
                          class="w-6 h-6 focus:outline-none"
                        >
                          <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            :fill="level <= skill.level ? '#fbbf24' : 'none'"
                            :stroke="level <= skill.level ? '#fbbf24' : '#d1d5db'"
                            stroke-width="1"
                            class="transition-colors duration-150"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </button>
                      </div>
                      <span class="text-xs text-gray-500 min-w-[60px]">{{ getSkillLevelText(skill.level) }}</span>
                    </div>
                    <button
                      type="button"
                      @click="removeSkill(index)"
                      class="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Add New Skill -->
                <div class="flex gap-2">
                  <input 
                    v-model="newSkillName"
                    type="text"
                    placeholder="Add a new skill..." 
                    class="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                    @keyup.enter="addSkill"
                  />
                  <button
                    type="button"
                    @click="addSkill"
                    :disabled="!newSkillName.trim()"
                    class="px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
                
                <!-- Legacy Import -->
                <div v-if="legacySkillsInput" class="mt-3">
                  <div class="flex items-center gap-2">
                    <input 
                      v-model="legacySkillsInput"
                      type="text"
                      placeholder="Or add comma-separated skills (e.g., JavaScript, React, Python)" 
                      class="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                    />
                    <button
                      type="button"
                      @click="importLegacySkills"
                      :disabled="!legacySkillsInput.trim()"
                      class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Import
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Skills imported this way will get default levels that you can adjust above</p>
                </div>
                
                <p class="text-xs text-gray-500">Add your technical skills and rate your proficiency level</p>
              </div>

              <!-- Password Update Section -->
              <div class="border-t border-gray-200 pt-6 mt-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Change Password</h3>
                
                <div class="flex flex-col gap-4">
                  <!-- Current Password -->
                  <div class="flex flex-col gap-2">
                    <label for="currentPassword" class="font-semibold text-gray-700 text-sm mb-1">Current Password</label>
                    <input 
                      id="currentPassword"
                      v-model="passwordForm.currentPassword" 
                      type="password"
                      placeholder="Enter your current password" 
                      class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                    />
                  </div>

                  <!-- New Password -->
                  <div class="flex flex-col gap-2">
                    <label for="newPassword" class="font-semibold text-gray-700 text-sm mb-1">New Password</label>
                    <input 
                      id="newPassword"
                      v-model="passwordForm.newPassword" 
                      type="password"
                      placeholder="Enter your new password (min 6 characters)" 
                      minlength="6"
                      class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                    />
                  </div>

                  <!-- Confirm New Password -->
                  <div class="flex flex-col gap-2">
                    <label for="confirmPassword" class="font-semibold text-gray-700 text-sm mb-1">Confirm New Password</label>
                    <input 
                      id="confirmPassword"
                      v-model="passwordForm.confirmPassword" 
                      type="password"
                      placeholder="Confirm your new password" 
                      class="px-4 py-3 border border-gray-200 rounded-lg text-base transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                    />
                  </div>

                  <!-- Update Password Button -->
                  <button 
                    type="button"
                    @click="updatePassword"
                    :disabled="!canUpdatePassword || updatingPassword"
                    class="bg-orange-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:shadow-lg focus:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="updatingPassword">Updating Password...</span>
                    <span v-else>Update Password</span>
                  </button>
                </div>
              </div>

              <!-- Error/Success Messages -->
              <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{{ error }}</p>
              </div>

              <div v-if="success" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-green-600 text-sm">{{ success }}</p>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="submitting"
                class="bg-primary text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:bg-primary-dark focus:outline-none focus:shadow-lg focus:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitting">Updating...</span>
                <span v-else>Update Profile</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()
const loading = ref(true)

// Form state
const form = reactive({
  name: '',
  bio: '',
  image: '',
  userRole: 'developer'
})

// Skills management
const skillsList = ref([])
const newSkillName = ref('')
const legacySkillsInput = ref('')

const submitting = ref(false)
const error = ref('')
const success = ref('')

// Password update state
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const updatingPassword = ref(false)

// Password validation
const canUpdatePassword = computed(() => {
  return passwordForm.currentPassword && 
         passwordForm.newPassword && 
         passwordForm.confirmPassword && 
         passwordForm.newPassword === passwordForm.confirmPassword &&
         passwordForm.newPassword.length >= 6
})

// Skill level helpers
const getSkillLevelText = (level) => {
  const texts = {
    1: 'Beginner',
    2: 'Novice', 
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  }
  return texts[level] || 'Beginner'
}

const getDefaultSkillLevel = (skill) => {
  const advanced = ['JavaScript', 'React', 'Vue', 'Python', 'Node.js']
  const intermediate = ['TypeScript', 'Angular', 'PHP', 'Java', 'C#']
  
  if (advanced.includes(skill)) return 4
  if (intermediate.includes(skill)) return 3
  return Math.floor(Math.random() * 3) + 2 // Random 2-4
}

// Skills management functions
const addSkill = () => {
  const skillName = newSkillName.value.trim()
  if (!skillName) return
  
  // Check if skill already exists
  if (skillsList.value.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
    return
  }
  
  skillsList.value.push({
    name: skillName,
    level: getDefaultSkillLevel(skillName)
  })
  
  newSkillName.value = ''
}

const removeSkill = (index) => {
  skillsList.value.splice(index, 1)
}

const setSkillLevel = (index, level) => {
  skillsList.value[index].level = level
}

const importLegacySkills = () => {
  const skills = legacySkillsInput.value
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0)
  
  skills.forEach(skillName => {
    // Check if skill already exists
    if (!skillsList.value.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      skillsList.value.push({
        name: skillName,
        level: getDefaultSkillLevel(skillName)
      })
    }
  })
  
  legacySkillsInput.value = ''
}

// Initialize form with current user data
const initializeForm = () => {
  if (user.value) {
    form.name = user.value.name || ''
    form.bio = user.value.bio || ''
    form.image = user.value.image || ''
    form.userRole = user.value.userRole || 'developer'
    
    // Handle skills - support both old and new formats
    if (user.value.skills) {
      if (Array.isArray(user.value.skills) && user.value.skills.length > 0) {
        // Check if it's the new format (objects with name and level)
        if (typeof user.value.skills[0] === 'object' && 'name' in user.value.skills[0]) {
          skillsList.value = [...user.value.skills]
        } else {
          // Old format (string array) - convert to new format
          skillsList.value = user.value.skills.map(skill => ({
            name: skill,
            level: getDefaultSkillLevel(skill)
          }))
        }
      }
    }
  }
}

// Check authentication and initialize
onMounted(async () => {
  await checkAuth()
  initializeForm()
  loading.value = false
})

// Watch for user changes and re-initialize form
watch(user, (newUser) => {
  if (newUser) {
    initializeForm()
  }
}, { immediate: true })

// Update profile
const updateProfile = async () => {
  if (submitting.value || !user.value) return

  submitting.value = true
  error.value = ''
  success.value = ''

  try {
    await $fetch('/api/user/update', {
      method: 'POST',
      body: {
        name: form.name,
        bio: form.bio,
        image: form.image,
        userRole: form.userRole,
        skills: skillsList.value // Send skills with levels
      }
    })

    success.value = 'Profile updated successfully!'
    
    // Update local user state
    const { checkAuth } = useAuth()
    await checkAuth()

    // Redirect to updated profile after a moment
    setTimeout(() => {
      navigateTo(`/profile/${encodeURIComponent(form.name)}`)
    }, 1500)

  } catch (err) {
    error.value = err.data?.message || 'Failed to update profile'
  } finally {
    submitting.value = false
  }
}

// Update password
const updatePassword = async () => {
  if (!canUpdatePassword.value || updatingPassword.value) return

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    error.value = 'New passwords do not match'
    return
  }

  updatingPassword.value = true
  error.value = ''
  success.value = ''

  try {
    await $fetch('/api/user/update-password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }
    })

    success.value = 'Password updated successfully!'
    
    // Clear password form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''

  } catch (err) {
    error.value = err.data?.message || 'Failed to update password'
  } finally {
    updatingPassword.value = false
  }
}

// Page meta
useHead({
  title: 'Update Profile - ICEHub',
  meta: [
    {
      name: 'description',
      content: 'Update your ICEHub profile information and skills.'
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

.focus\:border-primary:focus {
  border-color: #0d7ae4;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}
</style>
