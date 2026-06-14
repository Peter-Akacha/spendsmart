import React, { useEffect, useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, formatDate, getCategoryColor, getCurrentMonth } from '../utils/helpers';
import './Expenses.css';

const CATEGORIES = ['Food','Transport','Housing','Entertainment','Health','Shopping','Education','Other'];

const Expenses = () => {
  const { expenses, fetchExpenses, addExpense, deleteExpense, loading } = useExpenses();
  const { month, year } = getCurrentMonth();
  const [form, setForm] = useState({ title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
  const [showForm, setShowForm] = useState(false);
  const [aiHint, setAiHint] = useState('');

  useEffect(() => { fetchExpenses({ month, year }); }, [fetchExpenses, month, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addExpense(form);
    setAiHint(`🤖 AI categorized as: ${result.category}`);
    setForm({ title: '', amount: '', date: new Date().toISOString().split('T')[0], notes: '' });
    setShowForm(false);
    setTimeout(() => setAiHint(''), 4000);
  };

  return (
    <div className="expenses-page">
      <div className="expenses-header">
        <h1 className="page-title">Expenses</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Expense</button>
      </div>
      {aiHint && <div className="ai-hint">{aiHint}</div>}
      {showForm && (
        <form className="expense-form" onSubmit={handleSubmit}>
          <input placeholder="Title (e.g. Lunch at Mr Biggs)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
          <input placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          <button type="submit" className="btn-primary">Save — AI will auto-categorize</button>
        </form>
      )}
      {loading ? <p>Loading...</p> : (
        <div className="expenses-list">
          {expenses.map(e => (
            <div key={e._id} className="expense-item">
              <span className="category-dot" style={{ background: getCategoryColor(e.category) }}></span>
              <div className="expense-info">
                <span className="expense-title">{e.title}</span>
                <span className="expense-meta">{formatDate(e.date)} · {e.category}</span>
              </div>
              <span className="expense-amount">{formatCurrency(e.amount)}</span>
              <button className="btn-delete" onClick={() => deleteExpense(e._id)}>🗑</button>
            </div>
          ))}
          {expenses.length === 0 && <p className="no-data">No expenses yet. Add your first one!</p>}
        </div>
      )}
    </div>
  );
};

export default Expenses;
