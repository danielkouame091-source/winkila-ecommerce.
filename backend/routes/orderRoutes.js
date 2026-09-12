const express = require('express');
const router = express.Router();
const { createOrder, updateTrackingStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.put('/:id/tracking', protect, updateTrackingStatus);

module.exports = router;
