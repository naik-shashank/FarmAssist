// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth=require("../utils/jwt&key")
//const { protect } = require('../middleware/authMiddleware'); // If using auth

router.post('/orders',auth.verifyAuthToken,paymentController.createOrder);
router.post('/verify',auth.verifyAuthToken,paymentController.verifyPayment);
//router.post('/webhook', paymentController.paymentWebhook); // For Razorpay webhooks

module.exports = router;