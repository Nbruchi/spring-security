/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { BASE_URL } from "../utils";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchSecretKey = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/config/secret-key`);
      const { secretKey, expiryTime } = response.data;
      localStorage.setItem("secretKey", secretKey);
      localStorage.setItem("expiryTime", expiryTime);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Function to check token expiry
  const checkTokenExpiry = useCallback(() => {
    const tokenExpiry = localStorage.getItem("expiryTime");
    if (tokenExpiry) {
      const expiryTime = new Date(tokenExpiry).getTime();
      const currentTime = new Date().getTime();
      if (currentTime >= expiryTime) {
        logout(); // Log out if token has expired
      } else {
        login(); // Log in if token is valid
      }
    }
  }, []);

  useEffect(() => {
    fetchSecretKey().then(() => checkTokenExpiry());

    // Check token expiry every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [fetchSecretKey, checkTokenExpiry]);

  const login = useCallback(() => setIsAuthenticated(true), []);
  const logout = useCallback(() => setIsAuthenticated(false), []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
