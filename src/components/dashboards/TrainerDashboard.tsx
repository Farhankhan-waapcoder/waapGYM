import { useState } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Users, Dumbbell, Apple, TrendingUp, Plus, Eye, Edit, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import { mockMembers, mockWorkouts, mockDietPlans } from '../../data/mockData';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface TrainerDashboardProps {
  user: User;
  profileUser?: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBack?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  viewingProfile?: boolean;
}

export function TrainerDashboard({ user, profileUser, onLogout, onNavigate, onBack, darkMode, onToggleDarkMode, viewingProfile }: TrainerDashboardProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Use profileUser data when viewing someone's profile, otherwise use current user
  const displayUser = viewingProfile && profileUser ? profileUser : user;

  const trainerStats = {
    totalMembers: 15,
    activeWorkouts: 8,
    activeDietPlans: 5,
    avgProgress: 78
  };

  const myMembers = mockMembers.filter(member => member.trainer === 'Sarah Johnson');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {viewingProfile ? `${displayUser.name}'s Dashboard` : `Welcome back, ${displayUser.name.split(' ')[0]}!`}
              </h1>
              <p className="text-muted-foreground">
                {viewingProfile ? `${displayUser.name}'s training dashboard overview` : "Your training dashboard overview"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerStats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Workouts</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerStats.activeWorkouts}</div>
                  <p className="text-xs text-muted-foreground">
                    Workout plans assigned
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Diet Plans</CardTitle>
                  <Apple className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerStats.activeDietPlans}</div>
                  <p className="text-xs text-muted-foreground">
                    Active nutrition plans
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerStats.avgProgress}%</div>
                  <p className="text-xs text-muted-foreground">
                    Member goal completion
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Member Activity</CardTitle>
                <CardDescription>Latest updates from your members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Workout streak: {member.workoutStreak} days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">Active</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {member.totalWorkouts} total workouts
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Upcoming sessions and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Personal Training Session</p>
                      <p className="text-sm text-muted-foreground">Mike Davis • Upper Body Strength</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">2:00 PM</p>
                      <p className="text-xs text-muted-foreground">60 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Group Training</p>
                      <p className="text-sm text-muted-foreground">HIIT Class • 8 participants</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">6:00 PM</p>
                      <p className="text-xs text-muted-foreground">45 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">My Members</h1>
              <p className="text-muted-foreground">Manage and track your assigned members</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.membershipType} Member</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Join Date:</span>
                        <span className="text-sm font-medium">{new Date(member.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Workout Streak:</span>
                        <Badge variant="default">{member.workoutStreak} days</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Workouts:</span>
                        <span className="text-sm font-medium">{member.totalWorkouts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Status:</span>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                      <div className="pt-2 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'workouts':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Workout Plans</h1>
                <p className="text-muted-foreground">Create and manage workout routines</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Workout
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {mockWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{workout.name}</CardTitle>
                        <CardDescription>
                          Duration: {workout.duration} minutes • Created: {new Date(workout.createdDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{workout.exercises.length} exercises</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Assigned to:</p>
                        <div className="flex flex-wrap gap-1">
                          {workout.assignedTo.map((member, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Exercises:</p>
                        <div className="space-y-1">
                          {workout.exercises.slice(0, 3).map((exercise, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {exercise.name} - {exercise.sets}x{exercise.reps} @ {exercise.weight}
                            </p>
                          ))}
                          {workout.exercises.length > 3 && (
                            <p className="text-sm text-muted-foreground">
                              +{workout.exercises.length - 3} more exercises
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'diet-plans':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Diet Plans</h1>
                <p className="text-muted-foreground">Create and manage nutrition plans</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Diet Plan
              </Button>
            </div>

            <div className="grid gap-6">
              {mockDietPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>
                          Created: {new Date(plan.createdDate).toLocaleDateString()} • Assigned to: {plan.assignedTo.join(', ')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{plan.calories} cal/day</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Macronutrients</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Protein:</span>
                            <span>{plan.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carbs:</span>
                            <span>{plan.carbs}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fat:</span>
                            <span>{plan.fat}g</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Meal Plan</h4>
                        <div className="space-y-1">
                          {plan.meals.map((meal, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{meal.name}:</span>
                              <span className="text-muted-foreground ml-1">{meal.calories} cal</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        Assign to Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Schedule</h1>
              <p className="text-muted-foreground">Manage your training sessions and appointments</p>
            </div>
            
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Sessions</CardTitle>
                    <CardDescription>Your scheduled training sessions for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-sm font-medium">2:00 PM</p>
                            <p className="text-xs text-muted-foreground">60 min</p>
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                            <AvatarFallback>MD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Mike Davis</p>
                            <p className="text-sm text-muted-foreground">Upper Body Strength</p>
                          </div>
                        </div>
                        <Badge variant="default">Confirmed</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-sm font-medium">6:00 PM</p>
                            <p className="text-xs text-muted-foreground">45 min</p>
                          </div>
                          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Group HIIT Class</p>
                            <p className="text-sm text-muted-foreground">8 participants</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Group Session</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="week" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Weekly schedule view will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="month" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Monthly schedule view will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Member Progress</h1>
              <p className="text-muted-foreground">Track your members' fitness journey</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workouts">Workout Progress</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Tracking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Workout Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89%</div>
                      <p className="text-sm text-muted-foreground">Average completion rate</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Diet Adherence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">76%</div>
                      <p className="text-sm text-muted-foreground">Average adherence rate</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Goal Achievement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">65%</div>
                      <p className="text-sm text-muted-foreground">Members reaching goals</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="workouts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Workout Progress by Member</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {member.totalWorkouts} workouts completed
                              </p>
                            </div>
                          </div>
                          <Badge variant="default">{member.workoutStreak} day streak</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nutrition" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Plan Adherence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Nutrition tracking data will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole="trainer"
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        userName={user.name}
        userAvatar={user.avatar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user}
          onLogout={onLogout}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
          title={viewingProfile ? `${displayUser.name}'s Dashboard` : "Trainer Dashboard"}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {viewingProfile && onBack && (
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}