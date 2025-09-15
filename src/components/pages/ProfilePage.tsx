import { useState } from 'react';
import { Header } from '../layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Award, 
  Dumbbell, 
  Target, 
  Trophy,
  Star,
  Clock,
  Users,
  Activity,
  Flame,
  ArrowLeft
} from "lucide-react";
import { mockMembers, mockTrainers, mockWorkouts, mockDietPlans, mockActivityData } from "../../data/mockData";
import { ActivityHeatmap } from "../shared/ActivityHeatmap";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface ProfilePageProps {
  user: User;
  profileId: number;
  profileType: 'member' | 'trainer';
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ProfilePage({ 
  user, 
  profileId, 
  profileType, 
  onLogout, 
  onNavigate, 
  onBack, 
  darkMode, 
  onToggleDarkMode 
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Find the profile data
  const profileData = profileType === 'member' 
    ? mockMembers.find(m => m.id === profileId)
    : mockTrainers.find(t => t.id === profileId);

  if (!profileData) {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col">
          <Header 
            user={user}
            onLogout={onLogout}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
            title="Profile Not Found"
          />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
              <Button onClick={onBack}>Go Back</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const isOwnProfile = user.id === profileData.id;

  const renderMemberProfile = () => {
    const memberData = profileData as any;
    
    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24">
                <AvatarImage src={memberData.avatar} />
                <AvatarFallback className="text-lg">
                  {memberData.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{memberData.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Member at {memberData.gym || user.gym || "FitnessCenter Pro"}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{memberData.email}</span>
                  </div>
                  {memberData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{memberData.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined {new Date(memberData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant={memberData.status === 'active' ? 'default' : 'secondary'}>
                    {memberData.status}
                  </Badge>
                  <Badge variant="outline">{memberData.membershipType}</Badge>
                  {memberData.trainer && (
                    <Badge variant="outline">Trainer: {memberData.trainer}</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{memberData.workoutStreak}</div>
                  <p className="text-xs text-muted-foreground">days in a row</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{memberData.totalWorkouts}</div>
                  <p className="text-xs text-muted-foreground">completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {Math.floor((new Date().getTime() - new Date(memberData.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                  </div>
                  <p className="text-xs text-muted-foreground">member experience</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest workout sessions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Dumbbell className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Completed Upper Body Strength</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Achieved 10-day workout streak</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Target className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Joined Weight Loss Competition</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityHeatmap 
              data={mockActivityData}
              title={`${memberData.name}'s Workout Activity`}
            />
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Workouts</CardTitle>
                <CardDescription>Current workout plans and routines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWorkouts
                    .filter(workout => workout.assignedTo.includes(memberData.name))
                    .map((workout) => (
                    <div key={workout.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{workout.name}</h3>
                        <Badge variant="outline">{workout.duration} min</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">By {workout.trainer}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {workout.exercises.slice(0, 4).map((exercise, index) => (
                          <div key={index} className="text-sm">
                            • {exercise.name} - {exercise.sets}x{exercise.reps}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-medium">Consistency Champion</p>
                        <p className="text-sm text-muted-foreground">10+ day workout streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">First Competition</p>
                        <p className="text-sm text-muted-foreground">Joined first fitness challenge</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Dumbbell className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Workout Warrior</p>
                        <p className="text-sm text-muted-foreground">Completed 25+ workouts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Goals Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Monthly Workouts</span>
                        <span className="text-sm text-muted-foreground">18/20</span>
                      </div>
                      <Progress value={90} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Weight Loss Goal</span>
                        <span className="text-sm text-muted-foreground">8/10 lbs</span>
                      </div>
                      <Progress value={80} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Strength Improvement</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderTrainerProfile = () => {
    const trainerData = profileData as any;
    
    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24">
                <AvatarImage src={trainerData.avatar} />
                <AvatarFallback className="text-lg">
                  {trainerData.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{trainerData.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Personal Trainer at {user.gym || "FitnessCenter Pro"}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{trainerData.email}</span>
                  </div>
                  {trainerData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trainerData.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{trainerData.experience} experience</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="default">Active Trainer</Badge>
                  <Badge variant="outline">{trainerData.specialization}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{trainerData.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerData.members}</div>
                  <p className="text-xs text-muted-foreground">currently training</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Experience</CardTitle>
                  <Award className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerData.experience.split(' ')[0]}</div>
                  <p className="text-xs text-muted-foreground">years training</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{trainerData.rating}</div>
                  <p className="text-xs text-muted-foreground">out of 5.0</p>
                </CardContent>
              </Card>
            </div>

            {/* Specialization & Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Specialization</h4>
                    <p className="text-muted-foreground">{trainerData.specialization}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground">
                      Certified personal trainer with {trainerData.experience} of experience in {trainerData.specialization.toLowerCase()}. 
                      Passionate about helping clients achieve their fitness goals through personalized training programs and nutrition guidance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Members</CardTitle>
                <CardDescription>Members currently training with {trainerData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMembers
                    .filter(member => member.trainer === trainerData.name)
                    .map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.membershipType} • {member.workoutStreak} day streak
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate(`profile-member-${member.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Created Workouts</CardTitle>
                <CardDescription>Workout plans designed by {trainerData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWorkouts
                    .filter(workout => workout.trainer === trainerData.name)
                    .map((workout) => (
                    <div key={workout.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{workout.name}</h3>
                        <Badge variant="outline">{workout.duration} min</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Assigned to {workout.assignedTo.length} member(s)
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {workout.exercises.slice(0, 4).map((exercise, index) => (
                          <div key={index} className="text-sm">
                            • {exercise.name} - {exercise.sets}x{exercise.reps}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expertise" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-medium">NASM Certified Personal Trainer</p>
                        <p className="text-sm text-muted-foreground">National Academy of Sports Medicine</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Nutrition Specialist</p>
                        <p className="text-sm text-muted-foreground">Precision Nutrition Level 1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Strength & Conditioning</p>
                        <p className="text-sm text-muted-foreground">NSCA Certified</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Strength Training</Badge>
                    <Badge variant="outline">Weight Loss</Badge>
                    <Badge variant="outline">Muscle Building</Badge>
                    <Badge variant="outline">Nutrition Planning</Badge>
                    <Badge variant="outline">Functional Training</Badge>
                    <Badge variant="outline">Injury Prevention</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={user}
          onLogout={onLogout}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
          title={profileType === 'member' ? 'Member Profile' : 'Trainer Profile'}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {profileType === 'member' ? renderMemberProfile() : renderTrainerProfile()}
          </div>
        </main>
      </div>
    </div>
  );
}