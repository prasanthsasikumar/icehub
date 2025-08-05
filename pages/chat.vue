<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto container-padding flex justify-between items-center h-14 sm:h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">
            <span class="hidden sm:inline">ICE2025 Messages</span>
            <span class="sm:hidden">Messages</span>
          </NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-2 sm:gap-4">
          <span class="text-xs sm:text-sm text-gray-600 hidden sm:inline">{{ user?.name }}</span>
          <NuxtLink to="/" class="nav-button nav-button-secondary">
            <span class="hidden sm:inline">Back to Home</span>
            <span class="sm:hidden">← Home</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12 sm:py-20">
      <div class="text-base sm:text-lg text-gray-500">Loading messages...</div>
    </div>

    <!-- Not Authenticated -->
    <div v-else-if="!isLoggedIn" class="flex justify-center items-center py-12 sm:py-20">
      <div class="text-center">
        <div class="text-blue-500 text-4xl sm:text-6xl mb-4">💬</div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Messages</h1>
        <p class="text-sm sm:text-base text-gray-500 mb-6">Please sign in to access your messages.</p>
        <NuxtLink to="/login" class="nav-button">
          Sign In
        </NuxtLink>
      </div>
    </div>

    <!-- Chat Interface -->
    <main v-else class="flex flex-col sm:flex-row h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]">
      <!-- Conversations Sidebar -->
      <div class="w-full sm:w-1/3 bg-white border-r border-gray-200 flex flex-col" :class="{ 'hidden sm:flex': selectedUserId || selectedChatId }">
        <!-- Search and Header -->
        <div class="p-3 sm:p-4 border-b border-gray-200">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-base sm:text-lg font-semibold text-gray-700">Messages</h2>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search conversations..."
            class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>

        <!-- Conversations List -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="conversations.length === 0" class="p-4 text-center text-gray-500">
            <div class="text-3xl sm:text-4xl mb-2">📭</div>
            <p class="text-sm">No conversations yet</p>
            <p class="text-xs text-gray-400 mt-1">Start chatting with other participants!</p>
          </div>
          
          <div v-else>
            <div
              v-for="conversation in filteredConversations"
              :key="conversation.userId"
              @click="selectConversation(conversation)"
              :class="[
                'p-3 sm:p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 touch-target',
                selectedUserId === conversation.userId ? 'bg-blue-50 border-l-4 border-l-primary' : ''
              ]"
            >
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img 
                    :src="conversation.userImage" 
                    :alt="conversation.userName"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    @error="handleImageError"
                  />
                  <div class="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start">
                    <div class="flex items-center gap-2">
                      <h3 class="font-medium text-gray-700 truncate text-sm sm:text-base">{{ conversation.userName }}</h3>
                    </div>
                    <span class="text-xs text-gray-500">{{ formatTime(conversation.lastMessageTime) }}</span>
                  </div>
                  <p class="text-xs sm:text-sm text-gray-500 truncate mt-1">{{ conversation.lastMessage }}</p>
                </div>
                <div v-if="conversation.unreadCount > 0" class="bg-primary text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {{ conversation.unreadCount }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New Message Button -->
        <div class="p-4 border-t border-gray-200">
          <button 
            @click="showNewMessageModal = true"
            class="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            + New Message
          </button>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col">
        <!-- No conversation selected -->
        <div v-if="!selectedUserId" class="flex-1 flex items-center justify-center">
          <div class="text-center">
            <div class="text-6xl mb-4">💬</div>
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Select a conversation</h2>
            <p class="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
          </div>
        </div>

        <!-- Active conversation -->
        <div v-else class="flex-1 flex flex-col">
          <!-- Chat Header -->
          <div class="p-4 bg-white border-b border-gray-200 flex items-center gap-3">
            <img 
              :src="selectedUserImage" 
              :alt="selectedUserName"
              class="w-10 h-10 rounded-full object-cover"
              @error="handleImageError"
            />
            <div class="flex-1">
              <h3 class="font-medium text-gray-700">{{ selectedUserName }}</h3>
              <p class="text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  Online
                </span>
              </p>
            </div>
            <NuxtLink 
              :to="`/profile/${encodeURIComponent(selectedUserName)}`"
              class="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View Profile
            </NuxtLink>
          </div>

          <!-- New Message Alert -->
          <div 
            v-if="showNewMessageAlert" 
            class="bg-blue-500 text-white text-center py-2 px-4 text-sm animate-pulse"
          >
            💬 New message received
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
            <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
            
            <div
              v-for="message in messages"
              :key="message.id"
              :class="[
                'flex',
                message.senderId === user?.id ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                  message.senderId === user?.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-gray-200 text-gray-700'
                ]"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p 
                  :class="[
                    'text-xs mt-1',
                    message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                  ]"
                >
                  {{ formatMessageTime(message.timestamp) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="p-4 bg-white border-t border-gray-200">
            <form @submit.prevent="sendMessage" class="flex gap-3">
              <input
                v-model="newMessage"
                type="text"
                placeholder="Type a message... (Press Enter to send)"
                class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                :disabled="sending"
                @keydown.enter="sendMessage"
              />
              <button
                type="submit"
                :disabled="!newMessage.trim() || sending"
                class="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="sending">
                  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                    <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                </span>
                <span v-else>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- New Message Modal -->
    <div v-if="showNewMessageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">New Message</h3>
        
        <!-- User Search -->
        <div class="mb-4">
          <input
            v-model="userSearchQuery"
            type="text"
            placeholder="Search for participants..."
            class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        <!-- User List -->
        <div class="max-h-64 overflow-y-auto mb-4">
          <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 py-4">
            No users found
          </div>
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            @click="startNewConversation(user)"
            class="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
          >
            <img 
              :src="user.image" 
              :alt="user.name"
              class="w-10 h-10 rounded-full object-cover"
              @error="handleImageError"
            />
            <div class="flex-1">
              <p class="font-medium text-gray-700">{{ user.name }}</p>
              <p class="text-sm text-gray-500 truncate">{{ user.bio }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="showNewMessageModal = false"
            class="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Authentication
const { user, isLoggedIn, checkAuth } = useAuth()
const loading = ref(true)

// Chat state
const conversations = ref([])
const messages = ref([])
const selectedUserId = ref('')
const selectedUserName = ref('')
const selectedUserImage = ref('')
const newMessage = ref('')
const sending = ref(false)
const searchQuery = ref('')

// Real-time communication
const pollingInterval = ref(null)
const socket = ref(null)
const POLLING_INTERVAL = 2000 // 2 seconds for fallback polling
const lastMessageCount = ref(0)
const showNewMessageAlert = ref(false)

// Initialize WebSocket connection
const initializeWebSocket = () => {
  if (process.client && isLoggedIn.value) {
    // For now, skip WebSocket and use polling since server setup is complex
    console.log('WebSocket temporarily disabled, using polling for real-time updates')
    startPolling()
    return
    
    try {
      // Check if Socket.IO is available
      if (typeof window !== 'undefined' && window.io) {
        socket.value = window.io('http://localhost:3001', {
          autoConnect: true,
          withCredentials: true,
          auth: {
            token: useCookie('auth-token').value
          }
        })
      } else {
        // Try dynamic import
        import('socket.io-client').then(({ io }) => {
          socket.value = io('http://localhost:3001', {
            autoConnect: true,
            withCredentials: true,
            auth: {
              token: useCookie('auth-token').value
            }
          })
          setupSocketListeners()
        }).catch((error) => {
          console.warn('Socket.IO not available, falling back to polling:', error)
          startPolling()
          return
        })
        return // Don't setup listeners yet if using dynamic import
      }

      setupSocketListeners()

    } catch (error) {
      console.error('Failed to initialize WebSocket:', error)
      // Fallback to polling if WebSocket fails
      startPolling()
    }
  }
}

// Setup Socket.IO event listeners
const setupSocketListeners = () => {
  if (!socket.value) return

  socket.value.on('connect', () => {
    console.log('Connected to WebSocket server')
    // Stop polling since WebSocket is active
    stopPolling()
  })

  socket.value.on('connect_error', (error) => {
    console.warn('WebSocket connection failed:', error)
    // Fallback to polling if connection fails
    if (isLoggedIn.value) {
      startPolling()
    }
  })

  socket.value.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
    // Fallback to polling if WebSocket disconnects
    if (isLoggedIn.value) {
      startPolling()
    }
  })

  socket.value.on('new_message', (message) => {
    // Add new message to the current conversation if it's the active one
    if (selectedUserId.value && 
        (message.senderId === selectedUserId.value || message.receiverId === selectedUserId.value)) {
      messages.value.push(message)
      
      // Show notification if from other user
      if (message.senderId !== user.value?.id) {
        showNewMessageAlert.value = true
        setTimeout(() => {
          showNewMessageAlert.value = false
        }, 2000)
      }

      nextTick(() => {
        scrollToBottom()
      })
    }
    
    // Refresh conversations to update counts
    loadConversations()
  })

  socket.value.on('message_sent', (message) => {
    // Message was sent successfully
    if (selectedUserId.value && 
        (message.senderId === selectedUserId.value || message.receiverId === selectedUserId.value)) {
      // Only add if not already in messages (avoid duplicates)
      if (!messages.value.find(m => m.id === message.id)) {
        messages.value.push(message)
        nextTick(() => {
          scrollToBottom()
        })
      }
    }
    
    // Refresh conversations
    loadConversations()
  })

  socket.value.on('conversation_update', () => {
    // Refresh conversations when read status changes
    loadConversations()
    
    // Refresh current conversation messages if any
    if (selectedUserId.value) {
      loadMessages(false)
    }
  })

  socket.value.on('error', (error) => {
    console.error('WebSocket error:', error)
  })
}

// Clean up WebSocket connection
const cleanupWebSocket = () => {
  if (socket.value) {
    socket.value.disconnect()
    socket.value = null
  }
}

// New message modal
const showNewMessageModal = ref(false)
const userSearchQuery = ref('')
const allUsers = ref([])

// Template refs
const messagesContainer = ref(null)

// Check authentication
onMounted(async () => {
  await checkAuth()
  if (isLoggedIn.value) {
    await loadConversations()
    await loadAllUsers()
    
    // Try to initialize WebSocket, fallback to polling
    initializeWebSocket()
    
    // Add visibility change listener for performance
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Check for query parameters to start a conversation
    const route = useRoute()
    
    // Handle direct message URL parameters
    if (route.query.user && route.query.name) {
      const user = allUsers.value.find(u => u.id === route.query.user)
      if (user) {
        startNewConversation(user)
      } else {
        // If user not found in allUsers yet, wait and try again
        nextTick(() => {
          const foundUser = allUsers.value.find(u => u.id === route.query.user)
          if (foundUser) {
            startNewConversation(foundUser)
          } else {
            // Create a minimal user object from query params
            startNewConversation({
              id: route.query.user,
              name: route.query.name,
              image: '/uploads/default/user-avatar.svg'
            })
          }
        })
      }
    }
  }
  loading.value = false
})

// Cleanup WebSocket and polling on unmount
onUnmounted(() => {
  cleanupWebSocket()
  stopPolling()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

// Computed properties
const filteredConversations = computed(() => {
  if (!searchQuery.value) return conversations.value
  return conversations.value.filter(conv => 
    conv.userName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredUsers = computed(() => {
  if (!userSearchQuery.value) return allUsers.value.filter(u => u.id !== user.value?.id)
  return allUsers.value.filter(u => 
    u.id !== user.value?.id &&
    (u.name.toLowerCase().includes(userSearchQuery.value.toLowerCase()) ||
     u.bio.toLowerCase().includes(userSearchQuery.value.toLowerCase()))
  )
})

// Methods
const loadConversations = async () => {
  try {
    const response = await $fetch('/api/chat/conversations')
    const directConversations = response.directConversations || []
    
    // Use only direct conversations
    conversations.value = directConversations.sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    )
  } catch (error) {
    console.error('Failed to load conversations:', error)
  }
}

const loadAllUsers = async () => {
  try {
    const response = await $fetch('/api/users')
    allUsers.value = response || []
  } catch (error) {
    console.error('Failed to load users:', error)
  }
}

// Real-time polling functions
const startPolling = () => {
  if (pollingInterval.value) return // Already polling
  
  pollingInterval.value = setInterval(async () => {
    if (!isLoggedIn.value) return
    
    try {
      // Store current conversations for comparison
      const oldConversations = [...conversations.value]
      
      // Refresh conversations to check for new messages
      await loadConversations()
      
      // Check if there are new conversations or unread count changes
      const hasNewActivity = conversations.value.some((newConv, index) => {
        const oldConv = oldConversations[index]
        return !oldConv || 
               newConv.unreadCount !== oldConv.unreadCount ||
               newConv.lastMessageTime !== oldConv.lastMessageTime
      })
      
      // If we have a selected conversation, refresh messages
      if (selectedUserId.value) {
        const currentMessageCount = messages.value.length
        const oldMessages = [...messages.value]
        
        await loadMessages(false) // false = don't scroll to bottom automatically
        
        // Check if there are actually new messages (not just read status updates)
        const hasNewMessages = messages.value.length > currentMessageCount ||
                              messages.value.some((msg, index) => {
                                const oldMsg = oldMessages[index]
                                return !oldMsg || msg.id !== oldMsg.id
                              })
        
        // Only scroll if new messages were added
        if (hasNewMessages) {
          // Show brief notification for new messages (only if not from current user)
          const latestMessage = messages.value[messages.value.length - 1]
          if (latestMessage && latestMessage.senderId !== user.value?.id) {
            showNewMessageAlert.value = true
            setTimeout(() => {
              showNewMessageAlert.value = false
            }, 2000)
          }
          
          nextTick(() => {
            scrollToBottom()
          })
        }
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, POLLING_INTERVAL)
}

const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}

// Handle visibility change for performance
const handleVisibilityChange = () => {
  if (document.hidden) {
    // Page is hidden, stop polling to save resources
    stopPolling()
  } else {
    // Page is visible again, restart polling
    if (isLoggedIn.value) {
      startPolling()
      // Immediately refresh when coming back
      loadConversations()
      if (selectedUserId.value) {
        loadMessages(false)
      }
    }
  }
}

const selectConversation = async (conversation) => {
  selectedUserId.value = conversation.userId
  selectedUserName.value = conversation.userName
  selectedUserImage.value = conversation.userImage
  
  await loadMessages(true) // true = scroll to bottom
}

const loadMessages = async (shouldScroll = true) => {
  if (!selectedUserId.value) return
  
  try {
    const response = await $fetch('/api/chat/messages', { 
      query: { withUserId: selectedUserId.value }
    })
    messages.value = response.messages || []
    
    // Scroll to bottom if requested
    if (shouldScroll) {
      nextTick(() => {
        scrollToBottom()
      })
    }
    
    // Refresh conversations to update unread counts
    await loadConversations()
  } catch (error) {
    console.error('Failed to load messages:', error)
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || sending.value || !selectedUserId.value) return

  sending.value = true
  
  try {
    await $fetch('/api/chat/send', {
      method: 'POST',
      body: {
        content: newMessage.value.trim(),
        receiverId: selectedUserId.value,
        chatType: 'direct'
      }
    })
    
    newMessage.value = ''
    
    // Immediately refresh messages and conversations
    await Promise.all([
      loadMessages(true), // true = scroll to bottom
      loadConversations()
    ])
  } catch (error) {
    console.error('Failed to send message:', error)
    alert('Failed to send message')
  } finally {
    sending.value = false
  }
}

const startNewConversation = (selectedUser) => {
  selectedUserId.value = selectedUser.id
  selectedUserName.value = selectedUser.name
  selectedUserImage.value = selectedUser.image
  messages.value = []
  showNewMessageModal.value = false
  userSearchQuery.value = ''
}

const handleImageError = (event) => {
  event.target.src = '/uploads/default/user-avatar.svg'
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}

const formatMessageTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Page meta
useHead({
  title: 'Messages - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Chat with other participants in the ICE2025 community.'
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

.text-primary-dark {
  color: #0969da;
}

.border-l-primary {
  border-left-color: #0d7ae4;
}

.focus\:border-primary:focus {
  border-color: #0d7ae4;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}
</style>
