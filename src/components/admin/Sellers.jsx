import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, User, Star, TrendingUp, X } from 'lucide-react';
import { sellersApi } from '../../services/api';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';
import ToggleSwitch from '../common/ToggleSwitch';
import EntityCard from '../common/EntityCard';
import EntityModal from '../common/EntityModal';
import StockPanelModal from '../common/StockPanelModal';

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sellerSettings, setSellerSettings] = useState({});
  const [showAddSellerModal, setShowAddSellerModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);
  const [showStockPanel, setShowStockPanel] = useState(false);
  const [newSeller, setNewSeller] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    category: '',
    location: ''
  });
  const [inviteData, setInviteData] = useState({
    email: '',
    businessName: '',
    contactPerson: ''
  });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await sellersApi.getSellers();
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSeller = () => {
    if (newSeller.name && newSeller.businessName && newSeller.email) {
      const seller = {
        id: `s${Date.now()}`,
        ...newSeller,
        productCount: 0,
        rating: 4.0,
        reviewCount: 0,
        monthlyRevenue: 0,
        status: 'pending'
      };
      setSellers(prev => [...prev, seller]);
      setNewSeller({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        category: '',
        location: ''
      });
      setShowAddSellerModal(false);
      if (window.showNotification) {
        window.showNotification('Success', 'Seller added successfully!', 'success');
      }
    }
  };

  const handleSendInvite = () => {
    if (inviteData.email && inviteData.businessName) {
      const inviteLink = `https://grooso.com/seller-invite/${btoa(inviteData.email)}`;
      navigator.clipboard.writeText(inviteLink).then(() => {
        if (window.showNotification) {
          window.showNotification('Invite Sent', `Seller invitation sent to ${inviteData.email}`, 'success');
        }
      });
      setInviteData({ email: '', businessName: '', contactPerson: '' });
      setShowInviteModal(false);
    }
  };

  const handleSellerToggle = (sellerId, setting, newValue) => {
    setSellerSettings(prev => ({
      ...prev,
      [sellerId]: {
        ...prev[sellerId],
        [setting]: newValue
      }
    }));
    
    // Log for debugging
    console.log(`Seller ${sellerId} setting ${setting} changed to:`, newValue);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading sellers..." />
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Sellers</h2>
          <p className="text-gray-600">Manage individual sellers and their products</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddSellerModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Seller</span>
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
              <p className="text-sm font-medium text-gray-600">Total Sellers</p>
              <p className="text-2xl font-bold text-gray-900">456</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sellers</p>
              <p className="text-2xl font-bold text-gray-900">389</p>
            </div>
            <User className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performers</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search sellers..."
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
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Sellers Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredSellers.map((seller) => (
          <EntityCard
            key={seller.id}
            id={seller.id}
            type="seller"
            name={seller.name}
            businessName={seller.businessName}
            email={seller.email}
            location={seller.location}
            category={seller.category}
            status={seller.status}
            revenue={seller.monthlyRevenue}
            orders={seller.productCount}
            rating={seller.rating}
            reviewCount={seller.reviewCount}
            onView={() => {
              setSelectedSeller(seller);
              if (window.showNotification) {
                window.showNotification('View Seller', `Viewing details for ${seller.name}`, 'info');
              }
            }}
            onEdit={() => {
              setEditingSeller(seller);
              setShowStockPanel(true);
              if (window.showNotification) {
                window.showNotification('Edit Mode', `Editing ${seller.name}`, 'info');
              }
            }}
            customActions={
              <ToggleSwitch
                enabled={sellerSettings[seller.id]?.featured || false}
                onChange={(newValue) => handleSellerToggle(seller.id, 'featured', newValue)}
                size="small"
                label="Featured"
                id={`seller-featured-${seller.id}`}
              />
            }
          />
        ))}
      </div>

      {filteredSellers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No sellers found matching your criteria.</p>
        </div>
      )}

      {/* Edit Seller Modal */}
      {showEditModal && editingSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Edit Seller</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingSeller(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                // Update seller logic here
                setShowEditModal(false);
                setEditingSeller(null);
                if (window.showNotification) {
                  window.showNotification('Success', 'Seller updated successfully!', 'success');
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller Name</label>
                  <input
                    type="text"
                    defaultValue={editingSeller.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter seller name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    defaultValue={editingSeller.businessName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={editingSeller.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    defaultValue={editingSeller.location}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    defaultValue={editingSeller.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingSeller(null);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Update Seller
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Seller Modal */}
      <EntityModal
        isOpen={!!selectedSeller}
        onClose={() => setSelectedSeller(null)}
        entity={selectedSeller}
        type="seller"
        title="Seller Details"
        actions={
          <>
            <button 
              onClick={() => {
                setEditingSeller(selectedSeller);
                setShowEditModal(true);
                setSelectedSeller(null);
              }}
              className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Edit Seller
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              View Products
            </button>
            <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
              Contact Seller
            </button>
          </>
        }
      />

      {/* Stock Panel Modal */}
      <StockPanelModal
        isOpen={showStockPanel && editingSeller}
        onClose={() => {
          setShowStockPanel(false);
          setEditingSeller(null);
        }}
        entity={editingSeller}
        type="seller"
        onSave={(products) => {
          console.log('Saving products for seller:', editingSeller?.businessName, products);
          if (window.showNotification) {
            window.showNotification('Success', `Stock updated for ${editingSeller?.businessName}`, 'success');
          }
          setShowStockPanel(false);
          setEditingSeller(null);
        }}
      />
    </div>

    {/* Add Seller Modal */}
    {showAddSellerModal && !showStockPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Seller</h3>
                <button
                  onClick={() => setShowAddSellerModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddSeller(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller Name</label>
                  <input
                    type="text"
                    value={newSeller.name}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter seller name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={newSeller.businessName}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newSeller.email}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newSeller.phone}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newSeller.category}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Fashion">Fashion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newSeller.location}
                    onChange={(e) => setNewSeller(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddSellerModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Seller
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )}

    {/* Send Invite Modal */}
    {showInviteModal && !showStockPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Send Seller Invite</h3>
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

export default Sellers;