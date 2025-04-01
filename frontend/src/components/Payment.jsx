import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Check } from "lucide-react"
import axios from "axios"

const Payment = () => {
  const { plan } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const planDetails = {
    free: {
      name: "Free Plan",
      price: 0,
      apiCalls: 100,
    },
    pro: {
      name: "Pro Plan",
      price: 300,
      apiCalls: 5000,
    },
    enterprise: {
      name: "Enterprise Plan",
      price: 99,
      apiCalls: 50000,
    },
  }

  const currentPlan = planDetails[plan] || planDetails.free

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  // Initialize Razorpay payment
  const displayRazorpay = async (orderData) => {
    const res = await loadRazorpayScript()
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const options = {
      key: 'rzp_test_qkeXPdFgurgaAQ', // Replace with your RazorPay key
      amount: orderData.amount * 100, // Convert to paise
      currency: 'INR', 
      name: 'FarmAsssist AI',
      description: `${currentPlan.name} Subscription`,
      order_id: orderData.id,
      handler: async (response) => {
        try {
          // Save payment details to your backend
          await axios.post("https://farmassist-api.onrender.com/api/payment/verify", {
            paymentId: response.razorpay_payment_id,
            plan: plan,
            amount: currentPlan.price
          }, {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          setPaymentSuccess(true)
          // Redirect to dashboard after successful payment
          setTimeout(() => {
            navigate("/dashboard")
          }, 3000)
        } catch (error) {
          alert("Payment verification failed. Please contact support.")
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: '' // Add phone if you collect it
      },
      theme: {
        color: '#3399cc'
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)
      setFormData({ ...formData, [name]: formatted })
    } else if (name === "expiry") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)
      setFormData({ ...formData, [name]: formatted })
    } else if (name === "cvc") {
      const formatted = value.replace(/\D/g, "").slice(0, 3)
      setFormData({ ...formData, [name]: formatted })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentPlan.price > 0) {
      if (!formData.name || !formData.email) {
        alert("Please fill in all required fields")
        return
      }
    }

    setIsLoading(true)

    try {
      if (currentPlan.price === 0) {
        // Handle free plan directly
        setPaymentSuccess(true)
        setTimeout(() => {
          navigate("/dashboard")
        }, 3000)
      } else {
        // Create RazorPay order
        const orderResponse = await axios.post("http://localhost:8000/api/payment/orders", {
          amount: currentPlan.price,
          currency: 'INR' // Or 'INR'
        }, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        })
        
        // Show RazorPay payment modal
        displayRazorpay(orderResponse.data)
      }
    } catch (error) {
      alert("Payment processing failed. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="container mx-auto max-w-md py-20 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {currentPlan.price > 0 
              ? "Thank you for your payment! Your subscription is now active."
              : "Your free plan has been activated successfully!"}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <button
        onClick={() => navigate("/pricing")}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Pricing
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Plan</span>
                <span className="font-medium">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">API Calls</span>
                <span className="font-medium">{currentPlan.apiCalls.toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Billing</span>
                <span className="font-medium">Monthly</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>{currentPlan.price}/month</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6 md:w-2/3">
            <h2 className="text-xl font-bold mb-6">Payment Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="John Doe"
                    required={currentPlan.price > 0}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    required={currentPlan.price > 0}
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${currentPlan.price}`
                  )}
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>Your payment is secure and encrypted</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
