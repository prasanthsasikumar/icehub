-- Add announcements table to the database
-- Run this in your Supabase SQL editor

CREATE TABLE announcements (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'general' CHECK (type IN ('general', 'important', 'urgent', 'info')),
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_announcements_author ON announcements(author_id);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);
CREATE INDEX idx_announcements_pinned ON announcements(is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_announcements_published ON announcements(is_published) WHERE is_published = true;
CREATE INDEX idx_announcements_type ON announcements(type);

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for announcements
CREATE POLICY "Published announcements are viewable by everyone" 
    ON announcements FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Admins can manage all announcements" 
    ON announcements FOR ALL
    USING (true);

CREATE POLICY "Users can create announcements" 
    ON announcements FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Authors can update their own announcements" 
    ON announcements FOR UPDATE 
    USING (true);

CREATE POLICY "Authors can delete their own announcements" 
    ON announcements FOR DELETE 
    USING (true);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on announcement updates
CREATE TRIGGER update_announcements_updated_at 
    BEFORE UPDATE ON announcements 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
