import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

export default function MyAddedTickets() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    const res = await axiosSecure.get("/tickets/vendor");
    setTickets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    await axiosSecure.delete(`/tickets/${id}`);
    fetchTickets();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Added Tickets</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="border p-4 rounded">
            <h3 className="font-semibold">{ticket.title}</h3>
            <p>Status: <b>{ticket.status}</b></p>
            <p>Price: ${ticket.price}</p>

            <button
              className="btn btn-sm mt-2"
              disabled={ticket.status === "rejected"}
              onClick={() =>
                navigate(`/dashboard/vendor/edit-ticket/${ticket._id}`)
              }
            >
              Update
            </button>

            <button
              className="btn btn-sm btn-error mt-2 ml-2"
              disabled={ticket.status === "rejected"}
              onClick={() => handleDelete(ticket._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}