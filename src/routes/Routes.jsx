import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home/Home';
import AllTickets from '../pages/Shared/AllTickets';
import TicketDetails from '../pages/Shared/TicketDetails';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import ErrorPage from '../pages/Shared/ErrorPage';
import MyBookedTickets from '../pages/Dashboard/User/MyBookedTickets';
import AddTicket from '../pages/Dashboard/Vendor/AddTicket';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import useAuth from '../hooks/useAuth';

// Role guard HOC
const RequireAuth = ({ children }) => {
  const { user, loadingAuth } = useAuth();
  if (loadingAuth) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RequireRole = ({ role, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  // For role we need to fetch user role from server. For simplicity: call endpoint
  // But here we assume role is stored in local user object (if not, fetch on mount in component).
  const storedRole = localStorage.getItem('mRole'); // set when you fetch user details
  if (storedRole !== role) return <Navigate to="/" replace />;
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="all-tickets" element={<RequireAuth><AllTickets/></RequireAuth>} />
        <Route path="ticket/:id" element={<RequireAuth><TicketDetails/></RequireAuth>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Route>

      <Route path="/dashboard" element={
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      }>
        <Route path="user/bookings" element={<MyBookedTickets />} />
        <Route path="vendor/add-ticket" element={<RequireRole role="vendor"><AddTicket /></RequireRole>} />
        <Route path="admin/manage-users" element={<RequireRole role="admin"><ManageUsers /></RequireRole>} />
      </Route>
    </Routes>
  );
}