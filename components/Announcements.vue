<template>
  <section v-if="announcements && announcements.length > 0" class="bg-gradient-to-br from-blue-50 to-indigo-50 section-padding">
    <div class="max-w-container mx-auto container-padding">
      <div class="text-center mb-8 sm:mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Latest Announcements</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest news and important information about the ICE2025 Workshop
        </p>
      </div>

      <div class="space-y-6">
        <!-- Pinned announcements first -->
        <div 
          v-for="announcement in sortedAnnouncements" 
          :key="announcement.id"
          :class="[
            'bg-white rounded-xl shadow-sm border-l-4 p-6 transition-all hover:shadow-md',
            getAnnouncementBorderClass(announcement)
          ]"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ announcement.title }}
                </h3>
                
                <!-- Type Badge -->
                <span :class="getTypeBadgeClass(announcement.type)" class="px-3 py-1 text-sm font-medium rounded-full">
                  {{ announcement.type === 'general' ? 'General' : announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) }}
                </span>
                
                <!-- Pinned Badge -->
                <span v-if="announcement.is_pinned" class="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                  Pinned
                </span>
              </div>
              
              <div class="prose prose-gray max-w-none mb-4">
                <p class="text-gray-700 leading-relaxed">{{ announcement.content }}</p>
              </div>
              
              <div class="flex items-center text-sm text-gray-500 gap-4">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  {{ announcement.author_name }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ formatDate(announcement.created_at) }}
                </span>
                <span v-if="announcement.expires_at" class="flex items-center gap-1 text-orange-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Expires {{ formatDate(announcement.expires_at) }}
                </span>
              </div>
            </div>
            
            <!-- Announcement Type Icon -->
            <div class="flex-shrink-0 ml-4">
              <div :class="getTypeIconClass(announcement.type)" class="w-12 h-12 rounded-full flex items-center justify-center">
                <span class="text-white text-xl">{{ getTypeIcon(announcement.type) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Link for Admins -->
      <div v-if="isAdmin" class="text-center mt-8">
        <NuxtLink 
          to="/admin/announcements" 
          class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Manage Announcements
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Authentication
const { isAdmin } = useAuth()

// Props
const props = defineProps({
  limit: {
    type: Number,
    default: 5
  }
})

// Fetch announcements
const { data: announcementsData } = await useFetch('/api/announcements', {
  default: () => ({ success: true, data: [] })
})

const announcements = computed(() => {
  const data = announcementsData.value?.data || []
  
  // Filter out expired announcements
  const now = new Date()
  const activeAnnouncements = data.filter(announcement => {
    if (!announcement.expires_at) return true
    return new Date(announcement.expires_at) > now
  })
  
  // Limit the number of announcements shown
  return activeAnnouncements.slice(0, props.limit)
})

const sortedAnnouncements = computed(() => {
  return [...announcements.value].sort((a, b) => {
    // Pinned announcements first
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    
    // Then by type priority (urgent > important > info > general)
    const typePriority = { urgent: 4, important: 3, info: 2, general: 1 }
    const aPriority = typePriority[a.type] || 1
    const bPriority = typePriority[b.type] || 1
    
    if (aPriority !== bPriority) return bPriority - aPriority
    
    // Finally by creation date (newest first)
    return new Date(b.created_at) - new Date(a.created_at)
  })
})

// Helper methods
const getAnnouncementBorderClass = (announcement) => {
  if (announcement.is_pinned) {
    return 'border-l-green-500 bg-green-50/20'
  }
  
  const classes = {
    general: 'border-l-gray-400',
    info: 'border-l-blue-500',
    important: 'border-l-orange-500',
    urgent: 'border-l-red-500'
  }
  return classes[announcement.type] || classes.general
}

const getTypeBadgeClass = (type) => {
  const classes = {
    general: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    important: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  }
  return classes[type] || classes.general
}

const getTypeIconClass = (type) => {
  const classes = {
    general: 'bg-gray-500',
    info: 'bg-blue-500',
    important: 'bg-orange-500',
    urgent: 'bg-red-500'
  }
  return classes[type] || classes.general
}

const getTypeIcon = (type) => {
  const icons = {
    general: '📢',
    info: 'ℹ️',
    important: '⚠️',
    urgent: '🚨'
  }
  return icons[type] || icons.general
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
</script>
