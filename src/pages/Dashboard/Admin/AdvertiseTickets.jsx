// src/pages/Dashboard/Admin/AdvertiseTickets.jsx
import React, { useEffect, useState } from 'react';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function AdvertiseTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get('/tickets'); // ideally admin endpoint returns all
        if (mounted) setTickets(res.data || []);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return () => (mounted = false);
  }, []);

  const toggleAdvertise = async (id, current) => {
    try {
      const res = await axiosSecureInstance.patch(`/tickets/advertise/${id}`, { isAdvertised: !current });
      if (res.data?.message === 'limit_reached' || res.data?.message === 'advertise_limit_reached') {
        alert('Cannot advertise more than 6 tickets at a time');
        return;
      }
      setTickets(t => t.map(x => x._id === id ? { ...x, isAdvertised: !current } : x));
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Advertise Tickets</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>Title</th><th>Vendor</th><th>Advertised</th><th>Action</th></tr></thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.vendorEmail}</td>
                <td>{t.isAdvertised ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => toggleAdvertise(t._id, t.isAdvertised)}>
                    {t.isAdvertised ? 'Unadvertise' : 'Advertise'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}