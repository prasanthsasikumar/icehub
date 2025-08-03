# ICEHub - Developer Community Platform

A modern developer community platform built with Nuxt.js and Tailwind CSS.

## Features

- 📝 Developer profile creation
- 🖼️ Professional image storage system  
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Fast and scalable

## Image Storage System

### Overview
ICEHub uses a file-based image storage system instead of storing images as base64 in JSON files. This provides:

- **Better Performance**: Faster API responses and page loads
- **Scalability**: Images are served as static files with browser caching
- **Storage Efficiency**: No base64 encoding overhead (~33% size reduction)
- **SEO Friendly**: Proper image URLs for better SEO

### How It Works

1. **Upload**: Users upload images via camera or file selection
2. **Processing**: Images are validated (format, size) and saved to `/public/uploads/`
3. **Storage**: Image URLs (e.g., `/uploads/2025-08-03-uuid.jpg`) are stored in JSON
4. **Serving**: Images are served as static files by Nuxt.js

### File Organization

```
public/uploads/
├── 2025-08-03-abc123-def456.jpg    # Profile images with date prefix
├── 2025-08-03-xyz789-uvw012.png    # Organized by upload date
└── .gitkeep                        # Ensures directory exists in git
```

### Image Specifications

- **Formats**: JPEG, PNG, GIF, WebP
- **Max Size**: 5MB per image
- **Naming**: `YYYY-MM-DD-{uuid}.{ext}` for easy organization
- **Validation**: Server-side format and size validation

### Migration

Existing base64 images can be migrated using:
```bash
node scripts/migrate-images.js
```

## Development

### Setup
```bash
npm install
npm run dev
```

### Adding New Features
- API routes: `server/api/`
- Pages: `pages/`
- Components: `components/`
- Styles: Uses Tailwind CSS with custom configuration

### Environment
- Development: `http://localhost:3000`
- Images: Served from `/public/uploads/`

## Production Considerations

### Image Storage Options

1. **Local Files** (Current - good for small deployments)
   - Pros: Simple, no external dependencies
   - Cons: Not scalable for multiple servers

2. **Cloud Storage** (Recommended for production)
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Cloudinary (with optimization)

3. **CDN Integration**
   - Automatic image optimization
   - Global distribution
   - Better performance

### Security
- File type validation
- Size limits enforced
- UUID-based filenames prevent conflicts
- Uploads directory excluded from git

### Monitoring
- File upload logs in server console
- Error handling for failed uploads
- Graceful degradation if images fail to load

## Tech Stack

- **Framework**: Nuxt.js 3
- **Styling**: Tailwind CSS
- **Image Processing**: Node.js Buffer API
- **File Storage**: Local filesystem
- **UUID Generation**: uuid package
- **Type Safety**: TypeScript
