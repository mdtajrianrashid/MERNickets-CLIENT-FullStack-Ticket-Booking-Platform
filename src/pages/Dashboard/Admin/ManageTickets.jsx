// src/pages/Dashboard/Admin/ManageTickets.jsx
import React, { useEffect, useState } from 'react';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get('/tickets'); // returns approved only; adjust server if needed
        // For manage list we need all tickets; if server doesn't provide admin-only endpoint, you may add GET /tickets/all
        setTickets(res.data || []);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return () => (mounted = false);
  }, []);

  const setStatus = async (id, status) => {
    try {
      await axiosSecureInstance.patch(`/tickets/status/${id}`, { status });
      setTickets(t => t.map(x => x._id === id ? { ...x, verificationStatus: status } : x));
    } catch (err) { console.error(err); alert('Update failed'); }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.length === 0 && <div>No tickets</div>}
        {tickets.map(t => (
          <div key={t._id} className="card p-4">
            <img src={t.image} className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold mt-2">{t.title}</h3>
            <p>Vendor: {t.vendorEmail}</p>
            <p>Status: {t.verificationStatus}</p>
            <div className="mt-2 flex gap-2">
              <button className="btn btn-sm" onClick={() => setStatus(t._id, 'approved')}>Approve</button>
              <button className="btn btn-sm btn-ghost" onClick={() => setStatus(t._1d, 'rejected')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}