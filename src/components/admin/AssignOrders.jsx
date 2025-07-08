import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Package, Truck, Clock } from 'lucide-react';
import { ordersApi, ridersApi } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';

const AssignOrders = () => {
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignmentSettings, setAssignmentSettings] = useState({
    autoAssign: false,
    prioritizeUrgent: true,
    notifyRiders: true,
    optimizeRoutes: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersResponse, ridersResponse] = await Promise.all([
        ordersApi.getUnassignedOrders(),
        ridersApi.getAvailableRiders()
      ]);
      setUnassignedOrders(ordersResponse.data);
      setAvailableRiders(ridersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignOrder = async (orderId, riderId) => {
    try {
      await ordersApi.assignOrder(orderId, riderId);
      // Remove from unassigned orders
      setUnassignedOrders(orders => orders.filter(order => order.id !== orderId));
      // Update rider availability
      setAvailableRiders(riders => 
        riders.map(rider => 
          rider.id === riderId 
            ? { ...rider, currentOrders: rider.currentOrders + 1 }
            : rider
        )
      );
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  const handleAssignmentToggle = (setting, newValue) => {
    setAssignmentSettings(prev => ({
      ...prev,
      [setting]: newValue
    }));
  };

  const filteredOrders = unassignedOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading orders and riders..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Assign Orders</h2>
          <p className="text-gray-600">Assign unassigned orders to available riders</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unassigned Orders</p>
              <p className="text-2xl font-bold text-gray-900">{unassignedOrders.length}</p>
            </div>
            <Package className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Riders</p>
              <p className="text-2xl font-bold text-gray-900">{availableRiders.length}</p>
            </div>
            <Truck className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Orders</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned Today</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Assignment Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Assignment Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ToggleSwitch
            enabled={assignmentSettings.autoAssign}
            onChange={(newValue) => handleAssignmentToggle('autoAssign', newValue)}
            label="Auto Assign"
            id="assignment-auto-assign"
            size="small"
          />
          <ToggleSwitch
            enabled={assignmentSettings.prioritizeUrgent}
            onChange={(newValue) => handleAssignmentToggle('prioritizeUrgent', newValue)}
            label="Prioritize Urgent"
            id="assignment-prioritize-urgent"
            size="small"
          />
          <ToggleSwitch
            enabled={assignmentSettings.notifyRiders}
            onChange={(newValue) => handleAssignmentToggle('notifyRiders', newValue)}
            label="Notify Riders"
            id="assignment-notify-riders"
            size="small"
          />
          <ToggleSwitch
            enabled={assignmentSettings.optimizeRoutes}
            onChange={(newValue) => handleAssignmentToggle('optimizeRoutes', newValue)}
            label="Optimize Routes"
            id="assignment-optimize-routes"
            size="small"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unassigned Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Unassigned Orders</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  selectedOrder?.id === order.id ? 'bg-emerald-50 border-emerald-200' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">#{order.orderNumber}</div>
                  <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {order.customer.name} • {order.customer.phone}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {order.deliveryAddress.area}, {order.deliveryAddress.city}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.priority || 'Normal'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Riders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Available Riders</h3>
            {selectedOrder && (
              <p className="text-sm text-gray-600 mt-1">
                Select a rider for order #{selectedOrder.orderNumber}
              </p>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {availableRiders.map((rider) => (
              <div
                key={rider.id}
                className="p-4 border-b hover:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">{rider.name}</div>
                      <div className="text-sm text-gray-600">{rider.vehicleType}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">⭐ {rider.rating}</div>
                    <div className="text-xs text-gray-500">
                      {rider.currentOrders}/{rider.maxOrders} orders
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    📍 {rider.currentLocation}
                  </div>
                  {selectedOrder && (
                    <button
                      onClick={() => assignOrder(selectedOrder.id, rider.id)}
                      disabled={rider.currentOrders >= rider.maxOrders}
                      className={`px-3 py-1 text-xs rounded-lg font-medium ${
                        rider.currentOrders >= rider.maxOrders
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      Assign
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium">Order ID:</span> #{selectedOrder.orderNumber}
              </div>
              <div>
                <span className="font-medium">Customer:</span> {selectedOrder.customer.name}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {selectedOrder.customer.phone}
              </div>
              <div>
                <span className="font-medium">Address:</span> {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.area}, {selectedOrder.deliveryAddress.city}
              </div>
              <div>
                <span className="font-medium">Items:</span> {selectedOrder.items.length} items
              </div>
              <div>
                <span className="font-medium">Total:</span> {formatCurrency(selectedOrder.total)}
              </div>
              <div>
                <span className="font-medium">Created:</span> {formatDate(selectedOrder.createdAt)}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No unassigned orders found.</p>
        </div>
      )}
    </div>
  );
};

export default AssignOrders;