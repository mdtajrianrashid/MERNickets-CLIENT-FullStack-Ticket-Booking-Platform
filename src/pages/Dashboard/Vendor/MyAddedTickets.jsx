// src/pages/Dashboard/Vendor/MyAddedTickets.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function MyAddedTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get(`/tickets/my-tickets/${encodeURIComponent(user.email)}`);
        if (mounted) setTickets(res.data);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    if (user?.email) load();
    return () => (mounted = false);
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete ticket?')) return;
    try {
      await axiosSecureInstance.delete(`/tickets/${id}`);
      setTickets(t => t.filter(x => x._id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Added Tickets</h2>
      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tickets.length === 0 && <div>No tickets</div>}
          {tickets.map(t => (
            <div key={t._id} className="card p-4 bg-white dark:bg-gray-800">
              <img src={t.image} className="w-full h-36 object-cover rounded" />
              <h3 className="font-semibold mt-2">{t.title}</h3>
              <p>Status: {t.verificationStatus}</p>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-sm" onClick={() => { /* open update modal - implement later */ }}>Update</button>
                <button className="btn btn-sm btn-ghost" onClick={() => handleDelete(t._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}