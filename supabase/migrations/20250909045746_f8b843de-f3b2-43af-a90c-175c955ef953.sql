-- Clear duplicate sessions and start fresh with improved session management
DELETE FROM analytics_events;
DELETE FROM analytics_page_views;
DELETE FROM analytics_sessions;