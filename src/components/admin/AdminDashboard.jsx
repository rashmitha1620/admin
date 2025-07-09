import React, { useState } from 'react';
import AdminCard from '../common/AdminCard';
import StockPanelModal from '../common/StockPanelModal';

const AdminDashboard = () => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showStockModal, setShowStockModal] = useState(false);

  // Mock data for demonstration
  const vendors = [
    {
      id: 1,
      name: 'Frank Seft',
      businessName: 'HealthyMart',
      storeName: 'HealthyMart',
      contactPerson: 'Frank Seft',
      phone: '+1 (555) 123-4567',
      email: 'frank@healthymart.com',
      location: 'Springfield',
      category: 'Express',
      status: 'active',
      revenue: 125000,
      orders: 450,
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 2,
      name: 'Juson Pon',
      businessName: 'Fresh Mart',
      storeName: 'Fresh Mart',
      contactPerson: 'Juson Pon',
      phone: '+1 (555) 234-5678',
      email: 'juson@freshmart.com',
      location: 'City Mart',
      category: 'E-Commerce',
      status: 'active',
      revenue: 98000,
      orders: 320,
      rating: 4.6,
      reviewCount: 156
    },
    {
      id: 3,
      name: 'Jefta Sharf',
      businessName: 'Grocer Mart',
      storeName: 'Grocer Mart',
      contactPerson: 'Jefta Sharf',
      phone: '+1 (555) 345-6789',
      email: 'jefta@grocermart.com',
      location: 'City Mart',
      category: 'Express',
      status: 'pending',
      revenue: 75000,
      orders: 280,
      rating: 4.4,
      reviewCount: 67
    }
  ];

  const storeOwners = [
    {
      id: 1,
      name: 'Rajesh Gupta',
      storeName: 'Gupta General Store',
      contactPerson: 'Rajesh Gupta',
      phone: '+91 98765 43210',
      address: 'Main Market, Sector 15, Noida',
      storeType: 'General Store',
      category: 'Groceries',
      status: 'active',
      revenue: 125000,
      orders: 450
    },
    {
      id: 2,
      name: 'Priya Sharma',
      storeName: 'Sharma Electronics',
      contactPerson: 'Priya Sharma',
      phone: '+91 98765 43211',
      address: 'Electronics Market, Lajpat Nagar, Delhi',
      storeType: 'Electronics Store',
      category: 'Electronics',
      status: 'active',
      revenue: 280000,
      orders: 320
    },
    {
      id: 3,
      name: 'Amit Patel',
      storeName: 'Patel Medical Store',
      contactPerson: 'Amit Patel',
      phone: '+91 98765 43212',
      address: 'Medical Square, Ahmedabad',
      storeType: 'Pharmacy',
      category: 'Healthcare',
      status: 'pending',
      revenue: 95000,
      orders: 180
    }
  ];

  const sellers = [
    {
      id: 1,
      name: 'Amit Kumar',
      businessName: 'Kumar Handicrafts',
      contactPerson: 'Amit Kumar',
      email: 'amit@kumarhandicrafts.com',
      location: 'Jaipur, Rajasthan',
      category: 'Handicrafts',
      status: 'active',
      revenue: 85000,
      orders: 156,
      rating: 4.7,
      reviewCount: 89
    },
    {
      id: 2,
      name: 'Sunita Devi',
      businessName: 'Devi Textiles',
      contactPerson: 'Sunita Devi',
      email: 'sunita@devitextiles.com',
      location: 'Varanasi, UP',
      category: 'Textiles',
      status: 'active',
      revenue: 120000,
      orders: 234,
      rating: 4.5,
      reviewCount: 156
    },
    {
      id: 3,
      name: 'Ravi Singh',
      businessName: 'Singh Crafts',
      contactPerson: 'Ravi Singh',
      email: 'ravi@singhcrafts.com',
      location: 'Jodhpur, Rajasthan',
      category: 'Handicrafts',
      status: 'suspended',
      revenue: 65000,
      orders: 98,
      rating: 4.2,
      reviewCount: 45
    }
  ];

  const handleView = (entity, type) => {
    setSelectedEntity(entity);
    setModalType(type);
    if (window.showNotification) {
      window.showNotification('View Details', `Viewing ${entity.name || entity.storeName}`, 'info');
    }
  };

  const handleEdit = (entity, type) => {
    setSelectedEntity(entity);
    setModalType(type);
    setShowStockModal(true);
    if (window.showNotification) {
      window.showNotification('Edit Mode', `Opening stock panel for ${entity.name || entity.storeName}`, 'info');
    }
  };

  const handleSaveStock = (products) => {
    console.log('Saving stock data:', products);
    if (window.showNotification) {
      window.showNotification('Success', 'Stock data saved successfully!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage vendors, store owners, and sellers</p>
        </div>

        {/* Vendors Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Vendors</h2>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              {vendors.length} Total
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <AdminCard
                key={vendor.id}
                id={vendor.id}
                name={vendor.name}
                type="vendor"
                businessName={vendor.businessName}
                contactPerson={vendor.contactPerson}
                phone={vendor.phone}
                email={vendor.email}
                location={vendor.location}
                category={vendor.category}
                status={vendor.status}
                revenue={vendor.revenue}
                orders={vendor.orders}
                rating={vendor.rating}
                reviewCount={vendor.reviewCount}
                onView={(id) => handleView(vendor, 'vendor')}
                onEdit={(id) => handleEdit(vendor, 'vendor')}
              />
            ))}
          </div>
        </section>

        {/* Store Owners Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Store Owners</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {storeOwners.length} Total
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeOwners.map((owner) => (
              <AdminCard
                key={owner.id}
                id={owner.id}
                name={owner.name}
                type="store"
                storeName={owner.storeName}
                contactPerson={owner.contactPerson}
                phone={owner.phone}
                address={owner.address}
                storeType={owner.storeType}
                category={owner.category}
                status={owner.status}
                revenue={owner.revenue}
                orders={owner.orders}
                onView={(id) => handleView(owner, 'store')}
                onEdit={(id) => handleEdit(owner, 'store')}
              />
            ))}
          </div>
        </section>

        {/* Sellers Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Sellers</h2>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {sellers.length} Total
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <AdminCard
                key={seller.id}
                id={seller.id}
                name={seller.name}
                type="seller"
                businessName={seller.businessName}
                contactPerson={seller.contactPerson}
                email={seller.email}
                location={seller.location}
                category={seller.category}
                status={seller.status}
                revenue={seller.revenue}
                orders={seller.orders}
                rating={seller.rating}
                reviewCount={seller.reviewCount}
                onView={(id) => handleView(seller, 'seller')}
                onEdit={(id) => handleEdit(seller, 'seller')}
              />
            ))}
          </div>
        </section>

        {/* Stock Panel Modal */}
        <StockPanelModal
          isOpen={showStockModal}
          onClose={() => {
            setShowStockModal(false);
            setSelectedEntity(null);
            setModalType(null);
          }}
          entity={selectedEntity}
          type={modalType}
          onSave={handleSaveStock}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;