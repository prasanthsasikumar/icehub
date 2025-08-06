import { getUserFromRequest } from '../../../server/utils/auth'
import { Database } from '../../utils/supabase'
import { uploadImage } from '../../utils/image'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Check if user is authenticated
  const currentUser = getUserFromRequest(event)
  
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  const { name, bio, skills, image, userRole, affiliation, expertise, gender, video, user_links } = await readBody(event)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required'
    })
  }

  try {
    // Get current user from database
    const existingUser = await Database.getUserById(currentUser.id)
    if (!existingUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // Check if name is already taken by another user
    const userWithSameName = await Database.getUserByName(name)
    if (userWithSameName && userWithSameName.id !== currentUser.id) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Name is already taken'
      })
    }

    // Handle image upload if provided
    let imageUrl = existingUser.image // Keep existing image by default
    if (image && image.startsWith('data:image/')) {
      try {
        // If new image is provided, upload it
        const uploadResult = await uploadImage(image)
        if (uploadResult.success && uploadResult.url) {
          imageUrl = uploadResult.url
        }
      } catch (uploadError) {
        console.error('Error during image upload:', uploadError)
      }
    } else if (image && !image.startsWith('data:image/')) {
      // If image is already a URL, use it as is
      imageUrl = image
    }

    // Process skills - support both old format (string[]) and new format (SkillWithLevel[])
    let processedSkills: any = []
    
    if (Array.isArray(skills)) {
      if (skills.length > 0) {
        // Check if it's the new format with levels
        if (typeof skills[0] === 'object' && 'name' in skills[0] && 'level' in skills[0]) {
          // New format - store full skill objects with levels
          processedSkills = skills
            .filter((skill: any) => 
              skill.name && 
              typeof skill.name === 'string' && 
              skill.level && 
              typeof skill.level === 'number' && 
              skill.level >= 1 && 
              skill.level <= 5
            )
            .map((skill: any) => ({
              name: skill.name.trim(),
              level: skill.level
            }))
        } else {
          // Old format - convert string array to objects with default level 3
          processedSkills = skills
            .filter((skill: any) => typeof skill === 'string' && skill.trim().length > 0)
            .map((skill: any) => ({
              name: skill.trim(),
              level: 3
            }))
        }
      }
    }

    // Process user links - validate and limit to 5
    let processedLinks: string = ''
    
    if (Array.isArray(user_links)) {
      const validLinks = user_links
        .filter((link: any) => 
          link && 
          typeof link === 'object' &&
          link.label && 
          typeof link.label === 'string' && 
          link.label.trim().length > 0 &&
          link.url && 
          typeof link.url === 'string' && 
          link.url.trim().length > 0
        )
        .slice(0, 5) // Limit to 5 links
        .map((link: any) => ({
          label: link.label.trim(),
          url: link.url.trim()
        }))
      
      if (validLinks.length > 0) {
        processedLinks = JSON.stringify(validLinks)
      }
    }

    // Update user in database
    const updatedUser = await Database.updateUser(currentUser.id, {
      name: name,
      bio: bio || '',
      image: imageUrl,
      userRole: userRole || 'participant',
      affiliation: affiliation || '',
      expertise: expertise || '',
      gender: gender || '',
      video: video || '',
      skills: processedSkills,
      user_links: processedLinks
    })

    // Return updated user data (without password)
    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        role: updatedUser.role
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('User update error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
