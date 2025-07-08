import React, { useState } from 'react';
import { Plus, Upload, Download, Search, Filter, ToggleLeft, ToggleRight } from 'lucide-react';

const VendorStockPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  const products = [
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
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Stock Panel</h1>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Store Info Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Greenwood Market</h2>
            <p className="text-gray-600">Springfield</p>
            <p className="text-sm text-gray-500">Last synced 5 mins ago</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">
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
      <div className="flex items-center space-x-4">
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
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop a CSV file here, or <button className="text-emerald-600 hover:text-emerald-700">browse</button>
          </p>
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 mx-auto">
            <Download className="w-4 h-4" />
            <span>Download sample CSV</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
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
                  <button className="relative">
                    {product.showOnGrooso ? (
                      <div className="w-12 h-6 bg-emerald-600 rounded-full flex items-center">
                        <div className="w-5 h-5 bg-white rounded-full ml-1 transform translate-x-6 transition-transform"></div>
                      </div>
                    ) : (
                      <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center">
                        <div className="w-5 h-5 bg-white rounded-full ml-1 transition-transform"></div>
                      </div>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between">
        <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Sync Now</span>
        </button>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Actions
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorStockPanel;