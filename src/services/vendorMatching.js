// Vendor Matching Service
// This service handles intelligent vendor matching based on various criteria

import { mockVendors } from '../utils/mockData';

/**
 * Calculate distance between two pincodes (simplified calculation)
 * In a real application, this would use a proper geocoding service
 */
const calculateDistance = (pincode1, pincode2) => {
  // Simplified distance calculation based on pincode proximity
  const diff = Math.abs(parseInt(pincode1) - parseInt(pincode2));
  
  // Convert pincode difference to approximate distance in km
  if (diff < 1000) return Math.random() * 5 + 1; // 1-6 km
  if (diff < 10000) return Math.random() * 15 + 5; // 5-20 km
  if (diff < 50000) return Math.random() * 30 + 20; // 20-50 km
  return Math.random() * 100 + 50; // 50-150 km
};

/**
 * Calculate vendor score based on multiple factors
 */
const calculateVendorScore = (vendor, order) => {
  let score = 0;
  const weights = {
    categoryMatch: 40,
    location: 25,
    availability: 15,
    rating: 10,
    completionRate: 5,
    capacity: 5
  };

  // Category matching
  const orderCategories = [...new Set(order.items.map(item => item.category))];
  const categoryMatches = orderCategories.filter(cat => 
    vendor.categories.some(vendorCat => 
      vendorCat.toLowerCase().includes(cat.toLowerCase()) || 
      cat.toLowerCase().includes(vendorCat.toLowerCase())
    )
  ).length;
  
  const categoryScore = (categoryMatches / orderCategories.length) * weights.categoryMatch;
  score += categoryScore;

  // Location proximity
  const distance = calculateDistance(vendor.pincode, order.deliveryAddress.pincode);
  const locationScore = Math.max(0, weights.location - (distance / vendor.deliveryRadius) * weights.location);
  score += locationScore;

  // Availability
  if (vendor.availability && vendor.currentOrdersToday < vendor.maxOrdersPerDay) {
    score += weights.availability;
  }

  // Rating (normalized to 0-10 scale)
  const ratingScore = (vendor.rating / 5) * weights.rating;
  score += ratingScore;

  // Completion rate
  const completionScore = (vendor.completionRate / 100) * weights.completionRate;
  score += completionScore;

  // Capacity utilization (prefer vendors with lower current load)
  const capacityUtilization = vendor.currentOrdersToday / vendor.maxOrdersPerDay;
  const capacityScore = (1 - capacityUtilization) * weights.capacity;
  score += capacityScore;

  return {
    score: Math.round(score * 10) / 10,
    breakdown: {
      categoryMatch: Math.round(categoryScore * 10) / 10,
      location: Math.round(locationScore * 10) / 10,
      availability: vendor.availability && vendor.currentOrdersToday < vendor.maxOrdersPerDay ? weights.availability : 0,
      rating: Math.round(ratingScore * 10) / 10,
      completionRate: Math.round(completionScore * 10) / 10,
      capacity: Math.round(capacityScore * 10) / 10
    },
    distance: Math.round(distance * 10) / 10,
    categoryMatches,
    availableCapacity: vendor.maxOrdersPerDay - vendor.currentOrdersToday
  };
};

/**
 * Find top matching vendors for an order
 */
export const findMatchingVendors = (order, limit = 3) => {
  const activeVendors = mockVendors.filter(vendor => vendor.status === 'active');
  
  const vendorScores = activeVendors.map(vendor => ({
    ...vendor,
    matchData: calculateVendorScore(vendor, order)
  }));

  // Sort by score (descending) and return top matches
  const topMatches = vendorScores
    .sort((a, b) => b.matchData.score - a.matchData.score)
    .slice(0, limit);

  return topMatches;
};

/**
 * Get vendor recommendations with detailed analysis
 */
export const getVendorRecommendations = (order) => {
  const matches = findMatchingVendors(order, 5);
  
  const recommendations = {
    topMatches: matches.slice(0, 3),
    alternativeOptions: matches.slice(3),
    orderAnalysis: {
      categories: [...new Set(order.items.map(item => item.category))],
      deliveryLocation: {
        city: order.deliveryAddress.city,
        state: order.deliveryAddress.state,
        pincode: order.deliveryAddress.pincode
      },
      orderValue: order.total,
      priority: order.priority || 'normal',
      itemCount: order.items.length
    },
    matchingCriteria: {
      primaryFactors: ['Product Category Match', 'Location Proximity', 'Vendor Availability'],
      secondaryFactors: ['Vendor Rating', 'Completion Rate', 'Current Capacity']
    }
  };

  return recommendations;
};

/**
 * Search vendors by name or specialization
 */
export const searchVendors = (searchTerm, order = null) => {
  const activeVendors = mockVendors.filter(vendor => vendor.status === 'active');
  
  const filteredVendors = activeVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
    vendor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // If order is provided, calculate scores for search results
  if (order) {
    return filteredVendors.map(vendor => ({
      ...vendor,
      matchData: calculateVendorScore(vendor, order)
    })).sort((a, b) => b.matchData.score - a.matchData.score);
  }

  return filteredVendors;
};

/**
 * Get vendor details with current status
 */
export const getVendorDetails = (vendorId) => {
  const vendor = mockVendors.find(v => v.id === vendorId);
  if (!vendor) return null;

  return {
    ...vendor,
    currentStatus: {
      isAvailable: vendor.availability && vendor.currentOrdersToday < vendor.maxOrdersPerDay,
      capacityUtilization: Math.round((vendor.currentOrdersToday / vendor.maxOrdersPerDay) * 100),
      remainingCapacity: vendor.maxOrdersPerDay - vendor.currentOrdersToday,
      estimatedResponseTime: vendor.availability ? '15-30 minutes' : 'Currently unavailable'
    }
  };
};

/**
 * Simulate vendor assignment
 */
export const assignOrderToVendor = async (orderId, vendorId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const vendor = mockVendors.find(v => v.id === vendorId);
  if (!vendor) {
    throw new Error('Vendor not found');
  }

  if (!vendor.availability || vendor.currentOrdersToday >= vendor.maxOrdersPerDay) {
    throw new Error('Vendor is not available or at capacity');
  }

  // Update vendor's current orders (in real app, this would be handled by backend)
  vendor.currentOrdersToday += 1;

  return {
    success: true,
    assignedVendor: vendor,
    estimatedPreparationTime: '30-45 minutes',
    trackingId: `TRK-${Date.now()}`
  };
};