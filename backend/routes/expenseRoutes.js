const express = require('express');
const router = express.Router();
const { getExpenses, createExpense, updateExpense, deleteExpense, getStats } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);
router.get('/summary/stats', protect, getStats);

module.exports = router;
