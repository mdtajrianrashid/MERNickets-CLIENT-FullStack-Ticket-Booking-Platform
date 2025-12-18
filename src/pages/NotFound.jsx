import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, MapIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-500/20"
        >
          <MapIcon className="w-12 h-12" />
        </motion.div>

        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Lost in Transit?
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
          The destination you are looking for doesn't seem to exist on our map. It might have been moved or deleted.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </motion.button>
        </Link>

      </motion.div>
    </div>
  );
}