import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, MessageSquare, CheckCircle, XCircle, UserPlus, Clock, Package, Users } from 'lucide-react';
import { ordersApi, deliveryApi } from '../../services/api';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';
import { ORDER_STATUS } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderSettings, setOrderSettings] = useState({});
  const [activeTab, setActiveTab] = useState('new');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [orderToAssign, setOrderToAssign] = useState(null);

  const tabs = [
    { id: 'new', label: 'New Orders', icon: Clock, count: 0 },
    { id: 'accepted', label: 'Accepted Orders', icon: CheckCircle, count: 0 },
    { id: 'rejected', label: 'Rejected Orders', icon: XCircle, count: 0 }
  ];

  useEffect(() => {
    fetchOrders();
    fetchDeliveryPartners();
  }, []);

  // Update tab counts when orders change
  useEffect(() => {
    const newCount = orders.filter(order => order.status === 'pending').length;
    const acceptedCount = orders.filter(order => ['confirmed', 'assigned'].includes(order.status)).length;
    const rejectedCount = orders.filter(order => order.status === 'cancelled').length;

    tabs[0].count = newCount;
    tabs[1].count = acceptedCount;
    tabs[2].count = rejectedCount;
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await ordersApi.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryPartners = async () => {
    try {
      const response = await deliveryApi.getDeliveryPartners();
      setDeliveryPartners(response.data);
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Show success notification
      if (window.showNotification) {
        const statusMessages = {
          confirmed: 'Order accepted successfully!',
          cancelled: 'Order rejected successfully!',
          assigned: 'Order assigned successfully!'
        };
        window.showNotification('Success', statusMessages[newStatus] || 'Order status updated!', 'success');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      if (window.showNotification) {
        window.showNotification('Error', 'Failed to update order status', 'error');
      }
    }
  };

  const acceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'confirmed');
  };

  const rejectOrder = (orderId) => {
    if (window.confirm('Are you sure you want to reject this order?')) {
      updateOrderStatus(orderId, 'cancelled');
    }
  };

  const assignDeliveryPartner = async (orderId, partnerId) => {
    try {
      await deliveryApi.assignOrder(orderId, partnerId);
      const partner = deliveryPartners.find(p => p.id === partnerId);
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, deliveryPartner: partner.name, status: 'assigned' }
          : order
      ));
      setShowAssignModal(false);
      setOrderToAssign(null);
      
      if (window.showNotification) {
        window.showNotification('Success', `Order assigned to ${partner.name}`, 'success');
      }
    } catch (error) {
      console.error('Error assigning delivery partner:', error);
      if (window.showNotification) {
        window.showNotification('Error', 'Failed to assign delivery partner', 'error');
      }
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
    
    // Log for debugging
    console.log(`Order ${orderId} setting ${setting} changed to:`, newValue);
  };

  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by tab
    switch (activeTab) {
      case 'new':
        filtered = filtered.filter(order => order.status === 'pending');
        break;
      case 'accepted':
        filtered = filtered.filter(order => ['confirmed', 'assigned'].includes(order.status));
        break;
      case 'rejected':
        filtered = filtered.filter(order => order.status === 'cancelled');
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter (for accepted orders tab)
    if (statusFilter && activeTab === 'accepted') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  const openAssignModal = (order) => {
    setOrderToAssign(order);
    setShowAssignModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-600">Manage new orders, accepted orders, and rejected orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'pending').length}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.filter(o => ['confirmed', 'assigned'].includes(o.status)).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'cancelled').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            {activeTab === 'accepted' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="assigned">Assigned</option>
              </select>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        #{order.orderNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} item(s)
                      </div>
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
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* New Orders Actions */}
                      {activeTab === 'new' && order.status === 'pending' && (
                        <>
                          <button
                            onClick={() => acceptOrder(order.id)}
                            className="text-emerald-600 hover:text-emerald-900"
                            title="Accept Order"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => rejectOrder(order.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Accepted Orders Actions */}
                      {activeTab === 'accepted' && order.status === 'confirmed' && (
                        <button
                          onClick={() => openAssignModal(order)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Assign Rider"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      )}

                      {/* Show delivery partner for assigned orders */}
                      {order.deliveryPartner && (
                        <span className="text-xs text-gray-500">
                          Assigned to: {order.deliveryPartner}
                        </span>
                      )}

                      <ToggleSwitch
                        enabled={orderSettings[order.id]?.priority || false}
                        onChange={(newValue) => handleOrderToggle(order.id, 'priority', newValue)}
                        size="small"
                        label="Priority"
                        id={`order-priority-${order.id}`}
                        compact={true}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {activeTab === 'new' && 'No new orders found.'}
              {activeTab === 'accepted' && 'No accepted orders found.'}
              {activeTab === 'rejected' && 'No rejected orders found.'}
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number
                    </label>
                    <p className="text-sm text-gray-900">#{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Order Actions in Modal */}
                {selectedOrder.status === 'pending' && (
                  <div className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => {
                        acceptOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept Order</span>
                    </button>
                    <button
                      onClick={() => {
                        rejectOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Order</span>
                    </button>
                  </div>
                )}

                {selectedOrder.status === 'confirmed' && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <button
                      onClick={() => {
                        openAssignModal(selectedOrder);
                        setSelectedOrder(null);
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Assign to Rider</span>
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Information
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm"><strong>Name:</strong> {selectedOrder.customer.name}</p>
                    <p className="text-sm"><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                    <p className="text-sm"><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">
                      {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.area}, 
                      {selectedOrder.deliveryAddress.city} - {selectedOrder.deliveryAddress.pincode}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Items
                  </label>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-xl font-bold text-emerald-600">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Rider Modal */}
      {showAssignModal && orderToAssign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Assign Rider</h3>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setOrderToAssign(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Assign order <strong>#{orderToAssign.orderNumber}</strong> to a delivery partner:
                </p>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {deliveryPartners
                  .filter(partner => partner.currentOrders < partner.maxOrders)
                  .map(partner => (
                    <div
                      key={partner.id}
                      className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => assignDeliveryPartner(orderToAssign.id, partner.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-gray-500">{partner.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">⭐ {partner.rating}</p>
                          <p className="text-xs text-gray-500">
                            {partner.currentOrders}/{partner.maxOrders} orders
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {deliveryPartners.filter(partner => partner.currentOrders < partner.maxOrders).length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No available delivery partners</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;