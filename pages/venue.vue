<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-200 py-4 border-b border-gray-200">
      <div class="max-w-container mx-auto container-padding">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-primary mb-1">Venue 3D Model</h1>
            <p class="text-gray-600 text-sm">Interactive 3D venue visualization</p>
          </div>
          <NuxtLink 
            to="/" 
            class="hero-btn hero-btn-secondary"
          >
            ← Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 3D Viewer Container -->
    <div class="relative">
      <div 
        ref="viewerContainer" 
        class="w-full h-[80vh] bg-gradient-to-b from-gray-100 to-gray-200"
        @wheel="onWheel"
      />
      
      <!-- Loading Overlay -->
      <div 
        v-if="isLoading" 
        class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90"
      >
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p class="text-lg font-semibold text-gray-700">Loading 3D Model...</p>
          <p class="text-sm text-gray-500">{{ loadingProgress }}%</p>
        </div>
      </div>

      <!-- Error Message -->
      <div 
        v-if="error" 
        class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90"
      >
        <div class="text-center max-w-md">
          <div class="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">Failed to Load 3D Model</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button 
            @click="loadModel"
            class="hero-btn hero-btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Controls Overlay -->
      <div class="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm text-gray-700 p-3 rounded-lg text-sm border border-gray-200 shadow-sm">
        <h4 class="font-semibold mb-2 text-primary">Controls:</h4>
        <div class="space-y-1">
          <p>🖱️ Left click + drag: Rotate</p>
          <p>🖱️ Right click + drag: Pan</p>
          <p>⚪ Mouse wheel: Zoom</p>
          <p>📱 Touch: Pinch to zoom, drag to rotate</p>
        </div>
      </div>

      <!-- Model Info -->
      <div class="absolute bottom-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm text-gray-700 p-3 rounded-lg text-sm border border-gray-200 shadow-sm">
        <div v-if="modelInfo">
          <h4 class="font-semibold mb-2 text-primary">Model Info:</h4>
          <p class="text-gray-600">Triangles: {{ modelInfo.triangles?.toLocaleString() }}</p>
          <p class="text-gray-600">Vertices: {{ modelInfo.vertices?.toLocaleString() }}</p>
          <p class="text-gray-600">Objects: {{ modelInfo.objects }}</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="bg-gradient-to-br from-gray-50 to-gray-200 py-4 border-t border-gray-200">
      <div class="max-w-container mx-auto container-padding">
        <div class="flex flex-wrap gap-3 justify-center">
          <button 
            @click="resetCamera"
            class="hero-btn hero-btn-secondary"
          >
            Reset View
          </button>
          <button 
            @click="toggleWireframe"
            class="hero-btn"
            :class="wireframe ? 'hero-btn-primary' : 'hero-btn-secondary'"
          >
            {{ wireframe ? 'Solid View' : 'Wireframe' }}
          </button>
          <button 
            @click="toggleAutoRotate"
            class="hero-btn"
            :class="autoRotate ? 'hero-btn-primary' : 'hero-btn-secondary'"
          >
            {{ autoRotate ? 'Stop Rotation' : 'Auto Rotate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Meta and SEO
definePageMeta({
  title: 'Venue 3D Model - ICE Hub'
})

useHead({
  title: 'Venue 3D Model - ICE Hub',
  meta: [
    { name: 'description', content: 'Interactive 3D visualization of the event venue' }
  ]
})

// Reactive state
const viewerContainer = ref(null)
const isLoading = ref(true)
const loadingProgress = ref(0)
const error = ref(null)
const wireframe = ref(false)
const autoRotate = ref(false)
const modelInfo = ref(null)

// Three.js objects
let scene, camera, renderer, controls, model, mixer

// Initialize Three.js scene
const initScene = () => {
  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf3f4f6) // Light gray background to match theme

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    viewerContainer.value.clientWidth / viewerContainer.value.clientHeight,
    0.1,
    1000
  )

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputColorSpace = THREE.SRGBColorSpace

  viewerContainer.value.appendChild(renderer.domElement)

  // Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 1
  controls.maxDistance = 100
  controls.autoRotate = false
  controls.autoRotateSpeed = 2

  // Lighting - softer lighting for better integration
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.4)
  pointLight.position.set(-10, 10, -10)
  scene.add(pointLight)
}

