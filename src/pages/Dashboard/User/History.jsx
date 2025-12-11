// src/pages/Dashboard/User/History.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function History() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // If server saved payment info in bookings, query bookings with bookingStatus 'paid'
        const res = await axiosSecureInstance.get(`/bookings/my-bookings/${encodeURIComponent(user.email)}`);
        const paid = (res.data || []).filter(x => x.bookingStatus === 'paid' && x.transactionId);
        if (mounted) setTransactions(paid);
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
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Ticket</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && <tr><td colSpan="4">No transactions</td></tr>}
            {transactions.map(t => (
              <tr key={t._id}>
                <td>{t.transactionId}</td>
                <td>${t.totalPrice}</td>
                <td>{t.ticketTitle}</td>
                <td>{new Date(t.paymentDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}