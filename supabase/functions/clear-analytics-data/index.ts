import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting analytics data cleanup...');

    // Clear all analytics data in the correct order (due to foreign key constraints)
    const deleteEvents = await supabase
      .from('analytics_events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    const deletePageViews = await supabase
      .from('analytics_page_views')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    const deleteSessions = await supabase
      .from('analytics_sessions')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    // Check for errors
    if (deleteEvents.error) {
      console.error('Error deleting analytics_events:', deleteEvents.error);
      throw deleteEvents.error;
    }
    
    if (deletePageViews.error) {
      console.error('Error deleting analytics_page_views:', deletePageViews.error);
      throw deletePageViews.error;
    }
    
    if (deleteSessions.error) {
      console.error('Error deleting analytics_sessions:', deleteSessions.error);
      throw deleteSessions.error;
    }

    console.log('Analytics data cleanup completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'All analytics data has been cleared successfully',
        cleared: {
          events: 'analytics_events table cleared',
          pageViews: 'analytics_page_views table cleared',
          sessions: 'analytics_sessions table cleared'
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in clear-analytics-data function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to clear analytics data',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});