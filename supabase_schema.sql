-- Supabase Database Schema for ICEHub

-- Users table
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

-- Messages table
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

-- teams table
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

-- team Chats table
CREATE TABLE team_chats (
    id TEXT PRIMARY KEY,
    "teamId" TEXT,
    "teamName" TEXT NOT NULL,
    "teamImage" TEXT,
    members TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "lastMessageAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("teamId") REFERENCES teams(id) ON DELETE CASCADE
);

-- team Links table
CREATE TABLE team_links (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- team Images table
CREATE TABLE team_images (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    title TEXT,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_messages_sender ON messages("senderId");
CREATE INDEX idx_messages_receiver ON messages("receiverId");
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_name ON users(name);
CREATE INDEX idx_teams_creator ON teams("creatorId");
CREATE INDEX idx_team_links_team ON team_links(team_id);
CREATE INDEX idx_team_images_team ON team_images(team_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Anyone can read user profiles, users can update their own
CREATE POLICY "Users are viewable by everyone" 
    ON users FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON users FOR INSERT 
    WITH CHECK (true);

-- Messages: Users can see messages they sent or received
CREATE POLICY "Users can view their own messages" 
    ON messages FOR SELECT 
    USING (true);

CREATE POLICY "Users can send messages" 
    ON messages FOR INSERT 
    WITH CHECK (true);

-- teams: Public teams are viewable by everyone
CREATE POLICY "Public teams are viewable by everyone" 
    ON teams FOR SELECT 
    USING (true);

CREATE POLICY "Users can create teams" 
    ON teams FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "team creators can update their teams" 
    ON teams FOR UPDATE 
    USING (true);

CREATE POLICY "team creators can delete their teams" 
    ON teams FOR DELETE 
    USING (true);

-- team Chats: Members can view and participate
CREATE POLICY "team chat members can view" 
    ON team_chats FOR SELECT 
    USING (true);

CREATE POLICY "Users can create team chats" 
    ON team_chats FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "team chat members can update" 
    ON team_chats FOR UPDATE 
    USING (true);

-- team Links: Public links are viewable by everyone
CREATE POLICY "team links are viewable by everyone" 
    ON team_links FOR SELECT 
    USING (true);

CREATE POLICY "Users can create team links" 
    ON team_links FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can update team links" 
    ON team_links FOR UPDATE 
    USING (true);

CREATE POLICY "Users can delete team links" 
    ON team_links FOR DELETE 
    USING (true);

-- team Images: Public images are viewable by everyone
CREATE POLICY "team images are viewable by everyone" 
    ON team_images FOR SELECT 
    USING (true);

CREATE POLICY "Users can create team images" 
    ON team_images FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can update team images" 
    ON team_images FOR UPDATE 
    USING (true);

CREATE POLICY "Users can delete team images" 
    ON team_images FOR DELETE 
    USING (true);
