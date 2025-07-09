import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Filter } from 'lucide-react';
import ToggleSwitch from '../common/ToggleSwitch';

const Reports = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [reportType, setReportType] = useState('overview');
  const [reportSettings, setReportSettings] = useState({
    autoRefresh: true,
    emailReports: false,
    includeCharts: true,
    showTrends: true
  });

  const reportData = {
    overview: {
      totalOrders: 1234,
      totalRevenue: 245000,
      avgOrderValue: 1980,
      customerGrowth: 12.5
    },
    orders: {
      express: 456,
      citymart: 234,
      nationwide: 544
    },
    revenue: {
      thisMonth: 245000,
      lastMonth: 198000,
      growth: 23.7
    }
  };

  const handleReportToggle = (setting, newValue) => {
    setReportSettings(prev => ({
      ...prev,
      [setting]: newValue
    }));
    
    // Log for debugging
    console.log(`Report setting ${setting} changed to:`, newValue);
  };
  return (
    <div className="space-y-6 admin-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-gray-600">Business insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'orders', label: 'Orders' },
              { id: 'revenue', label: 'Revenue' },
              { id: 'customers', label: 'Customers' },
              { id: 'vendors', label: 'Vendors' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  reportType === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {reportType === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Orders</p>
                      <p className="text-3xl font-bold">{reportData.overview.totalOrders.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Total Revenue</p>
                      <p className="text-3xl font-bold">₹{reportData.overview.totalRevenue.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Avg Order Value</p>
                      <p className="text-3xl font-bold">₹{reportData.overview.avgOrderValue}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Customer Growth</p>
                      <p className="text-3xl font-bold">{reportData.overview.customerGrowth}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                      <p>Order trends chart would go here</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 mx-auto mb-2" />
                      <p>Revenue growth chart would go here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reportType === 'orders' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Express Orders</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.orders.express}</p>
                  <p className="text-sm text-gray-600">Fast delivery orders</p>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">City Mart Orders</h3>
                  <p className="text-3xl font-bold text-emerald-600">{reportData.orders.citymart}</p>
                  <p className="text-sm text-gray-600">Local store orders</p>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Nationwide Orders</h3>
                  <p className="text-3xl font-bold text-purple-600">{reportData.orders.nationwide}</p>
                  <p className="text-sm text-gray-600">Cross-city orders</p>
                </div>
              </div>
            </div>
          )}

          {reportType === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-emerald-600">₹{reportData.revenue.thisMonth.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Current month revenue</p>
                </div>
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Growth Rate</h3>
                  <p className="text-3xl font-bold text-blue-600">{reportData.revenue.growth}%</p>
                  <p className="text-sm text-gray-600">Month over month</p>
                </div>
              </div>
            </div>
          )}

          {(reportType === 'customers' || reportType === 'vendors') && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {reportType === 'customers' ? 'Customer' : 'Vendor'} reports coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;