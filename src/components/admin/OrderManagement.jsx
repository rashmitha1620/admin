import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, User, Package, MapPin, Phone, Calendar, Filter, Search, Eye, UserCheck } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [orderToAssignVendor, setOrderToAssignVendor] = useState(null);
  const [orderToAssignRider, setOrderToAssignRider] = useState(null);
  const [availableVendors, setAvailableVendors] = useState([]);
  const [availableRiders, setAvailableRiders] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedRider, setSelectedRider] = useState('');
  const [assigningVendor, setAssigningVendor] = useState(false);
  const [assigningRider, setAssigningRider] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for orders
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-001',
        customerName: 'John Doe',
        customerPhone: '+1234567890',
        items: [
          { name: 'Laptop', quantity: 1, price: 999.99 },
          { name: 'Mouse', quantity: 2, price: 25.99 }
        ],
        totalAmount: 1051.97,
        status: 'pending',
        orderDate: '2024-01-15T10:30:00Z',
        deliveryAddress: '123 Main St, City, State 12345',
        vendorId: null,
        riderId: null,
        estimatedDelivery: '2024-01-17T15:00:00Z'
      },
      {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        customerPhone: '+1987654321',
        items: [
          { name: 'Smartphone', quantity: 1, price: 699.99 }
        ],
        totalAmount: 699.99,
        status: 'assigned_vendor',
        orderDate: '2024-01-15T14:20:00Z',
        deliveryAddress: '456 Oak Ave, City, State 12345',
        vendorId: 'VEN-001',
        vendorName: 'Tech Solutions Inc.',
        riderId: null,
        estimatedDelivery: '2024-01-16T12:00:00Z'
      },
      {
        id: 'ORD-003',
        customerName: 'Bob Johnson',
        customerPhone: '+1122334455',
        items: [
          { name: 'Headphones', quantity: 1, price: 199.99 },
          { name: 'Cable', quantity: 3, price: 15.99 }
        ],
        totalAmount: 247.96,
        status: 'in_transit',
        orderDate: '2024-01-14T09:15:00Z',
        deliveryAddress: '789 Pine Rd, City, State 12345',
        vendorId: 'VEN-002',
        vendorName: 'Electronics Hub',
        riderId: 'RID-001',
        riderName: 'Mike Wilson',
        estimatedDelivery: '2024-01-15T18:00:00Z'
      }
    ];

    const mockVendors = [
      { id: 'VEN-001', name: 'Tech Solutions Inc.', rating: 4.8, available: true },
      { id: 'VEN-002', name: 'Electronics Hub', rating: 4.6, available: true },
      { id: 'VEN-003', name: 'Gadget World', rating: 4.7, available: true }
    ];

    const mockRiders = [
      { id: 'RID-001', name: 'Mike Wilson', rating: 4.9, available: true },
      { id: 'RID-002', name: 'Sarah Davis', rating: 4.8, available: true },
      { id: 'RID-003', name: 'Tom Brown', rating: 4.7, available: true }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setAvailableVendors(mockVendors);
      setAvailableRiders(mockRiders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, filterStatus, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned_vendor': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'assigned_vendor': return 'Assigned to Vendor';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const handleAssignVendor = (order) => {
    setOrderToAssignVendor(order);
    setShowVendorModal(true);
  };

  const handleAssignRider = (order) => {
    setOrderToAssignRider(order);
    setShowRiderModal(true);
  };

  const confirmVendorAssignment = async () => {
    if (!selectedVendor || !orderToAssignVendor) return;

    setAssigningVendor(true);
    
    // Simulate API call
    setTimeout(() => {
      const vendor = availableVendors.find(v => v.id === selectedVendor);
      const updatedOrders = orders.map(order =>
        order.id === orderToAssignVendor.id
          ? {
              ...order,
              status: 'assigned_vendor',
              vendorId: selectedVendor,
              vendorName: vendor.name
            }
          : order
      );
      
      setOrders(updatedOrders);
      setShowVendorModal(false);
      setSelectedVendor('');
      setOrderToAssignVendor(null);
      setAssigningVendor(false);
    }, 1500);
  };

  const confirmRiderAssignment = async () => {
    if (!selectedRider || !orderToAssignRider) return;

    setAssigningRider(true);
    
    // Simulate API call
    setTimeout(() => {
      const rider = availableRiders.find(r => r.id === selectedRider);
      const updatedOrders = orders.map(order =>
        order.id === orderToAssignRider.id
          ? {
              ...order,
              status: 'in_transit',
              riderId: selectedRider,
              riderName: rider.name
            }
          : order
      );
      
      setOrders(updatedOrders);
      setShowRiderModal(false);
      setSelectedRider('');
      setOrderToAssignRider(null);
      setAssigningRider(false);
    }, 1500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned_vendor">Assigned to Vendor</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleAssignVendor(order)}
                        className="text-green-600 hover:text-green-900 inline-flex items-center"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Assign Vendor
                      </button>
                    )}
                    {order.status === 'assigned_vendor' && (
                      <button
                        onClick={() => handleAssignRider(order)}
                        className="text-purple-600 hover:text-purple-900 inline-flex items-center"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Assign Rider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.orderDate)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Delivery</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.estimatedDelivery)}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedOrder.customerPhone}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.price)}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      Total: {formatCurrency(selectedOrder.totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Assignment Info */}
                {(selectedOrder.vendorName || selectedOrder.riderName) && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Assignment Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedOrder.vendorName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Assigned Vendor</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedOrder.vendorName}</p>
                        </div>
                      )}
                      {selectedOrder.riderName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Assigned Rider</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedOrder.riderName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Assignment Modal */}
      {showVendorModal && orderToAssignVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Assign Vendor</h2>
                <button
                  onClick={() => setShowVendorModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order: {orderToAssignVendor.id}
                  </label>
                  <p className="text-sm text-gray-600">
                    Customer: {orderToAssignVendor.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: {formatCurrency(orderToAssignVendor.totalAmount)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vendor
                  </label>
                  <select
                    value={selectedVendor}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a vendor...</option>
                    {availableVendors.filter(vendor => vendor.available).map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name} (Rating: {vendor.rating})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowVendorModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmVendorAssignment}
                    disabled={!selectedVendor || assigningVendor}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {assigningVendor ? (
                      <span>Assigning...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Assign Selected Vendor</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rider Assignment Modal */}
      {showRiderModal && orderToAssignRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Assign Rider</h2>
                <button
                  onClick={() => setShowRiderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order: {orderToAssignRider.id}
                  </label>
                  <p className="text-sm text-gray-600">
                    Customer: {orderToAssignRider.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Vendor: {orderToAssignRider.vendorName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Rider
                  </label>
                  <select
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a rider...</option>
                    {availableRiders.filter(rider => rider.available).map((rider) => (
                      <option key={rider.id} value={rider.id}>
                        {rider.name} (Rating: {rider.rating})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowRiderModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRiderAssignment}
                    disabled={!selectedRider || assigningRider}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {assigningRider ? (
                      <span>Assigning...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Assign Selected Rider</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;