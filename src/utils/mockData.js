export const mockOrders = [
  {
    id: 'GRO-2025-001',
    orderNumber: 'GRO-2025-001',
    orderType: 'express', // Add order type
    status: 'pending',
    total: 3598,
    items: [
      { productId: '1', name: 'Wireless Bluetooth Headphones', quantity: 1, price: 2999, category: 'Electronics' },
      { productId: '2', name: 'Cotton Casual T-Shirt', quantity: 1, price: 599, category: 'Clothing' }
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
      state: 'Maharashtra',
      pincode: '400058'
    },
    vendor: null,
    vendorDetails: null,
    deliveryPartner: null,
    riderDetails: null,
    createdAt: '2025-01-20T10:30:00Z',
    estimatedDelivery: '2025-01-22T18:00:00Z',
    priority: 'normal'
  },
  {
    id: 'GRO-2025-002',
    orderNumber: 'GRO-2025-002',
    orderType: 'citymart', // Add order type
    status: 'pending',
    total: 1698,
    items: [
      { productId: '3', name: 'LED Desk Lamp', quantity: 1, price: 1299, category: 'Electronics' },
      { productId: '5', name: 'Organic Green Tea', quantity: 1, price: 399, category: 'Food & Beverages' }
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
      state: 'Karnataka',
      pincode: '560038'
    },
    vendor: null,
    vendorDetails: null,
    deliveryPartner: null,
    riderDetails: null,
    createdAt: '2025-01-21T14:15:00Z',
    estimatedDelivery: '2025-01-23T16:00:00Z',
    priority: 'urgent'
  },
  {
    id: 'GRO-2025-003',
    orderNumber: 'GRO-2025-003',
    orderType: 'nationwide', // Add order type
    status: 'pending',
    total: 2499,
    items: [
      { productId: '6', name: 'Organic Vegetables Bundle', quantity: 1, price: 899, category: 'Food & Beverages' },
      { productId: '7', name: 'Fresh Fruits Pack', quantity: 1, price: 1600, category: 'Food & Beverages' }
    ],
    customer: {
      name: 'Amit Patel',
      phone: '+919876543212',
      email: 'amit@example.com'
    },
    deliveryAddress: {
      street: '789 SG Highway',
      area: 'Satellite',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015'
    },
    vendor: null,
    vendorDetails: null,
    deliveryPartner: null,
    riderDetails: null,
    createdAt: '2025-01-22T08:30:00Z',
    estimatedDelivery: '2025-01-24T16:00:00Z',
    priority: 'normal'
  },
  {
    id: 'GRO-2025-004',
    orderNumber: 'GRO-2025-004',
    orderType: 'express', // Add order type
    status: 'vendor_assigned',
    total: 4299,
    items: [
      { productId: '8', name: 'Smart Watch', quantity: 1, price: 4299, category: 'Electronics' }
    ],
    customer: {
      name: 'Sunita Devi',
      phone: '+919876543213',
      email: 'sunita@example.com'
    },
    deliveryAddress: {
      street: '321 Park Street',
      area: 'Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700064'
    },
    vendor: 'Kolkata Tech Solutions',
    vendorDetails: {
      id: 'v6',
      name: 'Kolkata Tech Solutions',
      address: 'Sector V, Salt Lake, Kolkata',
      phone: '+919123456794',
      pincode: '700091'
    },
    deliveryPartner: null,
    riderDetails: null,
    createdAt: '2025-01-22T11:15:00Z',
    estimatedDelivery: '2025-01-24T18:00:00Z',
    priority: 'normal'
  },
  {
    id: 'GRO-2025-005',
    orderNumber: 'GRO-2025-005',
    orderType: 'citymart', // Add order type
    status: 'vendor_assigned',
    total: 1899,
    items: [
      { productId: '9', name: 'Organic Spices Pack', quantity: 1, price: 1899, category: 'Food & Beverages' }
    ],
    customer: {
      name: 'Meera Shah',
      phone: '+919876543214',
      email: 'meera@example.com'
    },
    deliveryAddress: {
      street: '567 CG Road',
      area: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009'
    },
    vendor: 'Gujarat Fresh Produce',
    vendorDetails: {
      id: 'v5',
      name: 'Gujarat Fresh Produce',
      address: 'APMC Market, Ahmedabad',
      phone: '+919123456793',
      pincode: '380026'
    },
    deliveryPartner: null,
    riderDetails: null,
    createdAt: '2025-01-22T12:30:00Z',
    estimatedDelivery: '2025-01-24T16:00:00Z',
    priority: 'normal'
  }
];

export const mockExpressOrders = [
  {
    id: 'GRO-2025-006',
    orderNumber: 'GRO-2025-006',
    orderType: 'express',
    status: 'assigned',
    total: 1299,
    items: [
      { productId: '10', name: 'Fresh Coffee', quantity: 2, price: 450, category: 'Food & Beverages' },
      { productId: '11', name: 'Croissant', quantity: 1, price: 399, category: 'Food & Beverages' }
    ],
    customer: {
      name: 'Arjun Mehta',
      phone: '+919876543215',
      email: 'arjun@example.com'
    },
    deliveryAddress: {
      street: '890 FC Road',
      area: 'Shivajinagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005'
    },
    vendor: 'Coffee House Express',
    vendorDetails: {
      id: 'v7',
      name: 'Coffee House Express',
      address: 'FC Road, Pune',
      phone: '+919123456795',
      pincode: '411004'
    },
    deliveryPartner: 'Speedy Delivery',
    riderDetails: {
      id: 'r6',
      name: 'Kiran Patil',
      phone: '+919876543245',
      vehicleType: 'Motorcycle'
    },
    store: 'Coffee House Express',
    createdAt: '2025-01-22T09:15:00Z',
    estimatedDelivery: '2025-01-22T10:00:00Z',
    priority: 'urgent'
  },
  {
    id: 'GRO-2025-007',
    orderNumber: 'GRO-2025-007',
    orderType: 'express',
    status: 'ready',
    total: 899,
    items: [
      { productId: '12', name: 'Burger Combo', quantity: 1, price: 899, category: 'Food & Beverages' }
    ],
    customer: {
      name: 'Sneha Joshi',
      phone: '+919876543216',
      email: 'sneha@example.com'
    },
    deliveryAddress: {
      street: '234 MG Road',
      area: 'Camp',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    },
    vendor: 'Quick Bites',
    vendorDetails: {
      id: 'v8',
      name: 'Quick Bites',
      address: 'MG Road, Pune',
      phone: '+919123456796',
      pincode: '411001'
    },
    deliveryPartner: 'Flash Delivery',
    riderDetails: {
      id: 'r7',
      name: 'Rahul Sharma',
      phone: '+919876543246',
      vehicleType: 'Bicycle'
    },
    store: 'Quick Bites',
    createdAt: '2025-01-22T09:30:00Z',
    estimatedDelivery: '2025-01-22T10:15:00Z',
    priority: 'normal'
  }
];

