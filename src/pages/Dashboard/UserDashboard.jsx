import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user, dbUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="col-span-1 border rounded p-4 space-y-3">
        <div className="text-center mb-4">
          <img
            src={user?.photoURL || `https://i.pravatar.cc/100`}
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p className="font-semibold mt-2">
            {user?.displayName || dbUser?.email}
          </p>
          <p className="text-sm text-gray-500">{dbUser?.email}</p>
        </div>

        <NavLink to="/dashboard/user" end className="block btn btn-ghost">
          My Bookings
        </NavLink>
        <NavLink to="transactions" className="block btn btn-ghost">
          Transaction History
        </NavLink>
        <NavLink to="profile" className="block btn btn-ghost">
          Profile
        </NavLink>
      </aside>

      {/* Content */}
      <main className="col-span-3">
        <Outlet />
      </main>
    </div>
  );
}