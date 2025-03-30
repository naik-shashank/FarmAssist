import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Sun, Moon } from "lucide-react";

const Navbar = ({ openAuthModal, isLoggedIn, setIsLoggedIn }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="p-4 sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-rtext-transparent bg-gradient-to-r from-blue-600 via-green-500 to-teal-500 dark:from-blue-400 dark:via-green-400 dark:to-teal-400">
              FarmAssist
            </span>
            <span className="ml-1 text-sm bg-green-600 text-white dark:bg-green-400 dark:text-gray-900 px-1 rounded">
              AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/Predict-Image"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Predict-Image
            </Link>
            <Link
              to="/pricing"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/api-docs"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              API Docs
            </Link>
            <Link
              to="/croprec"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Crop Recomendation
            </Link>
          </div>

          {/* Auth Buttons & Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={30} /> : <Moon size={30} />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-xl text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xl bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => openAuthModal("signin")}
                  className="px-4 py-2 text-xl text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="px-4 py-2 text-xl bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
