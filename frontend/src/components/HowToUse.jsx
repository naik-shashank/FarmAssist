import { motion } from "framer-motion";
import { FaUserPlus, FaTachometerAlt, FaLeaf, FaSeedling, FaShoppingCart } from "react-icons/fa";

const steps = [
  { title: "User Registration", icon: <FaUserPlus />, description: "Sign up to access features." },
  { title: "Dashboard Access", icon: <FaTachometerAlt />, description: "Explore your personalized dashboard." },
  { title: "Find Plant Disease", icon: <FaLeaf />, description: "Analyze plant diseases and get solutions." },
  { title: "Crop Recommendation", icon: <FaSeedling />, description: "Receive AI-powered crop recommendations." },
  { title: "Buy Subscription", icon: <FaShoppingCart />, description: "Get access to advanced predictions." }
];

export default function Timeline() {
  return (
    <div className="flex flex-col items-center w-full py-10 text-white">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="relative w-3/4 max-w-3xl">
        <div className="absolute left-1/2 w-1 bg-gray-600 h-full transform -translate-x-1/2"></div>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className={`flex items-center w-full mb-10 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div className="w-1/2 flex flex-col items-center text-center">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-2 text-green-400">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
