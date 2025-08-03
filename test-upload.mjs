// Test the uploadImage function
import { uploadImage } from './server/utils/image.js'

const testImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

console.log('Testing uploadImage function...')

uploadImage(testImage).then(result => {
  console.log('Upload result:', result)
}).catch(error => {
  console.error('Upload error:', error)
})
