import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Store, Clock, CheckCircle } from 'lucide-react';
import { ordersApi } from '../../services/api';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';

const CityMartOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [orderSettings, setOrderSettings] = useState({});
  const [viewSettings, setViewSettings] = useState({
    showPickupOnly: false,
    autoAssign: true,
    storeNotifications: false
  });

  useEffect(() => {
    fetchCityMartOrders();
  }, []);

  const fetchCityMartOrders = async () => {
    try {
      const response = await ordersApi.getCityMartOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching city mart orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleOrderToggle = (orderId, setting, newValue) => {
    setOrderSettings(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [setting]: newValue
      }
    }));
  };

  const handleViewToggle = (setting, newValue) => {
    setViewSettings(prev => ({
      ...prev,
      [setting]: newValue
    }));
    
    // Log for debugging
    console.log(`City mart orders view setting ${setting} changed to:`, newValue);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPickup = !viewSettings.showPickupOnly || order.orderType === 'pickup';
    return matchesSearch && matchesStatus && matchesPickup;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading city mart orders..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">City Mart Orders</h2>
          <p className="text-gray-600">Local store pickup and delivery orders</p>
        </div>
        <div className="flex space-x-3">
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="ready_pickup">Ready for Pickup</option>
            <option value="picked_up">Picked Up</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">234</p>
            </div>
            <Store className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Picked Up</p>
              <p className="text-2xl font-bold text-gray-900">78</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">111</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Store Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">Store Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ToggleSwitch
            enabled={viewSettings.showPickupOnly}
            onChange={(newValue) => handleViewToggle('showPickupOnly', newValue)}
            label="Show Pickup Only"
            id="citymart-pickup-only"
            size="small"
          />
          <ToggleSwitch
            enabled={viewSettings.autoAssign}
            onChange={(newValue) => handleViewToggle('autoAssign', newValue)}
            label="Auto Assign"
            id="citymart-auto-assign"
            size="small"
          />
          <ToggleSwitch
            enabled={viewSettings.storeNotifications}
            onChange={(newValue) => handleViewToggle('storeNotifications', newValue)}
            label="Store Notifications"
            id="citymart-store-notifications"
            size="small"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.store}</div>
                    <div className="text-sm text-gray-500">{order.storeAddress}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.orderType === 'pickup' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.orderType === 'pickup' ? 'Pickup' : 'Delivery'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items.length} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-sm font-medium px-3 py-1 rounded-full border-0 ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="ready_pickup">Ready for Pickup</option>
                      <option value="picked_up">Picked Up</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <ToggleSwitch
                      enabled={orderSettings[order.id]?.readyForPickup || false}
                      onChange={(newValue) => handleOrderToggle(order.id, 'readyForPickup', newValue)}
                      size="small"
                      label="Ready"
                      id={`citymart-ready-${order.id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityMartOrders;