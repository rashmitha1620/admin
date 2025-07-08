export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  DELIVERY_PARTNER: 'delivery_partner',
  STORE_OWNER: 'store_owner',
  SELLER: 'seller',
  ADMIN: 'admin'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ASSIGNED: 'assigned',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const VENDOR_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad'
];

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Automotive',
  'Health & Beauty',
  'Food & Beverages'
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';