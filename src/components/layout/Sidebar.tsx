import { 
  Home, 
  Users, 
  Dumbbell, 
  Target, 
  Trophy, 
  Settings, 
  CreditCard, 
  Building, 
  UserCheck,
  Calendar,
  BarChart3,
  Apple,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { useEffect } from "react";

interface SidebarProps {
  userRole: string;
  currentPage: string;
  onNavigate: (page: string) => void;
  userName: string;
  userAvatar?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'gyms', label: 'Gyms', icon: Building },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  gym_owner: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'gym-profile', label: 'Gym Profile', icon: Building },
    { id: 'trainers', label: 'Trainers', icon: UserCheck },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  trainer: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'members', label: 'My Members', icon: Users },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'diet-plans', label: 'Diet Plans', icon: Apple },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  member: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'workouts', label: 'My Workouts', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plan', icon: Apple },
    { id: 'competitions', label: 'Competitions', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]
};

export function Sidebar({ userRole, currentPage, onNavigate, userName, userAvatar, isOpen = true, onClose }: SidebarProps) {
  const items = navigationItems[userRole as keyof typeof navigationItems] || [];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!onClose) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    // Close mobile sidebar after navigation
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "w-64 border-r bg-card h-screen flex flex-col z-50",
        "md:relative md:translate-x-0",
        "fixed left-0 top-0 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile close button */}
        {onClose && (
          <div className="flex justify-end p-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* User Profile Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{userName}</p>
              <p className="text-sm text-muted-foreground capitalize">{userRole.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 transition-colors duration-200 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                  currentPage === item.id && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => handleItemClick(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}