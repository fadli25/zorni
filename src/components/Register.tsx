import React, { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
  UserPlus,
} from "lucide-react";

// Mock AuthContext and useNavigate for demonstration purposes
// In a real application, you would import these from your actual context and router setup.

// Mock type definitions for demonstration
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name?: string;
    email: string;
  };
}

interface AuthContextType {
  register: (credentials: {
    email: string;
    password: string;
  }) => Promise<AuthResponse>;
  loading: boolean;
  // Add other auth-related properties if needed, e.g., currentUser
}

// Mock useAuth hook
const useAuth = (): AuthContextType => {
  const [loading, setLoading] = useState(false);

  const register = async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call delay

    if (
      credentials.email === "newuser@example.com" &&
      credentials.password === "newpassword"
    ) {
      setLoading(false);
      return {
        success: true,
        user: { id: "2", name: "New User", email: "newuser@example.com" },
      };
    } else if (credentials.email === "existing@example.com") {
      setLoading(false);
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }
    setLoading(false);
    return {
      success: false,
      message: "Registration failed. Please try a different email or password.",
    };
  };

  return { register, loading };
};

// Mock useNavigate hook
const useNavigate = () => {
  return (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would trigger a route change.
  };
};

// Mock Link component (from react-router-dom)
const Link = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        console.log(`Link clicked: ${to}`);
      }}
    >
      {children}
    </a>
  );
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Using the mock useAuth for demo
  const { register, loading } = useAuth();
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
      toast.error("Please enter a password");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingToast = toast.loading("Registering your account...");

    try {
      // Using the mock register function
      const result = await register({
        email: formData.email,
        password: formData.password,
      });

      toast.dismiss(loadingToast.id);

      if (result.success) {
        toast.success(
          `Account created successfully! Welcome${
            result.user?.name ? `, ${result.user.name}` : ""
          }!`
        );

        // Clear form on successful registration
        setFormData({ email: "", password: "", confirmPassword: "" });

        // Navigate to dashboard or login after successful registration
        setTimeout(() => {
          navigate("/login"); // Or '/dashboard' if you want to auto-login
        }, 1500);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss(loadingToast.id);
      toast.error(
        "An unexpected error occurred during registration. Please try again."
      );
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
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
            Create Account
          </h2>
          <p className="text-gray-600">Join us and get started!</p>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Register
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Demo registration: newuser@example.com / newpassword
          </p>
          <p className="text-xs text-gray-500">
            Existing user demo: existing@example.com (will show error)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
