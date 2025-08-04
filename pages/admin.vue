<template>
  <div class="min-h-screen font-sans text-gray-700 bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-container mx-auto px-5 flex justify-between items-center h-16">
        <div class="nav-left">
          <NuxtLink to="/" class="nav-logo">ICE2025 Admin</NuxtLink>
        </div>
        <div class="nav-right flex items-center gap-4">
          <span class="text-sm text-gray-600">Admin Panel</span>
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

    <!-- Access Denied -->
    <div v-else-if="!isAdmin" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">Access Denied</h1>
        <p class="text-gray-500 mb-6">You need admin privileges to access this page.</p>
        <NuxtLink to="/" class="nav-button">
          Return Home
        </NuxtLink>
      </div>
    </div>

    <!-- Admin Content -->
    <main v-else class="py-12">
      <div class="max-w-container mx-auto px-5">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-700 mb-2">User Management</h1>
          <p class="text-gray-500">Manage users and their information</p>
        </div>

        <!-- CSV Upload Section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Bulk User Import</h2>
          <div class="flex flex-col space-y-4">
            <div>
              <label for="csvFile" class="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <input
                id="csvFile"
                type="file"
                accept=".csv"
                @change="handleCSVUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
              <p class="text-xs text-gray-500 mt-1">
                CSV format: name,email,bio (header row required). Default password will be "workshop123"
              </p>
            </div>
            <div v-if="csvProcessing" class="text-sm text-blue-600">
              Processing CSV file...
            </div>
            <div v-if="csvError" class="text-sm text-red-600">
              {{ csvError }}
            </div>
            <div v-if="csvSuccess" class="text-sm text-green-600">
              {{ csvSuccess }}
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-primary mb-1">{{ users?.length || 0 }}</div>
            <div class="text-sm text-gray-500">Total Users</div>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-green-600 mb-1">{{ adminCount }}</div>
            <div class="text-sm text-gray-500">Admin Users</div>
          </div>
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <div class="text-2xl font-bold text-blue-600 mb-1">{{ regularCount }}</div>
            <div class="text-sm text-gray-500">Regular Users</div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-700">All Users</h2>
              <div v-if="selectedUsers.length > 0" class="flex items-center space-x-3">
                <span class="text-sm text-gray-600">{{ selectedUsers.length }} selected</span>
                <button
                  @click="bulkMakeAdmin"
                  class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                >
                  Make Admin
                </button>
                <button
                  @click="bulkRemoveAdmin"
                  class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm hover:bg-yellow-200 transition-colors"
                >
                  Remove Admin
                </button>
                <button
                  @click="bulkDelete"
                  class="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                >
                  Delete Selected
                </button>
                <button
                  @click="clearSelection"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      :checked="allSelected"
                      @change="toggleSelectAll"
                      class="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliation</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      :value="user.id"
                      v-model="selectedUsers"
                      class="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          :src="user.image" 
                          :alt="`${user.name}'s avatar`" 
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ user.bio }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="getRoleStyle(user.role)"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span v-if="user.affiliation" class="text-gray-700 font-medium">{{ user.affiliation }}</span>
                    <span v-else class="text-gray-400 italic">No affiliation</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex flex-wrap gap-1 max-w-xs">
                      <span 
                        v-for="skill in user.skills.slice(0, 3)" 
                        :key="typeof skill === 'string' ? skill : skill.name"
                        class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {{ typeof skill === 'string' ? skill : skill.name }}
                        <span v-if="typeof skill === 'object' && skill.level" class="ml-1 text-xs opacity-75">
                          ({{ skill.level }})
                        </span>
                      </span>
                      <span v-if="user.skills.length > 3" class="text-xs text-gray-400">
                        +{{ user.skills.length - 3 }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <NuxtLink 
                      :to="`/profile/${encodeURIComponent(user.name)}`"
                      class="text-primary hover:text-primary-dark"
                    >
                      View
                    </NuxtLink>
                    <button 
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      v-if="user.id !== currentUser?.id"
                      @click="toggleRole(user)"
                      class="text-purple-600 hover:text-purple-900"
                    >
                      {{ getRoleToggleText(user.role) }}
                    </button>
                    <button 
                      v-if="user.id !== currentUser?.id"
                      @click="deleteUser(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Group Management Section -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mt-8">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Group Management</h2>
            <p class="text-sm text-gray-500 mb-6">Add users to groups directly without requiring them to join manually.</p>
            
            <!-- Add User to Group Form -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                <select v-model="selectedUserForGroup" class="form-select w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="">Choose a user...</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.name }} ({{ user.email }})
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Select Group</label>
                <select v-model="selectedGroupForUser" class="form-select w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="">Choose a group...</option>
                  <option v-for="group in groups" :key="group.id" :value="group.id">
                    {{ group.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Role in Group</label>
                <select v-model="selectedRoleForUser" class="form-select w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option value="member">Member</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              
              <div class="flex items-end">
                <button 
                  @click="addUserToGroup"
                  :disabled="!selectedUserForGroup || !selectedGroupForUser || addingToGroup"
                  class="w-full px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <span v-if="addingToGroup">Adding...</span>
                  <span v-else>Add to Group</span>
                </button>
              </div>
            </div>

            <!-- Status Messages -->
            <div v-if="groupManagementError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p class="text-red-600 text-sm">{{ groupManagementError }}</p>
            </div>
            <div v-if="groupManagementSuccess" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p class="text-green-600 text-sm">{{ groupManagementSuccess }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Check authentication and admin status
const { user: currentUser, isLoggedIn, isAdmin, checkAuth } = useAuth()
const loading = ref(true)

// Fetch users data
const { data: users, refresh: refreshUsers } = await useFetch('/api/users')

// Fetch groups data
const { data: groups, refresh: refreshGroups } = await useFetch('/api/groups')

// Group management state
const selectedUserForGroup = ref('')
const selectedGroupForUser = ref('')
const selectedRoleForUser = ref('member')
const addingToGroup = ref(false)
const groupManagementError = ref('')
const groupManagementSuccess = ref('')

// Check authentication on mount
onMounted(async () => {
  await checkAuth()
  loading.value = false
})

// Computed properties
const adminCount = computed(() => {
  return users.value?.filter(user => user.role === 'admin').length || 0
})

const regularCount = computed(() => {
  return users.value?.filter(user => user.role === 'user').length || 0
})

// CSV Upload handling
const csvProcessing = ref(false)
const csvError = ref('')
const csvSuccess = ref('')

// Multi-user selection
const selectedUsers = ref([])

const allSelected = computed(() => {
  return users.value && users.value.length > 0 && selectedUsers.value.length === users.value.length
})

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = users.value ? users.value.map(user => user.id) : []
  }
}

const clearSelection = () => {
  selectedUsers.value = []
}

const bulkMakeAdmin = async () => {
  if (selectedUsers.value.length === 0) return
  
  const confirmed = confirm(`Make ${selectedUsers.value.length} selected users admin?`)
  if (!confirmed) return

  try {
    for (const userId of selectedUsers.value) {
      await $fetch('/api/admin/toggle-role', {
        method: 'POST',
        body: { userId, newRole: 'admin' }
      })
    }
    
    await refreshUsers()
    selectedUsers.value = []
    alert(`Successfully made ${selectedUsers.value.length} users admin`)
  } catch (error) {
    alert('Failed to update some users')
  }
}

const bulkRemoveAdmin = async () => {
  if (selectedUsers.value.length === 0) return
  
  const confirmed = confirm(`Remove admin role from ${selectedUsers.value.length} selected users?`)
  if (!confirmed) return

  try {
    for (const userId of selectedUsers.value) {
      await $fetch('/api/admin/toggle-role', {
        method: 'POST',
        body: { userId, newRole: 'user' }
      })
    }
    
    await refreshUsers()
    selectedUsers.value = []
    alert(`Successfully removed admin role from ${selectedUsers.value.length} users`)
  } catch (error) {
    alert('Failed to update some users')
  }
}

const bulkDelete = async () => {
  if (selectedUsers.value.length === 0) return
  
  const confirmed = confirm(`Are you sure you want to delete ${selectedUsers.value.length} selected users? This action cannot be undone.`)
  if (!confirmed) return

  const doubleConfirmed = confirm(`This will permanently delete ${selectedUsers.value.length} users and all their data. Are you absolutely sure?`)
  if (!doubleConfirmed) return

  try {
    for (const userId of selectedUsers.value) {
      await $fetch('/api/admin/delete-user', {
        method: 'DELETE',
        body: { userId }
      })
    }
    
    await refreshUsers()
    selectedUsers.value = []
    alert(`Successfully deleted selected users`)
  } catch (error) {
    alert('Failed to delete some users')
  }
}

const handleCSVUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  csvProcessing.value = true
  csvError.value = ''
  csvSuccess.value = ''

  try {
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least a header row and one data row')
    }

    const headers = lines[0].split(',').map(h => h.trim())
    if (!headers.includes('name') || !headers.includes('email')) {
      throw new Error('CSV must contain "name" and "email" columns')
    }

    const users = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length >= 2) {
        const userObj = {}
        headers.forEach((header, index) => {
          userObj[header] = values[index] || ''
        })
        
        if (userObj.name && userObj.email) {
          users.push({
            name: userObj.name,
            email: userObj.email,
            bio: userObj.bio || '',
            password: 'workshop123' // Default password
          })
        }
      }
    }

    if (users.length === 0) {
      throw new Error('No valid users found in CSV file')
    }

    // Send to backend
    const response = await $fetch('/api/admin/bulk-create-users', {
      method: 'POST',
      body: { users }
    })

    csvSuccess.value = `Successfully created ${response.created} users`
    await refreshUsers()
    
    // Clear file input
    event.target.value = ''

  } catch (error) {
    csvError.value = error.message || 'Failed to process CSV file'
  } finally {
    csvProcessing.value = false
  }
}

