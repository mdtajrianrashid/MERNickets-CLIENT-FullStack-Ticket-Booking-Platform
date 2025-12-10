import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AllTickets from "../pages/Shared/AllTickets";
import TicketDetails from "../pages/Shared/TicketDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ErrorPage from "../pages/Shared/ErrorPage";
// ... Import other pages

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "all-tickets", element: <AllTickets /> }, // Private optional as per[cite: 36], but usually public view, private book
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { 
        path: "ticket/:id", 
        element: <PrivateRoute><TicketDetails /></PrivateRoute> // [cite: 110]
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
        // User Routes
        { path: "profile", element: <MyProfile /> },
        
        // Admin Routes
        { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
        
        // Vendor Routes
        // ... Add vendor routes here
    ]
  }
]);