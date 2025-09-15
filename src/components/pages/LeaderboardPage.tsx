import { useState } from 'react';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Trophy, Medal, Crown, Star, TrendingUp, Calendar, Filter } from 'lucide-react';
import { mockLeaderboard, mockCompetitions } from '../../data/mockData';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  gym?: string;
}

interface LeaderboardPageProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function LeaderboardPage({ user, onLogout, onNavigate, darkMode, onToggleDarkMode }: LeaderboardPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedCompetition, setSelectedCompetition] = useState('weight-loss');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">Champion</Badge>;
    if (rank <= 3) return <Badge variant="secondary">Top 3</Badge>;
    if (rank <= 10) return <Badge variant="outline">Top 10</Badge>;
    return null;
  };

  // Mock data for different time periods
  const getLeaderboardData = () => {
    return mockLeaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      improvement: Math.floor(Math.random() * 20) + 1 // Mock improvement data
    }));
  };

  const topPerformers = getLeaderboardData().slice(0, 3);
  const allPerformers = getLeaderboardData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={user.role as any}
        currentPage="leaderboard"
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
          title="Leaderboard"
          onMenuToggle={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Leaderboard</h1>
                <p className="text-muted-foreground">
                  See how you rank against other members in your gym
                </p>
              </div>
              <Button onClick={() => onNavigate('competitions')} variant="outline" className="w-full sm:w-auto">
                <Trophy className="h-4 w-4 mr-2" />
                View Competitions
              </Button>
            </div>

            {/* Filters */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Competition</label>
                    <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss Competition</SelectItem>
                        <SelectItem value="30-day">30-Day Fitness Challenge</SelectItem>
                        <SelectItem value="overall">Overall Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="all-time">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers Podium */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Current competition: Weight Loss Competition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topPerformers.map((performer, index) => (
                    <Card key={performer.rank} className={`relative ${performer.rank === 1 ? 'border-yellow-500 shadow-lg' : ''}`}>
                      <CardContent className="flex flex-col items-center text-center p-6">
                        <div className="relative mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={performer.avatar} alt={performer.name} />
                            <AvatarFallback>{performer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2">
                            {getRankIcon(performer.rank)}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => onNavigate(`profile-member-${performer.rank}`)}
                          className="font-semibold text-lg hover:text-primary cursor-pointer"
                        >
                          {performer.name}
                        </button>
                        <div className="flex items-center gap-1 text-2xl font-bold text-primary mt-2">
                          {performer.score}
                          <span className="text-sm text-muted-foreground">pts</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm w-full">
                          <div className="text-center">
                            <div className="font-semibold">{performer.workouts}</div>
                            <div className="text-muted-foreground">Workouts</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{performer.streak}</div>
                            <div className="text-muted-foreground">Day Streak</div>
                          </div>
                        </div>
                        
                        {getRankBadge(performer.rank) && (
                          <div className="mt-3">
                            {getRankBadge(performer.rank)}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card className="hover-card">
              <CardHeader>
                <CardTitle>Full Leaderboard</CardTitle>
                <CardDescription>
                  Complete rankings for all participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="row-hover">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-center hidden sm:table-cell">Workouts</TableHead>
                        <TableHead className="text-center hidden md:table-cell">Streak</TableHead>
                        <TableHead className="text-center hidden lg:table-cell">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {allPerformers.map((performer) => (
                      <TableRow 
                        key={performer.rank} 
                        className={`${performer.name === user.name ? 'bg-muted/50' : ''}`}
                      >
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            {performer.rank <= 3 ? (
                              getRankIcon(performer.rank)
                            ) : (
                              <span className="font-semibold">{performer.rank}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={performer.avatar} alt={performer.name} />
                              <AvatarFallback className="text-xs">
                                {performer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <button 
                                onClick={() => onNavigate(`profile-member-${performer.rank}`)}
                                className="font-medium hover:text-primary cursor-pointer text-left"
                              >
                                {performer.name}
                                {performer.name === user.name && (
                                  <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                                )}
                              </button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-semibold text-primary">{performer.score}</div>
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <div className="font-medium">{performer.workouts}</div>
                        </TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="font-medium">{performer.streak}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          <div className="flex items-center justify-center gap-1 text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            <span className="text-xs">+{performer.improvement}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Your Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
                <CardDescription>
                  Your current standing and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">4th</div>
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">78</div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">20</div>
                    <div className="text-sm text-muted-foreground">Workouts</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}