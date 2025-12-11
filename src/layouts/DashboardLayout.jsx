import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r p-4">
        <div className="mb-6">
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/user/bookings" className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">My Bookings</Link>
          <Link to="/dashboard/vendor/add-ticket" className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Add Ticket</Link>
          <Link to="/dashboard/admin/manage-users" className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Manage Users</Link>
        </nav>
      </aside>
      <section className="flex-1 p-6">
        <Outlet />
      </section>
    </div>
  );
}