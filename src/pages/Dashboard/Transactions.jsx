// src/pages/Dashboard/Transactions.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";
import { motion } from "framer-motion";
import { 
  CreditCardIcon, 
  CalendarDaysIcon, 
  HashtagIcon, 
  TicketIcon,
  DocumentMagnifyingGlassIcon 
} from "@heroicons/react/24/outline";

export default function Transactions() {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/bookings/transactions")
      .then(res => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <Spinner className="h-[60vh]" />;

  return (
    <div className="p-6 md:p-8">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <CreditCardIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Transaction History
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Track all your payments and ticket purchases.
        </p>
      </div>

      {transactions.length === 0 ? (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
        >
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <DocumentMagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">No transactions yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Your purchase history will appear here.</p>
        </motion.div>
      ) : (
        /* Transactions Table */
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><HashtagIcon className="w-4 h-4" /> Transaction ID</div>
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><TicketIcon className="w-4 h-4" /> Ticket</div>
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><CreditCardIcon className="w-4 h-4" /> Amount</div>
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4" /> Date</div>
                  </th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              
              <motion.tbody 
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-gray-100 dark:divide-gray-700"
              >
                {transactions.map(t => (
                  <motion.tr 
                    key={t._id} 
                    variants={item}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                  >
                    {/* ID */}
                    <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400 select-all">
                      {t.transactionId}
                    </td>
                    
                    {/* Ticket Title */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {t.ticketId?.title || <span className="text-red-400 italic">Deleted Ticket</span>}
                    </td>
                    
                    {/* Amount */}
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                      ${(t.ticketId?.price * t.quantity).toFixed(2)}
                    </td>
                    
                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(t.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                      <span className="block text-xs opacity-60">
                         {new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </td>

                    {/* Status Badge (Visual Only) */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Paid
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}