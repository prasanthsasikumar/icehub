-- ICEHub complete database schema
-- Run this in Supabase SQL Editor before importing seed-data.sql

CREATE TABLE IF NOT EXISTS users (
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

CREATE TABLE IF NOT EXISTS teams (
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

CREATE TABLE IF NOT EXISTS messages (
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

CREATE TABLE IF NOT EXISTS team_links (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    created_by TEXT,
    content TEXT,
    title TEXT,
    url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_chats (
    id TEXT PRIMARY KEY,
    team_id TEXT,
    created_by TEXT,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS team_images (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    created_by TEXT,
    image_url TEXT NOT NULL,
    filename TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS announcements (
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

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies (permissive for workshop app; tighten for production)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users are viewable by everyone') THEN
    CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can insert their own profile') THEN
    CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can view their own messages') THEN
    CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Users can send messages') THEN
    CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'teams' AND policyname = 'Public teams are viewable by everyone') THEN
    CREATE POLICY "Public teams are viewable by everyone" ON teams FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'teams' AND policyname = 'Users can create teams') THEN
    CREATE POLICY "Users can create teams" ON teams FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_links' AND policyname = 'Team links are viewable by everyone') THEN
    CREATE POLICY "Team links are viewable by everyone" ON team_links FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_links' AND policyname = 'Users can create team links') THEN
    CREATE POLICY "Users can create team links" ON team_links FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_chats' AND policyname = 'Team chats are viewable by everyone') THEN
    CREATE POLICY "Team chats are viewable by everyone" ON team_chats FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_chats' AND policyname = 'Users can create team chats') THEN
    CREATE POLICY "Users can create team chats" ON team_chats FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_images' AND policyname = 'Team images are viewable by everyone') THEN
    CREATE POLICY "Team images are viewable by everyone" ON team_images FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'team_images' AND policyname = 'Users can create team images') THEN
    CREATE POLICY "Users can create team images" ON team_images FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'announcements' AND policyname = 'Published announcements are viewable by everyone') THEN
    CREATE POLICY "Published announcements are viewable by everyone" ON announcements FOR SELECT USING (is_published = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'announcements' AND policyname = 'Users can create announcements') THEN
    CREATE POLICY "Users can create announcements" ON announcements FOR INSERT WITH CHECK (true);
  END IF;
END $$;
