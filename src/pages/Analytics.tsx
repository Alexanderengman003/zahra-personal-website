import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users2, 
  Eye, 
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Sun,
  Moon,
  Filter,
  Settings
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from "recharts";
import { getAnalyticsStats } from "@/lib/analytics";

const Analytics = () => {
  // Don't track visits to the analytics page itself
  
  const [timeRange, setTimeRange] = useState("7d");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const timeRanges = [
    { value: "1d", label: "24h", days: 1 },
    { value: "7d", label: "7 days", days: 7 },
    { value: "30d", label: "30 days", days: 30 },
    { value: "90d", label: "90 days", days: 90 },
    { value: "180d", label: "6 months", days: 180 },
    { value: "365d", label: "1 year", days: 365 },
    { value: "all", label: "All data", days: 0 }
  ];

  const fetchAnalytics = async (days: number) => {
    setLoading(true);
    try {
      const data = await getAnalyticsStats(days);
      setStats(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const selectedRange = timeRanges.find(range => range.value === timeRange);
    fetchAnalytics(selectedRange?.days || 7);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg font-modern">Loading analytics...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold font-modern mb-4">No Analytics Data Available</h1>
              <p className="text-muted-foreground font-modern">
                Start browsing Zahra's portfolio to generate analytics data.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-modern">
                Zahra's Portfolio Analytics
              </h1>
              <p className="mt-2 text-lg text-muted-foreground font-modern">
                Track visitor insights and engagement with Zahra's portfolio
              </p>
            </div>
            
            {/* Controls */}
            <div className="mt-6 sm:mt-0 flex items-center gap-4">
              <div className="flex flex-wrap gap-2 sm:inline-flex sm:rounded-lg sm:bg-muted sm:p-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  variant={timeRange === range.value ? "default" : "ghost"}
                  size="sm"
                  className="font-modern text-xs sm:text-sm"
                >
                  {range.label}
                </Button>
              ))}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-gradient">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-modern">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-modern">{stats.totalViews.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span>Real-time data</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-modern">Unique Visitors</CardTitle>
                <Users2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-modern">{stats.uniqueVisitors.toLocaleString()}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span>Sessions tracked</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-modern">Bounce Rate</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-modern">{stats.bounceRate}%</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span>Single page visits</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-modern">Avg. Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-modern">{stats.avgSessionTime}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span>Time on site</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Chart */}
          <Card className="card-gradient mb-8">
            <CardHeader>
              <CardTitle className="font-modern">Traffic Overview</CardTitle>
              <CardDescription className="font-modern">Daily page views and unique visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={stats.trafficData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs fill-muted-foreground"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Page Views"
                      connectNulls={true}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Unique Visitors"
                      connectNulls={true}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Interactions */}
          <Card className="card-gradient mb-8">
            <CardHeader>
              <CardTitle className="font-modern">User Interactions</CardTitle>
              <CardDescription className="font-modern">Button clicks, form submissions, and other events ({stats.totalEvents || 0} total)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {stats.topEvents && stats.topEvents.length > 0 ? (
                  stats.topEvents.map((event: any) => (
                    <div key={event.event} className="text-center p-4 rounded-lg bg-card border border-border/50">
                      <div className="font-semibold font-modern text-lg text-primary">{event.count}</div>
                      <div className="text-xs font-medium text-foreground mt-1">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.percentage}%</div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <MousePointer className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No user interactions yet</p>
                    <p className="text-xs mt-1">Button clicks and interactions will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Top Pages */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Top Pages</CardTitle>
                <CardDescription className="font-modern">Most viewed pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    {stats.topPages.slice(0, 10).map((page: any, index: number) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                            {index + 1}
                          </div>
                          <span className="font-medium font-modern text-sm">{page.page}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold font-modern text-sm">{page.views}</div>
                          <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Types */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Device Types</CardTitle>
                <CardDescription className="font-modern">Visitor devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.deviceTypes.map((device: any) => (
                    <div key={device.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {device.type === "Desktop" && <Monitor className="h-4 w-4 text-muted-foreground" />}
                        {device.type === "Mobile" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        {device.type === "Tablet" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        <span className="font-medium font-modern text-sm">{device.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold font-modern text-sm">{device.count}</div>
                        <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Filters Usage */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Filter Usage</CardTitle>
                <CardDescription className="font-modern">Most applied professional experience filters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    {stats.filterUsage && stats.filterUsage.length > 0 ? (
                      stats.filterUsage.slice(0, 10).map((filterItem: any) => (
                        <div key={filterItem.filter} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {filterItem.filter.startsWith("Area:") && <Settings className="h-4 w-4 text-muted-foreground" />}
                            {filterItem.filter.startsWith("Skill:") && <Filter className="h-4 w-4 text-muted-foreground" />}
                            {filterItem.filter.startsWith("Software:") && <Monitor className="h-4 w-4 text-muted-foreground" />}
                            <span className="font-medium font-modern text-sm">{filterItem.filter}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold font-modern text-sm">{filterItem.count}</div>
                            <div className="text-xs text-muted-foreground">{filterItem.percentage}%</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <Filter className="h-6 w-6 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No filter usage data yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Countries and Recent Activity Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Countries */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Top Countries</CardTitle>
                <CardDescription className="font-modern">Visitors by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] overflow-y-auto">
                  <div className="space-y-4">
                    {stats.topCountries && stats.topCountries.length > 0 ? (
                      stats.topCountries.slice(0, 10).map((country: any, index: number) => (
                        <div key={country.country} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-semibold text-primary">{index + 1}</span>
                            </div>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium font-modern text-sm">{country.country}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold font-modern text-sm">{country.visits}</div>
                            <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <Globe className="h-6 w-6 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No location data yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Recent Activity</CardTitle>
                <CardDescription className="font-modern">Latest visitor interactions (100 most recent)</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                  <div className="h-[200px] overflow-y-auto pr-2">
                    <div className="space-y-3">
                      {stats.recentActivity.slice(0, 100).map((activity: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            activity.type === 'event' ? 'bg-green-500' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={activity.type === 'event' ? 'default' : 'secondary'} 
                                className="text-xs font-modern"
                              >
                                {activity.action}
                              </Badge>
                              <span className="text-sm font-medium font-modern truncate">{activity.page}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {activity.type === 'event' ? 'User Interaction' : activity.location} • {activity.time}
                            </div>
                            {activity.data && (
                              <div className="text-xs text-muted-foreground mt-1 opacity-75">
                                {activity.data.source && `Source: ${activity.data.source}`}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No recent activity</p>
                    <p className="text-xs mt-1">Visitor interactions will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;