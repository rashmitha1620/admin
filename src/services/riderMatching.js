// Rider Matching Service
// This service handles intelligent rider matching based on location, availability, and other factors

import { mockRiders, mockOrders } from '../utils/mockData';

/**
 * Calculate distance between two pincodes (simplified calculation)
 */
const calculateDistance = (pincode1, pincode2) => {
  const diff = Math.abs(parseInt(pincode1) - parseInt(pincode2));
  
  // Convert pincode difference to approximate distance in km
  if (diff < 100) return Math.random() * 3 + 1; // 1-4 km
  if (diff < 1000) return Math.random() * 8 + 2; // 2-10 km
  if (diff < 10000) return Math.random() * 20 + 5; // 5-25 km
  return Math.random() * 50 + 25; // 25-75 km
};

/**
 * Calculate rider score based on multiple factors
 */
const calculateRiderScore = (rider, order) => {
  let score = 0;
  const weights = {
    availability: 30,
    location: 25,
    rating: 20,
    experience: 10,
    capacity: 10,
    vehicleType: 5
  };

  // Availability check
  if (rider.status === 'online' && rider.currentOrders < rider.maxOrders) {
    score += weights.availability;
  }

  // Location proximity (from vendor to rider)
  const vendorPincode = order.vendorDetails?.pincode || order.deliveryAddress.pincode;
  const distance = calculateDistance(vendorPincode, rider.pincode);
  const locationScore = Math.max(0, weights.location - (distance / rider.deliveryRadius) * weights.location);
  score += locationScore;

  // Rating (normalized to 0-20 scale)
  const ratingScore = (rider.rating / 5) * weights.rating;
  score += ratingScore;

  // Experience (years converted to score)
  const experienceYears = parseFloat(rider.experience) || 0;
  const experienceScore = Math.min(experienceYears * 2, weights.experience);
  score += experienceScore;

  // Capacity utilization (prefer riders with lower current load)
  const capacityUtilization = rider.currentOrders / rider.maxOrders;
  const capacityScore = (1 - capacityUtilization) * weights.capacity;
  score += capacityScore;

  // Vehicle type preference (motorcycle > scooter > bicycle for longer distances)
  let vehicleScore = 0;
  if (distance > 10) {
    vehicleScore = rider.vehicleType === 'Motorcycle' ? weights.vehicleType : 
                   rider.vehicleType === 'Scooter' ? weights.vehicleType * 0.7 : 
                   weights.vehicleType * 0.4;
  } else {
    vehicleScore = weights.vehicleType * 0.8; // All vehicles suitable for short distances
  }
  score += vehicleScore;

  return {
    score: Math.round(score * 10) / 10,
    breakdown: {
      availability: rider.status === 'online' && rider.currentOrders < rider.maxOrders ? weights.availability : 0,
      location: Math.round(locationScore * 10) / 10,
      rating: Math.round(ratingScore * 10) / 10,
      experience: Math.round(experienceScore * 10) / 10,
      capacity: Math.round(capacityScore * 10) / 10,
      vehicleType: Math.round(vehicleScore * 10) / 10
    },
    distance: Math.round(distance * 10) / 10,
    estimatedTime: Math.round((distance / 25) * 60), // Estimated time in minutes (assuming 25 km/h average)
    availableCapacity: rider.maxOrders - rider.currentOrders
  };
};

/**
 * Find top matching riders for an order
 */
export const findMatchingRiders = (order, limit = 3) => {
  const availableRiders = mockRiders.filter(rider => 
    rider.status === 'online' && rider.currentOrders < rider.maxOrders
  );
  
  const riderScores = availableRiders.map(rider => ({
    ...rider,
    matchData: calculateRiderScore(rider, order)
  }));

  // Sort by score (descending) and return top matches
  const topMatches = riderScores
    .sort((a, b) => b.matchData.score - a.matchData.score)
    .slice(0, limit);

  return topMatches;
};

/**
 * Get rider recommendations with detailed analysis
 */
export const getRiderRecommendations = (order) => {
  const matches = findMatchingRiders(order, 5);
  
  const recommendations = {
    topMatches: matches.slice(0, 3),
    alternativeOptions: matches.slice(3),
    orderAnalysis: {
      pickupLocation: {
        vendor: order.vendorDetails?.name || 'Unknown Vendor',
        address: order.vendorDetails?.address || 'Unknown Address',
        pincode: order.vendorDetails?.pincode || order.deliveryAddress.pincode
      },
      deliveryLocation: {
        address: `${order.deliveryAddress.area}, ${order.deliveryAddress.city}`,
        pincode: order.deliveryAddress.pincode
      },
      orderValue: order.total,
      priority: order.priority || 'normal',
      estimatedDistance: calculateDistance(
        order.vendorDetails?.pincode || order.deliveryAddress.pincode,
        order.deliveryAddress.pincode
      )
    },
    matchingCriteria: {
      primaryFactors: ['Rider Availability', 'Location Proximity', 'Rider Rating'],
      secondaryFactors: ['Experience Level', 'Current Capacity', 'Vehicle Type']
    }
  };

  return recommendations;
};

/**
 * Search riders by name or location
 */
export const searchRiders = (searchTerm, order = null) => {
  const availableRiders = mockRiders.filter(rider => 
    rider.status === 'online' && rider.currentOrders < rider.maxOrders
  );
  
  const filteredRiders = availableRiders.filter(rider => 
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.currentLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If order is provided, calculate scores for search results
  if (order) {
    return filteredRiders.map(rider => ({
      ...rider,
      matchData: calculateRiderScore(rider, order)
    })).sort((a, b) => b.matchData.score - a.matchData.score);
  }

  return filteredRiders;
};

/**
 * Get rider details with current status
 */
export const getRiderDetails = (riderId) => {
  const rider = mockRiders.find(r => r.id === riderId);
  if (!rider) return null;

  return {
    ...rider,
    currentStatus: {
      isAvailable: rider.status === 'online' && rider.currentOrders < rider.maxOrders,
      capacityUtilization: Math.round((rider.currentOrders / rider.maxOrders) * 100),
      remainingCapacity: rider.maxOrders - rider.currentOrders,
      estimatedResponseTime: rider.status === 'online' ? '5-10 minutes' : 'Currently offline'
    }
  };
};

/**
 * Simulate rider assignment
 */
export const assignOrderToRider = async (orderId, riderId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const rider = mockRiders.find(r => r.id === riderId);
  if (!rider) {
    throw new Error('Rider not found');
  }

  if (rider.status !== 'online' || rider.currentOrders >= rider.maxOrders) {
    throw new Error('Rider is not available or at capacity');
  }

  // Update rider's current orders (in real app, this would be handled by backend)
  rider.currentOrders += 1;

  // Update the order status to assigned (which will move it to respective order type tab)
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = 'assigned';
    mockOrders[orderIndex].deliveryPartner = rider.name;
    mockOrders[orderIndex].riderDetails = {
      id: riderId,
      name: rider.name,
      phone: rider.phone,
      vehicleType: rider.vehicleType
    };
  }

  return {
    success: true,
    assignedRider: rider,
    estimatedPickupTime: '15-20 minutes',
    estimatedDeliveryTime: '45-60 minutes',
    trackingId: `TRK-${Date.now()}`
  };
};