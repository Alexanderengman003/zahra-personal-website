-- Fix: Add a restrictive policy for admin_users table to resolve RLS warning
-- Only allow the edge function service role to read admin data for authentication
CREATE POLICY "Service role can read for authentication" 
ON admin_users 
FOR SELECT 
USING (auth.role() = 'service_role');