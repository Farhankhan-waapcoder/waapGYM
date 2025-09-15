import { useState } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Trophy, Calendar, Users, Gift, Clock, CheckCircle, PlayCircle, AlertCircle } from 'lucide-react';
import { mockCompetitions } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface CompetitionPageProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function CompetitionPage({ user, onLogout, onNavigate, darkMode, onToggleDarkMode }: CompetitionPageProps) {
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const [joinedCompetitions, setJoinedCompetitions] = useState<number[]>([2]); // Mock: user already joined competition 2
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleJoinCompetition = (competitionId: number) => {
    setJoinedCompetitions([...joinedCompetitions, competitionId]);
    toast.success("Successfully joined the competition!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      completed: "secondary",
      upcoming: "outline"
    };
    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

  const activeCompetitions = mockCompetitions.filter(c => c.status === 'active');
  const upcomingCompetitions = mockCompetitions.filter(c => c.status === 'upcoming');
  const completedCompetitions = mockCompetitions.filter(c => c.status === 'completed');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={user.role as any}
        currentPage="competitions"
        onNavigate={onNavigate}
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
          title="Competitions"
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Competitions</h1>
                <p className="text-muted-foreground">
                  Join competitions and challenge yourself to reach new fitness goals
                </p>
              </div>
              <Button onClick={() => onNavigate('leaderboard')} variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
            </div>

            {/* Competition Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active ({activeCompetitions.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({upcomingCompetitions.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedCompetitions.length})</TabsTrigger>
              </TabsList>

              {/* Active Competitions */}
              <TabsContent value="active" className="space-y-4">
                {activeCompetitions.length === 0 ? (
                  <Card className="hover-card">
                    <CardContent className="flex items-center justify-center py-16">
                      <div className="text-center space-y-4">
                        <Trophy className="h-16 w-16 text-muted-foreground mx-auto" />
                        <div>
                          <h3 className="text-lg font-semibold">No Active Competitions</h3>
                          <p className="text-muted-foreground">Check back soon for new competitions!</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {activeCompetitions.map((competition) => (
                      <Card key={competition.id} className="relative hover-card">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(competition.status)}
                                <CardTitle className="text-xl">{competition.name}</CardTitle>
                              </div>
                              <CardDescription>{competition.description}</CardDescription>
                            </div>
                            {getStatusBadge(competition.status)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Ends {new Date(competition.endDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{competition.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <Gift className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{competition.prize}</span>
                            </div>
                          </div>

                          {/* Progress bar for active competitions */}
                          {competition.status === 'active' && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>65%</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </div>
                          )}

                        <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedCompetition(competition)}>
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{competition.name}</DialogTitle>
                                  <DialogDescription>{competition.description}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="font-medium">Start Date</label>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(competition.startDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">End Date</label>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(competition.endDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="font-medium">Participants</label>
                                      <p className="text-sm text-muted-foreground">{competition.participants}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">Prize</label>
                                      <p className="text-sm text-muted-foreground">{competition.prize}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="font-medium">Rules</label>
                                    <p className="text-sm text-muted-foreground mt-1">{competition.rules}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {joinedCompetitions.includes(competition.id) ? (
                              <Badge variant="default" className="text-xs px-3 py-1">
                                Joined
                              </Badge>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => handleJoinCompetition(competition.id)}
                                disabled={competition.status !== 'active'}
                              >
                                Join Competition
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Upcoming Competitions */}
              <TabsContent value="upcoming" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {upcomingCompetitions.map((competition) => (
                    <Card key={competition.id} className="hover-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(competition.status)}
                              <CardTitle className="text-xl">{competition.name}</CardTitle>
                            </div>
                            <CardDescription>{competition.description}</CardDescription>
                          </div>
                          {getStatusBadge(competition.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Starts {new Date(competition.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Gift className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{competition.prize}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Available Soon
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Completed Competitions */}
              <TabsContent value="completed" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {completedCompetitions.map((competition) => (
                    <Card key={competition.id} className="opacity-80 hover-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(competition.status)}
                              <CardTitle className="text-xl">{competition.name}</CardTitle>
                            </div>
                            <CardDescription>{competition.description}</CardDescription>
                          </div>
                          {getStatusBadge(competition.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Ended {new Date(competition.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{competition.participants} participants</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => onNavigate('leaderboard')}>
                          View Results
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}