import { Link } from "react-router-dom"
import { Check, HelpCircle } from "lucide-react"

const PricingCard = ({ plan, features, price, apiCalls, isPopular, onSelect }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
        isPopular
          ? "border-2 border-green-500 dark:border-green-400 scale-105"
          : "border border-gray-200 dark:border-gray-700"
      }`}
    >
      {isPopular && (
        <div className="bg-green-500 dark:bg-green-600 text-white text-center py-1 text-sm font-medium">Active Plan</div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{plan}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">₹{price}</span>
          {price > 0 && <span className="text-gray-600 dark:text-gray-400">/month</span>}
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">{apiCalls.toLocaleString()} API calls per month</p>

        {isPopular ? (
  <Link
    to={`/payment/${plan.toLowerCase()}`}
    className="block w-full py-2 px-4 rounded-lg text-center font-medium transition-colors bg-green-600 hover:bg-green-700 text-white"
  >
    Buy API Key
  </Link>
) : (
  <div
    className={`block w-full py-2 px-4 rounded-lg text-center font-medium ${
      isPopular
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-not-allowed opacity-75"
    }`}
  >
    Coming Soon
  </div>
)}
      </div>

      <div className="px-6 pb-6">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-4">Features:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Pricing = () => {

  const plans = [
    {
      plan: "Beta-1",
      price: 700,
      apiCalls: 100,
      features: [
        "Basic plant disease detection",
        "Web interface access",
        "Standard response time",
        "Community support",
      ],
      isPopular: false,
    },
    {
      plan: "Pro",
      price: 300,
      apiCalls: 50,
      features: [
        "Standard plant disease detection",
        "API access",
        "Faster response time",
        "Adds 50 api calls to you exsiting Api_Key",
        "Detailed analysis reports",
      ],
      isPopular: true,
    },
    {
      plan: "Beta-2",
      price: 1000,
      apiCalls: 50000,
      features: [
        "Premium plant disease detection",
        "Unlimited API access",
        "Priority response time",
        "Dedicated support",
        "Custom integration",
        "White-label options",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you and start detecting plant disease today.
          </p>

          
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} />
          ))}
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-green-800 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-green-800 rounded-full p-2">
              <HelpCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Need a custom plan?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We offer custom solutions for businesses with specific needs. Contact our sales team to discuss your
                requirements.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Contact Sales
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

