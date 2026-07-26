//this is the heart of the app security it will keeps track of whos is login and provide the global login logout operation to the app 
import { createContext, useContext, useEffect, useState } from "react";
// createContext = create global context that store all authentication data
//useContext = its tool that is used to read data from context
//useEffect = run side effect like loading 
//useState = used for storing data temparary
import API from "../services/api";
//above line has know the backend servers base url and automatically handle http coockies and authentication headers

const AuthContext = createContext();//this will create container that has all data

/**
 * @desc Auth Provider
 */

export const AuthProvider = ({ children }) => {
//auth provider has every page of the application wrapped inside this
  const [user, setUser] = useState(null);// useState is used to update the user initially null and once user get register in has data
  const [loading, setLoading] = useState(true);//set loading is true until it check user is log in or not 

  /**
   * @desc Fetch current user
   */
  const fetchUser = async () => {
  //this is the function which is used to fetch the user data 
    try {
      const res = await API.get("/auth/me");//this function used to get user info if user is login
      setUser(res.data.data);//if found then setUser(res.data.data) will setup user data 
    } catch {
      setUser(null);//if user not found then user is null and finally we can stop laoding by setLoading(false); this code
    } finally {
      setLoading(false);
    }
  };
//this useEffect(()) function runs just after user start app and it runs only once to check if the user exist or not 
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * @desc Login
   */
  const login = async (data) => {
  //above line is asychronous login function that take data from frontend inthis function
    const res = await API.post("/auth/login", data);//this will send data to backend for verification
    return res.data;//this give you responce back of backend if user exist or not 
    // setUser(res.data.data);
  };

  /**
   * @desc Logout
   */
  const logout = async () => {
    try {
      await API.post("/auth/logout");// this call the logout function to get user logout by clear user coockies 
    } finally {
      setUser(null);// remove user from react state
      window.location.href = "/login";// this ref all page and redirect to the login page 
    }
  };

  return (
//auth context provider can make data avaialable globally and children represent all component insides the provider 
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
export const useAuth = () => useContext(AuthContext);//this is the custom hook
//instead of importing useContext and AuthContext everywhere we can just useAuth = useContext(AuthContext)

export default AuthContext;