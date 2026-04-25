'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { db } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database with passwords
const userCredentials: Record<string, { password: string; user: User }> = {
  'admin@shophub.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@shophub.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'customer',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for saved auth
    const savedUser = localStorage.getItem('shophub_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userData = userCredentials[email.toLowerCase()];
    
    if (userData && userData.password === password) {
      setUser(userData.user);
      setIsAuthenticated(true);
      localStorage.setItem('shophub_user', JSON.stringify(userData.user));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const lowerEmail = email.toLowerCase();
    
    if (userCredentials[lowerEmail]) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: lowerEmail,
      name,
      role: 'customer',
    };

    userCredentials[lowerEmail] = {
      password,
      user: newUser,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('shophub_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('shophub_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
