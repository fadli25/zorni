import React, { useState, useEffect } from "react";
import { Menu, X, Compass, LogIn, UserPlus, LogOut, User } from "lucide-react";

// Mock AuthContext and useNavigate for demonstration purposes
// In a real application, you would import these from your actual context and router setup.

// Mock type definitions for demonstration
interface AuthUser {
  id: string;
  name?: string;
  username?: string; // Added username
  email: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  login: (credentials: any) => Promise<any>; // Simplified for mock
  logout: () => Promise<void>;
  register: (credentials: any) => Promise<any>; // Simplified for mock
}

// Mock useAuth hook
const useAuth = (): AuthContextType => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // Simulate initial loading

  useEffect(() => {
    // Simulate checking auth status on component mount
    setTimeout(() => {
      // For demo, assume no user initially. You could load from localStorage here.
      // const storedUser = localStorage.getItem('mockUser');
      // if (storedUser) {
      //   setCurrentUser(JSON.parse(storedUser));
      // }
      setLoading(false);
    }, 500);
  }, []);

  const login = async (credentials: any): Promise<any> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (
      credentials.email === "demo@example.com" &&
      credentials.password === "password"
    ) {
      const user: AuthUser = {
        id: "1",
        name: "Demo User",
        username: "demouser",
        email: "demo@example.com",
      };
      setCurrentUser(user);
      // localStorage.setItem('mockUser', JSON.stringify(user));
      setLoading(false);
      return { success: true, user };
    }
    setLoading(false);
    return { success: false, message: "Invalid credentials" };
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCurrentUser(null);
    // localStorage.removeItem('mockUser');
    setLoading(false);
  };

  const register = async (credentials: any): Promise<any> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (
      credentials.email === "newuser@example.com" &&
      credentials.password === "newpassword"
    ) {
      const user: AuthUser = {
        id: "3",
        name: credentials.name,
        username: credentials.username,
        email: credentials.email,
      };
      setCurrentUser(user); // Auto-login after register for demo
      setLoading(false);
      return { success: true, user };
    }
    setLoading(false);
    return { success: false, message: "Registration failed" };
  };

  return { currentUser, loading, login, logout, register };
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

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, loading, logout } = useAuth(); // Use the mock auth hook
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 sticky top-0 z-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Morocco Explorer
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/destinations"
              className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 relative group"
            >
              Destinations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/experiences"
              className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 relative group"
            >
              Experiences
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/culture"
              className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 relative group"
            >
              Culture
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Auth and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons/User Info */}
            {!loading && (
              <div className="hidden md:flex items-center space-x-4">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span className="font-medium">
                        Welcome,{" "}
                        {currentUser.name ||
                          currentUser.username ||
                          currentUser.email.split("@")[0]}
                        !
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm font-medium"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                Home
              </Link>
              <Link
                to="/destinations"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                Destinations
              </Link>
              <Link
                to="/experiences"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                Experiences
              </Link>
              <Link
                to="/culture"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                Culture
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-orange-50"
              >
                Contact
              </Link>
              {!loading && (
                <>
                  {currentUser ? (
                    <>
                      <div className="flex items-center space-x-2 text-gray-700 px-2 py-1">
                        <User className="w-5 h-5" />
                        <span className="font-medium">
                          Welcome,{" "}
                          {currentUser.name ||
                            currentUser.username ||
                            currentUser.email.split("@")[0]}
                          !
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium mx-2"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm font-medium mx-2"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium mx-2"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
