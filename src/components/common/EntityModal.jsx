import React from 'react';
import { X, Phone, MapPin, Store, User, Star, DollarSign, Package, Calendar, Mail } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';

const EntityModal = ({
  isOpen,
  onClose,
  entity,
  type, // 'vendor', 'seller', 'store', 'rider'
  title,
  children,
  actions
}) => {
  if (!isOpen || !entity) return null;

  const getTypeIcon = () => {
    switch (type) {
      case 'vendor':
        return Store;
      case 'seller':
        return User;
      case 'store':
        return Store;
      case 'rider':
        return User;
      default:
        return Store;
    }
  };

  const TypeIcon = getTypeIcon();

  const getDisplayName = () => {
    if (type === 'store') return entity.storeName || entity.name;
    if (type === 'vendor') return entity.businessName || entity.storeName || entity.name;
    return entity.name;
  };

  const getSubtitle = () => {
    if (type === 'store') return entity.name;
    if (type === 'vendor') return entity.vendor || entity.name;
    if (type === 'rider') return entity.vehicleType;
    return entity.businessName || entity.email;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{title || `${type.charAt(0).toUpperCase() + type.slice(1)} Details`}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Entity Info */}
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TypeIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{getDisplayName()}</h4>
                  <p className="text-gray-600">{getSubtitle()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(entity.status)}`}>
                    {entity.status?.charAt(0).toUpperCase() + entity.status?.slice(1)}
                  </span>
                </div>
                
                {(entity.storeType || entity.category) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {type === 'store' ? 'Store Type' : 'Category'}
                    </label>
                    <p className="text-sm text-gray-900">
                      {entity.storeType || entity.category}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Contact Information</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {entity.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{entity.phone}</span>
                    </div>
                  </div>
                )}
                
                {entity.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{entity.email}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {(entity.address || entity.location) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-900">{entity.address || entity.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Business Metrics */}
            {(entity.monthlyRevenue || entity.revenue || entity.monthlyOrders || entity.orders || entity.rating) && (
              <div>
                <h5 className="text-lg font-semibold mb-3">
                  {type === 'rider' ? 'Performance Metrics' : 'Business Metrics'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(entity.monthlyRevenue || entity.revenue) && (
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">
                          {type === 'rider' ? 'Monthly Earnings' : 'Monthly Revenue'}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-emerald-600">
                        {formatCurrency(entity.monthlyRevenue || entity.revenue)}
                      </p>
                    </div>
                  )}
                  
                  {(entity.monthlyOrders || entity.orders || entity.totalDeliveries) && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          {type === 'rider' ? 'Total Deliveries' : 'Monthly Orders'}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        {entity.monthlyOrders || entity.orders || entity.totalDeliveries}
                      </p>
                    </div>
                  )}
                  
                  {entity.rating && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Rating</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xl font-bold text-yellow-600">{entity.rating}</p>
                        {entity.reviewCount && (
                          <span className="text-sm text-yellow-700">({entity.reviewCount} reviews)</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rider Specific Info */}
            {type === 'rider' && (
              <div>
                <h5 className="text-lg font-semibold mb-3">Rider Information</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {entity.vehicleType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <p className="text-sm text-gray-900">{entity.vehicleType}</p>
                    </div>
                  )}
                  
                  {entity.currentOrders !== undefined && entity.maxOrders && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Load</label>
                      <p className="text-sm text-gray-900">
                        {entity.currentOrders}/{entity.maxOrders} orders
                      </p>
                    </div>
                  )}
                  
                  {entity.currentLocation && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                      <p className="text-sm text-gray-900">{entity.currentLocation}</p>
                    </div>
                  )}
                  
                  {entity.lastActive && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Active</label>
                      <p className="text-sm text-gray-900">{formatDate(entity.lastActive)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {(entity.joinedDate || entity.createdAt) && (
              <div>
                <h5 className="text-lg font-semibold mb-3">Additional Information</h5>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      {type === 'rider' ? 'Joined' : 'Member Since'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-purple-600">
                    {formatDate(entity.joinedDate || entity.createdAt)}
                  </p>
                </div>
              </div>
            )}

            {/* Custom Content */}
            {children}

            {/* Action Buttons */}
            {actions && (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityModal;