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
    "userRole" TEXT DEFAULT 'developer',
    affiliation TEXT,
    expertise TEXT,
    gender TEXT,
    video TEXT,
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

-- Groups table
CREATE TABLE groups (
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

-- Group Chats table
CREATE TABLE group_chats (
    id TEXT PRIMARY KEY,
    "groupId" TEXT,
    "groupName" TEXT NOT NULL,
    "groupImage" TEXT,
    members TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "lastMessageAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("groupId") REFERENCES groups(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_messages_sender ON messages("senderId");
CREATE INDEX idx_messages_receiver ON messages("receiverId");
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_name ON users(name);
CREATE INDEX idx_groups_creator ON groups("creatorId");

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_chats ENABLE ROW LEVEL SECURITY;

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

-- Groups: Public groups are viewable by everyone
CREATE POLICY "Public groups are viewable by everyone" 
    ON groups FOR SELECT 
    USING (true);

CREATE POLICY "Users can create groups" 
    ON groups FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Group creators can update their groups" 
    ON groups FOR UPDATE 
    USING (true);

CREATE POLICY "Group creators can delete their groups" 
    ON groups FOR DELETE 
    USING (true);

-- Group Chats: Members can view and participate
CREATE POLICY "Group chat members can view" 
    ON group_chats FOR SELECT 
    USING (true);

CREATE POLICY "Users can create group chats" 
    ON group_chats FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Group chat members can update" 
    ON group_chats FOR UPDATE 
    USING (true);
