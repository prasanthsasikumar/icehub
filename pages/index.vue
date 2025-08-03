<template>
  <div class="devpost-page">
    <!-- Top Navigation -->
    <nav class="top-nav">
      <div class="nav-container">
        <div class="nav-left">
          <h1 class="nav-logo">DevDirectory</h1>
        </div>
        <div class="nav-right">
          <NuxtLink to="/new" class="nav-button">
            Join community
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <h1 class="hero-title">The home for developers</h1>
        <p class="hero-subtitle">Where organizations and developers come together to build, inspire, and innovate.</p>
        
        <div class="hero-actions">
          <NuxtLink to="/new" class="hero-btn hero-btn-primary">Join community</NuxtLink>
          <button class="hero-btn hero-btn-secondary">Browse developers</button>
        </div>

        <!-- Stats Section -->
        <div class="trusted-section" v-if="users && users.length > 0">
          <p class="trusted-label">TRUSTED BY DEVELOPERS WORLDWIDE</p>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ users.length }}</span>
              <span class="stat-label">Developers</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalSkills }}</span>
              <span class="stat-label">Skills</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-container">
        <!-- Empty State -->
        <div v-if="!users || users.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 class="empty-title">No developers yet</h2>
          <p class="empty-description">Be the first to join our developer community and showcase your skills!</p>
          <NuxtLink to="/new" class="empty-cta-button">Get Started</NuxtLink>
        </div>

        <!-- Developers Section -->
        <div v-else>
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">Developers for you</h2>
              <NuxtLink to="/developers" class="section-link">View all developers</NuxtLink>
            </div>

            <div class="developers-grid">
              <div v-for="user in users" :key="user.name" class="developer-card">
                <div class="card-content">
                  <div class="developer-header">
                    <div class="developer-avatar">
                      <img :src="user.image" :alt="`${user.name}'s avatar`" />
                    </div>
                    <div class="developer-info">
                      <h3 class="developer-name">{{ user.name }}</h3>
                      <p class="developer-bio">{{ user.bio }}</p>
                    </div>
                  </div>

                  <div class="skills-section">
                    <div class="skills-list">
                      <span 
                        v-for="skill in user.skills.slice(0, 6)" 
                        :key="skill" 
                        class="skill-tag"
                      >
                        {{ skill }}
                      </span>
                      <span v-if="user.skills.length > 6" class="skill-more">
                        +{{ user.skills.length - 6 }} more
                      </span>
                    </div>
                  </div>

                  <div class="card-actions">
                    <button class="action-btn action-btn-secondary">View Profile</button>
                    <button class="action-btn action-btn-primary">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Popular Skills Section -->
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">Top developer skills</h2>
            </div>
            
            <div class="skills-table">
              <div class="skills-table-header">
                <div class="table-col">Rank</div>
                <div class="table-col">Skill</div>
                <div class="table-col">Developers</div>
              </div>
              <div class="skills-table-body">
                <div v-for="(skill, index) in topSkills" :key="skill.name" class="table-row">
                  <div class="table-col rank">{{ index + 1 }}.</div>
                  <div class="table-col skill-name">{{ skill.name }}</div>
                  <div class="table-col count">{{ skill.count }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { data: users } = await useFetch('/api/users')

// Computed properties
const totalSkills = computed(() => {
  if (!users.value) return 0
  const allSkills = users.value.flatMap(user => user.skills)
  return new Set(allSkills).size
})

const topSkills = computed(() => {
  if (!users.value) return []
  
  const skillCounts = {}
  users.value.forEach(user => {
    user.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1
    })
  })
  
  return Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

// Page meta
useHead({
  title: 'DevDirectory - The home for developers',
  meta: [
    {
      name: 'description',
      content: 'Where organizations and developers come together to build, inspire, and innovate. Browse talented professionals and their skills.'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ]
})
</script>

<style scoped>
/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

.devpost-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  min-height: 100vh;
}

/* Navigation */
.top-nav {
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.nav-logo {
  font-size: 24px;
  font-weight: 700;
  color: #0d7ae4;
  margin: 0;
}

.nav-button {
  background: #0d7ae4;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background: #0969da;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 80px 0 120px;
  text-align: center;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 52px;
  font-weight: 700;
  color: #333;
  margin: 0 0 24px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  color: #666;
  margin: 0 0 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
}

.hero-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero-btn-primary {
  background: #0d7ae4;
  color: white;
}

.hero-btn-primary:hover {
  background: #0969da;
  transform: translateY(-1px);
}

.hero-btn-secondary {
  background: white;
  color: #0d7ae4;
  border: 1px solid #0d7ae4;
}

.hero-btn-secondary:hover {
  background: #f8f9fa;
}

/* Trusted Section */
.trusted-section {
  margin-top: 60px;
}

.trusted-label {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 24px;
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #0d7ae4;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Main Content */
.main-content {
  padding: 60px 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  margin-bottom: 24px;
  color: #9ca3af;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.empty-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
}

.empty-cta-button {
  background: #0d7ae4;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition: background-color 0.2s;
}

.empty-cta-button:hover {
  background: #0969da;
}

/* Section Styles */
.section {
  margin-bottom: 80px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.section-link {
  color: #0d7ae4;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.section-link:hover {
  text-decoration: underline;
}

/* Developers Grid */
.developers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.developer-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
}

.developer-card:hover {
  border-color: #0d7ae4;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 122, 228, 0.1);
}

.card-content {
  padding: 24px;
}

.developer-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.developer-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
}

.developer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.developer-info {
  flex: 1;
}

.developer-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px;
}

.developer-bio {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

/* Skills */
.skills-section {
  margin-bottom: 24px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #e9ecef;
}

.skill-more {
  color: #666;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 0;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}

.action-btn-primary {
  background: #0d7ae4;
  color: white;
}

.action-btn-primary:hover {
  background: #0969da;
}

.action-btn-secondary {
  background: white;
  color: #666;
  border: 1px solid #e9ecef;
}

.action-btn-secondary:hover {
  background: #f8f9fa;
  border-color: #dee2e6;
}

/* Skills Table */
.skills-table {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.skills-table-header {
  background: #f8f9fa;
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  gap: 24px;
  font-weight: 600;
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.skills-table-body {
  padding: 0;
}

.table-row {
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  gap: 24px;
  border-bottom: 1px solid #f1f3f4;
  transition: background-color 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-col {
  display: flex;
  align-items: center;
}

.rank {
  font-weight: 600;
  color: #666;
}

.skill-name {
  font-weight: 500;
  color: #333;
}

.count {
  color: #666;
  justify-content: flex-end;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    gap: 30px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .developers-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-table-header,
  .table-row {
    grid-template-columns: 60px 1fr 80px;
    gap: 16px;
    padding: 12px 16px;
  }
  
  .nav-container {
    padding: 0 16px;
  }
  
  .hero-container,
  .content-container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 60px 0 80px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .action-btn {
    text-align: center;
  }
}
</style>
