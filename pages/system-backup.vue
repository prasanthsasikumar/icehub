<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">ICE2025</NuxtLink>
            <span class="ml-4 text-sm text-gray-500">Admin Panel - Backup System</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-gray-700 hover:text-gray-900">
              ← Back to Admin
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="md:flex md:items-center md:justify-between mb-8">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Data Backup & Restore
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Create comprehensive backups of your ICE2025 system data
          </p>
        </div>
      </div>

      <!-- Authentication Check -->
      <div v-if="!isLoggedIn || !isAdmin" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p><strong>Authentication Required:</strong></p>
        <p>Logged in: {{ isLoggedIn }}</p>
        <p>Is Admin: {{ isAdmin }}</p>
        <p>User: {{ user?.email || 'No user' }}</p>
        <div class="mt-2">
          <NuxtLink to="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Go to Login
          </NuxtLink>
        </div>
      </div>

      <div v-if="isLoggedIn && isAdmin">
        <!-- Create Backup Section -->
        <div class="bg-white shadow rounded-lg mb-8">
          <form @submit.prevent="createBackup">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Create New Backup</h3>
              <p class="mt-1 text-sm text-gray-600">
                Generate a complete backup of your system data
              </p>
            </div>
            <div class="px-6 py-4 space-y-6">
              <!-- Backup Type -->
              <div>
                <label class="text-base font-medium text-gray-900">Backup Type</label>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input
                      id="backup-full"
                      v-model="backupOptions.type"
                      name="backup-type"
                      type="radio"
                      value="full"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label for="backup-full" class="ml-3 block text-sm font-medium text-gray-700">
                      Full System Backup
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="backup-database"
                      v-model="backupOptions.type"
                      name="backup-type"
                      type="radio"
                      value="database"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label for="backup-database" class="ml-3 block text-sm font-medium text-gray-700">
                      Database Only
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="backup-users"
                      v-model="backupOptions.type"
                      name="backup-type"
                      type="radio"
                      value="users"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label for="backup-users" class="ml-3 block text-sm font-medium text-gray-700">
                      Users Only
                    </label>
                  </div>
                </div>
              </div>

              <!-- Additional Options -->
              <div>
                <label class="text-base font-medium text-gray-900">Additional Options</label>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="include-files"
                        v-model="backupOptions.includeFiles"
                        name="include-files"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="include-files" class="font-medium text-gray-700">Include uploaded files</label>
                      <p class="text-gray-500">Profile images and other uploaded content</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="include-passwords"
                        v-model="backupOptions.includePasswords"
                        name="include-passwords"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="include-passwords" class="font-medium text-gray-700">Include passwords</label>
                      <p class="text-gray-500">⚠️ Sensitive: Only enable if you need full restoration capability</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Create Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="creating"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="!creating" class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <div v-if="creating" class="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {{ creating ? 'Creating Backup...' : 'Create Backup' }}
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Restore Section -->
        <div class="bg-white shadow rounded-lg mt-8">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Restore from Backup</h3>
            <p class="mt-1 text-sm text-gray-600">
              Upload and restore data from a backup file
            </p>
          </div>
          <div class="px-6 py-4">
            <div class="space-y-6">
              <!-- File Upload -->
              <div>
                <label for="restore-file" class="block text-sm font-medium text-gray-700 mb-2">
                  Select Backup File
                </label>
                <input
                  id="restore-file"
                  type="file"
                  accept=".json"
                  @change="handleRestoreFileUpload"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Select a JSON backup file created by this system
                </p>
              </div>

              <!-- Restore Options -->
              <div v-if="restoreFileData">
                <label class="text-base font-medium text-gray-900">Restore Options</label>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="restore-users"
                        v-model="restoreOptions.restoreUsers"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="restore-users" class="font-medium text-gray-700">Restore Users</label>
                      <p class="text-gray-500">Import user profiles and data</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="restore-messages"
                        v-model="restoreOptions.restoreMessages"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="restore-messages" class="font-medium text-gray-700">Restore Messages</label>
                      <p class="text-gray-500">Import chat messages and conversations</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="restore-teams"
                        v-model="restoreOptions.restoreTeams"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="restore-teams" class="font-medium text-gray-700">Restore Teams</label>
                      <p class="text-gray-500">Import teams and team data</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="overwrite-existing"
                        v-model="restoreOptions.overwriteExisting"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="overwrite-existing" class="font-medium text-gray-700">Overwrite Existing Data</label>
                      <p class="text-gray-500">⚠️ Replace existing records with backup data</p>
                    </div>
                  </div>
                </div>

                <!-- Backup Preview -->
                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">Backup Preview</h4>
                  <div class="text-sm text-gray-600 space-y-1">
                    <p><strong>Backup ID:</strong> {{ restoreFileData.metadata?.id || 'Unknown' }}</p>
                    <p><strong>Created:</strong> {{ restoreFileData.metadata?.createdAt ? formatDate(restoreFileData.metadata.createdAt) : 'Unknown' }}</p>
                    <p><strong>Type:</strong> {{ restoreFileData.metadata?.type || 'Unknown' }}</p>
                    <p><strong>Created By:</strong> {{ restoreFileData.metadata?.createdBy || 'Unknown' }}</p>
                    <div class="mt-2">
                      <p><strong>Data Contents:</strong></p>
                      <ul class="ml-4 space-y-1">
                        <li v-if="restoreFileData.database?.users">• Users: {{ restoreFileData.database.users.length }} records</li>
                        <li v-if="restoreFileData.database?.messages">• Messages: {{ restoreFileData.database.messages.length }} records</li>
                        <li v-if="restoreFileData.database?.teams">• Teams: {{ restoreFileData.database.teams.length }} records</li>
                        <li v-if="restoreFileData.database?.team_chats">• Team Chats: {{ restoreFileData.database.team_chats.length }} records</li>
                        <li v-if="restoreFileData.database?.team_links">• Team Links: {{ restoreFileData.database.team_links.length }} records</li>
                        <li v-if="restoreFileData.database?.team_images">• Team Images: {{ restoreFileData.database.team_images.length }} records</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Restore Button -->
                <div class="flex justify-end mt-6">
                  <button
                    @click="performRestore"
                    :disabled="restoring || !hasRestoreOptions"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg v-if="!restoring" class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <div v-if="restoring" class="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {{ restoring ? 'Restoring...' : 'Restore Data' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success/Error Messages -->
        <div
          v-if="showSuccess"
          class="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-md p-4 shadow-lg z-50"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="showError"
          class="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-md p-4 shadow-lg z-50"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Auth check
