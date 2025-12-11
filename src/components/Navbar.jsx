import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
              <div className="font-semibold text-lg">MERNickets</div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hidden md:inline-block">Home</Link>
            <Link to="/all-tickets" className="hidden md:inline-block">All Tickets</Link>

            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-sm">{user.displayName || user.email}</div>
                <img src={user.photoURL || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />
                <button className="btn btn-sm btn-ghost" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm">Login</Link>
                <Link to="/register" className="btn btn-sm btn-outline">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}