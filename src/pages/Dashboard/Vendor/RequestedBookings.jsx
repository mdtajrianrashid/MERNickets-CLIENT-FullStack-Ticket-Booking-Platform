// src/pages/Dashboard/Vendor/RequestedBookings.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function RequestedBookings() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get(`/bookings/vendor-bookings/${encodeURIComponent(user.email)}`);
        if (mounted) setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    if (user?.email) load();
    return () => (mounted = false);
  }, [user]);

  const handleStatus = async (id, status) => {
    try {
      await axiosSecureInstance.patch(`/bookings/status/${id}`, { status });
      setRequests(r => r.map(x => x._id === id ? { ...x, bookingStatus: status } : x));
    } catch (err) { console.error(err); alert('Action failed'); }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Requested Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Ticket</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && <tr><td colSpan="5">No requests</td></tr>}
            {requests.map(r => (
              <tr key={r._id}>
                <td>{r.userEmail}</td>
                <td>{r.ticketTitle}</td>
                <td>{r.quantity}</td>
                <td>${r.totalPrice}</td>
                <td>
                  <button className="btn btn-sm mr-2" onClick={() => handleStatus(r._id, 'accepted')}>Accept</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => handleStatus(r._id, 'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}