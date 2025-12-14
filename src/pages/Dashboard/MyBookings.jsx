// src/pages/Dashboard/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

/* ---------- Countdown Component ---------- */
function Countdown({ departure }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!departure) return;

    const interval = setInterval(() => {
      const diff = new Date(departure) - new Date();
      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [departure]);

  if (!timeLeft) return null;

  return (
    <p className="text-sm text-warning mt-1">
      ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s
    </p>
  );
}

/* ---------- MyBookings Page ---------- */
export default function MyBookings() {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    axiosSecure
      .get("/bookings")
      .then((res) => setBookings(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">🎟 My Booked Tickets</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">You have no bookings yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {bookings.map((b) => {
          const ticket = b.ticket;
          if (!ticket) return null;

          const totalPrice = ticket.price * b.quantity;
          const isFuture = new Date(ticket.departure) > new Date();

          return (
            <div
              key={b._id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">{ticket.title}</h3>

              <p className="text-sm text-gray-600">
                {ticket.from} → {ticket.to}
              </p>

              <p className="text-sm">
                Departure:{" "}
                <span className="font-medium">
                  {new Date(ticket.departure).toLocaleString()}
                </span>
              </p>

              <p className="text-sm mt-1">
                Quantity: <strong>{b.quantity}</strong>
              </p>

              <p className="text-sm">
                Total Price:{" "}
                <strong>${totalPrice.toFixed(2)}</strong>
              </p>

              {/* Status */}
              <p className="mt-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    b.status === "paid"
                      ? "text-success"
                      : b.status === "accepted"
                      ? "text-info"
                      : b.status === "rejected"
                      ? "text-error"
                      : "text-warning"
                  }`}
                >
                  {b.status}
                </span>
              </p>

              {/* Countdown */}
              {(b.status === "pending" || b.status === "accepted") &&
                isFuture &&
                b.status !== "rejected" && (
                  <Countdown departure={ticket.departure} />
                )}

              {/* Actions */}
              <div className="mt-4 space-y-2">
                {b.status === "accepted" &&
                  isFuture &&
                  b.status !== "paid" && (
                    <Link
                      to={`/payment/${b._id}`}
                      className="btn btn-primary btn-sm w-full"
                    >
                      Pay Now
                    </Link>
                  )}

                {b.status === "rejected" && (
                  <p className="text-sm text-error">
                    ❌ Booking rejected by vendor
                  </p>
                )}

                {!isFuture && b.status !== "paid" && (
                  <p className="text-sm text-error">
                    ⚠ Departure time has passed
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}