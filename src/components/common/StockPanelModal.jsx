import React, { useState } from 'react';
import { X, Plus, Upload, Download, Search, Filter, Edit } from 'lucide-react';
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
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };

  const saveEditedProduct = () => {
    if (editingProduct) {
      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? editingProduct : p)
      );
      setShowEditProductModal(false);
      setEditingProduct(null);
      if (window.showNotification) {
        window.showNotification('Success', 'Product updated successfully!', 'success');
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

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setIsImporting(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csv = event.target.result;
          const lines = csv.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          
          const importedProducts = [];
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
              const product = {
                id: Date.now() + i,
                name: values[headers.indexOf('name')] || values[headers.indexOf('Product Name')] || '',
                sku: values[headers.indexOf('sku')] || values[headers.indexOf('SKU')] || '',
                price: values[headers.indexOf('price')] || values[headers.indexOf('Price')] || '',
                stock: parseInt(values[headers.indexOf('stock')] || values[headers.indexOf('Stock')] || '0'),
                tags: values[headers.indexOf('tags')] || values[headers.indexOf('Tags')] || 'In Stock',
                showOnGrooso: values[headers.indexOf('showOnGrooso')] === 'true' || values[headers.indexOf('Show on Grooso')] === 'true',
                image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=100'
              };
              
              if (product.name && product.sku) {
                importedProducts.push(product);
              }
            }
          }
          
          setProducts(prev => [...prev, ...importedProducts]);
          setIsImporting(false);
          
          if (window.showNotification) {
            window.showNotification('Import Successful', `${importedProducts.length} products imported successfully!`, 'success');
          }
        } catch (error) {
          setIsImporting(false);
          if (window.showNotification) {
            window.showNotification('Import Failed', 'Error parsing CSV file. Please check the format.', 'error');
          }
        }
      };
      reader.readAsText(file);
    } else {
      if (window.showNotification) {
        window.showNotification('Invalid File', 'Please select a valid CSV file.', 'error');
      }
    }
    // Reset the input
    e.target.value = '';
  };

  const handleExportStock = () => {
    const csvData = products.map(p => ({
      'Product Name': p.name,
      'SKU': p.sku,
      'Price': p.price,
      'Stock': p.stock,
      'Tags': p.tags,
      'Show on Grooso': p.showOnGrooso
    }));
    
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${getEntityName()}_products_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    if (window.showNotification) {
      window.showNotification('Export Successful', 'Products exported to CSV successfully!', 'success');
    }
  };

  const handleDownloadSample = () => {
    const sampleData = [
      {
        'Product Name': 'Sample Product 1',
        'SKU': 'SKU001',
        'Price': '$19.99',
        'Stock': '50',
        'Tags': 'In Stock',
        'Show on Grooso': 'true'
      },
      {
        'Product Name': 'Sample Product 2',
        'SKU': 'SKU002',
        'Price': '$29.99',
        'Stock': '5',
        'Tags': 'Low Stock',
        'Show on Grooso': 'true'
      },
      {
        'Product Name': 'Sample Product 3',
        'SKU': 'SKU003',
        'Price': '$39.99',
        'Stock': '0',
        'Tags': 'Out of Stock',
        'Show on Grooso': 'false'
      }
    ];
    
    const headers = Object.keys(sampleData[0]);
    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample_products.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    if (window.showNotification) {
      window.showNotification('Sample Downloaded', 'Sample CSV file downloaded successfully!', 'success');
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
              {/* Import CSV Button */}
              <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{isImporting ? 'Importing...' : 'Import CSV'}</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                  disabled={isImporting}
                />
              </label>
              <button 
                onClick={handleExportStock}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Stock</span>
              </button>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 relative">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop a CSV file here, or 
                <label className="text-emerald-600 hover:text-emerald-700 cursor-pointer ml-1">
                  browse
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="hidden"
                  />
                </label>
              </p>
              <button 
                onClick={handleDownloadSample}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download sample CSV</span>
              </button>
              
              {/* Drag and Drop Overlay */}
              <div 
                className="absolute inset-0 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center opacity-0 pointer-events-none transition-opacity"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.opacity = '1';
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.opacity = '0';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.opacity = '0';
                  const files = e.dataTransfer.files;
                  if (files.length > 0 && files[0].type === 'text/csv') {
                    const event = { target: { files: [files[0]] } };
                    handleImportCSV(event);
                  }
                }}
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-700 font-medium">Drop CSV file here</p>
                </div>
              </div>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
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
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                        Show on Grooso
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                        Actions
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
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="ml-2 text-blue-600 hover:text-blue-900"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
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
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <ToggleSwitch
                            enabled={product.showOnGrooso}
                            onChange={(newValue) => handleToggleProduct(product.id, newValue)}
                            size="medium"
                            id={`product-toggle-${product.id}`}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
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

      {/* Edit Product Modal */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Edit Product</h3>
                <button
                  onClick={() => {
                    setShowEditProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveEditedProduct(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={editingProduct.image} 
                      alt={editingProduct.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter SKU"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="$0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <select
                    value={editingProduct.tags}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Bestseller">Bestseller</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Show on Grooso</label>
                  <ToggleSwitch
                    enabled={editingProduct.showOnGrooso}
                    onChange={(newValue) => setEditingProduct(prev => ({ ...prev, showOnGrooso: newValue }))}
                    size="medium"
                    id="edit-product-toggle"
                  />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditProductModal(false);
                      setEditingProduct(null);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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