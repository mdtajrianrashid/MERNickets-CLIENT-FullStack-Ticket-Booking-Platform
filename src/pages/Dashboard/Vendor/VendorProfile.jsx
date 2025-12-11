// src/pages/Dashboard/Vendor/VendorProfile.jsx
import React from 'react';
import useAuth from '../../../hooks/useAuth';

export default function VendorProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Vendor Profile</h2>
      <div className="card p-4 bg-white dark:bg-gray-800">
        <img src={user?.photoURL || '/default-avatar.png'} alt={user?.displayName} className="w-28 h-28 rounded-full mb-4" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
}