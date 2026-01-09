const Razorpay = require('razorpay');
const crypto = require('crypto');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_missing',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_missing',
});

// @desc    Create subscription order
// @route   POST /api/subscriptions/create-order
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const options = {
      amount: 19900, // ₹199 in paise
      currency: 'INR',
      receipt: `sub_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        plan: 'pro'
      }
    };

    const order = await razorpay.orders.create(options);

    // Create subscription record
    await Subscription.create({
      userId: req.user._id,
      planType: 'pro',
      amount: 19900,
      currency: 'INR',
      status: 'created',
      razorpayOrderId: order.id,
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment
// @route   POST /api/subscriptions/verify-payment
// @access  Private
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update subscription status
      const subscription = await Subscription.findOne({ razorpayOrderId: razorpay_order_id });
      if (subscription) {
        subscription.status = 'active';
        subscription.razorpayPaymentId = razorpay_payment_id;
        subscription.razorpaySignature = razorpay_signature;
        subscription.startDate = new Date();
        subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await subscription.save();
      }

      // Update user subscription
      await User.findByIdAndUpdate(req.user._id, {
        'subscription.tier': 'pro',
        'subscription.expiresAt': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
