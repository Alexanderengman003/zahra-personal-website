import { useState } from "react";
import { Header } from "@/components/Header";
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
  ArrowDownRight
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock analytics data
  const stats = {
    totalViews: 12847,
    uniqueVisitors: 8293,
    bounceRate: 32.4,
    avgSessionTime: "3m 42s",
    topPages: [
      { page: "Home", views: 4521, percentage: 35.2 },
      { page: "Projects", views: 3187, percentage: 24.8 },
      { page: "Professional", views: 2743, percentage: 21.4 },
      { page: "About", views: 1892, percentage: 14.7 },
      { page: "Contact", views: 504, percentage: 3.9 }
    ],
    deviceTypes: [
      { type: "Desktop", count: 7108, percentage: 55.3 },
      { type: "Mobile", count: 4521, percentage: 35.2 },
      { type: "Tablet", count: 1218, percentage: 9.5 }
    ],
    topCountries: [
      { country: "Sweden", visits: 4521, flag: "🇸🇪" },
      { country: "United States", visits: 2743, flag: "🇺🇸" },
      { country: "Germany", visits: 1892, flag: "🇩🇪" },
      { country: "United Kingdom", visits: 1504, flag: "🇬🇧" },
      { country: "Norway", visits: 1187, flag: "🇳🇴" }
    ],
    recentActivity: [
      { action: "Page view", page: "Projects", time: "2 minutes ago", location: "Stockholm, SE" },
      { action: "Contact form", page: "Contact", time: "15 minutes ago", location: "London, UK" },
      { action: "Download CV", page: "Home", time: "32 minutes ago", location: "Berlin, DE" },
      { action: "Page view", page: "Professional", time: "1 hour ago", location: "Oslo, NO" },
      { action: "Page view", page: "About", time: "2 hours ago", location: "New York, US" }
    ]
  };

  const timeRanges = [
    { value: "1d", label: "24h" },
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "90d", label: "90 days" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-modern">
                Analytics Dashboard
              </h1>
              <p className="mt-2 text-lg text-muted-foreground font-modern">
                Track portfolio performance and visitor insights
              </p>
            </div>
            
            {/* Time Range Selector */}
            <div className="mt-6 sm:mt-0">
              <div className="inline-flex rounded-lg bg-muted p-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    variant={timeRange === range.value ? "default" : "ghost"}
                    size="sm"
                    className="font-modern"
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
                  <span>+12.3% from last period</span>
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
                  <span>+8.1% from last period</span>
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
                  <ArrowDownRight className="h-3 w-3 text-green-500" />
                  <span>-2.4% from last period</span>
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
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span>+15.2% from last period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Pages */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Top Pages</CardTitle>
                <CardDescription className="font-modern">Most viewed pages in the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium font-modern">{page.page}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold font-modern">{page.views.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Types */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Device Types</CardTitle>
                <CardDescription className="font-modern">Visitor device breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.deviceTypes.map((device) => (
                    <div key={device.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {device.type === "Desktop" && <Monitor className="h-4 w-4 text-muted-foreground" />}
                        {device.type === "Mobile" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        {device.type === "Tablet" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
                        <span className="font-medium font-modern">{device.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold font-modern">{device.count.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Countries */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Top Countries</CardTitle>
                <CardDescription className="font-modern">Visitor locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topCountries.map((country) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{country.flag}</span>
                        <span className="font-medium font-modern">{country.country}</span>
                      </div>
                      <div className="font-semibold font-modern">{country.visits.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="font-modern">Recent Activity</CardTitle>
                <CardDescription className="font-modern">Latest visitor interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs font-modern">
                            {activity.action}
                          </Badge>
                          <span className="text-sm font-medium font-modern">{activity.page}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {activity.location} • {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;