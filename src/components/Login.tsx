import React, { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
// import toast, { Toaster } from 'react-hot-toast';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Using your actual AuthContext
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Mock toast for demo - in your actual project, use: import toast from 'react-hot-toast'
  const toast = {
    success: (message: string) => {
      setToastMessage({ type: "success", message });
      setTimeout(() => setToastMessage(null), 4000);
    },
    error: (message: string) => {
      setToastMessage({ type: "error", message });
      setTimeout(() => setToastMessage(null), 4000);
    },
    loading: (message: string) => {
      setToastMessage({ type: "loading", message });
      return { id: "loading" };
    },
    dismiss: (id: string) => {
      setToastMessage(null);
    },
  };

  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error" | "loading";
    message: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingToast = toast.loading("Signing you in...");

    try {
      // Using your actual AuthContext login function
      const result = await login(formData);

      toast.dismiss(loadingToast.id);

      if (result.success) {
        toast.success(
          `Welcome back${result.user?.name ? `, ${result.user.name}` : ""}!`
        );

        // Clear form on successful login
        setFormData({ email: "", password: "" });

        // Navigate to dashboard after successful login
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast.id);
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = () => {
    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Mock Toast Component - In your actual project, use <Toaster /> */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg max-w-sm ${
              toastMessage.type === "success"
                ? "bg-green-500 text-white"
                : toastMessage.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {toastMessage.type === "success" && (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            )}
            {toastMessage.type === "error" && (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            {toastMessage.type === "loading" && (
              <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
            )}
            <span className="text-sm">{toastMessage.message}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="current-password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo credentials: demo@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
