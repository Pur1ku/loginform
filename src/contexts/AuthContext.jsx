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

  const [authUser, setAuthUser] = useState(null);

 

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

  const confirmEmail = async (token) => {
    try {
      const response = await axios.get(`/auth/confirm-email/${token}`);
  
      // Assuming response.data contains the necessary data from the server
      console.log(response.data.accessToken);
      // Assuming addAccessToken and setAuthUser are functions defined elsewhere in your application
      addAccessToken(response.data.accessToken);
      setAuthUser(response.data.user);
  
      // Optionally, navigate to login or home page
    } catch (error) {
      console.error('Failed to confirm email:', error);
      // Handle error as needed
    }
  };
  
  

  const register = async (registerInputObj) => {
    try {
     
      const res = await axios.post("/auth/register", registerInputObj);
  
      
      addAccessToken(res.data.accessToken); // Add access token to state or storage
      setAuthUser(res.data.user); // Set authenticated user data in state or storage
    } catch (error) {
      // Handle error if Axios request fails or server returns an error
      console.error("Registration failed:", error);
      // Optionally throw or handle the error further
    }
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
      
        Forgotpassword,
        resetpassword,
        confirmEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}