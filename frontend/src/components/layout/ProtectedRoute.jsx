import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * @desc Protect routes based on authentication
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking auth
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // If logged in
  return children;
};

export default ProtectedRoute;