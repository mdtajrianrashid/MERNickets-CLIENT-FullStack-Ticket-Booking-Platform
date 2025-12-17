import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

export default function Transactions() {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/bookings/transactions")
      .then(res => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 && (
        <p className="text-gray-500">No transactions found.</p>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Ticket</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{t.transactionId}</td>
              <td>{t.ticketId?.title}</td>
              <td>${t.ticketId.price * t.quantity}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}