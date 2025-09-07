-- Create analytics tables for tracking real statistics

-- Table for tracking page views
CREATE TABLE public.analytics_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  session_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for tracking user sessions
CREATE TABLE public.analytics_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID UNIQUE NOT NULL,
  first_visit_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_views_count INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  bounce BOOLEAN DEFAULT FALSE,
  country TEXT,
  device_type TEXT,
  browser TEXT,
  referrer TEXT
);

-- Table for tracking specific events (contact form, CV downloads, etc.)
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'contact_form', 'cv_download', 'social_click', etc.
  event_data JSONB,
  session_id UUID,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make these tables public readable)
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for analytics)
CREATE POLICY "Allow public read access to analytics_page_views" 
ON public.analytics_page_views 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to analytics_page_views" 
ON public.analytics_page_views 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read access to analytics_sessions" 
ON public.analytics_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to analytics_sessions" 
ON public.analytics_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to analytics_sessions" 
ON public.analytics_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to analytics_events" 
ON public.analytics_events 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to analytics_events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_analytics_page_views_created_at ON public.analytics_page_views(created_at);
CREATE INDEX idx_analytics_page_views_page_path ON public.analytics_page_views(page_path);
CREATE INDEX idx_analytics_page_views_session_id ON public.analytics_page_views(session_id);
CREATE INDEX idx_analytics_sessions_created_at ON public.analytics_sessions(first_visit_at);
CREATE INDEX idx_analytics_sessions_session_id ON public.analytics_sessions(session_id);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);

-- Function to update session activity
CREATE OR REPLACE FUNCTION public.update_session_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update session last activity and page views count
  UPDATE public.analytics_sessions 
  SET 
    last_activity_at = NEW.created_at,
    page_views_count = page_views_count + 1
  WHERE session_id = NEW.session_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger to automatically update session activity on new page view
CREATE TRIGGER update_session_on_page_view
  AFTER INSERT ON public.analytics_page_views
  FOR EACH ROW
  EXECUTE FUNCTION public.update_session_activity();