// Methods
const handleImageError = (event) => {
  event.target.src = '/uploads/default/user-avatar.svg'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString()
}

const editUser = (user) => {
  // For now, just redirect to profile
  navigateTo(`/profile/${encodeURIComponent(user.name)}`)
}

const toggleRole = async (user) => {
  const newRole = user.role === 'admin' ? 'user' : 'admin'
  const action = newRole === 'admin' ? 'promote to admin' : 'demote to regular user'
  
  if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) {
    return
  }

  try {
    const response = await $fetch('/api/admin/toggle-role', {
      method: 'POST',
      body: {
        userId: user.id,
        newRole: newRole
      }
    })
    
    // Refresh users data
    await refreshUsers()
    
    // Show success message
    alert(`Successfully ${action} ${user.name}`)
  } catch (error) {
    console.error('Error updating user role:', error)
    const errorMessage = error.data?.message || error.message || 'Unknown error'
    alert(`Failed to update user role: ${errorMessage}`)
  }
}

const getRoleToggleText = (currentRole) => {
  switch (currentRole) {
    case 'admin':
      return 'Remove Admin'
    case 'user':
    case 'mentor':
    default:
      return 'Make Admin'
  }
}

const getRoleStyle = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800'
    case 'mentor':
      return 'bg-blue-100 text-blue-800'
    case 'user':
    default:
      return 'bg-green-100 text-green-800'
  }
}

