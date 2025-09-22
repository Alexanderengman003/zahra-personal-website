-- Security Fix: Remove public access to admin credentials
DROP POLICY IF EXISTS "Enable read access for authentication" ON admin_users;

-- Security Fix: Restrict analytics data access to authenticated users only
-- Note: We keep INSERT policies for anonymous analytics tracking

-- Update analytics_events table
DROP POLICY IF EXISTS "Enable read access for all users" ON analytics_events;
CREATE POLICY "Enable read access for authenticated users" 
ON analytics_events 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Update analytics_page_views table  
DROP POLICY IF EXISTS "Enable read access for all users" ON analytics_page_views;
CREATE POLICY "Enable read access for authenticated users" 
ON analytics_page_views 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Update analytics_sessions table
DROP POLICY IF EXISTS "Enable read access for all users" ON analytics_sessions;
CREATE POLICY "Enable read access for authenticated users" 
ON analytics_sessions 
FOR SELECT 
USING (auth.role() = 'authenticated');