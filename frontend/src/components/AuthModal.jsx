import { useState } from "react";
import { X, Mail, Lock, User, AlertCircle, Check } from "lucide-react";

const AuthModal = ({ type = "signin", onClose, onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (type === "signup" && !name) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = "https://farmassist-api.onrender.com/api/user/";

      if (type === "signin") {
        endpoint = endpoint + "login";
      } else {
        endpoint = endpoint + "signup";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(type === "signup" && { name }), // Only include name for signup
          email,
          pass: password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.jwt);
        setSuccess(
          data.data ||
            (type === "signin"
              ? "Sign in successful!"
              : "Account created successfully!")
        );
        setTimeout(() => {
          onLogin();
        }, 1000);
      } else {
        setError(data.data || "Something went wrong, Check your Credentials");
      }
    } catch (err) {
      setError("Something went wrong, Check your Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            {type === "signin" ? "Sign In" : "Create Account"}
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-800 dark:text-green-200">
              <Check size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field - only for signup */}
            {type === "signup" && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      size={18}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your Name"
                    required={type === "signup"}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
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
                  {type === "signin" ? "Signing in..." : "Creating account..."}
                </span>
              ) : type === "signin" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            {type === "signin" ? (
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setError("");
                    setSuccess("");
                    onClose();
                    setTimeout(() => {
                      document
                        .querySelector('[data-auth-type="signup"]')
                        ?.click();
                    }, 100);
                  }}
                  className="text-green-600 dark:text-green-400 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPassword("");
                    setError("");
                    setSuccess("");
                    onClose();
                    setTimeout(() => {
                      document
                        .querySelector('[data-auth-type="signin"]')
                        ?.click();
                    }, 100);
                  }}
                  className="text-green-600 dark:text-green-400 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
