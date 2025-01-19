import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/api";
import { toast } from "react-toastify";

const localStorageKey = "token";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(localStorageKey)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      localStorage.setItem(localStorageKey, authToken);
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const res = await post("/login", { email, password });
      console.log(res);
      if (res.success) {
        setAuthToken(res.data.token); // Assuming the token is in the response data
        navigate("/dashboard");
      } else {
        toast.error(`${res.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
  };

  const logout = () => {
    setAuthToken(null);
    navigate("/login");
    localStorage.removeItem(localStorageKey);
  };

  return {
    authToken,
    isAuthenticated: !!authToken,
    login,
    logout,
  };
};
