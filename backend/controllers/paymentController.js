// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User=require("../models/user_model")
const {generateApiKey}=require("../utils/jwt&key")

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order endpoint
exports.createOrder = async (req, res) => {
  try {
  
    const { amount, currency = 'INR' } = req.body;
    
    // Convert amount to paise (smallest currency unit for INR)
    const amountInPaise = Math.round(amount * 100);
    
    const options = {
      amount: amountInPaise,
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1 // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      id: order.id,
      currency: order.currency,
      amount: order.amount
    });
    
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
};

// Verify payment endpoint
exports.verifyPayment = async (req, res) => {
  try {
    
    const { paymentId, plan, amount } = req.body;
    console.log(paymentId,plan,amount)
    // Get payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    
    // Verify payment status
    if (payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: 'Payment not captured'
      });
    }
    
    // Verify payment amount
    const expectedAmount = Math.round(amount * 100);
    if (payment.amount !== expectedAmount) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount mismatch'
      });
    }
    
    //updating user
    let inc=0;
    if(plan==="pro") inc=50  //change accordingly
    
    console.log(req.user)
    const id=req.user._id
    const user=await User.findById(id);
    
    if(user.api_key==null){
      const token=generateApiKey(id)
      user.api_key=token
    }

    user.apiKeyActive=true
    user.totalRemaining=user.totalRemaining+inc

    await user.save()

    
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully'
    });
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
};

// Webhook for additional security (optional but recommended)
// exports.paymentWebhook = async (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//   const shasum = crypto.createHmac('sha256', secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest('hex');
  
//   if (digest !== req.headers['x-razorpay-signature']) {
//     return res.status(401).json({ message: 'Invalid signature' });
//   }
  
//   const { event, payload } = req.body;
  
//   if (event === 'payment.captured') {
//     // Handle successful payment
//     const { payment } = payload;
    
//     // Verify and process payment (similar to verifyPayment)
//     // This provides an additional layer of security
//   }
  
//   res.status(200).json({ status: 'ok' });
// };