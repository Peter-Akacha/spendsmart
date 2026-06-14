const Expense = require('../models/Expense');
const axios = require('axios');

// GET all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const { month, year, category } = req.query;
    let filter = { user: req.user._id };
    if (category) filter.category = category;
    if (month && year) {
      filter.date = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1)
      };
    }
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create expense with AI categorization
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, date, notes, isRecurring } = req.body;

    // Call Python AI service for categorization
    let aiCategory = 'Other';
    try {
      const aiResponse = await axios.post(`${process.env.PYTHON_AI_URL}/categorize`, { title, amount });
      aiCategory = aiResponse.data.category;
    } catch (aiError) {
      console.log('AI service unavailable, using default category');
    }

    const expense = await Expense.create({
      user: req.user._id,
      title, amount, date, notes, isRecurring,
      category: aiCategory,
      aiCategory
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });
    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET spending summary/stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
