const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Education', 'Other'],
    default: 'Other'
  },
  aiCategory: { type: String },         // AI suggested category
  date: { type: Date, default: Date.now },
  notes: { type: String },
  isRecurring: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
