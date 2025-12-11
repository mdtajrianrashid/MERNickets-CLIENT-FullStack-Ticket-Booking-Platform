import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { differenceInSeconds, formatDistanceToNowStrict } from "date-fns";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [ticket, setTicket] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  // Load ticket by ID
  useEffect(() => {
    axiosPublic
      .get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, axiosPublic]);

  // Countdown logic
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(new Date(ticket.departureTime), now);

      if (diff <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
      } else {
        setCountdown(
          formatDistanceToNowStrict(new Date(ticket.departureTime), {
            addSuffix: true,
          })
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  if (loading) return <div>Loading...</div>;
  if (!ticket) return <div>Ticket not found</div>;

  const canBook =
    new Date(ticket.departureTime) > new Date() && ticket.quantity > 0;

  const handleBook = async () => {
    if (!user) return toast.error("Login required");

    if (qty < 1 || qty > ticket.quantity)
      return toast.error("Invalid quantity");

    try {
      const booking = {
        ticketId: ticket._id,
        userEmail: user.email,
        quantity: Number(qty),
        ticketTitle: ticket.title,
        ticketImage: ticket.image,
        from: ticket.from,
        to: ticket.to,
        departureTime: ticket.departureTime,
        totalPrice: ticket.price * qty,
      };

      const res = await axiosSecure.post("/bookings", booking);

      toast.success("Booking created!");
      navigate(`/checkout/${res.data._id}`); // Redirect to checkout page
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={ticket.image}
        className="w-full h-96 object-cover rounded"
        alt="ticket"
      />

      <div>
        <h2 className="text-2xl font-bold">{ticket.title}</h2>
        <p className="text-sm text-gray-500">
          {ticket.from} → {ticket.to}
        </p>
        <div className="mt-2">Price: ${ticket.price}</div>
        <div>Available: {ticket.quantity}</div>
        <div>Departure: {new Date(ticket.departureTime).toLocaleString()}</div>
        <div>Countdown: {countdown}</div>

        <div className="mt-4">
          <input
            type="number"
            value={qty}
            min="1"
            max={ticket.quantity}
            onChange={(e) => setQty(e.target.value)}
            className="input w-24"
          />

          <button
            className="btn ml-2"
            disabled={!canBook}
            onClick={handleBook}
          >
            Book Now
          </button>

          {!canBook && (
            <div className="mt-2 text-sm text-red-500">
              Cannot book (departed or sold out)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}