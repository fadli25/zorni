import { useState } from "react";
import { AuthProvider } from "./auth/AuthContext";
import AuthForm from "./auth/AuthForm";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./auth/AuthContext";

const AuthWrapper = ({ isLogin, setIsLogin }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  return user ? (
    <Dashboard />
  ) : (
    <AuthForm isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
  );
};

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <AuthProvider>
      <AuthWrapper isLogin={isLogin} setIsLogin={setIsLogin} />
    </AuthProvider>
  );
}
