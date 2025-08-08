<template>
  <section v-if="announcements && announcements.length > 0" class="bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-8">
    <div class="max-w-container mx-auto container-padding">
      <div class="text-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Latest Announcements</h2>
        <p class="text-base text-gray-600 max-w-xl mx-auto">
          Stay updated with important workshop information
        </p>
      </div>

      <div class="space-y-3">
        <!-- Compact expandable announcements -->
        <div 
          v-for="announcement in sortedAnnouncements" 
          :key="announcement.id"
          :class="[
            'bg-white rounded-lg shadow-sm border-l-4 transition-all hover:shadow-md cursor-pointer',
            getAnnouncementBorderClass(announcement),
            expandedAnnouncements.has(announcement.id) ? 'pb-4' : 'hover:bg-gray-50'
          ]"
          @click="toggleAnnouncement(announcement.id)"
        >
          <!-- Compact view -->
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <!-- Announcement Type Icon -->
              <div :class="getTypeIconClass(announcement.type)" class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm">{{ getTypeIcon(announcement.type) }}</span>
              </div>
              
              <!-- Title and basic info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-semibold text-gray-900 truncate">
                    {{ announcement.title }}
                  </h3>
                  
                  <!-- Pinned Badge -->
                  <span v-if="announcement.is_pinned" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
                    📌 Pinned
                  </span>
                  
                  <!-- Type Badge -->
                  <span :class="getTypeBadgeClass(announcement.type)" class="px-2 py-1 text-xs font-medium rounded-full flex-shrink-0">
                    {{ announcement.type === 'general' ? 'General' : announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) }}
                  </span>
                </div>
                
                <div class="flex items-center text-xs text-gray-500 gap-3">
                  <span>{{ announcement.author_name }}</span>
                  <span>{{ formatDate(announcement.created_at) }}</span>
                  <span v-if="announcement.expires_at" class="text-orange-600">
                    Expires {{ formatDate(announcement.expires_at) }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Expand/Collapse indicator -->
            <div class="flex items-center gap-2 flex-shrink-0 ml-3">
              <div class="text-xs text-gray-400 hidden sm:block">
                {{ expandedAnnouncements.has(announcement.id) ? 'Click to collapse' : 'Click to expand' }}
              </div>
              <svg 
                :class="[
                  'w-5 h-5 text-gray-400 transition-transform duration-200',
                  expandedAnnouncements.has(announcement.id) ? 'rotate-180' : ''
                ]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          
          <!-- Expanded content -->
          <div 
            v-if="expandedAnnouncements.has(announcement.id)"
            class="px-4 pb-4 pt-0 border-t border-gray-100 mt-2"
          >
            <div class="prose prose-gray max-w-none mt-4">
              <div 
                class="text-gray-700 leading-relaxed announcement-content"
                v-html="formatContent(announcement.content)"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Show More/Less Button -->
      <div v-if="hasMoreAnnouncements" class="text-center mt-4">
        <button 
          @click="toggleShowAllAnnouncements"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span v-if="!showAllAnnouncements">
            Show {{ announcements.length - props.limit }} more announcement{{ announcements.length - props.limit === 1 ? '' : 's' }}
          </span>
          <span v-else>Show less</span>
          <svg 
            :class="[
              'w-4 h-4 transition-transform duration-200',
              showAllAnnouncements ? 'rotate-180' : ''
            ]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
      
      <!-- View All Link for Admins -->
      <div v-if="isAdmin" class="text-center mt-4">
        <NuxtLink 
          to="/admin/announcements" 
          class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import { marked } from 'marked'

// Authentication
const { isAdmin } = useAuth()

// Props
const props = defineProps({
  limit: {
    type: Number,
    default: 5
  }
})

// Reactive state for expanded announcements
const expandedAnnouncements = ref(new Set())
// State for showing all announcements
const showAllAnnouncements = ref(false)

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
  
  return activeAnnouncements
})

const displayedAnnouncements = computed(() => {
  if (showAllAnnouncements.value) {
    return announcements.value
  }
  return announcements.value.slice(0, props.limit)
})

const hasMoreAnnouncements = computed(() => {
  return announcements.value.length > props.limit
})

const sortedAnnouncements = computed(() => {
  return [...displayedAnnouncements.value].sort((a, b) => {
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

// Toggle announcement expansion
const toggleAnnouncement = (id) => {
  if (expandedAnnouncements.value.has(id)) {
    expandedAnnouncements.value.delete(id)
  } else {
    expandedAnnouncements.value.add(id)
  }
  // Force reactivity update
  expandedAnnouncements.value = new Set(expandedAnnouncements.value)
}

// Toggle showing all announcements
const toggleShowAllAnnouncements = () => {
  showAllAnnouncements.value = !showAllAnnouncements.value
}

// Helper methods
const formatContent = (content) => {
  if (!content) return ''
  
  // Check if the content contains markdown patterns
  const hasMarkdown = /[*_`#\[\]!]/g.test(content) || /\n\n/.test(content)
  
  if (hasMarkdown) {
    // Parse as markdown
    return marked(content, {
      breaks: true, // Convert single line breaks to <br>
      gfm: true,    // GitHub flavored markdown
    })
  } else {
    // Just preserve line breaks for plain text
    return content.replace(/\n/g, '<br>')
  }
}

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

<style scoped>
.announcement-content {
  line-height: 1.6;
}

.announcement-content :deep(h1),
.announcement-content :deep(h2),
.announcement-content :deep(h3),
.announcement-content :deep(h4),
.announcement-content :deep(h5),
.announcement-content :deep(h6) {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #374151;
}

.announcement-content :deep(h1) {
  font-size: 1.5rem;
}

.announcement-content :deep(h2) {
  font-size: 1.25rem;
}

.announcement-content :deep(h3) {
  font-size: 1.125rem;
}

.announcement-content :deep(p) {
  margin-bottom: 1rem;
}

.announcement-content :deep(ul),
.announcement-content :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.announcement-content :deep(li) {
  margin-bottom: 0.25rem;
}

.announcement-content :deep(strong),
.announcement-content :deep(b) {
  font-weight: 600;
  color: #374151;
}

.announcement-content :deep(em),
.announcement-content :deep(i) {
  font-style: italic;
}

.announcement-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #dc2626;
}

.announcement-content :deep(pre) {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.announcement-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.announcement-content :deep(blockquote) {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  font-style: italic;
  color: #6b7280;
}

.announcement-content :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.announcement-content :deep(a:hover) {
  color: #2563eb;
}
</style>