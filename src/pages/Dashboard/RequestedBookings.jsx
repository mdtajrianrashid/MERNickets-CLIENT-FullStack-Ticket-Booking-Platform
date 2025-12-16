import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

export default function RequestedBookings() {
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/bookings").then(res => {
      const vendorBookings = res.data.filter(
        b => b.ticket?.vendorEmail === dbUser.email
      );
      setBookings(vendorBookings);
      setLoading(false);
    });
  }, [axiosSecure, dbUser.email]);

  const handleAction = async (id, action) => {
    await axiosSecure.patch(`/bookings/${action}/${id}`);
    setBookings(bookings.filter(b => b._id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Requested Bookings</h2>

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
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.userEmail}</td>
              <td>{b.ticket?.title}</td>
              <td>{b.quantity}</td>
              <td>${b.totalPrice}</td>
              <td className="space-x-2">
                <button onClick={() => handleAction(b._id, "accept")} className="btn btn-xs btn-success">Accept</button>
                <button onClick={() => handleAction(b._id, "reject")} className="btn btn-xs btn-error">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}