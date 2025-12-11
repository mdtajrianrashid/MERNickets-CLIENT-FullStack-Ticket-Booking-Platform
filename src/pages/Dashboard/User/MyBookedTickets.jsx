// src/pages/Dashboard/User/MyBookedTickets.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';
import Checkout from '../../Shared/Checkout';

export default function MyBookedTickets() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get(`/bookings/my-bookings/${encodeURIComponent(user.email)}`);
        if (mounted) setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    if (user?.email) load();
    return () => (mounted = false);
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Booked Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bookings.length === 0 && <div>No bookings</div>}
        {bookings.map(b => (
          <div key={b._id} className="card p-4 bg-white dark:bg-gray-800 shadow">
            <img src={b.ticketImage} alt={b.ticketTitle} className="w-full h-36 object-cover rounded" />
            <h3 className="font-semibold mt-2">{b.ticketTitle}</h3>
            <p>{b.from} → {b.to}</p>
            <p>Qty: {b.quantity}</p>
            <p>Total: ${b.totalPrice}</p>
            <p>Status: <strong>{b.bookingStatus}</strong></p>
            {b.bookingStatus === 'accepted' && (
              <button className="btn btn-sm mt-2" onClick={() => setSelectedBooking(b)}>Pay Now</button>
            )}
            {b.bookingStatus === 'pending' && <div className="text-sm mt-2 text-gray-500">Waiting for vendor</div>}
          </div>
        ))}
      </div>

      {selectedBooking && (
        <div className="mt-6">
          <h3 className="text-xl mb-3">Pay for {selectedBooking.ticketTitle}</h3>
          <Checkout booking={selectedBooking} />
        </div>
      )}
    </div>
  );
}