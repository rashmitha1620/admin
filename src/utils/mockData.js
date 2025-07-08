export const mockOrders = [
  {
    id: 'GRO-2025-001',
    orderNumber: 'GRO-2025-001',
    status: 'delivered',
    total: 3598,
    items: [
      { productId: '1', name: 'Wireless Bluetooth Headphones', quantity: 1, price: 2999 },
      { productId: '2', name: 'Cotton Casual T-Shirt', quantity: 1, price: 599 }
    ],
    customer: {
      name: 'Rajesh Kumar',
      phone: '+919876543210',
      email: 'rajesh@example.com'
    },
    deliveryAddress: {
      street: '123 MG Road',
      area: 'Andheri West',
      city: 'Mumbai',
      pincode: '400058'
    },
    vendor: 'TechWorld Electronics',
    deliveryPartner: 'Speed Delivery',
    createdAt: '2025-01-20T10:30:00Z',
    estimatedDelivery: '2025-01-22T18:00:00Z'
  },
  {
    id: 'GRO-2025-002',
    orderNumber: 'GRO-2025-002',
    status: 'in_transit',
    total: 1698,
    items: [
      { productId: '3', name: 'LED Desk Lamp', quantity: 1, price: 1299 },
      { productId: '5', name: 'Organic Green Tea', quantity: 1, price: 399 }
    ],
    customer: {
      name: 'Priya Sharma',
      phone: '+919876543211',
      email: 'priya@example.com'
    },
    deliveryAddress: {
      street: '456 Brigade Road',
      area: 'Indiranagar',
      city: 'Bangalore',
      pincode: '560038'
    },
    vendor: 'Home Essentials',
    deliveryPartner: 'Quick Transport',
    createdAt: '2025-01-21T14:15:00Z',
    estimatedDelivery: '2025-01-23T16:00:00Z'
  }
];

export const mockExpressOrders = [
  {
    id: 'EXP-001',
    orderNumber: 'EXP-001',
    status: 'ready',
    total: 899,
    items: [{ name: 'Coffee', quantity: 2, price: 450 }],
    customer: { name: 'John Doe', phone: '+919876543210' },
    store: 'Coffee House',
    createdAt: '2025-01-22T09:15:00Z'
  },
  {
    id: 'EXP-002',
    orderNumber: 'EXP-002',
    status: 'preparing',
    total: 1299,
    items: [{ name: 'Sandwich', quantity: 1, price: 1299 }],
    customer: { name: 'Jane Smith', phone: '+919876543211' },
    store: 'Quick Bites',
    createdAt: '2025-01-22T09:30:00Z'
  }
];

export const mockNationwideOrders = [
  {
    id: 'NAT-001',
    orderNumber: 'NAT-001',
    status: 'shipped',
    total: 4999,
    items: [{ name: 'Electronics', quantity: 1, price: 4999 }],
    customer: { name: 'Amit Patel', phone: '+919876543212' },
    fromCity: 'Mumbai',
    toCity: 'Delhi',
    trackingNumber: 'TRK123456789',
    createdAt: '2025-01-20T10:00:00Z'
  }
];

export const mockCityMartOrders = [
  {
    id: 'CM-001',
    orderNumber: 'CM-001',
    status: 'ready_pickup',
    total: 2499,
    items: [{ name: 'Groceries', quantity: 5, price: 500 }],
    customer: { name: 'Ravi Kumar', phone: '+919876543213' },
    store: 'Fresh Mart',
    storeAddress: 'MG Road, Bangalore',
    orderType: 'pickup',
    createdAt: '2025-01-22T08:00:00Z'
  }
];

export const mockVendors = [
  {
    id: 'v1',
    name: 'TechWorld Electronics',
    email: 'contact@techworld.com',
    phone: '+919123456789',
    address: 'Electronics Market, Nehru Place, Delhi',
    status: 'active',
    rating: 4.5,
    totalOrders: 1250,
    categories: ['Electronics'],
    joinedDate: '2023-06-15',
    completionRate: 98.5
  },
  {
    id: 'v2',
    name: 'Fashion Hub',
    email: 'orders@fashionhub.com',
    phone: '+919123456790',
    address: 'Garment District, Commercial Street, Bangalore',
    status: 'active',
    rating: 4.2,
    totalOrders: 890,
    categories: ['Clothing'],
    joinedDate: '2023-08-20',
    completionRate: 96.8
  }
];

export const mockDeliveryPartners = [
  {
    id: 'd1',
    name: 'Rohit Singh',
    phone: '+919876543220',
    email: 'rohit.delivery@grooso.com',
    status: 'active',
    rating: 4.6,
    totalDeliveries: 340,
    currentOrders: 3,
    maxOrders: 8,
    vehicle: 'Motorcycle',
    location: 'Andheri, Mumbai'
  }
];

export const mockStoreOwners = [
  {
    id: 'so1',
    name: 'Rajesh Gupta',
    storeName: 'Gupta General Store',
    phone: '+919876543230',
    address: 'Main Market, Sector 15, Noida',
    status: 'active',
    storeType: 'General Store',
    category: 'Groceries',
    monthlyRevenue: 125000,
    monthlyOrders: 450,
    joinedDate: '2023-05-10T00:00:00Z'
  },
  {
    id: 'so2',
    name: 'Priya Sharma',
    storeName: 'Sharma Electronics',
    phone: '+919876543231',
    address: 'Electronics Market, Lajpat Nagar, Delhi',
    status: 'active',
    storeType: 'Electronics Store',
    category: 'Electronics',
    monthlyRevenue: 280000,
    monthlyOrders: 320,
    joinedDate: '2023-07-22T00:00:00Z'
  }
];

export const mockSellers = [
  {
    id: 's1',
    name: 'Amit Kumar',
    businessName: 'Kumar Handicrafts',
    email: 'amit@kumarhandicrafts.com',
    location: 'Jaipur, Rajasthan',
    category: 'Handicrafts',
    productCount: 156,
    rating: 4.7,
    reviewCount: 89,
    monthlyRevenue: 85000,
    status: 'active'
  },
  {
    id: 's2',
    name: 'Sunita Devi',
    businessName: 'Devi Textiles',
    email: 'sunita@devitextiles.com',
    location: 'Varanasi, UP',
    category: 'Textiles',
    productCount: 234,
    rating: 4.5,
    reviewCount: 156,
    monthlyRevenue: 120000,
    status: 'active'
  }
];

export const mockRiders = [
  {
    id: 'r1',
    name: 'Vikash Singh',
    phone: '+919876543240',
    status: 'online',
    vehicleType: 'Motorcycle',
    currentOrders: 2,
    maxOrders: 5,
    totalDeliveries: 1250,
    rating: 4.8,
    currentLocation: 'Andheri West, Mumbai',
    lastActive: '2025-01-22T10:30:00Z'
  },
  {
    id: 'r2',
    name: 'Ravi Patel',
    phone: '+919876543241',
    status: 'online',
    vehicleType: 'Bicycle',
    currentOrders: 1,
    maxOrders: 3,
    totalDeliveries: 890,
    rating: 4.6,
    currentLocation: 'Koramangala, Bangalore',
    lastActive: '2025-01-22T10:45:00Z'
  },
  {
    id: 'r3',
    name: 'Suresh Kumar',
    phone: '+919876543242',
    status: 'offline',
    vehicleType: 'Scooter',
    currentOrders: 0,
    maxOrders: 4,
    totalDeliveries: 567,
    rating: 4.4,
    currentLocation: 'Connaught Place, Delhi',
    lastActive: '2025-01-22T08:00:00Z'
  }
];