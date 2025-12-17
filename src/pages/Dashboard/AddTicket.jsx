import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

export default function AddTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "",
    price: "",
    ticketQuantity: "",
    departure: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit) {
      axiosSecure.get(`/tickets/vendor/${id}`).then(res => {
        const t = res.data;
        setForm({
          ...t,
          departure: t.departure?.slice(0, 16),
        });
      });
    }
  }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await axiosSecure.patch(`/tickets/${id}`, form);
      } else {
        await axiosSecure.post("/tickets", form);
      }
      navigate("/dashboard/vendor/my-tickets");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Update Ticket" : "Add Ticket"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" required value={form.title} onChange={handleChange} className="input w-full" placeholder="Title" />
        <input name="from" required value={form.from} onChange={handleChange} className="input w-full" placeholder="From" />
        <input name="to" required value={form.to} onChange={handleChange} className="input w-full" placeholder="To" />
        <input name="transportType" required value={form.transportType} onChange={handleChange} className="input w-full" placeholder="Transport Type" />
        <input type="number" name="price" required value={form.price} onChange={handleChange} className="input w-full" placeholder="Price" />
        <input type="number" name="ticketQuantity" required value={form.ticketQuantity} onChange={handleChange} className="input w-full" placeholder="Ticket Quantity" />
        <input type="datetime-local" name="departure" required value={form.departure} onChange={handleChange} className="input w-full" />
        <input name="image" value={form.image} onChange={handleChange} className="input w-full" placeholder="Image URL" />

        <button className="btn btn-primary w-full">
          {isEdit ? "Update Ticket" : "Add Ticket"}
        </button>
      </form>
    </div>
  );
}