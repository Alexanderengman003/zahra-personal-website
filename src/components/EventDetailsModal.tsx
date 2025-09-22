import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Mail,
  Eye,
  Users2,
  Globe,
  Smartphone,
  Monitor,
  Chrome,
  Loader2,
  RefreshCw,
  Calendar,
  MapPin,
  Clock,
  MousePointer,
  Settings,
  Filter,
  Sun,
  Moon,
  PieChart,
  TrendingUp
} from "lucide-react";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventType: string;
  timeRange: number;
}

interface EventDetail {
  id: string;
  created_at: string;
  event_type: string;
  event_data?: any;
  page_path?: string;
  session_id: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  operating_system?: string;
  referrer?: string;
}

interface EventStats {
  totalEvents: number;
  uniqueCountries: number;
  deviceTypes: Array<{ type: string; count: number; percentage: string }>;
  browsers: Array<{ browser: string; count: number; percentage: string }>;
  eventHistory: EventDetail[];
}

export const EventDetailsModal = ({ isOpen, onClose, eventType, timeRange }: EventDetailsModalProps) => {
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(false);

  const getEventIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes('cv') || normalizedType.includes('download') || normalizedType.includes('resume')) {
      return <Download className="h-5 w-5" />;
    }
    if (normalizedType.includes('contact') || normalizedType.includes('email') || normalizedType.includes('form')) {
      return <Mail className="h-5 w-5" />;
    }
    if (normalizedType.includes('theme')) {
      return <Sun className="h-5 w-5" />;
    }
    if (normalizedType.includes('filter')) {
      return <Filter className="h-5 w-5" />;
    }
    return <MousePointer className="h-5 w-5" />;
  };

  const getDisplayName = (dbEventType: string): string => {
    const displayNames: { [key: string]: string } = {
      'cv_download': 'CV Download',
      'contact_form_submit': 'Contact Form Submit',
      'theme_toggle': 'Theme Toggle',
      'professional_filters_applied': 'Professional Filters Applied',
      'download': 'Download',
      'resume_download': 'Resume Download'
    };
    
    return displayNames[dbEventType] || dbEventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatEventData = (eventData: any, eventType: string): string => {
    if (!eventData) return 'No additional data';
    
    if (typeof eventData === 'string') return eventData;
    
    if (eventType.includes('filter') && eventData.area) {
      const parts = [];
      if (eventData.area && eventData.area !== 'All') parts.push(`Area: ${eventData.area}`);
      if (eventData.technologies?.length) parts.push(`Skills: ${eventData.technologies.join(', ')}`);
      if (eventData.software?.length) parts.push(`Software: ${eventData.software.join(', ')}`);
      return parts.join(' | ') || 'No filters applied';
    }
    
    return JSON.stringify(eventData);
  };

  const fetchEventDetails = async () => {
    if (!eventType) return;
    
    setLoading(true);
    try {
      // Calculate date filter
      const shouldFilterByDate = timeRange > 0;
      const startDate = new Date();
      if (shouldFilterByDate) {
        startDate.setDate(startDate.getDate() - timeRange);
      }

      // Get events data
      let eventsQuery = supabase
        .from('analytics_events')
        .select('*')
        .eq('event_type', eventType);
      
      if (shouldFilterByDate) {
        eventsQuery = eventsQuery.gte('created_at', startDate.toISOString());
      }
      
      const { data: events, error: eventsError } = await eventsQuery;
      if (eventsError) throw eventsError;

      // Get session data for additional context
      const sessionIds = [...new Set(events?.map(e => e.session_id) || [])];
      const { data: sessions, error: sessionsError } = await supabase
        .from('analytics_sessions')
        .select('*')
        .in('session_id', sessionIds);
      
      if (sessionsError) throw sessionsError;

      // Create session lookup
      const sessionLookup = sessions?.reduce((acc: any, session) => {
        acc[session.session_id] = session;
        return acc;
      }, {}) || {};

      // Combine event data with session data
      const enrichedEvents: EventDetail[] = events?.map(event => ({
        ...event,
        country: sessionLookup[event.session_id]?.country,
        city: sessionLookup[event.session_id]?.city,
        device_type: sessionLookup[event.session_id]?.device_type,
        browser: sessionLookup[event.session_id]?.browser,
        operating_system: sessionLookup[event.session_id]?.operating_system,
        referrer: sessionLookup[event.session_id]?.referrer,
      })) || [];

      // Calculate statistics
      const totalEvents = enrichedEvents.length;
      const uniqueCountries = new Set(enrichedEvents.map(e => e.country).filter(Boolean)).size;

      // Device type statistics
      const deviceStats = enrichedEvents.reduce((acc: any, event) => {
        const device = event.device_type || 'Unknown';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {});

      const deviceTypes = Object.entries(deviceStats)
        .map(([type, count]) => ({
          type: type.charAt(0).toUpperCase() + type.slice(1),
          count: count as number,
          percentage: totalEvents > 0 ? (((count as number) / totalEvents) * 100).toFixed(1) : '0'
        }))
        .sort((a, b) => b.count - a.count);

      // Browser statistics
      const browserStats = enrichedEvents.reduce((acc: any, event) => {
        const browser = event.browser || 'Unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      }, {});

      const browsers = Object.entries(browserStats)
        .map(([browser, count]) => ({
          browser,
          count: count as number,
          percentage: totalEvents > 0 ? (((count as number) / totalEvents) * 100).toFixed(1) : '0'
        }))
        .sort((a, b) => b.count - a.count);

      // Sort events by date (newest first)
      const eventHistory = enrichedEvents.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setStats({
        totalEvents,
        uniqueCountries,
        deviceTypes,
        browsers,
        eventHistory
      });

    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && eventType) {
      fetchEventDetails();
    }
  }, [isOpen, eventType, timeRange]);

  const formatTimeAgo = (date: string): string => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - eventDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-modern">
            {getEventIcon(eventType)}
            {getDisplayName(eventType)} Details
          </DialogTitle>
          <DialogDescription className="font-modern">
            Detailed analytics for this event type
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 font-modern">Loading event details...</span>
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium font-modern flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Total Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-modern">{stats.totalEvents}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium font-modern flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-modern">{stats.uniqueCountries}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium font-modern flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Device Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-modern">{stats.deviceTypes.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium font-modern flex items-center gap-2">
                    <Chrome className="h-4 w-4" />
                    Browsers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-modern">{stats.browsers.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Devices and Browsers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-modern">Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.deviceTypes.map((device) => (
                      <div key={device.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {device.type === "Desktop" && <Monitor className="h-4 w-4 text-muted-foreground" />}
                          {device.type === "Mobile" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                          {device.type === "Tablet" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                          <span className="font-medium font-modern">{device.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold font-modern">{device.count}</div>
                          <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-modern">Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.browsers.map((browser) => (
                      <div key={browser.browser} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Chrome className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium font-modern">{browser.browser}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold font-modern">{browser.count}</div>
                          <div className="text-xs text-muted-foreground">{browser.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event History */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-modern">Event History</CardTitle>
                  <CardDescription className="font-modern">
                    Chronological history of all {getDisplayName(eventType).toLowerCase()} events
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={fetchEventDetails}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto pr-2">
                  {stats.eventHistory.length > 0 ? (
                    <div className="space-y-0 divide-y divide-border/50">
                      {stats.eventHistory.map((event, index) => (
                        <div key={event.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1 min-w-0">
                              {/* Header with badge and event name */}
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-xs font-mono px-2 py-1 bg-muted/50">
                                  #{String(stats.eventHistory.length - index).padStart(3, '0')}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  {getEventIcon(event.event_type)}
                                  <span className="text-sm font-semibold font-modern text-foreground">
                                    {getDisplayName(event.event_type)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Metadata row */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3 w-3 text-primary/60" />
                                  <span className="font-medium">{formatTimeAgo(event.created_at)}</span>
                                </div>
                                {event.country && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="h-3 w-3 text-primary/60" />
                                    <span className="truncate">
                                      {event.city ? `${event.city}, ${event.country}` : event.country}
                                    </span>
                                  </div>
                                )}
                                {event.device_type && (
                                  <div className="flex items-center gap-1.5">
                                    {event.device_type === 'desktop' ? 
                                      <Monitor className="h-3 w-3 text-primary/60" /> : 
                                      <Smartphone className="h-3 w-3 text-primary/60" />
                                    }
                                    <span className="capitalize">{event.device_type}</span>
                                  </div>
                                )}
                                {event.browser && (
                                  <div className="flex items-center gap-1.5">
                                    <Chrome className="h-3 w-3 text-primary/60" />
                                    <span>{event.browser}</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Additional details */}
                              {(event.page_path || event.event_data) && (
                                <div className="space-y-1 pt-1">
                                  {event.page_path && (
                                    <div className="text-xs bg-muted/30 rounded px-2 py-1">
                                      <span className="text-muted-foreground">Page:</span>
                                      <span className="font-mono ml-1 text-foreground">{event.page_path}</span>
                                    </div>
                                  )}
                                  
                                  {event.event_data && (
                                    <div className="text-xs bg-muted/30 rounded px-2 py-1">
                                      <span className="text-muted-foreground">Data:</span>
                                      <span className="font-mono ml-1 text-foreground break-all">
                                        {formatEventData(event.event_data, event.event_type)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Status indicator */}
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MousePointer className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No events found for this time period</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <MousePointer className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No event data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};