import React from 'react';
import { Package, Users, Truck, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Vendors',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-emerald-500'
    },
    {
      title: 'Delivery Partners',
      value: '45',
      change: '+8%',
      changeType: 'increase',
      icon: Truck,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(245000),
      change: '-3%',
      changeType: 'decrease',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.changeType === 'increase' ? TrendingUp : TrendingDown;
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 flex items-center">
              <TrendIcon 
                className={`w-4 h-4 ${
                  stat.changeType === 'increase' ? 'text-emerald-500' : 'text-red-500'
                }`} 
              />
              <span 
                className={`text-sm font-medium ml-2 ${
                  stat.changeType === 'increase' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;