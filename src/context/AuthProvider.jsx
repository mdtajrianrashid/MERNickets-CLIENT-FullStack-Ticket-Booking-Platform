import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import axiosPublic from "../utils/axiosPublic";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);

      if (u?.email) {
        try {

          const jwtRes = await axiosPublic.post("/auth/jwt", {
            email: u.email,
          });
          localStorage.setItem("mernickets_token", jwtRes.data.token);

          const { data } = await axiosPublic.get(
            `/auth/me?email=${u.email}`
          );
          setDbUser(data);
        } catch (error) {
          console.error("AuthProvider error:", error);
          setDbUser(null);
        }
      } else {
        setDbUser(null);
        localStorage.removeItem("mernickets_token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ name, email, password, photoURL }) => {
    setLoading(true);

    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(res.user, {
      displayName: name,
      photoURL: photoURL || "",
    });

    await axiosPublic.post("/auth/register", {
      email,
      name,
    });

    setLoading(false);
    return res.user;
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    return res.user;
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, provider);
    await axiosPublic.post("/auth/register", {
      email: res.user.email,
      name: res.user.displayName,
    });
    setLoading(false);
    return res.user;
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    localStorage.removeItem("mernickets_token");
    setDbUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}