import { supabase } from "@/integrations/supabase/client";

export const clearAllAnalytics = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('clear-analytics-data', {
      method: 'POST'
    });

    if (error) {
      throw error;
    }

    if (data?.success) {
      console.log('Analytics data cleared successfully:', data);
      return { success: true, message: 'All analytics data has been cleared' };
    } else {
      throw new Error(data?.error || 'Failed to clear analytics data');
    }
  } catch (error) {
    console.error('Error clearing analytics data:', error);
    throw error;
  }
};

// Execute the clear function immediately
clearAllAnalytics()
  .then((result) => {
    console.log('✅ Analytics data cleared successfully:', result);
  })
  .catch((error) => {
    console.error('❌ Failed to clear analytics data:', error);
  });