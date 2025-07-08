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
    const savedUser = localStorage.getItem('grooso-admin-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('grooso-admin-user');
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