-- Create analytics tables for tracking user behavior

-- Create analytics_sessions table
CREATE TABLE public.analytics_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  page_views_count INTEGER DEFAULT 0,
  first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_page_views table
CREATE TABLE public.analytics_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  session_id TEXT NOT NULL REFERENCES public.analytics_sessions(session_id) ON DELETE CASCADE,
  country TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT NOT NULL REFERENCES public.analytics_sessions(session_id) ON DELETE CASCADE,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (analytics data should be accessible for tracking)
CREATE POLICY "Enable read access for all users" ON public.analytics_sessions FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.analytics_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.analytics_sessions FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON public.analytics_page_views FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.analytics_page_views FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.analytics_events FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.analytics_events FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_analytics_sessions_session_id ON public.analytics_sessions(session_id);
CREATE INDEX idx_analytics_page_views_session_id ON public.analytics_page_views(session_id);
CREATE INDEX idx_analytics_page_views_created_at ON public.analytics_page_views(created_at);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);