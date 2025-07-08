import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, Clock, AlertCircle, Package, Truck, User, Settings } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #GRO-2025-001 has been placed by John Doe',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'delivery',
      title: 'Order Delivered',
      message: 'Order #GRO-2025-002 has been successfully delivered',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      icon: Truck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 3,
      type: 'rider',
      title: 'New Rider Joined',
      message: 'Vikash Singh has joined as a delivery partner',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: true,
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Low Stock Alert',
      message: 'Coffee inventory is running low at Fresh Mart',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      isRead: false,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'Platform maintenance scheduled for tonight at 2 AM',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      isRead: true,
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Cancelled',
      message: 'Order #GRO-2025-003 has been cancelled by customer',
      timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
      isRead: true,
      icon: X,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    const unread = mockNotifications.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-100"
      >
        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${notification.bgColor} flex items-center justify-center`}>
                        <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${notification.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'} truncate`}>
                              {notification.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                                title="Mark as read"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete notification"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t bg-gray-50">
              <button className="w-full text-center text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;