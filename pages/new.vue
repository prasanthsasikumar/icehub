<template>
  <div class="container">
    <div class="form-card">
      <h1 class="page-title">Add New User</h1>
      
      <form @submit.prevent="submit" class="user-form">
        <!-- Name Input -->
        <div class="form-group">
          <label for="name" class="form-label">Full Name</label>
          <input 
            id="name"
            v-model="form.name" 
            type="text"
            placeholder="Enter your full name" 
            required 
            class="form-input"
          />
        </div>

        <!-- Image Capture/Upload Section -->
        <div class="form-group">
          <label class="form-label">Profile Picture</label>
          
          <!-- Image Preview -->
          <div v-if="form.image" class="image-preview">
            <img :src="form.image" alt="Profile preview" class="preview-img" />
            <button type="button" @click="clearImage" class="btn-clear">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <!-- Image Capture Options -->
          <div v-else class="image-options">
            <button type="button" @click="openCamera" class="btn-option camera-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.2l3.2-2.7a.75.75 0 011 1.1l-4 3.4a.75.75 0 01-1 0l-4-3.4a.75.75 0 011-1.1L12 15.2zM21 6h-3.17l-1.24-1.35A1.99 1.99 0 0015.22 4H8.78c-.53 0-1.04.21-1.41.59L6.17 6H3c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-9 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
              </svg>
              Take Photo
            </button>
            
            <button type="button" @click="triggerFileInput" class="btn-option upload-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Upload Photo
            </button>
          </div>
          
          <!-- Hidden file input -->
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            @change="handleFileUpload"
            style="display: none"
          />
          
          <!-- Hidden video for camera -->
          <video 
            ref="videoElement"
            v-show="showCamera"
            autoplay
            playsinline
            class="camera-preview"
          ></video>
          
          <!-- Camera controls -->
          <div v-if="showCamera" class="camera-controls">
            <button type="button" @click="capturePhoto" class="btn-capture">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </button>
            <button type="button" @click="stopCamera" class="btn-cancel">Cancel</button>
          </div>
          
          <!-- Hidden canvas for image processing -->
          <canvas ref="canvasElement" style="display: none"></canvas>
        </div>

        <!-- Bio Input -->
        <div class="form-group">
          <label for="bio" class="form-label">Bio</label>
          <textarea 
            id="bio"
            v-model="form.bio" 
            placeholder="Tell us about yourself..." 
            required 
            class="form-textarea"
            rows="4"
          />
        </div>
        
        <!-- Skills Selection -->
        <div class="form-group">
          <label class="form-label">Select up to 3 Skills</label>
          <div class="skills-grid">
            <label 
              v-for="skill in skills" 
              :key="skill" 
              class="skill-item"
              :class="{ 
                'skill-selected': form.skills.includes(skill),
                'skill-disabled': form.skills.length >= 3 && !form.skills.includes(skill)
              }"
            >
              <input
                type="checkbox"
                :value="skill"
                v-model="form.skills"
                :disabled="form.skills.length >= 3 && !form.skills.includes(skill)"
                class="skill-checkbox"
              />
              <span class="skill-text">{{ skill }}</span>
              <svg v-if="form.skills.includes(skill)" class="skill-check" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </label>
          </div>
          <p class="skills-counter">{{ form.skills.length }}/3 skills selected</p>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" :disabled="!isFormValid" class="btn-submit">
          <svg v-if="isSubmitting" class="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ isSubmitting ? 'Adding User...' : 'Add User' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  image: '',
  bio: '',
  skills: []
})

const showCamera = ref(false)
const isSubmitting = ref(false)
const fileInput = ref(null)
const videoElement = ref(null)
const canvasElement = ref(null)
let mediaStream = null

const { data: skills } = await useFetch('/api/skills')

const isFormValid = computed(() => {
  return form.name.trim() && 
         form.image && 
         form.bio.trim() && 
         form.skills.length > 0 && 
         form.skills.length <= 3
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const openCamera = async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream
      showCamera.value = true
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    alert('Unable to access camera. Please check permissions or try uploading a photo instead.')
  }
}

const capturePhoto = () => {
  if (!videoElement.value || !canvasElement.value) return
  
  const video = videoElement.value
  const canvas = canvasElement.value
  const context = canvas.getContext('2d')
  
  // Set canvas dimensions to match video
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  
  // Draw the video frame to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  // Convert canvas to base64 image
  form.image = canvas.toDataURL('image/jpeg', 0.8)
  
  // Stop camera
  stopCamera()
}

const stopCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop())
    mediaStream = null
  }
  showCamera.value = false
}

const clearImage = () => {
  form.image = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const submit = async () => {
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: form
    })
    navigateTo('/')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Error adding user. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Cleanup on component unmount
onUnmounted(() => {
  stopCamera()
})

// Page meta for mobile optimization
useHead({
  title: 'Add New User',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, user-scalable=no'
    }
  ]
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin: auto;
}

.page-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input,
.form-textarea {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #fafafa;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Image Upload Styles */
.image-preview {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.preview-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-clear {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  transition: all 0.2s ease;
}

.btn-clear:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.image-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn-option {
  padding: 1rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.btn-option:hover {
  border-color: #667eea;
  color: #667eea;
  background: #f0f4ff;
}

.camera-btn:hover {
  border-color: #10b981;
  color: #10b981;
  background: #f0fdf4;
}

.upload-btn:hover {
  border-color: #f59e0b;
  color: #f59e0b;
  background: #fffbeb;
}

/* Camera Styles */
.camera-preview {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin: 1rem 0;
}

.camera-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.btn-capture {
  background: #10b981;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease;
}

.btn-capture:hover {
  background: #059669;
  transform: scale(1.1);
}

.btn-cancel {
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #4b5563;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.skill-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fafafa;
}

.skill-item:hover:not(.skill-disabled) {
  border-color: #667eea;
  background: #f0f4ff;
}

.skill-selected {
  border-color: #10b981;
  background: #f0fdf4;
  color: #065f46;
}

.skill-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.skill-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.skill-text {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
}

.skill-check {
  color: #10b981;
  margin-left: 0.5rem;
}

.skills-counter {
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

/* Submit Button */
.btn-submit {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .container {
    padding: 0.5rem;
  }
  
  .form-card {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  .page-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  .image-options {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .camera-preview {
    max-width: 100%;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .form-card {
    background: #1f2937;
    color: #f3f4f6;
  }
  
  .page-title {
    color: #f3f4f6;
  }
  
  .form-label {
    color: #d1d5db;
  }
  
  .form-input,
  .form-textarea {
    background: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }
  
  .form-input:focus,
  .form-textarea:focus {
    background: #4b5563;
    border-color: #667eea;
  }
}
</style>
