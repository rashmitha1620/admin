import { API_BASE_URL } from '../utils/constants.js';
import { 
  mockOrders, 
  mockVendors, 
  mockDeliveryPartners, 
  mockStoreOwners,
  mockSellers,
  mockRiders,
  mockExpressOrders,
  mockNationwideOrders,
  mockCityMartOrders
} from '../utils/mockData.js';

// Mock API service - replace with real API calls
class ApiService {
  async get(endpoint) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (endpoint) {
      case '/orders':
        return { data: mockOrders };
      case '/orders/express':
        return { data: mockExpressOrders };
      case '/orders/nationwide':
        return { data: mockNationwideOrders };
      case '/orders/citymart':
        return { data: mockCityMartOrders };
      case '/orders/unassigned':
        return { data: mockOrders.filter(order => !order.deliveryPartner) };
      case '/vendors':
        return { data: mockVendors };
      case '/delivery-partners':
        return { data: mockDeliveryPartners };
      case '/store-owners':
        return { data: mockStoreOwners };
      case '/sellers':
        return { data: mockSellers };
      case '/riders':
        return { data: mockRiders };
      case '/riders/available':
        return { data: mockRiders.filter(rider => rider.status === 'online' && rider.currentOrders < rider.maxOrders) };
      default:
        throw new Error('Endpoint not found');
    }
  }

  async post(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (endpoint) {
      case '/auth/login':
        // Mock login with proper validation
        if (data.email === 'admin@grooso.com' && data.password === 'password') {
          return {
            success: true,
            data: {
              user: {
                id: '1',
                name: 'Admin User',
                email: 'admin@grooso.com',
                role: 'admin',
                phone: '+919876543210'
              },
              token: 'mock-jwt-token-' + Date.now()
            }
          };
        } else {
          throw new Error('Invalid credentials');
        }
      default:
        return { data: { success: true } };
    }
  }

  async put(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { success: true, ...data } };
  }

  async delete(endpoint) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { success: true } };
  }
}

export const apiService = new ApiService();

// Real API functions (to be implemented)
export const authApi = {
  login: (credentials) => apiService.post('/auth/login', credentials),
  register: (userData) => apiService.post('/auth/register', userData),
  getProfile: () => apiService.get('/auth/profile'),
  verifyOtp: (data) => apiService.post('/auth/verify-otp', data)
};

export const ordersApi = {
  getOrders: () => apiService.get('/orders'),
  getExpressOrders: () => {
    // Filter orders by type and status (assigned orders that have both vendor and rider)
    const expressOrders = [...mockExpressOrders, ...mockOrders.filter(order => {
      // Only show orders that have been accepted (confirmed status or higher) and are express type
      return order.orderType === 'express' && 
             (order.status === 'confirmed' || order.status === 'assigned' || 
              order.status === 'in_transit' || order.status === 'delivered');
    })];
    return Promise.resolve({ data: expressOrders });
  },
  getNationwideOrders: () => {
    // Filter orders by type and status (assigned orders that have both vendor and rider)
    const nationwideOrders = [...mockNationwideOrders, ...mockOrders.filter(order => {
      // Only show orders that have been accepted (confirmed status or higher) and are nationwide type
      return order.orderType === 'nationwide' && 
             (order.status === 'confirmed' || order.status === 'assigned' || 
              order.status === 'in_transit' || order.status === 'delivered');
    })];
    return Promise.resolve({ data: nationwideOrders });
  },
  getCityMartOrders: () => {
    // Filter orders by type and status (assigned orders that have both vendor and rider)
    const citymartOrders = [...mockCityMartOrders, ...mockOrders.filter(order => {
      // Only show orders that have been accepted (confirmed status or higher) and are citymart type
      return order.orderType === 'citymart' && 
             (order.status === 'confirmed' || order.status === 'assigned' || 
              order.status === 'in_transit' || order.status === 'delivered');
    })];
    return Promise.resolve({ data: citymartOrders });
  },
  getUnassignedOrders: () => apiService.get('/orders/unassigned'),
  getOrder: (id) => apiService.get(`/orders/${id}`),
  createOrder: (data) => apiService.post('/orders', data),
  updateOrderStatus: (id, status) => apiService.put(`/orders/${id}/status`, { status }),
  assignOrder: (orderId, riderId) => apiService.post(`/orders/${orderId}/assign`, { riderId })
};

export const vendorsApi = {
  getVendors: () => apiService.get('/vendors'),
  getVendor: (id) => apiService.get(`/vendors/${id}`),
  createVendor: (data) => apiService.post('/vendors', data),
  updateVendor: (id, data) => apiService.put(`/vendors/${id}`, data)
};

export const deliveryApi = {
  getDeliveryPartners: () => apiService.get('/delivery-partners'),
  createDeliveryPartner: (data) => apiService.post('/delivery-partners', data),
  assignOrder: (orderId, partnerId) => 
    apiService.post(`/orders/${orderId}/assign`, { partnerId })
};

export const storeOwnersApi = {
  getStoreOwners: () => apiService.get('/store-owners'),
  getStoreOwner: (id) => apiService.get(`/store-owners/${id}`),
  createStoreOwner: (data) => apiService.post('/store-owners', data),
  updateStoreOwner: (id, data) => apiService.put(`/store-owners/${id}`, data)
};

export const sellersApi = {
  getSellers: () => apiService.get('/sellers'),
  getSeller: (id) => apiService.get(`/sellers/${id}`),
  createSeller: (data) => apiService.post('/sellers', data),
  updateSeller: (id, data) => apiService.put(`/sellers/${id}`, data)
};

export const ridersApi = {
  getRiders: () => apiService.get('/riders'),
  getAvailableRiders: () => apiService.get('/riders/available'),
  getRider: (id) => apiService.get(`/riders/${id}`),
  createRider: (data) => apiService.post('/riders', data),
  updateRider: (id, data) => apiService.put(`/riders/${id}`, data)
};

export const whatsappApi = {
  sendVendorMessage: (data) => apiService.post('/whatsapp/send-vendor-message', data),
  getTemplates: () => apiService.get('/whatsapp/templates')
};

export const settingsApi = {
  getSettings: () => apiService.get('/settings'),
  updateSettings: (settings) => apiService.put('/settings', settings),
  resetSettings: () => apiService.post('/settings/reset')
};

export const analyticsApi = {
  getAnalytics: (dateRange) => apiService.get(`/analytics?range=${dateRange}`),
  getReports: (type) => apiService.get(`/analytics/reports/${type}`),
  exportReport: (type, format) => apiService.get(`/analytics/export/${type}?format=${format}`)
};

export const notificationsApi = {
  getNotifications: () => apiService.get('/notifications'),
  markAsRead: (id) => apiService.put(`/notifications/${id}/read`),
  markAllAsRead: () => apiService.put('/notifications/read-all'),
  deleteNotification: (id) => apiService.delete(`/notifications/${id}`),
  updateSettings: (settings) => apiService.put('/notifications/settings', settings)
};