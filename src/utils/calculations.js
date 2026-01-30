// Calculate total income from all sources
export const calculateTotalIncome = (sources) => {
  return Object.values(sources).reduce((sum, val) => sum + (val || 0), 0);
};

// Calculate total expenses from all items
export const calculateTotalExpenses = (items) => {
  return Object.values(items).reduce((sum, val) => sum + (val || 0), 0);
};

// Calculate net balance (income - expenses)
export const calculateNetBalance = (income, expenses) => {
  return income - expenses;
};

// Generate a unique ID
export const generateId = () => {
  return crypto.randomUUID();
};

// Format currency to Egyptian Pounds
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Validate Egyptian National ID
export const validateNationalId = (id) => {
  if (!id || id.length !== 14) return false;
  if (!/^[0-9]+$/.test(id)) return false;
  return true;
};

// Calculate age from birth date
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};
