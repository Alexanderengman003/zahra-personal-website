-- Clear all analytics data
DELETE FROM analytics_events;
DELETE FROM analytics_page_views;
DELETE FROM analytics_sessions;

-- Reset sequences if needed (optional, for clean slate)
-- Note: This will reset auto-incrementing IDs but UUIDs don't need this