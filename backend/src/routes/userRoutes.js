const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/:id', userController.getUserProfile);

// Protected routes
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.get('/:id/reviews', userController.getUserReviews);
router.post('/favorites/:bookId', authMiddleware, userController.addFavoriteBook);
router.delete('/favorites/:bookId', authMiddleware, userController.removeFavoriteBook);

module.exports = router;
