import React, { useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, getCategoryColor, getCurrentMonth } from '../utils/helpers';
import './Reports.css';

const Reports = () => {
  const { stats, fetchStats } = useExpenses();
  const { month, year } = getCurrentMonth();

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const total = stats.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="reports-page">
      <h1 className="page-title">Monthly Report — {month}/{year}</h1>
      <div className="report-total">Total Spent: <strong>{formatCurrency(total)}</strong></div>
      <div className="category-breakdown">
        {stats.map(s => (
          <div key={s._id} className="category-row">
            <span className="cat-dot" style={{ background: getCategoryColor(s._id) }}></span>
            <span className="cat-name">{s._id}</span>
            <div className="cat-bar-wrap">
              <div className="cat-bar" style={{ width: `${(s.total / total) * 100}%`, background: getCategoryColor(s._id) }}></div>
            </div>
            <span className="cat-amount">{formatCurrency(s.total)}</span>
            <span className="cat-pct">{((s.total / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
        {stats.length === 0 && <p className="no-data">No data to report yet.</p>}
      </div>
    </div>
  );
};

export default Reports;
