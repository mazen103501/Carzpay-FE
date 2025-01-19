import React, { createContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    // Set up the interceptor to include the Bearer token if it exists
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (auth.authToken) {
          config.headers.Authorization = `Bearer ${auth.authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [auth.authToken]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
