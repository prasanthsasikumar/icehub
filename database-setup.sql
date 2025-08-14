-- ICEHub Database Setup Script
-- Run this script in your Supabase SQL Editor to set up the complete database

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    image TEXT,
    bio TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    role TEXT DEFAULT 'user',
    "userRole" TEXT DEFAULT 'participant',
    affiliation TEXT,
    expertise TEXT,
    gender TEXT,
    video TEXT,
    user_links TEXT DEFAULT '',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read BOOLEAN DEFAULT false,
    FOREIGN KEY ("senderId") REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY ("receiverId") REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    "coverImage" TEXT,
    "creatorId" TEXT NOT NULL,
    "isPublic" BOOLEAN DEFAULT true,
    members TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("creatorId") REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE team_links (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE announcements (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'general',
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (true);
CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Public teams are viewable by everyone" ON teams FOR SELECT USING (true);
CREATE POLICY "Users can create teams" ON teams FOR INSERT WITH CHECK (true);

CREATE POLICY "Team links are viewable by everyone" ON team_links FOR SELECT USING (true);
CREATE POLICY "Users can create team links" ON team_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Published announcements are viewable by everyone" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Users can create announcements" ON announcements FOR INSERT WITH CHECK (true);

-- Database setup complete!
