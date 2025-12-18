// src/pages/Dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheckIcon, 
  TicketIcon, 
  UserGroupIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  MegaphoneIcon,
  UserPlusIcon,
  ExclamationTriangleIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();
  const { dbUser, user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview | tickets | users

  /* =========================
      LOAD DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTickets, resUsers] = await Promise.all([
          axiosSecure.get("/tickets/admin"),
          axiosSecure.get("/auth/users")
        ]);
        setTickets(resTickets.data);
        setUsers(resUsers.data);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosSecure]);

  /* =========================
      HANDLERS
  ========================= */
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/tickets/approve/${id}`);
      setTickets(prev => prev.map(t => (t._id === id ? res.data : t)));
      toast.success("Ticket approved successfully");
    } catch (err) {
      toast.error("Failed to approve ticket");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/tickets/reject/${id}`);
      setTickets(prev => prev.map(t => (t._id === id ? res.data : t)));
      toast.success("Ticket rejected");
    } catch (err) {
      toast.error("Failed to reject ticket");
    }
  };

  const handleToggleAd = async (id) => {
    try {
      const res = await axiosSecure.patch(`/tickets/advertise/${id}`);
      setTickets(prev => prev.map(t => (t._id === id ? res.data : t)));
      toast.success(res.data.advertised ? "Ticket promoted to Ad" : "Ad removed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Ad toggle failed");
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/auth/users/role/${id}`, { role });
      setUsers(prev => prev.map(u => (u._id === id ? res.data : u)));
      toast.success(`User promoted to ${role}`);
    } catch (err) {
      toast.error("Role update failed");
    }
  };

  const markFraud = async (id) => {
    if(!window.confirm("Mark this vendor as fraud? This will restrict their access.")) return;
    try {
      const res = await axiosSecure.patch(`/auth/users/fraud/${id}`);
      setUsers(prev => prev.map(u => (u._id === id ? res.data : u)));
      toast.success("Vendor marked as fraud");
    } catch (err) {
      toast.error("Fraud action failed");
    }
  };

  if (loading) return <Spinner className="h-screen" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & TABS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <ShieldCheckIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Admin Portal
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {dbUser?.name}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex">
             {["overview", "tickets", "users"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                    activeTab === tab 
                      ? "bg-indigo-600 text-white shadow-md" 
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab}
                </button>
             ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <AnimatePresence mode="wait">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Profile Card */}
              <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="px-6 pb-6 relative">
                   <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 -mt-12 overflow-hidden shadow-lg">
                      <img src={user?.photoURL} alt="Admin" className="w-full h-full object-cover"/>
                   </div>
                   <div className="mt-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{dbUser?.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{dbUser?.email}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wide">
                        System Administrator
                      </span>
                   </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <StatCard 
                    title="Total Tickets" 
                    value={tickets.length} 
                    icon={<TicketIcon className="w-8 h-8 text-white"/>} 
                    color="bg-gradient-to-br from-blue-500 to-cyan-500" 
                 />
                 <StatCard 
                    title="Total Users" 
                    value={users.length} 
                    icon={<UserGroupIcon className="w-8 h-8 text-white"/>} 
                    color="bg-gradient-to-br from-emerald-500 to-teal-500" 
                 />
                 <StatCard 
                    title="Pending Approvals" 
                    value={tickets.filter(t => t.status === 'pending').length} 
                    icon={<CheckCircleIcon className="w-8 h-8 text-white"/>} 
                    color="bg-gradient-to-br from-orange-500 to-amber-500" 
                 />
                 <StatCard 
                    title="Active Ads" 
                    value={tickets.filter(t => t.advertised).length} 
                    icon={<MegaphoneIcon className="w-8 h-8 text-white"/>} 
                    color="bg-gradient-to-br from-pink-500 to-rose-500" 
                 />
              </div>
            </motion.div>
          )}

          {/* 2. TICKETS MANAGEMENT TAB */}
          {activeTab === "tickets" && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ticket Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Advertised</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {tickets.map(t => (
                      <tr key={t._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                            t.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            t.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {t.advertised ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 bg-pink-100 dark:bg-pink-900/30 px-2 py-1 rounded-full">
                              <MegaphoneIcon className="w-3 h-3"/> Promoted
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={() => handleApprove(t._id)} title="Approve" className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"><CheckCircleIcon className="w-5 h-5"/></button>
                             <button onClick={() => handleReject(t._id)} title="Reject" className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"><XCircleIcon className="w-5 h-5"/></button>
                             <button onClick={() => handleToggleAd(t._id)} title="Toggle Ad" className={`p-2 rounded-lg transition-colors ${t.advertised ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400 hover:text-pink-500'}`}><MegaphoneIcon className="w-5 h-5"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* 3. USERS MANAGEMENT TAB */}
          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Roles & Security</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Current Role</th>
                      <th className="px-6 py-4 text-right">Promote / Demote</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 dark:text-white">{u.email}</div>
                          <div className="text-xs text-gray-500">{u.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                             u.role === 'admin' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' :
                             u.role === 'vendor' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                             'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                             {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             {u.role !== 'admin' && (
                               <button 
                                 onClick={() => updateUserRole(u._id, "admin")}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                               >
                                 <ShieldCheckIcon className="w-4 h-4"/> Admin
                               </button>
                             )}
                             
                             {u.role !== 'vendor' && (
                               <button 
                                 onClick={() => updateUserRole(u._id, "vendor")}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-bold hover:bg-purple-100 transition-colors"
                               >
                                 <BriefcaseIcon className="w-4 h-4"/> Vendor
                               </button>
                             )}

                             {u.role === 'vendor' && (
                               <button 
                                 onClick={() => markFraud(u._id)}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                               >
                                 <ExclamationTriangleIcon className="w-4 h-4"/> Fraud
                               </button>
                             )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}

// Helper Component for Stats
function StatCard({ title, value, icon, color }) {
    return (
        <div className={`p-6 rounded-2xl shadow-lg text-white ${color} relative overflow-hidden`}>
            <div className="relative z-10">
                <p className="text-sm font-bold opacity-80 uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-bold mt-1">{value}</h3>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                {icon}
            </div>
            {/* Decor */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
    )
}