export const mockNationwideOrders = [
  {
    id: 'GRO-2025-008',
    orderNumber: 'GRO-2025-008',
    orderType: 'nationwide',
    status: 'shipped',
    total: 8999,
    items: [
      { productId: '13', name: 'Gaming Laptop', quantity: 1, price: 8999, category: 'Electronics' }
    ],
    customer: {
      name: 'Vikram Singh',
      phone: '+919876543217',
      email: 'vikram@example.com'
    },
    deliveryAddress: {
      street: '567 Connaught Place',
      area: 'Central Delhi',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    vendor: 'TechWorld Electronics',
    vendorDetails: {
      id: 'v1',
      name: 'TechWorld Electronics',
      address: 'Electronics Market, Nehru Place, Delhi',
      phone: '+919123456789',
      pincode: '110019'
    },
    deliveryPartner: 'National Express',
    riderDetails: {
      id: 'r8',
      name: 'Manoj Kumar',
      phone: '+919876543247',
      vehicleType: 'Truck'
    },
    fromCity: 'Mumbai',
    toCity: 'Delhi',
    trackingNumber: 'TRK123456789',
    createdAt: '2025-01-20T10:00:00Z',
    estimatedDelivery: '2025-01-23T18:00:00Z',
    priority: 'normal'
  },
  {
    id: 'GRO-2025-009',
    orderNumber: 'GRO-2025-009',
    orderType: 'nationwide',
    status: 'in_transit',
    total: 3499,
    items: [
      { productId: '14', name: 'Smartphone', quantity: 1, price: 3499, category: 'Electronics' }
    ],
    customer: {
      name: 'Kavya Reddy',
      phone: '+919876543218',
      email: 'kavya@example.com'
    },
    deliveryAddress: {
      street: '789 Banjara Hills',
      area: 'Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    vendor: 'Mumbai Electronics Hub',
    vendorDetails: {
      id: 'v4',
      name: 'Mumbai Electronics Hub',
      address: 'Lamington Road, Mumbai',
      phone: '+919123456792',
      pincode: '400007'
    },
    deliveryPartner: 'Cross Country Logistics',
    riderDetails: {
      id: 'r9',
      name: 'Sanjay Yadav',
      phone: '+919876543248',
      vehicleType: 'Van'
    },
    fromCity: 'Mumbai',
    toCity: 'Hyderabad',
    trackingNumber: 'TRK987654321',
    createdAt: '2025-01-21T14:00:00Z',
    estimatedDelivery: '2025-01-24T16:00:00Z',
    priority: 'normal'
  }
];

export const mockCityMartOrders = [
  {
    id: 'GRO-2025-010',
    orderNumber: 'GRO-2025-010',
    orderType: 'citymart',
    status: 'ready_pickup',
    total: 1899,
    items: [
      { productId: '15', name: 'Fresh Vegetables', quantity: 3, price: 299, category: 'Food & Beverages' },
      { productId: '16', name: 'Dairy Products', quantity: 2, price: 650, category: 'Food & Beverages' }
    ],
    customer: {
      name: 'Anita Sharma',
      phone: '+919876543219',
      email: 'anita@example.com'
    },
    deliveryAddress: {
      street: '123 Residency Road',
      area: 'Shantinagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560027'
    },
    vendor: 'Fresh Mart',
    vendorDetails: {
      id: 'v9',
      name: 'Fresh Mart',
      address: 'Commercial Street, Bangalore',
      phone: '+919123456797',
      pincode: '560001'
    },
    deliveryPartner: 'Local Delivery',
    riderDetails: {
      id: 'r10',
      name: 'Suresh Babu',
      phone: '+919876543249',
      vehicleType: 'Scooter'
    },
    store: 'Fresh Mart',
    storeAddress: 'Commercial Street, Bangalore',
    orderType: 'pickup',
    createdAt: '2025-01-22T08:00:00Z',
    estimatedDelivery: '2025-01-22T12:00:00Z',
    priority: 'normal'
  },
  {
    id: 'GRO-2025-011',
    orderNumber: 'GRO-2025-011',
    orderType: 'citymart',
    status: 'picked_up',
    total: 2299,
    items: [
      { productId: '17', name: 'Household Items', quantity: 4, price: 399, category: 'Home & Garden' },
      { productId: '18', name: 'Personal Care', quantity: 1, price: 699, category: 'Health & Beauty' }
    ],
    customer: {
      name: 'Rajesh Gupta',
      phone: '+919876543220',
      email: 'rajesh@example.com'
    },
    deliveryAddress: {
      street: '456 Koramangala',
      area: '5th Block',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560095'
    },
    vendor: 'City Essentials',
    vendorDetails: {
      id: 'v10',
      name: 'City Essentials',
      address: 'Koramangala, Bangalore',
      phone: '+919123456798',
      pincode: '560095'
    },
    deliveryPartner: 'Quick Pick',
    riderDetails: {
      id: 'r11',
      name: 'Ganesh Kumar',
      phone: '+919876543250',
      vehicleType: 'Motorcycle'
    },
    store: 'City Essentials',
    storeAddress: 'Koramangala, Bangalore',
    orderType: 'delivery',
    createdAt: '2025-01-22T10:30:00Z',
    estimatedDelivery: '2025-01-22T14:00:00Z',
    priority: 'normal'
  }
];

export const mockVendors = [
  {
    id: 'v1',
    name: 'TechWorld Electronics',
    email: 'contact@techworld.com',
    phone: '+919123456789',
    address: 'Electronics Market, Nehru Place, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110019',
    status: 'active',
    rating: 4.5,
    totalOrders: 1250,
    categories: ['Electronics', 'Gadgets'],
    joinedDate: '2023-06-15',
    completionRate: 98.5,
    availability: true,
    maxOrdersPerDay: 50,
    currentOrdersToday: 23,
    deliveryRadius: 25,
    specializations: ['Mobile Phones', 'Laptops', 'Accessories']
  },
  {
    id: 'v2',
    name: 'Fashion Hub',
    email: 'orders@fashionhub.com',
    phone: '+919123456790',
    address: 'Garment District, Commercial Street, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    status: 'active',
    rating: 4.2,
    totalOrders: 890,
    categories: ['Clothing', 'Fashion'],
    joinedDate: '2023-08-20',
    completionRate: 96.8,
    availability: true,
    maxOrdersPerDay: 30,
    currentOrdersToday: 12,
    deliveryRadius: 20,
    specializations: ['Men\'s Wear', 'Women\'s Wear', 'Accessories']
  },
  {
    id: 'v3',
    name: 'Fresh Foods Market',
    email: 'orders@freshfoods.com',
    phone: '+919123456791',
    address: 'Wholesale Market, Azadpur, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110033',
    status: 'active',
    rating: 4.7,
    totalOrders: 2150,
    categories: ['Food & Beverages', 'Groceries'],
    joinedDate: '2023-03-10',
    completionRate: 99.2,
    availability: true,
    maxOrdersPerDay: 80,
    currentOrdersToday: 45,
    deliveryRadius: 30,
    specializations: ['Organic Vegetables', 'Fresh Fruits', 'Dairy Products']
  },
  {
    id: 'v4',
    name: 'Mumbai Electronics Hub',
    email: 'sales@mumbaielectronics.com',
    phone: '+919123456792',
    address: 'Lamington Road, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400007',
    status: 'active',
    rating: 4.4,
    totalOrders: 1680,
    categories: ['Electronics', 'Home Appliances'],
    joinedDate: '2023-07-05',
    completionRate: 97.8,
    availability: true,
    maxOrdersPerDay: 40,
    currentOrdersToday: 18,
    deliveryRadius: 35,
    specializations: ['Home Appliances', 'Audio Systems', 'Gaming']
  },
  {
    id: 'v5',
    name: 'Gujarat Fresh Produce',
    email: 'contact@gujaratfresh.com',
    phone: '+919123456793',
    address: 'APMC Market, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380026',
    status: 'active',
    rating: 4.6,
    totalOrders: 980,
    categories: ['Food & Beverages', 'Organic Products'],
    joinedDate: '2023-09-12',
    completionRate: 98.9,
    availability: true,
    maxOrdersPerDay: 60,
    currentOrdersToday: 28,
    deliveryRadius: 40,
    specializations: ['Organic Vegetables', 'Local Produce', 'Spices']
  },
  {
    id: 'v6',
    name: 'Kolkata Tech Solutions',
    email: 'info@kolkatatech.com',
    phone: '+919123456794',
    address: 'Sector V, Salt Lake, Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    status: 'active',
    rating: 4.3,
    totalOrders: 756,
    categories: ['Electronics', 'Software'],
    joinedDate: '2023-11-20',
    completionRate: 96.5,
    availability: false, // Currently unavailable
    maxOrdersPerDay: 25,
    currentOrdersToday: 25, // At capacity
    deliveryRadius: 20,
    specializations: ['Computer Hardware', 'Software Solutions', 'IT Services']
  }
];

export const mockDeliveryPartners = [
  {
    id: 'd1',
    name: 'Rohit Singh',
    phone: '+919876543220',
    email: 'rohit.delivery@grooso.com',
    status: 'online',
    rating: 4.6,
    totalDeliveries: 340,
    currentOrders: 3,
    maxOrders: 8,
    vehicleType: 'Motorcycle',
    currentLocation: 'Salt Lake, Kolkata'
  },
  {
    id: 'd2',
    name: 'Priya Sharma',
    phone: '+919876543221',
    email: 'priya.delivery@grooso.com',
    status: 'online',
    rating: 4.8,
    totalDeliveries: 520,
    currentOrders: 1,
    maxOrders: 6,
    vehicleType: 'Scooter',
    currentLocation: 'Navrangpura, Ahmedabad'
  },
  {
    id: 'd3',
    name: 'Amit Kumar',
    phone: '+919876543222',
    email: 'amit.delivery@grooso.com',
    status: 'online',
    rating: 4.5,
    totalDeliveries: 890,
    currentOrders: 2,
    maxOrders: 5,
    vehicleType: 'Motorcycle',
    currentLocation: 'Connaught Place, Delhi'
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
  },
  {
    id: 'so3',
    name: 'Amit Patel',
    storeName: 'Patel Medical Store',
    phone: '+919876543232',
    address: 'Medical Square, Ahmedabad',
    status: 'pending',
    storeType: 'Pharmacy',
    category: 'Healthcare',
    monthlyRevenue: 95000,
    monthlyOrders: 180,
    joinedDate: '2024-01-15T00:00:00Z'
  },
  {
    id: 'so4',
    name: 'Sunita Devi',
    storeName: 'Fresh Vegetables',
    phone: '+919876543233',
    address: 'Vegetable Market, Pune',
    status: 'active',
    storeType: 'Grocery Store',
    category: 'Fresh Produce',
    monthlyRevenue: 65000,
    monthlyOrders: 520,
    joinedDate: '2023-09-10T00:00:00Z'
  },
  {
    id: 'so5',
    name: 'Ravi Kumar',
    storeName: 'Kumar Fashion Hub',
    phone: '+919876543234',
    address: 'Fashion Street, Mumbai',
    status: 'suspended',
    storeType: 'Fashion Store',
    category: 'Clothing',
    monthlyRevenue: 150000,
    monthlyOrders: 280,
    joinedDate: '2023-03-20T00:00:00Z'
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
    email: 'vikash@grooso.com',
    status: 'active',
    vehicleType: 'Motorcycle',
    currentOrders: 2,
    maxOrders: 5,
    totalDeliveries: 1250,
    rating: 4.8,
    currentLocation: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700064',
    deliveryRadius: 15,
    lastActive: '2025-01-22T10:30:00Z',
    experience: '2 years'
  },
  {
    id: 'r2',
    name: 'Ravi Patel',
    phone: '+919876543241',
    email: 'ravi@grooso.com',
    status: 'active',
    vehicleType: 'Bicycle',
    currentOrders: 1,
    maxOrders: 3,
    totalDeliveries: 890,
    rating: 4.6,
    currentLocation: 'Navrangpura, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380009',
    deliveryRadius: 10,
    lastActive: '2025-01-22T10:45:00Z',
    experience: '1.5 years'
  },
  {
    id: 'r3',
    name: 'Suresh Kumar',
    phone: '+919876543242',
    email: 'suresh@grooso.com',
    status: 'inactive',
    vehicleType: 'Scooter',
    currentOrders: 0,
    maxOrders: 4,
    totalDeliveries: 567,
    rating: 4.4,
    currentLocation: 'Connaught Place, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    deliveryRadius: 12,
    lastActive: '2025-01-22T08:00:00Z',
    experience: '3 years'
  },
  {
    id: 'r4',
    name: 'Arjun Mehta',
    phone: '+919876543243',
    email: 'arjun@grooso.com',
    status: 'active',
    vehicleType: 'Motorcycle',
    currentOrders: 1,
    maxOrders: 6,
    totalDeliveries: 1890,
    rating: 4.9,
    currentLocation: 'Satellite, Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    deliveryRadius: 20,
    lastActive: '2025-01-22T11:00:00Z',
    experience: '4 years'
  },
  {
    id: 'r5',
    name: 'Deepak Roy',
    phone: '+919876543244',
    email: 'deepak@grooso.com',
    status: 'active',
    vehicleType: 'Scooter',
    currentOrders: 0,
    maxOrders: 4,
    totalDeliveries: 756,
    rating: 4.7,
    currentLocation: 'Park Street, Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700016',
    deliveryRadius: 18,
    lastActive: '2025-01-22T11:15:00Z',
    experience: '2.5 years'
  }
];