// Load GLB model
const loadModel = async () => {
  try {
    isLoading.value = true
    error.value = null
    loadingProgress.value = 0

    const loader = new GLTFLoader()
    
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        '/venue.glb',
        (gltf) => resolve(gltf),
        (progress) => {
          if (progress.lengthComputable) {
            loadingProgress.value = Math.round((progress.loaded / progress.total) * 100)
          }
        },
        (error) => reject(error)
      )
    })

    // Remove existing model if any
    if (model) {
      scene.remove(model)
    }

    model = gltf.scene
    scene.add(model)

    // Enable shadows
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    // Calculate model info
    let triangles = 0
    let vertices = 0
    let objects = 0
    
    model.traverse((child) => {
      if (child.isMesh) {
        objects++
        if (child.geometry) {
          if (child.geometry.index) {
            triangles += child.geometry.index.count / 3
          } else {
            triangles += child.geometry.attributes.position.count / 3
          }
          vertices += child.geometry.attributes.position.count
        }
      }
    })

    modelInfo.value = {
      triangles: Math.round(triangles),
      vertices,
      objects
    }

    // Setup animations if any
    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model)
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play()
      })
    }

    // Center and scale the model
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 10 / maxDim
    model.scale.multiplyScalar(scale)
    
    // Recompute box after scaling
    box.setFromObject(model)
    const newCenter = box.getCenter(new THREE.Vector3())
    model.position.sub(newCenter)

    // Position camera
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)
    controls.target.set(0, 0, 0)
    controls.update()

    isLoading.value = false
  } catch (err) {
    console.error('Error loading GLB model:', err)
    error.value = `Failed to load model: ${err.message}`
    isLoading.value = false
  }
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate)
  
  if (mixer) {
    mixer.update(0.01)
  }
  
  controls.autoRotate = autoRotate.value
  controls.update()
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// Control functions
const resetCamera = () => {
  camera.position.set(5, 5, 5)
  camera.lookAt(0, 0, 0)
  controls.target.set(0, 0, 0)
  controls.update()
}

const toggleWireframe = () => {
  wireframe.value = !wireframe.value
  if (model) {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(material => {
            material.wireframe = wireframe.value
          })
        } else {
          child.material.wireframe = wireframe.value
        }
      }
    })
  }
}

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value
}

// Handle window resize
const handleResize = () => {
  if (!camera || !renderer || !viewerContainer.value) return
  
  camera.aspect = viewerContainer.value.clientWidth / viewerContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(viewerContainer.value.clientWidth, viewerContainer.value.clientHeight)
}

// Prevent default scroll behavior on the 3D viewer
const onWheel = (event) => {
  event.preventDefault()
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  if (viewerContainer.value) {
    initScene()
    await loadModel()
    animate()
    
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (controls) {
    controls.dispose()
  }
  
  // Clean up Three.js objects
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
})
</script>

<style scoped>
/* Use the same styling classes as index page */
.max-w-container {
  max-width: 80rem;
}

.container-padding {
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-padding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-padding {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Consistent theme colors */
.text-primary {
  color: #0d7ae4;
}

.bg-primary {
  background-color: #0d7ae4;
}

.bg-primary-dark {
  background-color: #0969da;
}

.hover\:bg-primary-dark:hover {
  background-color: #0969da;
}

.border-primary {
  border-color: #0d7ae4;
}

.hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

/* Hero button styles matching index page */
.hero-btn {
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  border: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

@media (min-width: 640px) {
  .hero-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}

.hero-btn-primary {
  background-color: #0d7ae4;
  color: white;
}

.hero-btn-primary:hover {
  background-color: #0969da;
}

.hero-btn-secondary {
  background-color: white;
  color: #0d7ae4;
  border: 1px solid #0d7ae4;
}

.hero-btn-secondary:hover {
  background-color: #f9fafb;
}

/* Prevent text selection on 3D viewer */
canvas {
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Smooth backdrop blur effect for overlays */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
