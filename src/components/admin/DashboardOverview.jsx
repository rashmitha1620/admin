import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Orders Today',
      value: '160',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Pending Assignments',
      value: '45',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Out for Delivery',
      value: '115',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Failed/Cancelled',
      value: '12',
      trend: '-3%',
      trendUp: false
    }
  ];

  const riders = [
    { name: 'John Doe', orders: '44 orra' },
    { name: 'Jane Smith', orders: '23 orra' },
    { name: 'Michael Brown', orders: '25 orra' },
    { name: 'Emily White', orders: '25 orra' }
  ];

  const recentActivity = [
    'Order #1234 assigned. Rider A',
    'Order #1234 delivered',
    'Order #1235 assigned. Rider B',
    'Rider C signed in',
    'Order #1234 assigned to A',
    'Order #1235 delivered'
  ];

  const stockAlerts = [
    { name: 'Express', count: 1 },
    { name: 'City Mart', count: 1 },
    { name: 'Nationwide', count: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trendUp ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trendUp ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Assignment */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Order Assign</h3>
          <div className="space-y-4">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>Select Product</option>
              <option>Product 1</option>
              <option>Product 2</option>
            </select>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>Select Seller</option>
              <option>Seller 1</option>
              <option>Seller 2</option>
            </select>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
              <option>Select Rider</option>
              <option>Rider 1</option>
              <option>Rider 2</option>
            </select>
            <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
              Assign
            </button>
          </div>
        </div>

        {/* Orders Overview & Stock Alert */}
        <div className="space-y-6">
          {/* Orders Overview */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="20, 80"
                    strokeDashoffset="0"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeDasharray="30, 70"
                    strokeDashoffset="-20"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="50, 50"
                    strokeDashoffset="-50"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Cancelled</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Last 7 days</p>
          </div>

          {/* Stock Alert */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Stock Alert</h3>
            <p className="text-sm text-gray-600 mb-3">Low/out-of-stock</p>
            <div className="space-y-2">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{alert.name}</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {alert.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rider Status & Recent Activity */}
        <div className="space-y-6">
          {/* Rider Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Rider Status</h3>
            <div className="space-y-3">
              {riders.map((rider, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{rider.name}</span>
                  <span className="text-sm text-gray-500">{rider.orders}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Orders Over</h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">Desvess</p>
          <p className="text-sm text-gray-600">City Mart</p>
          <p className="text-sm text-gray-600">Nationwide</p>
        </div>
        <div className="h-32 flex items-end justify-between">
          <svg className="w-full h-full" viewBox="0 0 400 100">
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              points="0,80 100,60 200,40 300,50 400,20"
            />
            <circle cx="0" cy="80" r="3" fill="#10b981" />
            <circle cx="100" cy="60" r="3" fill="#10b981" />
            <circle cx="200" cy="40" r="3" fill="#10b981" />
            <circle cx="300" cy="50" r="3" fill="#10b981" />
            <circle cx="400" cy="20" r="3" fill="#10b981" />
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>6 days ago</span>
          <span>6 Apr</span>
          <span>Apr Day</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;