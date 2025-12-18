// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white"
        >
          <span className="bg-blue-600 text-white rounded-lg px-2 py-1">🎟️</span>
          MERNickets
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/tickets">All Tickets</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border text-sm
              border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

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
              <Link to="/login" className="btn btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
            </>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t px-4 py-3 space-y-2">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/tickets" onClick={() => setOpen(false)}>All Tickets</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>
      )}
    </nav>
  );
}