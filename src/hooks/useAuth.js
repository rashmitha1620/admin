import { useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';
import { authApi } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    autoLogout: false,
    twoFactorAuth: false
  });

  useEffect(() => {
    // Check for auth token first
    const token = localStorage.getItem('grooso-admin-token');
    
    const savedUser = localStorage.getItem('grooso-admin-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Only set user if we have both user data and valid token
        if (token) {
          setUser(userData);
        } else {
          // Clear invalid user data if no token
          localStorage.removeItem('grooso-admin-user');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('grooso-admin-user');
        localStorage.removeItem('grooso-admin-token');
      }
    }
    
    const savedPreferences = localStorage.getItem('grooso-admin-preferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('grooso-admin-user', JSON.stringify(userData));
    // Token should already be set in LoginPage, but ensure it's there
    const token = localStorage.getItem('grooso-admin-token');
    if (!token) {
      console.warn('No auth token found after login');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grooso-admin-user');
    localStorage.removeItem('grooso-admin-token');
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

  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem('grooso-admin-preferences', JSON.stringify(updatedPreferences));
    
    // Log for debugging
    console.log('Auth preferences updated:', updatedPreferences);
  };

  const togglePreference = (key) => {
    const newValue = !preferences[key];
    updatePreferences({ [key]: newValue });
    
    // Log for debugging
    console.log(`Auth preference ${key} toggled to:`, newValue);
  };

  return {
    user,
    preferences,
    isLoading,
    login,
    logout,
    updateUser,
    updatePreferences,
    togglePreference,
    isAdmin,
    isAuthenticated: !!user
  };
};