const { user, isLoggedIn, isAdmin, checkAuth } = useAuth()

// Check auth on mount
onMounted(async () => {
  await checkAuth()
})

// Page meta
useHead({
  title: 'Backup System - ICE2025 Admin',
  meta: [
    { name: 'description', content: 'ICE2025 system backup and restore interface' }
  ]
})

// Reactive data
const creating = ref(false)
const restoring = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const restoreFileData = ref(null)

const backupOptions = ref({
  type: 'full',
  includeFiles: true,
  includePasswords: false
})

// Restore options
const restoreOptions = ref({
  restoreUsers: true,
  restoreMessages: true,
  restoreTeams: true,
  overwriteExisting: false
})

// Computed properties
const hasRestoreOptions = computed(() => {
  return restoreOptions.value.restoreUsers || 
         restoreOptions.value.restoreMessages || 
         restoreOptions.value.restoreTeams
})

// Methods
const createBackup = async () => {
  creating.value = true
  
  try {
    const response = await $fetch('/api/admin/backup/create', {
      method: 'POST',
      body: backupOptions.value
    })

    // Convert the response object to JSON string for download
    const jsonString = JSON.stringify(response, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `backup-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    successMessage.value = 'Backup created and downloaded successfully!'
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 5000)

  } catch (error) {
    console.error('Backup creation failed:', error)
    errorMessage.value = 'Failed to create backup: ' + (error.data?.message || error.message)
    showError.value = true
    setTimeout(() => { showError.value = false }, 5000)
  } finally {
    creating.value = false
  }
}

// Restore functionality
const handleRestoreFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) {
    restoreFileData.value = null
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      restoreFileData.value = data
    } catch (error) {
      errorMessage.value = 'Invalid backup file format. Please select a valid JSON backup file.'
      showError.value = true
      setTimeout(() => { showError.value = false }, 5000)
      restoreFileData.value = null
    }
  }
  reader.readAsText(file)
}

const performRestore = async () => {
  if (!restoreFileData.value) return
  
  restoring.value = true
  
  try {
    const response = await $fetch('/api/admin/backup/restore', {
      method: 'POST',
      body: {
        backupData: restoreFileData.value,
        restoreOptions: restoreOptions.value
      }
    })

    successMessage.value = `Successfully restored ${response.restoredItems || 'data'} from backup`
    if (response.results?.summary?.warnings && response.results.summary.warnings.length > 0) {
      successMessage.value += `\n\nWarnings:\n${response.results.summary.warnings.join('\n')}`
    }
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 8000) // Show longer for warnings
    
    // Clear the restore form
    restoreFileData.value = null
    document.getElementById('restore-file').value = ''
    
  } catch (error) {
    console.error('Restore failed:', error)
    errorMessage.value = 'Failed to restore backup: ' + (error.data?.message || error.message)
    showError.value = true
    setTimeout(() => { showError.value = false }, 5000)
  } finally {
    restoring.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}
</script>
