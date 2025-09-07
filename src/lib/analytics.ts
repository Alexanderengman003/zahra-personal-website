import { supabase } from "@/integrations/supabase/client";

// Generate or get session ID from localStorage
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get browser name
const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};

// Get operating system
const getOperatingSystem = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Other';
};

// Get current theme
const getCurrentTheme = (): string => {
  const root = document.documentElement;
  return root.classList.contains('dark') ? 'dark' : 'light';
};

// Track page view
export const trackPageView = async (pagePath: string, pageTitle: string) => {
  try {
    const sessionId = getSessionId();
    
    // First, ensure session exists or create it
    const { data: existingSession } = await supabase
      .from('analytics_sessions')
      .select('id')
      .eq('session_id', sessionId)
      .single();

    if (!existingSession) {
      // Create new session
      await supabase
        .from('analytics_sessions')
        .insert({
          session_id: sessionId,
          device_type: getDeviceType(),
          browser: getBrowser(),
          referrer: document.referrer || null,
        });
    }

    // Track the page view
    await supabase
      .from('analytics_page_views')
      .insert({
        page_path: pagePath,
        page_title: pageTitle,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        device_type: getDeviceType(),
        browser: getBrowser(),
        operating_system: getOperatingSystem(),
        session_id: sessionId,
      });

    // Track theme usage as an event
    await trackEvent('theme_usage', { theme: getCurrentTheme() }, pagePath);

  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track custom events (like contact form submission, CV download)
export const trackEvent = async (eventType: string, eventData?: any, pagePath?: string) => {
  try {
    const sessionId = getSessionId();
    
    await supabase
      .from('analytics_events')
      .insert({
        event_type: eventType,
        event_data: eventData || null,
        session_id: sessionId,
        page_path: pagePath || window.location.pathname,
      });

  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Analytics data fetching functions
export const getAnalyticsStats = async (days: number = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    // Get total page views
    const { data: pageViews, error: pvError } = await supabase
      .from('analytics_page_views')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (pvError) throw pvError;

    // Get unique sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('analytics_sessions')
      .select('*')
      .gte('first_visit_at', startDate.toISOString());

    if (sessionsError) throw sessionsError;

    // Get events for theme tracking
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (eventsError) throw eventsError;

    // Calculate stats
    const totalViews = pageViews?.length || 0;
    const uniqueVisitors = sessions?.length || 0;
    
    // Calculate bounce rate (sessions with only 1 page view)
    const bounceCount = sessions?.filter(session => session.page_views_count === 1).length || 0;
    const bounceRate = uniqueVisitors > 0 ? (bounceCount / uniqueVisitors) * 100 : 0;

    // Calculate average session duration
    const totalDuration = sessions?.reduce((sum, session) => {
      const duration = new Date(session.last_activity_at).getTime() - new Date(session.first_visit_at).getTime();
      return sum + Math.max(0, duration / 1000); // Convert to seconds
    }, 0) || 0;
    const avgSessionTime = uniqueVisitors > 0 ? Math.round(totalDuration / uniqueVisitors) : 0;

    // Top pages
    const pageStats = pageViews?.reduce((acc: any, view) => {
      const page = view.page_path === '/' ? 'Home' : view.page_path.replace('/', '').replace('#', '');
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {}) || {};

    const topPages = Object.entries(pageStats)
      .map(([page, views]) => ({
        page,
        views: views as number,
        percentage: totalViews > 0 ? ((views as number / totalViews) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // Device types
    const deviceStats = sessions?.reduce((acc: any, session) => {
      const device = session.device_type || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {}) || {};

    const deviceTypes = Object.entries(deviceStats)
      .map(([type, count]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        count: count as number,
        percentage: uniqueVisitors > 0 ? (((count as number) / uniqueVisitors) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count);

    // Theme usage stats
    const themeEvents = events?.filter(event => event.event_type === 'theme_usage') || [];
    const themeStats = themeEvents.reduce((acc: any, event) => {
      const theme = (event.event_data as any)?.theme || 'unknown';
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {});

    const themeUsage = Object.entries(themeStats)
      .map(([theme, count]) => ({
        theme: theme.charAt(0).toUpperCase() + theme.slice(1),
        count: count as number,
        percentage: themeEvents.length > 0 ? (((count as number) / themeEvents.length) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count);

    // Daily traffic data for charts
    const dailyTraffic = pageViews?.reduce((acc: any, view) => {
      const date = new Date(view.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {}) || {};

    const trafficData = Object.entries(dailyTraffic)
      .map(([date, views]) => ({
        date,
        views: views as number,
        visitors: sessions?.filter(session => 
          new Date(session.first_visit_at).toISOString().split('T')[0] === date
        ).length || 0
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Recent activity
    const recentActivity = pageViews
      ?.slice(-5)
      .reverse()
      .map(view => ({
        action: 'Page view',
        page: view.page_path === '/' ? 'Home' : view.page_path,
        time: getTimeAgo(new Date(view.created_at)),
        location: 'Unknown' // We'd need IP geolocation for this
      })) || [];

    return {
      totalViews,
      uniqueVisitors,
      bounceRate: Math.round(bounceRate * 10) / 10,
      avgSessionTime: formatDuration(avgSessionTime),
      topPages,
      deviceTypes,
      themeUsage,
      trafficData,
      recentActivity
    };

  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return null;
  }
};

// Helper function to format duration
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

// Helper function to get time ago
const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};