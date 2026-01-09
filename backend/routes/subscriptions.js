const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

module.exports = router;
