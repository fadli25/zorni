import { useState } from "react";
import { Menu, X, Compass, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    //@ts-ignore
    return user.displayName || user.name || user.email?.split("@")[0] || "User";
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
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
            >
              Morocco Explorer
            </Link>
          </div>

          {/* Auth and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons/User Info */}
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      Welcome, {getUserDisplayName()}!
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

            {/* Mobile Menu Button */}
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
            <div className="flex flex-col space-y-3">
              {loading ? (
                <div className="flex items-center justify-center space-x-2 text-gray-500 py-2">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700 px-4 py-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      Welcome, {getUserDisplayName()}!
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium mx-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm font-medium mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium mx-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
