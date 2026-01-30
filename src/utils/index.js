// Format currency to Egyptian Pounds
export const formatCurrency = (amount, locale = 'ar-EG', currency = 'EGP') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(0);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'ar-EG'
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('ar-EG', { ...defaultOptions, ...options });
};

// Format datetime
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  return date.toLocaleString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,4})$/);

  if (match) {
    let formatted = '';
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += '-' + match[2];
    if (match[3]) formatted += '-' + match[3];
    return formatted;
  }
  return phone;
};

// Validate Egyptian National ID
export const validateNationalId = (id) => {
  if (!id || id.length !== 14) return false;
  if (!/^[0-9]+$/.test(id)) return false;
  return true;
};

// Generate unique ID
export const generateId = () => {
  return crypto.randomUUID();
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// Get nested value from object
export const getNestedValue = (obj, path, defaultValue = null) => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] !== undefined ? current[key] : defaultValue;
  }, obj);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {});
};

// Calculate sum of array
export const sumBy = (array, key) => {
  return array.reduce((total, item) => {
    return total + (Number(item[key]) || 0);
  }, 0);
};

// Remove duplicates from array
export const unique = (array, key) => {
  const seen = new Set();
  return array.filter(item => {
    const value = key ? item[key] : item;
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = key ? a[key] : a;
    const bVal = key ? b[key] : b;

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Classnames helper
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
