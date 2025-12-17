import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

function Countdown({ departure }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(departure) - new Date();
      if (diff <= 0) return setTime("");
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTime(`${d}d ${h}h ${m}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [departure]);

  return time ? <p className="text-warning">⏳ {time}</p> : null;
}

export default function MyBookings() {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/bookings").then(res => {
      setBookings(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Booked Tickets</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {bookings.map(b => {
          const t = b.ticket;
          const isFuture = new Date(t.departure) > new Date();

          return (
            <div key={b._id} className="border p-4 rounded">
              <img src={t.image} className="h-40 w-full object-cover mb-2" />
              <h3 className="font-semibold">{t.title}</h3>
              <p>{t.from} → {t.to}</p>
              <p>Qty: {b.quantity}</p>
              <p>Total: ${t.price * b.quantity}</p>

              <p>Status: <b>{b.status}</b></p>

              {(b.status === "pending" || b.status === "accepted") && isFuture && (
                <Countdown departure={t.departure} />
              )}

              {b.status === "accepted" && isFuture && (
                <Link
                  to={`/dashboard/user/payment/${b._id}`}
                  className="btn btn-primary btn-sm w-full mt-2"
                >
                  Pay Now
                </Link>
              )}

              {!isFuture && b.status !== "paid" && (
                <p className="text-error">Departure passed</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}