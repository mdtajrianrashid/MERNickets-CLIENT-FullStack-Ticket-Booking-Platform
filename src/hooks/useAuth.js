// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// Custom hook to access auth context, including Firebase user and dbUser
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, dbUser, loading, logout, register, login, loginWithGoogle } = context;
  return { user, dbUser, loading, logout, register, login, loginWithGoogle };
};

export default useAuth;