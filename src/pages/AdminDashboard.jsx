import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  Settings, 
  BarChart3, 
  UserCheck,
  Store,
  ClipboardList,
  Search,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import DashboardOverview from '../components/admin/DashboardOverview';
import ExpressOrders from '../components/admin/ExpressOrders';
import NationwideOrders from '../components/admin/NationwideOrders';
import CityMartOrders from '../components/admin/CityMartOrders';
import VendorManagement from '../components/admin/VendorManagement';
import VendorStockPanel from '../components/admin/VendorStockPanel';
import StoreOwners from '../components/admin/StoreOwners';
import Sellers from '../components/admin/Sellers';
import Riders from '../components/admin/Riders';
import AssignOrders from '../components/admin/AssignOrders';
import Reports from '../components/admin/Reports';
import NotificationDropdown from '../components/admin/NotificationDropdown';
import OrderManagement from '../components/admin/OrderManagement';
import { useAuth } from '../hooks/useAuth';
import ToggleSwitch from '../components/common/ToggleSwitch';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, preferences, togglePreference, updatePreferences } = useAuth();
  const [dashboardPreferences, setDashboardPreferences] = useState({
    compactView: false,
    darkMode: false,
    autoSave: true
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'order-management', label: 'Order Management', icon: ClipboardList },
    { id: 'express-orders', label: 'Express Orders', icon: Package },
    { id: 'nationwide-orders', label: 'Nationwide Orders', icon: Package },
    { id: 'city-mart-orders', label: 'City Mart Orders', icon: Package },
    { id: 'vendors', label: 'Vendors', icon: Users },
    { id: 'store-owners', label: 'Store Owners', icon: Store },
    { id: 'sellers', label: 'Sellers', icon: UserCheck },
    { id: 'riders', label: 'Riders', icon: Truck },
    { id: 'assign-orders', label: 'Assign Orders', icon: ClipboardList },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleDashboardToggle = (setting, newValue) => {
    setDashboardPreferences(prev => ({
      ...prev,
      [setting]: newValue
    }));
    
    // Log for debugging
    console.log(`Dashboard preference ${setting} changed to:`, newValue);
    
    // Apply compact view class to body
    if (setting === 'compactView') {
      if (newValue) {
        document.body.classList.add('is-compact');
      } else {
        document.body.classList.remove('is-compact');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'order-management':
        return <OrderManagement />;
      case 'express-orders':
        return <ExpressOrders />;
      case 'nationwide-orders':
        return <NationwideOrders />;
      case 'city-mart-orders':
        return <CityMartOrders />;
      case 'vendors':
        return <VendorManagement />;
      case 'vendor-stock':
        return <VendorStockPanel />;
      case 'store-owners':
        return <StoreOwners />;
      case 'sellers':
        return <Sellers />;
      case 'riders':
        return <Riders />;
      case 'assign-orders':
        return <AssignOrders />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">System Settings</h3>
              
              {/* General Settings */}
              <div className="space-y-4 mb-6">
                <h4 className="text-md font-medium text-gray-900">General Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ToggleSwitch
                    enabled={preferences.notifications}
                    onChange={() => togglePreference('notifications')}
                    label="Enable Notifications"
                    id="settings-notifications"
                  />
                  <ToggleSwitch
                    enabled={preferences.autoLogout}
                    onChange={() => togglePreference('autoLogout')}
                    label="Auto Logout"
                    id="settings-auto-logout"
                  />
                  <ToggleSwitch
                    enabled={preferences.twoFactorAuth}
                    onChange={() => togglePreference('twoFactorAuth')}
                    label="Two-Factor Authentication"
                    id="settings-2fa"
                  />
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-4 mb-6 border-t pt-6">
                <h4 className="text-md font-medium text-gray-900">Theme Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select 
                      value={preferences.theme}
                      onChange={(e) => {
                        const newTheme = e.target.value;
                        updatePreferences({ theme: newTheme });
                        if (window.showNotification) {
                          window.showNotification('Theme Changed', `Switched to ${newTheme} theme`, 'success');
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dashboard Preferences */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="text-md font-medium text-gray-900">Dashboard Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ToggleSwitch
                    enabled={dashboardPreferences.compactView}
                    onChange={(newValue) => handleDashboardToggle('compactView', newValue)}
                    label="Compact View"
                    id="settings-compact-view"
                  />
                  <ToggleSwitch
                    enabled={dashboardPreferences.autoSave}
                    onChange={(newValue) => handleDashboardToggle('autoSave', newValue)}
                    label="Auto Save"
                    id="settings-auto-save"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t pt-6">
                <button 
                  onClick={() => {
                    if (window.showNotification) {
                      window.showNotification('Settings Saved', 'Your preferences have been updated successfully', 'success');
                    }
                  }}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-emerald-600 text-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Grooso</h1>
                <p className="text-emerald-100 text-xs sm:text-sm mt-1">Admin Dashboard</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-emerald-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 mt-2 sm:mt-6 overflow-y-auto sidebar-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 sm:px-6 py-3 text-left transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-emerald-700 border-r-4 border-white font-medium' 
                      : 'hover:bg-emerald-700'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 sm:p-6 border-t border-emerald-500 mt-auto">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm truncate">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-emerald-200 truncate">{user?.email || 'admin@grooso.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 text-emerald-200 hover:text-white hover:bg-emerald-700 px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-3 sm:px-6 py-2 sm:py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-emerald-600 p-1 flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-xs sm:max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-4">
              {/* Notifications */}
              <NotificationDropdown />
              
              {/* Dashboard Settings */}
              <div className="hidden md:flex items-center space-x-2">
                <ToggleSwitch
                  enabled={dashboardPreferences.compactView}
                  onChange={(newValue) => handleDashboardToggle('compactView', newValue)}
                  size="small"
                  label="Compact"
                  id="dashboard-compact-view"
                  compact={true}
                />
              </div>
              
              {/* User Profile - Hidden on mobile, shown on larger screens */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="hidden md:block">
                  <span className="text-sm font-medium">{user?.name || 'Admin User'}</span>
                  <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 bg-gray-50 overflow-auto ${dashboardPreferences.compactView ? 'is-compact' : ''}`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;