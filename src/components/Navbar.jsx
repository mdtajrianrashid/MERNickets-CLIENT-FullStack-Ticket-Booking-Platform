// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-blue-600 text-white rounded-full p-2">🚌</span>
          <span>TicketBari</span>
        </Link>

        <div className="hidden md:flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/tickets">All Tickets</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  `https://avatars.dicebear.com/api/initials/${
                    user.displayName || user.email
                  }.svg`
                }
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="text-sm text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn-outline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}