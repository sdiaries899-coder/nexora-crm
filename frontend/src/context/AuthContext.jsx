import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

/**
 * @desc Auth Provider
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * @desc Fetch current user
   */
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * @desc Login
   */
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    return res.data;
    // setUser(res.data.data);
  };

  /**
   * @desc Logout
   */
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @desc useAuth Hook
 */
export const useAuth = () => useContext(AuthContext);

export default AuthContext;