// src/hooks/useRole.jsx
import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import axiosPublic from './useAxiosPublic'; // note: default export is a function, but we need instance
// We'll import instance directly:
import axiosPublicInstance from '../api/axiosPublic';
import axiosSecureInstance from '../api/axiosSecure';

export default function useRole() {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchRole() {
      setLoadingRole(true);
      try {
        // Prefer localStorage cached role
        const cached = localStorage.getItem('mRole');
        if (cached) {
          if (mounted) setRole(cached);
          return;
        }
        if (!user?.email) {
          if (mounted) { setRole('user'); setLoadingRole(false); }
          return;
        }

        // Try secure endpoint first (if token present)
        try {
          const res = await axiosSecureInstance.get(`/users/role?email=${encodeURIComponent(user.email)}`);
          if (res?.data?.role) {
            localStorage.setItem('mRole', res.data.role);
            if (mounted) setRole(res.data.role);
            return;
          }
        } catch (e) {
          // fallback to public endpoint if server supports it
        }

        // fallback: try public users endpoint (some servers implement GET /users?email=...)
        try {
          const res2 = await axiosPublicInstance.get(`/users?email=${encodeURIComponent(user.email)}`);
          // if server returns array or single object
          const data = Array.isArray(res2.data) ? res2.data[0] : res2.data;
          if (data?.role) {
            localStorage.setItem('mRole', data.role);
            if (mounted) setRole(data.role);
            return;
          }
        } catch (err) {
          // final fallback
        }

        if (mounted) setRole('user');
      } finally {
        if (mounted) setLoadingRole(false);
      }
    }

    fetchRole();
    return () => { mounted = false; };
  }, [user]);

  return { role, loadingRole };
}