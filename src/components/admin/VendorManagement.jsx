import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Send as Suspend, CheckCircle } from 'lucide-react';

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendorStats = [
    { label: 'Total Vendors', value: '391', trend: 'up' },
    { label: 'Active Vendors', value: '284', trend: 'up' },
    { label: 'Pending Approval', value: '12', trend: 'neutral' },
    { label: 'Suspended Vendors', value: '5', trend: 'down' }
  ];

  const vendors = [
    {
      id: 1,
      storeName: 'HealthyMart',
      storeIcon: '🏪',
      vendor: 'Frank Seft',
      testMailey: 'Test Mailey',
      city: 'Express',
      type: 'Express',
      status: 'Active',
      products: 326,
      lastSync: '2 hrgo ago',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      storeName: 'Fresh Mart',
      storeIcon: '🍃',
      vendor: 'Juson Pon',
      testMailey: 'E-Commerce',
      city: 'City Mart',
      type: 'Expresse',
      status: 'View'
    },
    {
      id: 3,
      storeName: 'Grocer Mart',
      storeIcon: '🛒',
      vendor: 'Jefta Sharf',
      testMailey: 'Express',
      city: 'City Mart',
      type: 'Express',
      status: 'View'
    },
    {
      id: 4,
      storeName: 'HeallMart',
      storeIcon: '🧡',
      vendor: 'Tony Zayler',
      testMailey: 'Express',
      city: 'E-Commerce',
      type: 'Express',
      status: 'View'
    },
    {
      id: 5,
      storeName: 'MetroMart',
      storeIcon: '🏢',
      vendor: 'Atoro Yang',
      testMailey: 'Indomagaia',
      city: 'E-Commerce',
      type: 'Chupnwerd',
      status: 'View'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vendorStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
            <div className="h-8">
              <svg className="w-full h-full" viewBox="0 0 100 20">
                <polyline
                  fill="none"
                  stroke={stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : '#6b7280'}
                  strokeWidth="2"
                  points="0,15 25,10 50,12 75,8 100,5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Approve
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          Suspend
        </button>
        <div className="relative">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <span>Export</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1"></div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Invite
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          Invite Dashboard
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name / ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Filter by</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
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
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{vendor.storeIcon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vendor.storeName}</div>
                      <div className="text-sm text-gray-500">{vendor.storeName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{vendor.vendor}</div>
                    <div className="text-sm text-gray-500">{vendor.testMailey}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{vendor.city}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    vendor.type === 'Express' ? 'bg-emerald-100 text-emerald-800' : 
                    vendor.type === 'Expresse' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${
                    vendor.status === 'Active' ? 'text-emerald-600' : 'text-gray-600'
                  }`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-gray-600 hover:text-emerald-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Suspend className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vendor Detail Sidebar */}
      {selectedVendor && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">HealthyMart</h3>
            <button
              onClick={() => setSelectedVendor(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <img
              src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=300"
              alt="HealthyMart"
              className="w-full h-32 object-cover rounded-lg"
            />
            
            <div>
              <h4 className="font-medium">HealthyMart</h4>
              <p className="text-sm text-gray-600">326 Products</p>
              <p className="text-sm text-gray-600">2 hrgo ago</p>
              <p className="text-sm text-gray-600">Last Sync 2 hours ago</p>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                View Dashboard
              </button>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="flex-1 bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;