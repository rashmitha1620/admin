import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Store, MapPin, Phone, X, Calendar, DollarSign, Package, Upload, Download } from 'lucide-react';
import { storeOwnersApi } from '../../services/api';
import { formatDate, getStatusColor } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';

const StoreOwners = () => {
  const [storeOwners, setStoreOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=100',
      name: 'Cereal',
      sku: '12345',
      price: '$4.99',
      stock: 20,
      tags: 'Low Stock',
      showOnGrooso: true
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=100',
      name: 'Coffee',
      sku: '67690',
      price: '$8.99',
      stock: 50,
      tags: 'Bestseller',
      showOnGrooso: true
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=100',
      name: 'Laundry Detergent',
      sku: '54321',
      price: '$12.99',
      stock: 15,
      tags: 'Bestseller',
      showOnGrooso: true
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=100',
      name: 'Olive Oil',
      sku: '98765',
      price: '$10.99',
      stock: 0,
      tags: 'O',
      showOnGrooso: false
    }
  ]);

  useEffect(() => {
    fetchStoreOwners();
  }, []);

  const fetchStoreOwners = async () => {
    try {
      const response = await storeOwnersApi.getStoreOwners();
      setStoreOwners(response.data);
    } catch (error) {
      console.error('Error fetching store owners:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStoreOwners = storeOwners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         owner.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || owner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (owner) => {
    setEditingOwner(owner);
    setShowEditModal(true);
  };

  const handleToggleProduct = (productId, newValue) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, showOnGrooso: newValue }
          : product
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading store owners..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Store Owners</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage physical store owners and their locations</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span>Add Store Owner</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Store Owners</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">127</p>
            </div>
            <Store className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Stores</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">98</p>
            </div>
            <Store className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">15</p>
            </div>
            <Store className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Cities Covered</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">23</p>
            </div>
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search store owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Store Owners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredStoreOwners.map((owner) => (
          <div key={owner.id} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{owner.storeName}</h3>
                  <p className="text-sm text-gray-600 truncate">{owner.name}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(owner.status)}`}>
                {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{owner.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{owner.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Store className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{owner.storeType} • {owner.category}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <span className="text-xs text-gray-600">Monthly Revenue</span>
                  <p className="font-semibold text-emerald-600 text-sm">₹{owner.monthlyRevenue?.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-600">Orders</span>
                  <p className="font-semibold text-sm">{owner.monthlyOrders}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedOwner(owner)}
                  className="flex-1 bg-emerald-100 text-emerald-700 py-2 px-3 rounded text-sm hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleEditClick(owner)}
                  className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Store Owner Modal */}
      {selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Store Owner Details</h3>
                <button
                  onClick={() => setSelectedOwner(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Store Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Store className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{selectedOwner.storeName}</h4>
                      <p className="text-gray-600">{selectedOwner.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedOwner.status)}`}>
                        {selectedOwner.status.charAt(0).toUpperCase() + selectedOwner.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Type</label>
                      <p className="text-sm text-gray-900">{selectedOwner.storeType}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h5 className="text-lg font-semibold mb-3">Contact Information</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{selectedOwner.phone}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <span className="text-sm text-gray-900">{selectedOwner.category}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-900">{selectedOwner.address}</span>
                    </div>
                  </div>
                </div>

                {/* Business Metrics */}
                <div>
                  <h5 className="text-lg font-semibold mb-3">Business Metrics</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">Monthly Revenue</span>
                      </div>
                      <p className="text-xl font-bold text-emerald-600">₹{selectedOwner.monthlyRevenue?.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Monthly Orders</span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{selectedOwner.monthlyOrders}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Joined</span>
                      </div>
                      <p className="text-sm font-bold text-purple-600">{formatDate(selectedOwner.joinedDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t">
                  <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                    Edit Store Owner
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Orders
                  </button>
                  <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Store Owner Modal - Vendor Stock Panel */}
      {showEditModal && editingOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold">Vendor Stock Panel</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <img 
                        src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=50" 
                        alt="User" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Store Info Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Greenwood Market</h2>
                    <p className="text-gray-600">Springfield</p>
                    <p className="text-sm text-gray-500">Last synced 5 mins ago</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-lg">
                        120
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">In Stock</p>
                      <p className="text-2xl font-bold">95</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Out of Stock</p>
                      <p className="text-2xl font-bold">25</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Import OSV
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Export Stock
                </button>
              </div>

              {/* File Upload Area */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop a CSV file here, or <button className="text-emerald-600 hover:text-emerald-700 underline">browse</button>
                  </p>
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 mx-auto">
                    <Download className="w-4 h-4" />
                    <span>Download sample CSV</span>
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search (by product name or SKU)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">Category</option>
                  <option value="food">Food</option>
                  <option value="beverages">Beverages</option>
                  <option value="household">Household</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">In Stock</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Filter
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SKU
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Selling Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tags
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Show on Grooso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{product.name}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{product.sku}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{product.price}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              product.tags === 'Low Stock' ? 'bg-red-100 text-red-800' :
                              product.tags === 'Bestseller' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {product.tags}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <ToggleSwitch
                              enabled={product.showOnGrooso}
                              onChange={(newValue) => handleToggleProduct(product.id, newValue)}
                              size="medium"
                              id={`product-toggle-${product.id}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sync Now</span>
                </button>
                <div className="flex items-center space-x-3">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Actions
                  </button>
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Store Owner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Store Owner</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter store name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter owner name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="">Select store type</option>
                    <option value="General Store">General Store</option>
                    <option value="Electronics Store">Electronics Store</option>
                    <option value="Grocery Store">Grocery Store</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Store Owner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {filteredStoreOwners.length === 0 && (
        <div className="text-center py-12">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No store owners found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StoreOwners;