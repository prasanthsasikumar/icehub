// Utility function to get default user image
export const getDefaultUserImage = () => {
  return '/uploads/default/user-avatar.svg'
}

// Function to ensure user has a valid image
export const ensureUserImage = (userImage: string | null | undefined) => {
  if (!userImage || userImage.includes('via.placeholder.com')) {
    return getDefaultUserImage()
  }
  return userImage
}
