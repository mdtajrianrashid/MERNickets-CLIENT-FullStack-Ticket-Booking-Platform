import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) return <Loading />;
    if (user && role === 'admin') return children;
    return <Navigate to="/" state={{ from: location }} replace />;
};
export default AdminRoute;