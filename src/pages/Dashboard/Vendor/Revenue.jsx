// src/pages/Dashboard/Vendor/Revenue.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function Revenue() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalRevenue: 0, ticketsSold: 0, ticketsAdded: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // Client-side compute: get vendor bookings and tickets
        const [ticketsRes, bookingsRes] = await Promise.all([
          axiosSecureInstance.get(`/tickets/my-tickets/${encodeURIComponent(user.email)}`),
          axiosSecureInstance.get(`/bookings/vendor-bookings/${encodeURIComponent(user.email)}`)
        ]);
        const tickets = ticketsRes.data || [];
        const bookings = bookingsRes.data || [];
        const sold = bookings.filter(b => b.bookingStatus === 'paid');
        const totalRevenue = sold.reduce((s, b) => s + (b.totalPrice || 0), 0);
        const ticketsSold = sold.reduce((s, b) => s + (b.quantity || 0), 0);
        if (mounted) setStats({ totalRevenue, ticketsSold, ticketsAdded: tickets.length });
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    if (user?.email) load();
    return () => (mounted = false);
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card p-4">
        <div className="text-sm">Total Revenue</div>
        <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
      </div>
      <div className="card p-4">
        <div className="text-sm">Tickets Sold</div>
        <div className="text-2xl font-bold">{stats.ticketsSold}</div>
      </div>
      <div className="card p-4">
        <div className="text-sm">Tickets Added</div>
        <div className="text-2xl font-bold">{stats.ticketsAdded}</div>
      </div>
    </div>
  );
}