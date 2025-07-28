const express = require('express');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    message: `Hello, user ${req.user.userId}! This is a protected route.`,
  });
});

module.exports = router;
