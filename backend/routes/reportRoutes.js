const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Expense = require('../models/Expense');

// GET monthly report
router.get('/monthly', protect, async (req, res) => {
  try {
    const { month, year } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const expenses = await Expense.find({ user: req.user._id, date: { $gte: start, $lt: end } });
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    res.json({ total, byCategory, expenses, month, year });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
