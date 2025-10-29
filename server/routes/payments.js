const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const auth = require('../middleware/auth');

// Pricing tiers (in paise for INR, 1 INR = 100 paise)
const PRICING = {
  fresh: 200000, // 2000 INR
  middle: 400000, // 4000 INR
  senior: 900000, // 9000 INR
};

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { experienceLevel } = req.body;

    if (!['fresh', 'middle', 'senior'].includes(experienceLevel)) {
      return res.status(400).json({ message: 'Invalid experience level' });
    }

    const amount = PRICING[experienceLevel];

    // Update user experience level
    await User.findByIdAndUpdate(req.user.id, { experienceLevel });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      metadata: {
        userId: req.user.id,
        experienceLevel,
      },
    });

    // Store payment intent ID in user record
    await User.findByIdAndUpdate(req.user.id, {
      stripePaymentIntentId: paymentIntent.id,
      paymentAmount: amount / 100, // Store in INR
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount / 100,
      experienceLevel,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// Handle payment success webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    try {
      await User.findByIdAndUpdate(userId, {
        paymentStatus: 'paid',
      });
      console.log(`Payment succeeded for user ${userId}`);
    } catch (error) {
      console.error('Error updating user payment status:', error);
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    try {
      await User.findByIdAndUpdate(userId, {
        paymentStatus: 'failed',
      });
      console.log(`Payment failed for user ${userId}`);
    } catch (error) {
      console.error('Error updating user payment status:', error);
    }
  }

  res.json({ received: true });
});

// Get user payment status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('paymentStatus experienceLevel paymentAmount');
    res.json(user);
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ message: 'Failed to fetch payment status' });
  }
});

module.exports = router;
