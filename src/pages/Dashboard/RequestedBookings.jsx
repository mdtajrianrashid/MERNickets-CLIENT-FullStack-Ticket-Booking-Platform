// src/pages/Dashboard/RequestedBookings.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardDocumentCheckIcon, 
  UserCircleIcon, 
  TicketIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  InboxIcon
} from "@heroicons/react/24/outline";

export default function RequestedBookings() {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // Track which item is being processed

  useEffect(() => {
    axiosSecure.get("/bookings/vendor").then(res => {
      setBookings(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  const handleAction = async (id, action) => {
    setProcessingId(id); // Show loading state on specific button
    try {
        await axiosSecure.patch(`/bookings/${action}/${id}`);
        // Remove the item from list smoothly
        setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
        console.error("Action failed", error);
    } finally {
        setProcessingId(null);
    }
  };

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (loading) return <Spinner className="h-[60vh]" />;

  return (
    <div className="p-6 md:p-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ClipboardDocumentCheckIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            Booking Requests
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Approve or reject incoming ticket requests from users.
          </p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full font-bold text-sm self-start">
          {bookings.length} Pending
        </div>
      </div>

      {bookings.length === 0 ? (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <InboxIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">No new booking requests at the moment.</p>
        </motion.div>
      ) : (
        /* Requests Table */
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-5 font-semibold">User Details</th>
                  <th className="px-6 py-5 font-semibold">Ticket Info</th>
                  <th className="px-6 py-5 font-semibold">Quantity</th>
                  <th className="px-6 py-5 font-semibold">Total Price</th>
                  <th className="px-6 py-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <AnimatePresence mode="popLayout">
                  {bookings.map(b => (
                    <motion.tr 
                      key={b._id} 
                      layout
                      variants={item}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors group"
                    >
                      {/* User Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <UserCircleIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                    {b.userEmail?.split('@')[0]}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {b.userEmail}
                                </p>
                            </div>
                        </div>
                      </td>
                      
                      {/* Ticket Column */}
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <TicketIcon className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-sm">{b.ticket?.title}</span>
                         </div>
                      </td>
                      
                      {/* Quantity Column */}
                      <td className="px-6 py-4">
                         <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-md text-xs font-bold">
                            x{b.quantity}
                         </span>
                      </td>
                      
                      {/* Total Price Column */}
                      <td className="px-6 py-4">
                         <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${b.totalPrice}
                         </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                            {/* Reject Button */}
                            <button
                                onClick={() => handleAction(b._id, "reject")}
                                disabled={processingId === b._id}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <XCircleIcon className="w-4 h-4" />
                                Reject
                            </button>

                            {/* Accept Button */}
                            <button
                                onClick={() => handleAction(b._id, "accept")}
                                disabled={processingId === b._id}
                                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md shadow-green-500/20 transition-all disabled:opacity-50"
                            >
                                <CheckCircleIcon className="w-4 h-4" />
                                {processingId === b._id ? "..." : "Accept"}
                            </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}