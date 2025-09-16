import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { LandingPage } from './components/pages/LandingPage';
import { GymMediaPage } from './components/pages/GymMediaPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AuthPage } from './components/auth/AuthPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { GymOwnerDashboard } from './components/dashboards/GymOwnerDashboard';
import { TrainerDashboard } from './components/dashboards/TrainerDashboard';
import { MemberDashboard } from './components/dashboards/MemberDashboard';
import { CompetitionPage } from './components/pages/CompetitionPage';
import { LeaderboardPage } from './components/pages/LeaderboardPage';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './AuthContext';
import { mockUsers } from './data/mockData';

// Protected route wrapper
function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

// Role based dashboard router
function DashboardRouter() {
  const { user, darkMode, logout, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const slugifyGym = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, type, id] = view.split('-');
      navigate(`/profile/${type}/${id}`);
      return;
    }
    switch (view) {
      case 'media':
        if (user?.gym) {
          navigate(`/${slugifyGym(user.gym)}/media`);
        } else {
          navigate(`/fitnesscenter-pro/media`);
        }
        break;
      case 'competitions':
        navigate('/competitions');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'workouts':
        navigate('/member/workouts');
        break;
      case 'diet':
        navigate('/member/diet');
        break;
      case 'payments':
        navigate('/member/payments');
        break;
      case 'dashboard':
      case 'admin':
      case 'member':
      case 'trainer':
      case 'gym-owner':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };
  if (!user) return <Navigate to="/auth" replace />;
  const commonProps = { user, onLogout: logout, darkMode, onToggleDarkMode: toggleDarkMode } as any;
  switch (user.role) {
    case 'admin':
      return <AdminDashboard {...commonProps} onNavigate={viewNavigate} />;
    case 'gym_owner':
      return <GymOwnerDashboard {...commonProps} onNavigate={viewNavigate} />;
    case 'trainer':
      return <TrainerDashboard {...commonProps} onNavigate={viewNavigate} />;
    case 'member':
      return <MemberDashboard {...commonProps} onNavigate={viewNavigate} />;
    default:
      return <div>Unknown role</div>;
  }
}

function CompetitionRoute() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, type, id] = view.split('-');
      navigate(`/profile/${type}/${id}`);
      return;
    }
    switch (view) {
      case 'media':
        if (user?.gym) {
          navigate(`/${user.gym.toLowerCase().replace(/[^a-z0-9]+/g,'-')}/media`);
        } else {
          navigate(`/fitnesscenter-pro/media`);
        }
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };
  if (!user) return null;
  return (
    <CompetitionPage
      user={user}
      onLogout={logout}
      onNavigate={viewNavigate}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
    />
  );
}

function LeaderboardRoute() {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, type, id] = view.split('-');
      navigate(`/profile/${type}/${id}`);
      return;
    }
    switch (view) {
      case 'competitions':
        navigate('/competitions');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };
  if (!user) return null;
  return (
    <LeaderboardPage
      user={user}
      onLogout={logout}
      onNavigate={viewNavigate}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
    />
  );
}

// Member sub-routes (workouts, diet, payments) reuse MemberDashboard with controlled page prop
function MemberSubRoute({ page }: { page: string }) {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, type, id] = view.split('-');
      navigate(`/profile/${type}/${id}`);
      return;
    }
    switch (view) {
      case 'competitions':
        navigate('/competitions');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'media':
        if (user?.gym) {
          navigate(`/${user.gym.toLowerCase().replace(/[^a-z0-9]+/g,'-')}/media`);
        } else {
          navigate(`/fitnesscenter-pro/media`);
        }
        break;
      case 'workouts':
        navigate('/member/workouts');
        break;
      case 'diet':
        navigate('/member/diet');
        break;
      case 'payments':
        navigate('/member/payments');
        break;
      default:
        navigate('/dashboard');
    }
  };
  if (!user) return null;
  return (
    <MemberDashboard
      user={user}
      onLogout={logout}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
      onNavigate={viewNavigate}
      page={page}
    />
  );
}

function ProfileRouteWrapper() {
  const { type, id } = useParams();
  const { user, darkMode, logout, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, pType, pId] = view.split('-');
      navigate(`/profile/${pType}/${pId}`);
      return;
    }
    switch (view) {
      case 'media':
        if (user?.gym) {
          navigate(`/${user.gym.toLowerCase().replace(/[^a-z0-9]+/g,'-')}/media`);
        } else {
          navigate(`/fitnesscenter-pro/media`);
        }
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'competitions':
        navigate('/competitions');
        break;
      default:
        navigate('/dashboard');
    }
  };
  if (!user) return <Navigate to="/auth" replace />;
  if (!type || !id) return <Navigate to="/dashboard" replace />;
  const profileId = parseInt(id);
  const profileUser = type === 'member' ? { ...mockUsers.member, id: profileId } : { ...mockUsers.trainer, id: profileId };
  if (type === 'member') {
    return <MemberDashboard user={user} profileUser={profileUser} viewingProfile onNavigate={viewNavigate} onLogout={logout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }
  return <TrainerDashboard user={user} profileUser={profileUser} viewingProfile onNavigate={viewNavigate} onLogout={logout} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
}

function AuthRoute() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  if (user) return <Navigate to="/dashboard" replace />;
  return (
    <AuthPage
      onLogin={(email: string, password: string, role: any) => {
        login(role);
        navigate('/dashboard');
      }}
      onBack={() => navigate('/')}
    />
  );
}

function LandingRoute() {
  const navigate = useNavigate();
  return <LandingPage onGetStarted={() => navigate('/auth')} />;
}

function GymMediaRouteWrapper() {
  const { user, darkMode, toggleDarkMode, logout } = useAuth();
  const { gym } = useParams();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/auth" replace />;
  const decodedGym = gym ? gym.replace(/-/g,' ') : (user.gym || 'FitnessCenter Pro');
  const viewNavigate = (view: string) => {
    if (view.startsWith('profile-')) {
      const [, pType, pId] = view.split('-');
      navigate(`/profile/${pType}/${pId}`);
      return;
    }
    if (view === 'media') return;
    switch (view) {
      case 'competitions':
        navigate('/competitions');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      default:
        navigate('/dashboard');
    }
  };
  // Layout with Sidebar & Header like other pages
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole={user.role}
        currentPage="media"
        onNavigate={viewNavigate}
        userName={user.name}
        userAvatar={user.avatar}
        isOpen={false}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
            onLogout={logout}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            title="Media Feed"
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="w-full">
            <GymMediaPage user={user} gym={decodedGym} onNavigate={viewNavigate} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingRoute />} />
            <Route path="/auth" element={<AuthRoute />} />
            <Route path="/dashboard" element={<Protected><DashboardRouter /></Protected>} />
            <Route path="/member/workouts" element={<Protected><MemberSubRoute page="workouts" /></Protected>} />
            <Route path="/member/diet" element={<Protected><MemberSubRoute page="diet" /></Protected>} />
            <Route path="/member/payments" element={<Protected><MemberSubRoute page="payments" /></Protected>} />
            <Route path="/competitions" element={<Protected><CompetitionRoute /></Protected>} />
            <Route path="/leaderboard" element={<Protected><LeaderboardRoute /></Protected>} />
            <Route path="/profile/:type/:id" element={<Protected><ProfileRouteWrapper /></Protected>} />
            <Route path="/:gym/media" element={<Protected><GymMediaRouteWrapper /></Protected>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}