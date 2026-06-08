import { useContext } from "react";
import AuthContext from "../context/AuthContext";

/**
 * @desc Custom hook to access AuthContext
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default useAuth;