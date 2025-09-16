import { useState, useEffect } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { Users, UserCheck, DollarSign, TrendingUp, Plus, Eye, Star, Mail, Phone } from 'lucide-react';
import { mockMembers, mockTrainers, mockPayments } from '../../data/mockData';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface GymOwnerDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function GymOwnerDashboard({ user, onLogout, onNavigate, darkMode, onToggleDarkMode }: GymOwnerDashboardProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gymStats = {
    totalMembers: 245,
    activeTrainers: 8,
    monthlyRevenue: 45200,
    newMembersThisMonth: 23,
    membershipGoal: 300
  };

  const membershipProgress = (gymStats.totalMembers / gymStats.membershipGoal) * 100;

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{user.gym || 'FitnessCenter Pro'}</h1>
              <p className="text-muted-foreground">Your gym dashboard overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gymStats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{gymStats.newMembersThisMonth} this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gymStats.activeTrainers}</div>
                  <p className="text-xs text-muted-foreground">
                    All trainers active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${gymStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2%</div>
                  <p className="text-xs text-muted-foreground">
                    Member growth rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Membership Goal Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Membership Goal Progress</CardTitle>
                <CardDescription>Track your progress towards your membership target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Members</span>
                    <span>{gymStats.totalMembers} / {gymStats.membershipGoal}</span>
                  </div>
                  <Progress value={membershipProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(membershipProgress)}% of goal achieved
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Members */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Members</CardTitle>
                <CardDescription>Latest member registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.membershipType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{new Date(member.joinDate).toLocaleDateString()}</p>
                        <Badge variant="default" className="text-xs">New</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Members</h1>
                <p className="text-muted-foreground">Manage your gym members</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Membership</TableHead>
                      <TableHead>Trainer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">ID: {member.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="text-sm">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-sm">{member.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={member.membershipType === 'Premium' ? 'default' : 'secondary'}>
                            {member.membershipType}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.trainer}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
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

      case 'trainers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Trainers</h1>
                <p className="text-muted-foreground">Manage your gym trainers</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Trainer
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockTrainers.map((trainer) => (
                <Card key={trainer.id}>
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={trainer.avatar} alt={trainer.name} />
                      <AvatarFallback className="text-2xl">
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{trainer.name}</CardTitle>
                    <CardDescription>{trainer.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Experience:</span>
                        <span className="text-sm font-medium">{trainer.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Members:</span>
                        <span className="text-sm font-medium">{trainer.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{trainer.rating}</span>
                        </div>
                      </div>
                      <div className="pt-2 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {trainer.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {trainer.phone}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Payments</h1>
              <p className="text-muted-foreground">Track member payments and subscriptions</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450</div>
                  <p className="text-sm text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,350</div>
                  <p className="text-sm text-muted-foreground">3 pending payments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Overdue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$890</div>
                  <p className="text-sm text-muted-foreground">2 overdue payments</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.member}</TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === 'paid' ? 'default' : 'destructive'}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
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
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Detailed gym performance analytics</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Member Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.4%</div>
                  <p className="text-sm text-muted-foreground">+2.1% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68 min</div>
                  <p className="text-sm text-muted-foreground">+5 min from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-sm text-muted-foreground">Peak hours: 6-8 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Member Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.6⭐</div>
                  <p className="text-sm text-muted-foreground">Based on 89 reviews</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole="gym_owner"
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
          title="Gym Owner Dashboard"
        />
        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2 px-4 pt-2">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>Menu</Button>
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