// src/pages/Dashboard/UserDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={
            user?.photoURL ||
            `https://avatars.dicebear.com/api/initials/${user?.displayName || user?.email}.svg`
          }
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <div className="font-semibold">
            {user?.displayName || user?.email}
          </div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
      </div>

      {/* Dashboard Menu */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Link to="/dashboard/user" className="card p-4 text-center">
          My Bookings
        </Link>

        <Link to="/dashboard/user/transactions" className="card p-4 text-center">
          Transactions
        </Link>

        <Link to="/profile" className="card p-4 text-center">
          Profile
        </Link>
      </div>

      {/* Nested Routes Render Here */}
      <Outlet />
    </div>
  );
}