import PlantDiseaseImg from "../img/img.jpeg";
import { useNavigate } from "react-router-dom";
import HowToUse from "../components/HowToUse";

const Hero = ({ openAuthModal }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-[10rem]">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 dark:from-blue-400 dark:via-green-400 dark:to-teal-400">
              Detect Plant Diseases with AI 🌿
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Upload an image and let our AI analyze plant health. Identify
              diseases early and protect your crops with precision detection.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/Predict-Image")}
                className="px-12 py-6 bg-green-600 text-4xl hover:bg-green-700 text-white rounded-lg text-lg font-medium transition-all transform hover:scale-105"
              >
                Try for Free
              </button>
              <button
                onClick={() => navigate("/pricing")}
                className="px-12 py-6 border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-lg font-medium transition-all"
              >
                Upgrade
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <img
              src={PlantDiseaseImg}
              alt="Plant Disease Detection"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="-mt-10">
        <HowToUse />
      </div>
    </section>
  );
};

export default Hero;
