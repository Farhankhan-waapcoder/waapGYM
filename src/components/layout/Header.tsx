import { Bell, Moon, Sun, User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";

interface HeaderProps {
  user: any;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  title?: string;
  onMenuToggle?: () => void;
}

export function Header({ user, darkMode, onToggleDarkMode, onLogout, title, onMenuToggle }: HeaderProps) {
  return (
    <header className="h-16 border-b bg-card px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        {onMenuToggle && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <h1 className="text-lg md:text-xl font-semibold">GymSaaS</h1>
        <span className="text-sm text-muted-foreground hidden sm:block">
          {title || `${user?.role?.replace('_', ' ')} Dashboard`}
        </span>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
        
        {/* Dark mode toggle */}
        <Button variant="ghost" size="icon" onClick={onToggleDarkMode}>
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}