import { useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('grooso-admin-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('grooso-admin-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('grooso-admin-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grooso-admin-user');
    // Force page reload to ensure clean state
    window.location.href = '/login';
  };

  const isAdmin = () => {
    return user?.role === USER_ROLES.ADMIN;
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('grooso-admin-user', JSON.stringify(updatedUser));
  };

  return {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAdmin,
    isAuthenticated: !!user
  };
};