-- Add missing tables for team links and images
-- Run this in Supabase SQL Editor

-- Create team_links table
CREATE TABLE team_links (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create team_images table
CREATE TABLE team_images (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL,
    title TEXT,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_team_links_team ON team_links(team_id);
CREATE INDEX idx_team_images_team ON team_images(team_id);

-- Enable Row Level Security
ALTER TABLE team_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_images ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for team_links
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

-- Add RLS policies for team_images
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
