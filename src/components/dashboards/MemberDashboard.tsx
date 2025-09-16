import { useState } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Dumbbell, 
  Apple, 
  Trophy, 
  Target, 
  Calendar, 
  Clock,
  Flame,
  Award,
  TrendingUp,
  CreditCard,
  Play,
  CheckCircle,
  Users,
  Star,
  ArrowLeft
} from "lucide-react";
import { mockWorkouts, mockDietPlans, mockCompetitions, mockLeaderboard, mockPayments, mockActivityData } from "../../data/mockData";
import { ActivityHeatmap } from "../shared/ActivityHeatmap";
import { toast } from 'sonner@2.0.3';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface MemberDashboardProps {
  user: User;
  profileUser?: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBack?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  viewingProfile?: boolean;
  page?: string; // controlled current page from router (e.g. workouts, diet)
}

export function MemberDashboard({ user, profileUser, onLogout, onNavigate, onBack, darkMode, onToggleDarkMode, viewingProfile, page }: MemberDashboardProps) {
  const [currentPage, setCurrentPage] = useState(page || 'dashboard');
  // Sync internal state when controlled page prop changes
  if (page && page !== currentPage) {
    // lightweight sync without useEffect to avoid extra render loop since state change only when different
    setCurrentPage(page);
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Use profileUser data when viewing someone's profile, otherwise use current user
  const displayUser = viewingProfile && profileUser ? profileUser : user;

  const handleStartWorkout = () => {
    toast.success("Workout started! Good luck!");
  };

  const handleLogExercise = () => {
    toast.success("Exercise logged successfully!");
  };

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
                {viewingProfile ? `${displayUser.name}'s fitness journey overview` : "Here's your fitness journey overview"}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">days in a row</p>
                </CardContent>
              </Card>

              <Card className="hover-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </CardContent>
              </Card>

              <Card className="hover-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#2</div>
                  <p className="text-xs text-muted-foreground">in current competition</p>
                </CardContent>
              </Card>

              <Card className="hover-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
                  <Award className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Premium</div>
                  <p className="text-xs text-muted-foreground">Active until Mar 2024</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Workout */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Today's Workout
                </CardTitle>
                <CardDescription>
                  Upper Body Strength - Assigned by{' '}
                  <button 
                    onClick={() => onNavigate('profile-trainer-1')}
                    className="text-primary hover:underline"
                  >
                    Sarah Johnson
                  </button>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Progress</span>
                    <span className="text-sm text-muted-foreground">2 of 4 exercises completed</span>
                  </div>
                  <Progress value={50} className="h-2" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Push-ups - 3x12</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Bench Press - 4x8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">Pull-ups - 3x8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className="text-sm">Shoulder Press - 3x10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button onClick={handleStartWorkout}>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Workout
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Heatmap */}
            <ActivityHeatmap 
              data={mockActivityData}
              title="Workout Activity"
            />

            {/* Active Competition */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Active Competition
                </CardTitle>
                <CardDescription>Weight Loss Competition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your current rank</p>
                    <p className="text-2xl font-bold">#2</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Days remaining</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                  <Button variant="outline" onClick={() => onNavigate('competitions')}>View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'workouts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Workouts</h1>
                <p className="text-muted-foreground">Your assigned workout plans</p>
              </div>
            </div>

            <div className="grid gap-6">
              {mockWorkouts.map((workout) => (
                <Card key={workout.id} className="hover-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{workout.name}</CardTitle>
                        <CardDescription>By {workout.trainer} • {workout.duration} minutes</CardDescription>
                      </div>
                      <Button onClick={handleStartWorkout}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Workout
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.sets} sets × {exercise.reps} reps
                              {exercise.weight !== "bodyweight" && ` @ ${exercise.weight}`}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleLogExercise}>Log</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'diet':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">My Diet Plan</h1>
              <p className="text-muted-foreground">Your personalized nutrition plan</p>
            </div>

            {mockDietPlans.map((plan) => (
              <Card key={plan.id} className="hover-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    {plan.name}
                  </CardTitle>
                  <CardDescription>Created by {plan.trainer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.calories}</div>
                      <p className="text-sm text-muted-foreground">Calories</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.protein}g</div>
                      <p className="text-sm text-muted-foreground">Protein</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.carbs}g</div>
                      <p className="text-sm text-muted-foreground">Carbs</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{plan.fat}g</div>
                      <p className="text-sm text-muted-foreground">Fat</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plan.meals.map((meal, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{meal.name}</h3>
                          <span className="text-sm text-muted-foreground">{meal.calories} cal</span>
                        </div>
                        <div className="space-y-1">
                          {meal.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="text-sm text-muted-foreground">
                              • {food}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Payment History</h1>
              <p className="text-muted-foreground">Your membership payments and billing</p>
            </div>

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Current Membership</CardTitle>
                <CardDescription>Premium Monthly Plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">$99.00</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <div>
                    <Badge variant="default">Active</Badge>
                    <p className="text-sm text-muted-foreground mt-1">Next payment: Feb 15, 2024</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden sm:table-cell">Method</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {mockPayments.filter(p => p.member === "Mike Davis").map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell className="hidden sm:table-cell">{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "paid" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Member Dashboard</h1>
            <p className="text-muted-foreground">Select a view from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole="member"
        currentPage={currentPage}
        onNavigate={(page) => {
          // Pages to be routed: competitions, leaderboard, media, workouts, diet, payments
          if (["competitions","leaderboard","media","workouts","diet","payments"].includes(page)) {
            onNavigate(page);
            return;
          }
          setCurrentPage(page);
        }}
        userName={user.name}
        userAvatar={user.avatar}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Header 
          user={user}
          onLogout={onLogout}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
          title={viewingProfile ? `${displayUser.name}'s Dashboard` : "Member Dashboard"}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
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