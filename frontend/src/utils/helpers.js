export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const getCategoryColor = (category) => {
  const colors = {
    Food: '#FF6384', Transport: '#36A2EB', Housing: '#FFCE56',
    Entertainment: '#4BC0C0', Health: '#9966FF', Shopping: '#FF9F40',
    Education: '#00D4AA', Other: '#C9CBCF'
  };
  return colors[category] || '#C9CBCF';
};

export const getCurrentMonth = () => {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
};
