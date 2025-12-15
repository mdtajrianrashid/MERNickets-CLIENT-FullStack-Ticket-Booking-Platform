// src/router/Routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";

import UserDashboard from "../pages/Dashboard/UserDashboard";
import VendorDashboard from "../pages/Dashboard/VendorDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import MyBookings from "../pages/Dashboard/MyBookings";
import PaymentPage from "../pages/Dashboard/PaymentPage";

import useAuth from "../hooks/useAuth";

/* ---------- Private Route ---------- */
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

/* ---------- Role Route ---------- */
function RoleRoute({ role, children }) {
  const { dbUser, loading } = useAuth();
  if (loading || !dbUser) return <div>Loading...</div>;
  if (dbUser.role !== role) return <Navigate to="/" replace />;
  return children;
}

/* ---------- Dashboard Redirect ---------- */
function DashboardRedirect() {
  const { user, dbUser, loading } = useAuth();

  if (loading || !dbUser) {
    return <div className="text-center mt-10">Preparing dashboard...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (dbUser.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (dbUser.role === "vendor") {
    return <Navigate to="/dashboard/vendor" replace />;
  }

  return <Navigate to="/dashboard/user" replace />;
}

/* ---------- Routes ---------- */
export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tickets" element={<AllTickets />} />
        <Route path="ticket/:id" element={<TicketDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardRedirect />
            </PrivateRoute>
          }
        />

        <Route
          path="dashboard/user"
          element={
            <PrivateRoute>
              <RoleRoute role="user">
                <UserDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<MyBookings />} />
          <Route path="payment/:bookingId" element={<PaymentPage />} />
        </Route>

        <Route
          path="dashboard/vendor"
          element={
            <PrivateRoute>
              <RoleRoute role="vendor">
                <VendorDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="dashboard/admin"
          element={
            <PrivateRoute>
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}