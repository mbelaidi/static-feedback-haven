
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser, clearCurrentUser, getUserByEmail, saveUser } from '@/utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, we would validate with a backend
      // For this mock version, we just check if the user exists by email
      const user = getUserByEmail(email);

      if (user) {
        // In a real app, we would verify the password here
        setUser(user);
        setCurrentUser(user);
        setIsAuthenticated(true);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        toast({
          title: "Registration Failed",
          description: "Email already in use. Please use another email.",
          variant: "destructive",
        });
        return false;
      }

      // Create new user
      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        registeredAt: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?u=${email}`, // Use email as seed for consistent avatar
      };

      // In a real app, we would hash the password and send to backend
      // For this mock version, we just save the user to localStorage
      saveUser(newUser);
      setUser(newUser);
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration Successful",
        description: `Welcome to FeedbackHub, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearCurrentUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
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
