import { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Building, Users, CreditCard, TrendingUp, MoreHorizontal, Plus, DollarSign } from "lucide-react";
import { mockGyms, mockAnalytics } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function AdminDashboard({ user, onLogout, onNavigate, darkMode, onToggleDarkMode }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-manage sidebar when resizing between mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // keep it visible on desktop
      } else {
        setSidebarOpen(false); // hide on mobile by default
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Overview of all gyms and platform metrics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Gyms</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.totalGyms}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.totalMembers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+180 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockAnalytics.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{mockAnalytics.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockAnalytics.activeSubscriptions}</div>
                  <p className="text-xs text-muted-foreground">All plans active</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAnalytics.revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Gyms */}
            <Card>
              <CardHeader>
                <CardTitle>Gym Performance</CardTitle>
                <CardDescription>Overview of all registered gyms</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gym</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGyms.map((gym) => (
                      <TableRow key={gym.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={gym.logo} />
                              <AvatarFallback>{gym.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{gym.name}</div>
                              <div className="text-sm text-muted-foreground">{gym.trainers} trainers</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{gym.owner}</TableCell>
                        <TableCell>{gym.location}</TableCell>
                        <TableCell>{gym.members}</TableCell>
                        <TableCell>${gym.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{gym.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'gyms':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Gym Management</h1>
                <p className="text-muted-foreground">Manage all registered gyms</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Gym
              </Button>
            </div>

            <div className="grid gap-6">
              {mockGyms.map((gym) => (
                <Card key={gym.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={gym.logo} />
                          <AvatarFallback>{gym.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{gym.name}</CardTitle>
                          <CardDescription>Owner: {gym.owner} • {gym.location}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{gym.plan}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold">{gym.members}</div>
                        <p className="text-xs text-muted-foreground">Members</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{gym.trainers}</div>
                        <p className="text-xs text-muted-foreground">Trainers</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${gym.revenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Platform performance and insights</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${mockAnalytics.totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">All-time platform revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">+{mockAnalytics.monthlyGrowth}%</div>
                  <p className="text-sm text-muted-foreground">Month-over-month growth</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Revenue per Gym</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${Math.round(mockAnalytics.totalRevenue / mockAnalytics.totalGyms).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly average</p>
                </CardContent>
              </Card>
            </div>

            {/* Gym Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Gym Performance Breakdown</CardTitle>
                <CardDescription>Detailed performance metrics for each gym</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gym Name</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.gymPerformance.map((gym, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{gym.name}</TableCell>
                        <TableCell>{gym.members}</TableCell>
                        <TableCell>${gym.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">+{gym.growth}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={gym.growth > 15 ? "default" : gym.growth > 10 ? "secondary" : "outline"}>
                            {gym.growth > 15 ? "Excellent" : gym.growth > 10 ? "Good" : "Average"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Select a view from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole="admin"
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'media') {
            onNavigate('media');
            return;
          }
          setCurrentPage(page);
        }}
        userName={user.name}
        userAvatar={user.avatar}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={onLogout}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
          title="Admin Dashboard"
        />
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center gap-2 px-4 pt-2">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
            Menu
          </Button>
        </div>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}