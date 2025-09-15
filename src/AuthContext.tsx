import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUsers } from './data/mockData';

export type UserRole = 'admin' | 'gym_owner' | 'trainer' | 'member';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  gym?: string;
}

interface AuthContextValue {
  user: User | null;
  darkMode: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  toggleDarkMode: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const login = (role: UserRole) => {
    const mock = mockUsers[role];
    setUser(mock);
  };

  const logout = () => setUser(null);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <AuthContext.Provider value={{ user, darkMode, login, logout, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
