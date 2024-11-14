import { type ClassValue, clsx } from "clsx";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { AuthContext } from "./context/AuthContext";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "http://localhost:8090";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used withing an auth context!");
  }

  return context;
};
