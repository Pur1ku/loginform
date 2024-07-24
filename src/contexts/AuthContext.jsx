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

  const register = async (registerInputObj) => {
    const res = await axios.post("/auth/register", registerInputObj);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        authUser,
        register,
        logout,
        initialLoading,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}