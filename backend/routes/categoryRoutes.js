const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Returns available expense categories
router.get('/', protect, (req, res) => {
  res.json(['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Education', 'Other']);
});

module.exports = router;
