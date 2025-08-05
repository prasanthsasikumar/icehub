-- Migration: Add user_links column to users table
-- Date: 2025-08-05
-- Description: Add user_links column to store up to 5 personal/professional links per user

-- Add the user_links column to the users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_links TEXT DEFAULT '';

-- Add a comment to document the column
COMMENT ON COLUMN users.user_links IS 'JSON string containing array of user links (max 5). Format: [{"label": "Portfolio", "url": "https://..."}]';
