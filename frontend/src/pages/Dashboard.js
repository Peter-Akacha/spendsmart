import React, { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, getCategoryColor, getCurrentMonth } from '../utils/helpers';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const { expenses, stats, fetchExpenses, fetchStats, loading } = useExpenses();
  const { month, year } = getCurrentMonth();

  useEffect(() => {
    fetchExpenses({ month, year });
    fetchStats();
  }, [fetchExpenses, fetchStats, month, year]);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const doughnutData = {
    labels: stats.map(s => s._id),
    datasets: [{ data: stats.map(s => s.total), backgroundColor: stats.map(s => getCategoryColor(s._id)), borderWidth: 2 }]
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">This Month</span>
          <span className="stat-value">{formatCurrency(totalSpent)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Transactions</span>
          <span className="stat-value">{expenses.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Top Category</span>
          <span className="stat-value">{stats[0]?._id || 'N/A'}</span>
        </div>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Spending by Category</h3>
            {stats.length > 0 ? <Doughnut data={doughnutData} /> : <p className="no-data">No data yet</p>}
          </div>
          <div className="chart-card">
            <h3>Recent Expenses</h3>
            <div className="recent-list">
              {expenses.slice(0, 5).map(e => (
                <div key={e._id} className="recent-item">
                  <span>{e.title}</span>
                  <span className="amount">{formatCurrency(e.amount)}</span>
                  <span className="category-badge" style={{ background: getCategoryColor(e.category) }}>{e.category}</span>
                </div>
              ))}
              {expenses.length === 0 && <p className="no-data">No expenses this month</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
