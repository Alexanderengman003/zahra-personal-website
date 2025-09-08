import { useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

// Hook for consistent event tracking throughout the app
export const useTrackEvent = () => {
  const track = useCallback(async (eventType: string, eventData?: any) => {
    try {
      await trackEvent(eventType, eventData);
      console.log('Event tracked:', eventType, eventData);
    } catch (error) {
      console.error('Failed to track event:', eventType, error);
    }
  }, []);

  return { track };
};