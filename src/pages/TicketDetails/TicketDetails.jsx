// src/pages/TicketDetails/TicketDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosPublic from "../../utils/axiosPublic";
import axiosSecure from "../../utils/axiosSecure";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";

/* Countdown Component */
function Countdown({ target }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) {
        setTime(null);
        clearInterval(timer);
        return;
      }

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  if (!time) return <span className="text-red-600">Departure passed</span>;

  return (
    <span>
      {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
    </span>
  );
}

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic.get("/tickets").then(res => {
      const found = res.data.find(t => t._id === id);
      setTicket(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner />;
  if (!ticket) return <div>Ticket not found</div>;

  const isDeparturePassed = new Date(ticket.departure) <= new Date();
  const soldOut = ticket.ticketQuantity <= 0;

  const canBook = !isDeparturePassed && !soldOut;

  const handleBooking = async () => {
    if (!user) return navigate("/login");

    if (quantity < 1 || quantity > ticket.ticketQuantity) {
      return alert("Invalid booking quantity");
    }

    setBookingLoading(true);
    try {
      await axiosSecure.post("/bookings", {
        ticketId: ticket._id,
        quantity,
      });
      navigate("/dashboard/user");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={ticket.image || "/placeholder.jpg"}
          alt={ticket.title}
          className="w-full h-80 object-cover rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>

          <p className="mb-2">
            {ticket.from} → {ticket.to}
          </p>

          <p>
            <strong>Transport:</strong> {ticket.transportType}
          </p>

          <p>
            <strong>Departure:</strong>{" "}
            {new Date(ticket.departure).toLocaleString()}
          </p>

          <p>
            <strong>Price:</strong> ${ticket.price}
          </p>

          <p>
            <strong>Available Tickets:</strong> {ticket.ticketQuantity}
          </p>

          <div className="mt-3">
            <strong>Countdown:</strong>{" "}
            <Countdown target={ticket.departure} />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min="1"
              max={ticket.ticketQuantity}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="input input-bordered w-28"
            />

            <button
              className="btn btn-primary"
              disabled={!canBook || bookingLoading}
              onClick={handleBooking}
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>

          {!canBook && (
            <p className="text-red-600 mt-2">
              Booking unavailable (departure passed or sold out)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}