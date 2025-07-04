// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios, { AxiosError } from "axios";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  login: (credentials: LoginData) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Set up axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Verify token on app load
      getCurrentUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [token]);

  const getCurrentUser = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/");
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout(); // Clear invalid token
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        userData
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return { success: true, user };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Registration failed";
      return { success: false, message };
    }
  };

  const login = async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return { success: true, user };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || "Login failed";
      return { success: false, message };
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
