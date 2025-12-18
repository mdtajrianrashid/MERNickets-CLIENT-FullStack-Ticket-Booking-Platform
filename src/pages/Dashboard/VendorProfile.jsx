// src/pages/Dashboard/VendorProfile.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { motion } from "framer-motion";
import { 
  EnvelopeIcon, 
  BuildingStorefrontIcon, 
  CheckBadgeIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";

export default function VendorProfile() {
  const { user, dbUser, loading } = useAuth();

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <Spinner className="h-[50vh]" />;

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* HEADER CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-8"
      >
        {/* Banner Background (Vendor Theme: Purple/Pink) */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-500 relative">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 relative">
          
          {/* Avatar (Overlapping) */}
          <div className="relative -mt-20 mb-6 flex justify-between items-end">
             <div className="relative">
                <div className="w-40 h-40 rounded-full p-1.5 bg-white dark:bg-gray-800 shadow-xl relative z-10">
                   <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${dbUser?.name || "Vendor"}&background=8b5cf6&color=fff`}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-50 dark:border-gray-700"
                  />
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-full p-1 z-20 shadow-sm">
                    <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
                </div>
             </div>
          </div>

          {/* Name & Role */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {dbUser?.name || user?.displayName || "Vendor Name"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
               <BuildingStorefrontIcon className="w-5 h-5" />
               Authorized Ticket Vendor
            </p>
          </div>

        </div>
      </motion.div>

      {/* DETAILS GRID */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Card 1: Email */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
           <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <EnvelopeIcon className="w-8 h-8" />
           </div>
           <div className="w-full overflow-hidden">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Business Email</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1 truncate" title={dbUser?.email}>
                {dbUser?.email}
              </p>
           </div>
        </motion.div>

        {/* Card 2: Role / Status */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
           <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <IdentificationIcon className="w-8 h-8" />
           </div>
           <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Account Role</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {dbUser?.role || "Vendor"}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                    Active
                </span>
              </div>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}