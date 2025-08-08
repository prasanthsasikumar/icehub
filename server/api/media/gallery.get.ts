interface MediaItem {
  id: string
  title: string
  description: string
  type: string
  isPlaceholder?: boolean
}

export default defineEventHandler(async (event) => {
  try {
    // TODO: Replace these placeholder file IDs with actual Google Drive file IDs
    // To get file IDs from your shared folder:
    // 1. Open each image in Google Drive
    // 2. Right-click and select "Share" or "Get link" 
    // 3. Copy the file ID from URLs like: https://drive.google.com/file/d/FILE_ID_HERE/view
    // 4. Replace the examples below with your actual file IDs
    
    const images: MediaItem[] = [
      // Replace these examples with your actual Google Drive file IDs:
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_1',
      //   title: 'Workshop Setup',
      //   description: 'ICE2025 Workshop venue preparation',
      //   type: 'image'
      // },
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_2', 
      //   title: 'Opening Ceremony',
      //   description: 'Prof. Suranga Nanayakkara opening the workshop',
      //   type: 'image'
      // },
      // {
      //   id: 'YOUR_ACTUAL_FILE_ID_3',
      //   title: 'Team Brainstorming',
      //   description: 'Participants working on AI innovation ideas',
      //   type: 'image'
      // },
      // Add more images here...
    ]
    
    // For demonstration, create placeholder entries since real file IDs aren't added yet
    const placeholderImages: MediaItem[] = [
      {
        id: 'placeholder_1',
        title: 'Workshop Opening',
        description: 'Prof. Suranga Nanayakkara welcoming participants to ICE2025',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_2',
        title: 'Team Formation',
        description: 'Participants forming teams and discussing project ideas',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_3',
        title: 'Mentoring Session',
        description: 'International mentors guiding teams on AI development',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_4',
        title: 'Prototype Development',
        description: 'Teams building their AI innovation prototypes',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_5',
        title: 'Technical Discussion',
        description: 'Deep dive into machine learning algorithms and applications',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_6',
        title: 'Networking Break',
        description: 'Participants networking and sharing experiences',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_7',
        title: 'Demo Preparation',
        description: 'Teams preparing for their final presentations',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_8',
        title: 'Final Presentations',
        description: 'Teams showcasing their AI prototypes to judges',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_9',
        title: 'Awards Ceremony',
        description: 'Recognizing outstanding innovations and achievements',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_10',
        title: 'Group Photo',
        description: 'All ICE2025 participants, mentors, and organizers together',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_11',
        title: 'Workshop Venue',
        description: 'The beautiful venue hosting the ICE2025 workshop',
        type: 'image',
        isPlaceholder: true
      },
      {
        id: 'placeholder_12',
        title: 'Innovation Showcase',
        description: 'Display of all the amazing AI prototypes created',
        type: 'image',
        isPlaceholder: true
      }
    ]
    
    return {
      success: true,
      data: {
        images: images.length > 0 ? images : placeholderImages,
        totalCount: images.length > 0 ? images.length : placeholderImages.length
      }
    }
  } catch (error) {
    console.error('Error fetching media gallery:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch media gallery'
    })
  }
})
