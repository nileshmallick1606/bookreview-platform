const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');
const recommendationRoutes = require('./recommendationRoutes');

// Mount the routes
router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
router.use('/recommendations', recommendationRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

module.exports = router;
