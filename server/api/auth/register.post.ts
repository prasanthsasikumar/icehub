import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { Database } from '../../utils/supabase'
import { uploadImage, getDefaultUserImage } from '../../utils/image'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const body = await readBody(event)
  const { name, email, password, bio, skills, image, userRole, affiliation, gender } = body

  console.log('Registration request received:', {
    name,
    email,
    hasImage: !!image,
    imageUrl: image,
    userRole,
    affiliation,
    gender,
    bio: bio?.substring(0, 50) + (bio?.length > 50 ? '...' : ''),
    skillsCount: skills?.length || 0
  })

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, email, and password are required'
    })
  }

  try {
    // Check if user already exists
    const existingUser = await Database.getUserByEmail(email)
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'User with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Handle image upload if provided
    let imageUrl = getDefaultUserImage()
    if (image) {
      if (image.startsWith('data:image/')) {
        console.log('Processing base64 image upload for registration...')
        try {
          // If image is provided as base64, upload it
          const uploadResult = await uploadImage(image)
          console.log('Image upload result:', uploadResult)
          if (uploadResult.success && uploadResult.url) {
            imageUrl = uploadResult.url
            console.log('Image URL set to:', imageUrl)
          }
        } catch (uploadError) {
          console.error('Error during image upload:', uploadError)
        }
      } else if (image.startsWith('/uploads/') || image.startsWith('http')) {
        // Image is already uploaded (from ImageUpload component)
        imageUrl = image
        console.log('Using pre-uploaded image:', imageUrl)
      }
    } else {
      console.log('No image provided, using default')
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      bio: bio || '',
      skills: skills || [],
      role: 'user',
      userRole: userRole || 'developer',
      affiliation: affiliation || '',
      gender: gender || '',
      createdAt: new Date().toISOString()
    }

    const createdUser = await Database.createUser(newUser)

    console.log('User created with image:', {
      name: createdUser.name,
      imageUrl: createdUser.image,
      isDefault: createdUser.image?.includes('default')
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: createdUser.id, 
        email: createdUser.email, 
        name: createdUser.name,
        role: createdUser.role,
        userRole: createdUser.userRole || 'developer'  // Default to developer if not set
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = createdUser
    return {
      success: true,
      user: userWithoutPassword,
      token
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
