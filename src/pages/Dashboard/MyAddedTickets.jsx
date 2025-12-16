import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

export default function MyAddedTickets() {
  const axiosSecure = useAxiosSecure();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/tickets/vendor").then(res => {
      setTickets(res.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Added Tickets</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="border p-4 rounded">
            <h3 className="font-semibold">{ticket.title}</h3>
            <p>Status: <b>{ticket.status}</b></p>
            <p>Price: ${ticket.price}</p>

            <button
              className="btn btn-sm mt-2"
              disabled={ticket.status === "rejected"}
            >
              Update
            </button>

            <button
              className="btn btn-sm btn-error mt-2"
              disabled={ticket.status === "rejected"}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}