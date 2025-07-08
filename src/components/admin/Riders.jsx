import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Truck, MapPin, Clock } from 'lucide-react';
import { ridersApi } from '../../services/api';
import { formatDate, getStatusColor } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riderSettings, setRiderSettings] = useState({});

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

  const handleRiderToggle = (riderId, setting, newValue) => {
    setRiderSettings(prev => ({
      ...prev,
      [riderId]: {
        ...prev[riderId],
        [setting]: newValue
      }
    }));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading riders..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Riders</h2>
          <p className="text-gray-600">Manage delivery riders and their assignments</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Rider</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="busy">Busy</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Riders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRiders.map((rider) => (
          <div key={rider.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{rider.name}</h3>
                  <p className="text-sm text-gray-600">{rider.phone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(rider.status)}`}>
                  {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  rider.status === 'online' ? 'bg-emerald-500' : 
                  rider.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Vehicle Type</span>
                <span className="font-medium">{rider.vehicleType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Orders</span>
                <span className="font-medium">{rider.currentOrders}/{rider.maxOrders}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Deliveries</span>
                <span className="font-medium">{rider.totalDeliveries}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <span className="font-medium">⭐ {rider.rating}</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{rider.currentLocation}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last active: {formatDate(rider.lastActive)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-emerald-100 text-emerald-700 py-2 px-3 rounded text-sm hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
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
                label="Notifications"
                id={`rider-notifications-${rider.id}`}
              />
            </div>

            {rider.currentOrders > 0 && (
              <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-700 font-medium">
                  Currently delivering {rider.currentOrders} order(s)
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRiders.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No riders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Riders;