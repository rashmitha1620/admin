export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    vendor_assigned: 'bg-purple-100 text-purple-800',
    assigned: 'bg-purple-100 text-purple-800',
    in_transit: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const calculateDiscount = (original, current) => {
  if (!original || original === current) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GRO-${year}-${random}`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const showNotification = (title, message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.zIndex = '9999'; // Ensure notifications appear above modals
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
    type === 'success' ? 'bg-emerald-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
    type === 'warning' ? 'bg-yellow-500 text-white' :
    'bg-blue-500 text-white'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-medium">${title}</h4>
        <p class="text-sm opacity-90">${message}</p>
      </div>
      <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
        ×
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.email && value && !/\S+@\S+\.\S+/.test(value)) {
      errors[field] = `${field} must be a valid email`;
    }
    
    if (rule.phone && value && !/^\+?[\d\s-()]+$/.test(value)) {
      errors[field] = `${field} must be a valid phone number`;
    }
  });
  
  return errors;
};

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showNotification('Copied!', 'Text copied to clipboard', 'success');
  } catch (err) {
    console.error('Failed to copy: ', err);
    showNotification('Error', 'Failed to copy to clipboard', 'error');
  }
};

// Make showNotification globally available
window.showNotification = showNotification;

export const generateInviteLink = (type, email, additionalData = {}) => {
  const baseUrl = 'https://grooso.com';
  const encodedData = btoa(JSON.stringify({ email, ...additionalData }));
  return `${baseUrl}/${type}-invite/${encodedData}`;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const searchFilter = (items, searchTerm, searchFields) => {
  if (!searchTerm) return items;
  
  return items.filter(item => 
    searchFields.some(field => 
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

export const sortData = (data, sortBy, sortOrder = 'asc') => {
  return [...data].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};