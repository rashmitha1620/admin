import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Send as Suspend, CheckCircle, X, User } from 'lucide-react';
import ToggleSwitch from '../common/ToggleSwitch';
import StockPanelModal from '../common/StockPanelModal';
import EntityCard from '../common/EntityCard';
import EntityModal from '../common/EntityModal';

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorSettings, setVendorSettings] = useState({});
  const [editingVendor, setEditingVendor] = useState(null);
  const [showStockPanel, setShowStockPanel] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    businessName: '',
    contactPerson: '',
    phone: ''
  });

  const vendorStats = [
    { label: 'Total Vendors', value: '391', trend: 'up' },
    { label: 'Active Vendors', value: '284', trend: 'up' },
    { label: 'Pending Approval', value: '12', trend: 'neutral' },
    { label: 'Suspended Vendors', value: '5', trend: 'down' }
  ];

  const vendors = [
    {
      id: 1,
      storeName: 'HealthyMart',
      storeIcon: '🏪',
      vendor: 'Frank Seft',
      testMailey: 'Test Mailey',
      city: 'Express',
      type: 'Express',
      status: 'Active',
      products: 326,
      lastSync: '2 hrgo ago',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      storeName: 'Fresh Mart',
      storeIcon: '🍃',
      vendor: 'Juson Pon',
      testMailey: 'E-Commerce',
      city: 'City Mart',
      type: 'Expresse',
      status: 'View'
    },
    {
      id: 3,
      storeName: 'Grocer Mart',
      storeIcon: '🛒',
      vendor: 'Jefta Sharf',
      testMailey: 'Express',
      city: 'City Mart',
      type: 'Express',
      status: 'View'
    },
    {
      id: 4,
      storeName: 'HeallMart',
      storeIcon: '🧡',
      vendor: 'Tony Zayler',
      testMailey: 'Express',
      city: 'E-Commerce',
      type: 'Express',
      status: 'View'
    },
    {
      id: 5,
      storeName: 'MetroMart',
      storeIcon: '🏢',
      vendor: 'Atoro Yang',
      testMailey: 'Indomagaia',
      city: 'E-Commerce',
      type: 'Chupnwerd',
      status: 'View'
    }
  ];

  const handleVendorToggle = (vendorId, setting, newValue) => {
    setVendorSettings(prev => ({
      ...prev,
      [vendorId]: {
        ...prev[vendorId],
        [setting]: newValue
      }
    }));
    
    // Log for debugging
    console.log(`Vendor ${vendorId} setting ${setting} changed to:`, newValue);
  };

  const handleSendInvite = () => {
    if (inviteData.email && inviteData.businessName) {
      const inviteLink = `https://grooso.com/vendor-invite/${btoa(inviteData.email)}`;
      navigator.clipboard.writeText(inviteLink).then(() => {
        if (window.showNotification) {
          window.showNotification('Invite Sent', `Vendor invitation sent to ${inviteData.email}`, 'success');
        }
      });
      setInviteData({ email: '', businessName: '', contactPerson: '', phone: '' });
      setShowInviteModal(false);
    }
  };

  return (
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {vendorStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
            <div className="h-8">
              <svg className="w-full h-full" viewBox="0 0 100 20">
                <polyline
                  fill="none"
                  stroke={stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280'}
                  strokeWidth="2"
                  points="0,15 25,10 50,12 75,8 100,5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
        <button className="bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base">
          Approve
        </button>
        <button className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
          Suspend
        </button>
        <div className="relative flex-1 sm:flex-none">
          <button className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
            <span>Export</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <button className="bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base ml-auto">
          Invite
        </button>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Send Invite Link
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name / ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
          >
            <option value="">Filter by</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {vendors.map((vendor) => (
          <EntityCard
            key={vendor.id}
            id={vendor.id}
            type="vendor"
            name={vendor.vendor}
            storeName={vendor.storeName}
            businessName={vendor.storeName}
            contactPerson={vendor.vendor}
            location={vendor.city}
            category={vendor.type}
            status={vendor.status.toLowerCase()}
            onView={(id) => {
              setSelectedVendor(vendor);
              if (window.showNotification) {
                window.showNotification('View Vendor', `Viewing ${vendor.storeName}`, 'info');
              }
            }}
            onEdit={(id) => {
              setEditingVendor(vendor);
              setShowStockPanel(true);
              if (window.showNotification) {
                window.showNotification('Edit Mode', `Editing ${vendor.storeName}`, 'info');
              }
            }}
            customActions={
              <div className="flex items-center justify-between w-full space-x-2">
                <ToggleSwitch
                  enabled={vendorSettings[vendor.id]?.approved || vendor.status === 'Active'}
                  onChange={(newValue) => handleVendorToggle(vendor.id, 'approved', newValue)}
                  size="small"
                  label="Approved"
                  id={`vendor-approved-${vendor.id}`}
                />
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to suspend ${vendor.storeName}?`)) {
                      if (window.showNotification) {
                        window.showNotification('Vendor Suspended', `${vendor.storeName} has been suspended`, 'warning');
                      }
                    }
                  }}
                  title="Suspend vendor"
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Suspend className="w-4 h-4" />
                </button>
              </div>
            }
            icon={vendor.storeIcon ? () => <span className="text-lg">{vendor.storeIcon}</span> : undefined}
          />
        ))}
      </div>

      {/* Vendor Detail Sidebar */}
      <EntityModal
        isOpen={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        entity={selectedVendor}
        type="vendor"
        title="Vendor Details"
        actions={
          <>
            <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
              View Dashboard
            </button>
            <button 
              onClick={() => {
                setEditingVendor(selectedVendor);
                setSelectedVendor(null);
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Edit
            </button>
            <button className="flex-1 bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors">
              Approve
            </button>
          </>
        }
      />

      {/* Stock Panel Modal */}
      <StockPanelModal
        isOpen={showStockPanel && editingVendor}
        onClose={() => {
          setShowStockPanel(false);
          setEditingVendor(null);
        }}
        entity={editingVendor}
        type="vendor"
        onSave={(products) => {
          console.log('Saving products for vendor:', editingVendor?.storeName, products);
          if (window.showNotification) {
            window.showNotification('Success', `Stock updated for ${editingVendor?.storeName}`, 'success');
          }
          setShowStockPanel(false);
          setEditingVendor(null);
        }}
      />

      {/* Send Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Send Vendor Invite</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSendInvite(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={inviteData.businessName}
                    onChange={(e) => setInviteData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={inviteData.contactPerson}
                    onChange={(e) => setInviteData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={inviteData.phone}
                    onChange={(e) => setInviteData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {editingVendor && !showStockPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Edit Vendor</h3>
                <button
                  onClick={() => setEditingVendor(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                setEditingVendor(null);
                if (window.showNotification) {
                  window.showNotification('Success', 'Vendor updated successfully!', 'success');
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    defaultValue={editingVendor.storeName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter store name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                  <input
                    type="text"
                    defaultValue={editingVendor.vendor}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter vendor name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    defaultValue={editingVendor.city}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    defaultValue={editingVendor.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Express">Express</option>
                    <option value="City Mart">City Mart</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    defaultValue={editingVendor.status?.toLowerCase()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingVendor(null)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Update Vendor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;