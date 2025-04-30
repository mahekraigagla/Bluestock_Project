
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/ipo';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'admin' | 'client') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('bluestock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint
      // For demo, we'll simulate authentication
      
      // For demo purposes, admin login with any email containing "admin"
      const isAdmin = email.includes('admin');
      const role = isAdmin ? 'admin' : 'client';
      
      const user: User = {
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        email,
        role
      };
      
      localStorage.setItem('bluestock_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'admin' | 'client' = 'client') => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API endpoint
      // For demo, we'll simulate registration
      
      const user: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role
      };
      
      localStorage.setItem('bluestock_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('bluestock_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
