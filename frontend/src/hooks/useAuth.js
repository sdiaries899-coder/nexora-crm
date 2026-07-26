import { useContext } from "react"; //used to read value from context
import AuthContext from "../context/AuthContext";// contain all data like login user logout user and all authentication etc

/**
 * @desc Custom hook to access AuthContext
 */
const useAuth = () => {
  const context = useContext(AuthContext); // instead of writing useAuth(AuthContext) everywhere just use context

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default useAuth;