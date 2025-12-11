// src/pages/Dashboard/Admin/AdminProfile.jsx
import React from 'react';
import useAuth from '../../../hooks/useAuth';

export default function AdminProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
      <div className="card p-4 bg-white dark:bg-gray-800">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Name:</strong> {user?.displayName}</p>
      </div>
    </div>
  );
}