// src/pages/Dashboard/User/MyProfile.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function MyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // If server has /users?email=... it will return the user data
        const res = await axiosSecureInstance.get(`/users?email=${encodeURIComponent(user?.email)}`);
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        if (mounted) setProfile(data || { name: user?.displayName, email: user?.email, photo: user?.photoURL });
      } catch (err) {
        console.error(err);
        if (mounted) setProfile({ name: user?.displayName, email: user?.email, photo: user?.photoURL });
      } finally { if (mounted) setLoading(false); }
    }
    if (user) load();
    return () => (mounted = false);
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={profile?.photo || '/default-avatar.png'} alt="profile" className="w-40 h-40 rounded-full object-cover" />
        </div>
        <div>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Role:</strong> {profile?.role || 'user'}</p>
          <p><strong>Status:</strong> {profile?.status || 'active'}</p>
        </div>
      </div>
    </div>
  );
}