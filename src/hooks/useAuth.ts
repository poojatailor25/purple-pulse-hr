import { useState, useEffect } from 'react';
import mockUsers from '@/data/mockUsers.json';

interface User {
  email: string;
  fullName: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hrms_token');
    const userData = localStorage.getItem('hrms_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('hrms_token');
        localStorage.removeItem('hrms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { email: foundUser.email, fullName: foundUser.fullName };
      localStorage.setItem('hrms_token', 'mock_token_' + Date.now());
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    // In a real app, this would make an API call
    // For now, we'll just simulate success
    return true;
  };

  const logout = () => {
    localStorage.removeItem('hrms_token');
    localStorage.removeItem('hrms_user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};