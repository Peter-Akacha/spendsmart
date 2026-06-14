import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();
const API = process.env.REACT_APP_API_URL;

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`${API}/expenses?${params}`);
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    const { data } = await axios.get(`${API}/expenses/summary/stats`);
    setStats(data);
  }, []);

  const addExpense = async (expenseData) => {
    const { data } = await axios.post(`${API}/expenses`, expenseData);
    setExpenses(prev => [data, ...prev]);
    return data;
  };

  const updateExpense = async (id, expenseData) => {
    const { data } = await axios.put(`${API}/expenses/${id}`, expenseData);
    setExpenses(prev => prev.map(e => e._id === id ? data : e));
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/expenses/${id}`);
    setExpenses(prev => prev.filter(e => e._id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, stats, loading, fetchExpenses, fetchStats, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
