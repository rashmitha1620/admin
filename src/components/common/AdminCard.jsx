import React from 'react';
import { Eye, Edit, Phone, MapPin, Store, User, Star, DollarSign, Package } from 'lucide-react';
import { formatCurrency, getStatusColor } from '../../utils/helpers';

const AdminCard = ({
  // Required props
  id,
  name,
  type, // 'vendor', 'seller', 'store'
  
  // Contact details
  contactPerson,
  phone,
  email,
  
  // Location & category
  location,
  address,
  category,
  
  // Status
  status,
  
  // Business metrics
  revenue,
  orders,
  rating,
  reviewCount,
  
  // Additional data based on type
  businessName,
  storeName,
  storeType,
  
  // Action handlers
  onView,
  onEdit,
  
  // Optional props
  icon,
  additionalInfo,
  customActions,
  compact = false
}) => {
  // Get appropriate icon based on type
  const getTypeIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'vendor':
        return Store;
      case 'seller':
        return User;
      case 'store':
        return Store;
      default:
        return Store;
    }
  };

  const TypeIcon = getTypeIcon();

  // Get display name based on type
  const getDisplayName = () => {
    if (type === 'store') return storeName || name;
    if (type === 'vendor') return businessName || name;
    return name;
  };

  // Get subtitle based on type
  const getSubtitle = () => {
    if (type === 'store') return contactPerson || name;
    if (type === 'vendor') return contactPerson || name;
    return contactPerson || email;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 ${
      compact ? 'p-4' : 'p-4 sm:p-6'
    }`}>
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
            <TypeIcon className={`${compact ? 'w-5 h-5' : 'w-6 h-6'} text-emerald-600`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-900 truncate`}>
              {getDisplayName()}
            </h3>
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600 truncate`}>
              {getSubtitle()}
            </p>
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(status)} flex-shrink-0`}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
      </div>

      {/* Contact & Location Info */}
      <div className={`space-y-2 mb-4 ${compact ? 'text-xs' : 'text-sm'}`}>
        {phone && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} />
            <span className="truncate">{phone}</span>
          </div>
        )}
        
        {(location || address) && (
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} />
            <span className="truncate">{location || address}</span>
          </div>
        )}
        
        {category && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Store className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} flex-shrink-0`} />
            <span className="truncate">{storeType ? `${storeType} • ${category}` : category}</span>
          </div>
        )}
      </div>

      {/* Business Metrics */}
      {(revenue || orders || rating) && (
        <div className={`border-t pt-4 mb-4 ${compact ? 'space-y-2' : 'space-y-3'}`}>
          <div className={`grid ${revenue && orders ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {revenue && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <DollarSign className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-emerald-600`} />
                  <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Revenue</span>
                </div>
                <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-emerald-600`}>
                  {formatCurrency(revenue)}
                </p>
              </div>
            )}
            
            {orders && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Package className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-blue-600`} />
                  <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>Orders</span>
                </div>
                <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-blue-600`}>
                  {orders}
                </p>
              </div>
            )}
          </div>
          
          {rating && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-400 fill-current`} />
                <span className={`${compact ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>
                  {rating}
                </span>
                {reviewCount && (
                  <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-500`}>
                    ({reviewCount})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Info */}
      {additionalInfo && (
        <div className={`mb-4 p-3 bg-gray-50 rounded-lg ${compact ? 'text-xs' : 'text-sm'}`}>
          {additionalInfo}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onView && onView(id)}
          className={`flex-1 bg-emerald-100 text-emerald-700 ${compact ? 'py-1.5 px-2 text-xs' : 'py-2 px-3 text-sm'} rounded hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1`}
          title="View details"
        >
          <Eye className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
          <span>View</span>
        </button>
        
        <button
          onClick={() => onEdit && onEdit(id)}
          className={`flex-1 bg-blue-100 text-blue-700 ${compact ? 'py-1.5 px-2 text-xs' : 'py-2 px-3 text-sm'} rounded hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1`}
          title="Edit"
        >
          <Edit className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
          <span>Edit</span>
        </button>
        
        {/* Custom Actions */}
        {customActions && customActions}
      </div>
    </div>
  );
};

export default AdminCard;