// src/pages/Dashboard/VendorDashboard.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function VendorDashboard() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 space-y-2">
        <NavLink to="profile" className="block">Vendor Profile</NavLink>
        <NavLink to="add-ticket" className="block">Add Ticket</NavLink>
        <NavLink to="my-tickets" className="block">My Added Tickets</NavLink>
        <NavLink to="requests" className="block">Requested Bookings</NavLink>
        <NavLink to="revenue" className="block">Revenue Overview</NavLink>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}