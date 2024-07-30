import { useState } from "react";
import { createContext } from "react";
import axios from "../configs/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import { useEffect } from "react";
//import { redirect } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  const getUser = async () => {
    const response = await axios.get("/auth/me");
    if (!response.status === 200) {
      throw new Error("Network response was not 200");
    }
    setAuthUser(response.data.user);
  };

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
      setInitialLoading(false);
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = async (credential) => {
    const res = await axios.post("/auth/login", credential);
    console.log(res.data.accessToken);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const Forgotpassword = async (ForgotpasswordInput) => {
    const res = await axios.post("/auth/forgotpassword", ForgotpasswordInput);
    console.log(res.data.accessToken);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const resetpassword = async (token, ResetpasswordInput) => {
    try {
      const response = await axios.post(`/auth/reset-password/${token}`, ResetpasswordInput);
  
      // Assuming response.data contains the necessary data from the server
      console.log(response.data.accessToken);
      // Assuming addAccessToken and setAuthUser are functions defined elsewhere in your application
      addAccessToken(response.data.accessToken);
      setAuthUser(response.data.user);
  
      // Optionally, navigate to login or home page
    } catch (error) {
      console.error('Failed to reset password:', error);
      // Handle error as needed
    }
  };
  
  

  const register = async (registerInputObj) => {
    const res = await axios.post("/auth/register", registerInputObj);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
    window.location.replace("/welcome");  };

  return (
    <AuthContext.Provider
      value={{
        login,
        authUser,
        register,
        logout,
        initialLoading,
        getUser,
        Forgotpassword,
        resetpassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}