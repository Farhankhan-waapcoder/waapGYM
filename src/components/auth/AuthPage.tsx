import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthPageProps {
  onLogin: (email: string, password: string, role: string) => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [userRole, setUserRole] = useState('member');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const roleDescriptions = {
    admin: 'System administrator with full platform access',
    gym_owner: 'Gym owner managing their fitness business',
    trainer: 'Personal trainer managing clients and workouts',
    member: 'Gym member tracking fitness journey'
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {authMode === 'login' ? 'Welcome back' : 'Create account'}
            </CardTitle>
            <CardDescription className="text-center">
              {authMode === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Enter your information to create a new account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Type</label>
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                      <SelectItem value="gym_owner">Gym Owner</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {roleDescriptions[userRole as keyof typeof roleDescriptions]}
                  </p>
                </div>
              </div>

              <TabsContent value="login" className="mt-6">
                <LoginForm 
                  onLogin={(email, password, role) => onLogin(email, password, role)}
                  onSwitchToSignup={() => setAuthMode('signup')}
                />
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <SignupForm 
                  onSignup={(data) => onLogin(data.email, data.password, data.role)}
                  onSwitchToLogin={() => setAuthMode('login')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}