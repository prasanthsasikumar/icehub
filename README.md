# ICEHub - Workshop Collaboration Platform

A modern, full-stack web application built with Nuxt 3 for managing workshop participants, teams, and real-time collaboration.

## ✨ Features

### Core Features
- **👤 User Management**: Complete authentication system with role-based access (participants, mentors, admins)
- **👥 Team Collaboration**: Create and manage teams with links, images, and member management
- **💬 Real-time Chat**: Direct messaging between participants and mentors with WebSocket support
- **📢 Announcements**: Admin-managed announcement system with different priority levels
- **🎯 Skills Tracking**: Advanced skill categorization and expertise matching

### Interactive Features
- **🏢 3D Venue Viewer**: Interactive 3D visualization of workshop venues using Three.js
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **🔍 Advanced Search**: Find participants by skills, expertise, or team affiliations
- **📊 Analytics Dashboard**: Comprehensive admin panel with user and team statistics

### Technical Features
- **🔒 Secure Authentication**: JWT-based auth with Row Level Security
- **📤 File Upload**: Image upload with Google Drive integration support
- **⚡ Real-time Updates**: WebSocket integration for instant messaging
- **🎨 Modern UI**: Beautiful, accessible interface with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS with custom components
- **3D Graphics**: Three.js with GLTFLoader for venue visualization
- **Backend**: Nuxt server API routes with middleware
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Custom JWT-based auth system
- **Real-time**: WebSocket integration with fallback polling
- **File Storage**: Local upload with optional Vercel Blob integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd icehub
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment setup:**
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret (use a secure random string)
JWT_SECRET=your_secure_random_jwt_secret

# Optional: Enhanced file uploads
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

4. **Database setup:**
```bash
# In your Supabase SQL Editor, run:
#   database/schema.sql   (tables + policies)
#   database/seed-data.sql (data, after running npm run db:export)
```

To export live Supabase data into the repo for sharing, see `database/README.md`.

5. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📊 Database Setup

The application uses a single, comprehensive SQL script for complete database setup:

1. Open your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy the entire contents of `database-setup.sql`
4. Execute the script

This creates:
- ✅ All required tables with proper relationships
- ✅ Optimized indexes for performance
- ✅ Row Level Security policies
- ✅ Database functions and triggers
- ✅ Proper constraints and data validation

## 👥 User Roles & Permissions

### Participants
- Create and manage personal profiles
- Join and create teams
- Send direct messages
- View announcements
- Access 3D venue viewer

### Mentors
- Enhanced profile display with mentor badge
- All participant permissions
- Mentor-specific UI indicators
- Priority in search results

### Admins
- Full system access
- User management capabilities
- Announcement creation and management
- System backup and analytics
- Team and content moderation

## 🏗 Project Structure

```
icehub/
├── 📁 components/           # Reusable Vue components
│   ├── Announcements.vue    # Announcement display
│   ├── Footer.vue          # Site footer
│   └── ImageUpload.vue     # File upload component
├── 📁 composables/         # Vue composables
│   └── useAuth.ts          # Authentication logic
├── 📁 pages/              # Application routes
│   ├── 📁 admin/          # Admin panel pages
│   ├── 📁 profile/        # User profile pages
│   ├── 📁 teams/          # Team management pages
│   ├── chat.vue           # Messaging interface
│   ├── venue.vue          # 3D venue viewer
│   └── index.vue          # Homepage
├── 📁 server/             # API routes and logic
│   └── 📁 api/            # REST API endpoints
├── 📁 assets/             # Styles and static assets
├── 📁 public/             # Public files and uploads
├── database-setup.sql     # Complete database schema
├── .env.example           # Environment template
└── README.md             # This file
```

## 🔧 Key API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users & Teams
- `GET /api/users` - List all users
- `GET /api/teams` - List all teams
- `POST /api/teams` - Create new team
- `GET /api/teams/[id]` - Get team details

### Messaging
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send new message
- `PUT /api/messages/[id]` - Mark message as read

### Admin
- `GET /api/announcements` - List announcements
- `POST /api/announcements` - Create announcement
- `GET /api/admin/stats` - System statistics

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are configured:
- ✅ Database credentials
- ✅ JWT secrets  
- ✅ File upload tokens
- ✅ CORS settings

### Recommended Platforms
- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] File upload storage configured
- [ ] Domain and SSL configured
- [ ] Error monitoring setup

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side data validation
- **CORS Configuration**: Proper cross-origin settings
- **Rate Limiting**: API endpoint protection
- **File Upload Security**: Safe file handling

## 📱 Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Mobile-friendly interactions
- **Progressive Loading**: Optimized for slower connections
- **Offline Indicators**: Clear connection status
- **Mobile Navigation**: Collapsible menu system

## 🎨 Customization

### Theming
The application uses CSS custom properties for easy theming:
```css
:root {
  --color-primary: #0d7ae4;
  --color-primary-hover: #0969da;
  /* Add your custom colors */
}
```

### Component Styling
All components use Tailwind CSS with custom utility classes defined in `assets/css/main.css`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow Vue 3 Composition API patterns
- Use TypeScript for type safety
- Maintain responsive design principles
- Include error handling
- Write meaningful commit messages

## 📞 Support

For questions, issues, or contributions:
- 📧 Open an issue in this repository
- 📖 Check the documentation in `/docs`
- 💬 Join our community discussions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the ICE2025 Workshop Community**
