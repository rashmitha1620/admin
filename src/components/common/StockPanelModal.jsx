import React, { useState } from 'react';
import { X, Plus, Upload, Download, Search, Filter } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

const StockPanelModal = ({ 
  isOpen, 
  onClose, 
  entity, 
  type,
  onSave 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
    image: null
  });

  // Mock products data - in real app, this would come from props or API
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
      tags: 'Out of Stock',
      showOnGrooso: false
    }
  ]);

  if (!isOpen || !entity) return null;

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.sku && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        showOnGrooso: true,
        tags: newProduct.stock < 10 ? 'Low Stock' : 'In Stock'
      };
      setProducts(prev => [...prev, product]);
      setNewProduct({
        name: '',
        sku: '',
        price: '',
        stock: '',
        category: '',
        image: null
      });
      setShowAddProductModal(false);
      if (window.showNotification) {
        window.showNotification('Success', 'Product added successfully!', 'success');
      }
    }
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getEntityName = () => {
    if (type === 'store') return entity.storeName || entity.name;
    if (type === 'vendor') return entity.businessName || entity.storeName || entity.name;
    if (type === 'seller') return entity.businessName || entity.name;
    return entity.name;
  };

  const getEntityLocation = () => {
    return entity.location || entity.address || entity.city || 'Unknown Location';
  };

  const getPanelTitle = () => {
    switch (type) {
      case 'vendor':
        return 'Vendor Stock Panel';
      case 'seller':
        return 'Seller Inventory Panel';
      case 'store':
        return 'Store Inventory Panel';
      default:
        return 'Stock Panel';
    }
  };

  const inStockCount = products.filter(p => p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  const totalProducts = products.length;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold">{getPanelTitle()}</h3>
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
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Store Info Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {getEntityName()}
                  </h2>
                  <p className="text-gray-600">{getEntityLocation()}</p>
                  <p className="text-sm text-gray-500">Last synced 5 mins ago</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-lg">
                      {totalProducts}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">In Stock</p>
                    <p className="text-2xl font-bold">{inStockCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold">{outOfStockCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button 
                onClick={() => setShowAddProductModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import CSV</span>
              </button>
              <button 
                onClick={() => {
                  const csvData = products.map(p => ({
                    name: p.name,
                    sku: p.sku,
                    price: p.price,
                    stock: p.stock,
                    tags: p.tags,
                    showOnGrooso: p.showOnGrooso
                  }));
                  const csv = [
                    Object.keys(csvData[0]).join(','),
                    ...csvData.map(row => Object.values(row).join(','))
                  ].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'products.csv';
                  a.click();
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Stock</span>
              </button>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop a CSV file here, or <button className="text-emerald-600 hover:text-emerald-700">browse</button>
              </p>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 mx-auto">
                <Download className="w-4 h-4" />
                <span>Download sample CSV</span>
              </button>
            </div>

            {/* Bulk Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Bulk Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => {
                    setProducts(prev => prev.map(p => ({ ...p, showOnGrooso: true })));
                    if (window.showNotification) {
                      window.showNotification('Success', 'All products enabled on Grooso', 'success');
                    }
                  }}
                  className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
                >
                  Enable All on Grooso
                </button>
                <button 
                  onClick={() => {
                    setProducts(prev => prev.map(p => ({ ...p, showOnGrooso: false })));
                    if (window.showNotification) {
                      window.showNotification('Success', 'All products disabled on Grooso', 'success');
                    }
                  }}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Disable All on Grooso
                </button>
                <button 
                  onClick={() => {
                    const lowStockProducts = products.filter(p => p.stock < 10);
                    if (window.showNotification) {
                      window.showNotification('Info', `${lowStockProducts.length} products have low stock`, 'warning');
                    }
                  }}
                  className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Check Low Stock
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Category</option>
                <option value="food">Food</option>
                <option value="beverages">Beverages</option>
                <option value="household">Household</option>
              </select>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
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
                            product.tags === 'Out of Stock' ? 'bg-red-100 text-red-800' :
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
                <button 
                  onClick={() => {
                    if (onSave) onSave(products);
                    onClose();
                    if (window.showNotification) {
                      window.showNotification('Success', 'Changes saved successfully!', 'success');
                    }
                  }}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Add New Product</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  {newProduct.image && (
                    <img src={newProduct.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter SKU"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="$0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="food">Food & Beverages</option>
                    <option value="household">Household Items</option>
                    <option value="personal">Personal Care</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Product
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

export default StockPanelModal;