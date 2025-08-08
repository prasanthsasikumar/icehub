<template>
  <footer class="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
    <div class="max-w-container mx-auto container-padding">
      <div class="text-center text-sm text-gray-600">
        Made with vibe coding :) 
        <!-- <a 
          href="https://flowsxr.com" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-primary hover:text-primary-dark transition-colors duration-200 font-medium"
        >
          flowsxr
        </a> -->
      </div>
    </div>
  </footer>
</template>

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

.max-w-container {
  max-width: 1200px;
}

.container-padding {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

@media (min-width: 640px) {
  .container-padding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
