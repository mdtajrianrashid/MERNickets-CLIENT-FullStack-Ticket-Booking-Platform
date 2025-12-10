import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaTicketAlt, FaWallet, FaList, FaUser, FaAd } from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const [role] = useRole();
    const { logOut } = useAuth();

    const navLinkStyles = ({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? "bg-brand-primary text-black font-bold" : "text-gray-300 hover:text-white hover:bg-white/10"}`;

    return (
        <div className="flex h-screen bg-brand-dark text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-black/50 backdrop-blur-md border-r border-brand-primary/20 flex flex-col">
                <div className="p-6 text-2xl font-bold text-brand-primary border-b border-brand-primary/20">
                    TicketBari
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1">
                        {/* === ADMIN LINKS === [cite: 192] */}
                        {role === 'admin' && (
                            <>
                                <li><NavLink to="/dashboard/profile" className={navLinkStyles}><FaUser /> Admin Profile</NavLink></li>
                                <li><NavLink to="/dashboard/manage-users" className={navLinkStyles}><FaUsers /> Manage Users</NavLink></li>
                                <li><NavLink to="/dashboard/manage-tickets" className={navLinkStyles}><FaTicketAlt /> Manage Tickets</NavLink></li>
                                <li><NavLink to="/dashboard/advertise" className={navLinkStyles}><FaAd /> Advertise Tickets</NavLink></li>
                            </>
                        )}

                        {/* === VENDOR LINKS === [cite: 150] */}
                        {role === 'vendor' && (
                            <>
                                <li><NavLink to="/dashboard/profile" className={navLinkStyles}><FaUser /> Vendor Profile</NavLink></li>
                                <li><NavLink to="/dashboard/add-ticket" className={navLinkStyles}><FaTicketAlt /> Add Ticket</NavLink></li>
                                <li><NavLink to="/dashboard/my-added-tickets" className={navLinkStyles}><FaList /> My Added Tickets</NavLink></li>
                                <li><NavLink to="/dashboard/requested-bookings" className={navLinkStyles}><FaList /> Requested Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/revenue" className={navLinkStyles}><FaWallet /> Revenue</NavLink></li>
                            </>
                        )}

                        {/* === USER LINKS === [cite: 121] */}
                        {role === 'user' && (
                            <>
                                <li><NavLink to="/dashboard/profile" className={navLinkStyles}><FaUser /> My Profile</NavLink></li>
                                <li><NavLink to="/dashboard/my-booked-tickets" className={navLinkStyles}><FaTicketAlt /> My Booked Tickets</NavLink></li>
                                <li><NavLink to="/dashboard/history" className={navLinkStyles}><FaWallet /> Transaction History</NavLink></li>
                            </>
                        )}

                        {/* SHARED / COMMON */}
                        <div className="divider divider-info opacity-20 my-4"></div>
                        <li><NavLink to="/" className={navLinkStyles}><FaHome /> Home</NavLink></li>
                        <li><button onClick={logOut} className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10">Logout</button></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-brand-dark to-black">
                <Outlet />
            </main>
        </div>
    );
};
export default DashboardLayout;