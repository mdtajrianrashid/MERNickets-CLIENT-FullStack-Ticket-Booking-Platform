// src/pages/Dashboard/UserProfile.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  FingerPrintIcon, 
  ShieldCheckIcon,
  CameraIcon
} from "@heroicons/react/24/outline";

export default function UserProfile() {
  const { user, dbUser } = useAuth();

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-8"
      >
        {/* Banner Background */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
           {/* Decorative patterns */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 relative">
          
          {/* Avatar (Overlapping) */}
          <div className="relative -mt-20 mb-6 flex justify-between items-end">
             <div className="relative group">
                <div className="w-40 h-40 rounded-full p-1.5 bg-white dark:bg-gray-800 shadow-xl relative z-10">
                   <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=0D8ABC&color=fff`}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-50 dark:border-gray-700"
                  />
                  {/* Edit Icon Overlay (Visual only) */}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                      <CameraIcon className="w-8 h-8" />
                  </div>
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full z-20" title="Online"></div>
             </div>
             
             {/* Edit Button (Placeholder for future feature) */}
             <button className="hidden sm:block px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors">
                Edit Profile
             </button>
          </div>

          {/* Name & Role */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {user?.displayName || "User Name"}
              {/* Role Badge */}
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full uppercase tracking-wider font-bold border border-blue-200 dark:border-blue-800">
                {dbUser?.role || "Traveler"}
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
               <EnvelopeIcon className="w-5 h-5" />
               {user?.email}
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
        {/* Card 1: Account Info */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
           <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <ShieldCheckIcon className="w-8 h-8" />
           </div>
           <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Account Status</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">Verified Member</p>
              <p className="text-sm text-gray-500 mt-1">Full access to booking features</p>
           </div>
        </motion.div>

        {/* Card 2: User ID */}
        <motion.div variants={item} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
           <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <FingerPrintIcon className="w-8 h-8" />
           </div>
           <div className="overflow-hidden w-full">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Unique User ID</h3>
              <p className="text-sm font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1.5 rounded mt-2 text-gray-700 dark:text-gray-300 truncate border border-gray-200 dark:border-gray-700">
                 {user?.uid}
              </p>
           </div>
        </motion.div>
      </motion.div>

    </div>
  );
}