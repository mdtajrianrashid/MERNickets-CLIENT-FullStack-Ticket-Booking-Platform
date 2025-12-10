import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaBus, FaUserCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        {user && <li><NavLink to="/dashboard/profile">Dashboard</NavLink></li>}
    </>;

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white backdrop-blur-md border-b border-brand-primary/30">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold gap-2">
                    <FaBus className="text-brand-primary" /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">TicketBari</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <ThemeToggle />
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-brand-primary">
                            <div className="w-10 rounded-full">
                                <img alt="User" src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-black">
                            <li><Link to="/dashboard/profile" className="justify-between">My Profile</Link></li>
                            <li><button onClick={logOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                         <Link to="/login" className="btn btn-sm btn-outline border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black">Login</Link>
                         <Link to="/register" className="btn btn-sm bg-brand-primary text-black border-none hover:bg-brand-accent">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;