const deleteUser = async (user) => {
  if (!confirm(`Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`)) {
    return
  }

  // Double confirmation for delete action
  if (!confirm(`This will permanently delete ${user.name} and all their data. Are you absolutely sure?`)) {
    return
  }

  try {
    await $fetch('/api/admin/delete-user', {
      method: 'DELETE',
      body: {
        userId: user.id
      }
    })
    
    // Refresh users data
    await refreshUsers()
    alert(`User ${user.name} has been deleted successfully`)
  } catch (error) {
    alert(`Failed to delete user: ${error.data?.message || 'Unknown error'}`)
  }
}

// Add user to group function
const addUserToGroup = async () => {
  if (!selectedUserForGroup.value || !selectedGroupForUser.value) {
    return
  }

  addingToGroup.value = true
  groupManagementError.value = ''
  groupManagementSuccess.value = ''

  try {
    const response = await $fetch('/api/admin/add-user-to-group', {
      method: 'POST',
      body: {
        userId: selectedUserForGroup.value,
        groupId: selectedGroupForUser.value,
        role: selectedRoleForUser.value
      }
    })

    groupManagementSuccess.value = response.message
    
    // Clear form
    selectedUserForGroup.value = ''
    selectedGroupForUser.value = ''
    selectedRoleForUser.value = 'member'
    
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      groupManagementSuccess.value = ''
    }, 5000)

  } catch (error) {
    groupManagementError.value = error.data?.message || 'Failed to add user to group'
  } finally {
    addingToGroup.value = false
  }
}

// Redirect if not admin
watch([isLoggedIn, isAdmin], ([loggedIn, admin]) => {
  if (!loading.value && (!loggedIn || !admin)) {
    navigateTo('/login')
  }
})

// Page meta
useHead({
  title: 'Admin Panel - ICE2025',
  meta: [
    {
      name: 'description',
      content: 'Admin panel for managing ICE2025 users and content.'
    }
  ]
})
</script>

<style scoped>
.text-primary {
  color: #0d7ae4;
}

.text-primary-dark {
  color: #0969da;
}

.hover\:text-primary-dark:hover {
  color: #0969da;
}
</style>
