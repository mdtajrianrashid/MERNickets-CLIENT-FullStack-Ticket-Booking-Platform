import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, dbUser, loading, logout, register, login, loginWithGoogle } = context;
  return { user, dbUser, loading, logout, register, login, loginWithGoogle };
};

export default useAuth;