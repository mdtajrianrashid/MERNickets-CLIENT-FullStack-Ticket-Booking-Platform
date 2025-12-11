// src/pages/Home/Banner.jsx
import React from 'react';

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">Book Tickets Faster with MERNickets</h1>
        <p className="mt-2 text-sm md:text-base">Search bus, train, launch & flights. Secure payments, easy cancellation policy, and verified vendors.</p>
      </div>
      <div className="flex gap-3">
        <a href="#all-tickets" className="btn btn-neutral">Explore Tickets</a>
        <a href="/dashboard" className="btn btn-outline">Dashboard</a>
      </div>
    </div>
  );
}