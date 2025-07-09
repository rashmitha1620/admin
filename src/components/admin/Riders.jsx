import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Truck, User, X } from 'lucide-react';
import { ridersApi } from '../../services/api';
import { formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';
import EntityCard from '../common/EntityCard';
import EntityModal from '../common/EntityModal';

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riderSettings, setRiderSettings] = useState({});
  const [showAddRiderModal, setShowAddRiderModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [newRider, setNewRider] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: '',
    licenseNumber: '',
    address: ''
  });
  const [inviteData, setInviteData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const response = await ridersApi.getRiders();
      setRiders(response.data);
    } catch (error) {
      console.error('Error fetching riders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rider.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || rider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddRider = () => {
    if (newRider.name && newRider.phone && newRider.email) {
      const rider = {
        id: `r${Date.now()}`,
        ...newRider,
        status: 'offline',
        currentOrders: 0,
        maxOrders: 5,
        totalDeliveries: 0,
        rating: 4.0,
        currentLocation: 'Not available',
        lastActive: new Date().toISOString()
      };
      setRiders(prev => [...prev, rider]);
      setNewRider({
        name: '',
        phone: '',
        email: '',
        vehicleType: '',
        licenseNumber: '',
        address: ''
      });
      setShowAddRiderModal(false);
      if (window.showNotification) {
        window.showNotification('Success', 'Rider added successfully!', 'success');
      }
    }
  };

  const handleSendInvite = () => {
    if (inviteData.email && inviteData.name) {
      const inviteLink = `https://grooso.com/rider-invite/${btoa(inviteData.email)}`;
      navigator.clipboard.writeText(inviteLink).then(() => {
        if (window.showNotification) {
          window.showNotification('Invite Sent', `Rider invitation sent to ${inviteData.email}`, 'success');
        }
      });
      setInviteData({ email: '', name: '', phone: '' });
      setShowInviteModal(false);
    }
  };

  const handleRiderToggle = (riderId, setting, newValue) => {
    setRiderSettings(prev => ({
      ...prev,
      [riderId]: {
        ...prev[riderId],
        [setting]: newValue
      }
    }));
    
    // Log for debugging
    console.log(`Rider ${riderId} setting ${setting} changed to:`, newValue);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading riders..." />
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Riders</h2>
          <p className="text-gray-600">Manage delivery riders and their assignments</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddRiderModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rider</span>
          </button>
          <button 
            onClick={() => setShowInviteModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Send Invite</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Riders</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Now</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <Truck className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Delivery</p>
              <p className="text-2xl font-bold text-gray-900">34</p>
            </div>
            <Truck className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">33</p>
            </div>
            <Truck className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search riders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="busy">Busy</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Riders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredRiders.map((rider) => (
          <EntityCard
            key={rider.id}
            id={rider.id}
            type="rider"
            name={rider.name}
            phone={rider.phone}
            location={rider.currentLocation}
            vehicleType={rider.vehicleType}
            status={rider.status}
            rating={rider.rating}
            currentOrders={rider.currentOrders}
            maxOrders={rider.maxOrders}
            totalDeliveries={rider.totalDeliveries}
            onView={(id) => {
              setSelectedRider(rider);
              if (window.showNotification) {
                window.showNotification('View Rider', `Viewing details for ${rider.name}`, 'info');
              }
            }}
            onEdit={(id) => {
              setShowEditModal(true);
              setEditingRider(rider);
              if (window.showNotification) {
                window.showNotification('Edit Mode', `Editing ${rider.name}`, 'info');
              }
            }}
            customActions={
              <div className="flex flex-wrap items-center justify-between w-full gap-2">
                <ToggleSwitch
                  enabled={riderSettings[rider.id]?.available || rider.status === 'online'}
                  onChange={(newValue) => handleRiderToggle(rider.id, 'available', newValue)}
                  size="small"
                  label="Available"
                  id={`rider-available-${rider.id}`}
                />
                <ToggleSwitch
                  enabled={riderSettings[rider.id]?.notifications || true}
                  onChange={(newValue) => handleRiderToggle(rider.id, 'notifications', newValue)}
                  size="small"
                  label="Notify"
                  id={`rider-notifications-${rider.id}`}
                />
              </div>
            }
          />
        ))}
      </div>

      {filteredRiders.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No riders found matching your criteria.</p>
        </div>
      )}

      {/* View Rider Modal */}
      <EntityModal
        isOpen={!!selectedRider}
        onClose={() => setSelectedRider(null)}
        entity={selectedRider}
        type="rider"
        title="Rider Details"
        actions={
          <>
            <button 
              onClick={() => {
                setShowEditModal(true);
                setEditingRider(selectedRider);
                setSelectedRider(null);
              }}
              className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Edit Rider
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              View Deliveries
            </button>
            <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
              Contact Rider
            </button>
          </>
        }
      />

      {/* Edit Rider Modal */}
      {showEditModal && editingRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Edit Rider</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingRider(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                // Update rider logic here
                setShowEditModal(false);
                setEditingRider(null);
                if (window.showNotification) {
                  window.showNotification('Success', 'Rider updated successfully!', 'success');
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={editingRider.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={editingRider.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={editingRider.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    defaultValue={editingRider.vehicleType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                  <input
                    type="text"
                    defaultValue={editingRider.currentLocation}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter current location"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingRider(null);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Update Rider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Add Rider Modal */}
      {showAddRiderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Rider</h3>
                <button
                  onClick={() => setShowAddRiderModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddRider(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newRider.name}
                    onChange={(e) => setNewRider(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newRider.phone}
                    onChange={(e) => setNewRider(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newRider.email}
                    onChange={(e) => setNewRider(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    value={newRider.vehicleType}
                    onChange={(e) => setNewRider(prev => ({ ...prev, vehicleType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input
                    type="text"
                    value={newRider.licenseNumber}
                    onChange={(e) => setNewRider(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter license number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows="3"
                    value={newRider.address}
                    onChange={(e) => setNewRider(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddRiderModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Rider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Send Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Send Rider Invite</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rider Name</label>
                  <input
                    type="text"
                    value={inviteData.name}
                    onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter rider name"
                    required
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
    </>
  );
};

export default Riders;