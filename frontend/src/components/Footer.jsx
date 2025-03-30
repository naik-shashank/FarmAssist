import { Link } from "react-router-dom";
import { Twitter, GitlabIcon as GitHub, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Logo & Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                FarmAssist
              </span>
              <span className="ml-1 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white dark:from-green-400 dark:to-emerald-500 px-1 rounded">
                AI
              </span>
            </Link>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Advanced plant disease detection powered by artificial
              intelligence. Protect your crops with early and accurate disease
              identification.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} FarmAssist AI. All rights reserved.
            </p>
          </div>

          {/* Center: Disclaimer */}
          <div className="text-center md:px-6">
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
              Disclaimer
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              FarmAssist AI provides detection results for informational
              purposes only. For critical farming decisions, please consult with
              agricultural experts.
            </p>
          </div>

          {/* Right: Privacy Policy & Social Media */}
          <div className="md:text-right flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
                Legal
              </h3>
              <Link
                to="/privacy-policy"
                className="text-xl text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 bg-clip-text text-transparent">
                Connect With Us
              </h3>
              <div className="flex md:justify-end space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter
                    size={30}
                    className="text-gray-600 dark:text-gray-400 group-hover:text-white"
                  />
                </a>
                <a
                  href="https://github.com/naik-shashank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 transition-colors group"
                  aria-label="GitHub"
                >
                  <GitHub
                    size={25}
                    className="text-gray-600 dark:text-gray-400 group-hover:text-white"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/shashanknaik45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin
                    size={25}
                    className="text-gray-600 dark:text-gray-400 group-hover:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
