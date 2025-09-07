import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

// Hook to automatically track page views
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackCurrentPage = () => {
      const pagePath = location.pathname + location.hash;
      const pageTitle = document.title;
      
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        trackPageView(pagePath, pageTitle);
      }, 100);
    };

    trackCurrentPage();
  }, [location]);
};

// Hook for tracking events
export const useTrackEvent = () => {
  return {
    trackEvent: async (eventType: string, eventData?: any) => {
      const { trackEvent: track } = await import('@/lib/analytics');
      return track(eventType, eventData);
    }
  };
};