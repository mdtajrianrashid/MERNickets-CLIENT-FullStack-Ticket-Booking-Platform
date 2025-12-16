import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    quantity: "",
    departure: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit) {
      axiosSecure.get(`/tickets/vendor/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await axiosSecure.patch(`/tickets/${id}`, form);
        alert("Ticket updated successfully");
      } else {
        await axiosSecure.post("/tickets", form);
        alert("Ticket added. Waiting for admin approval.");
      }
      navigate("/dashboard/vendor/my-tickets");
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
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
        <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" placeholder="Title" required />
        <input name="from" value={form.from} onChange={handleChange} className="input input-bordered w-full" placeholder="From" required />
        <input name="to" value={form.to} onChange={handleChange} className="input input-bordered w-full" placeholder="To" required />
        <input name="transportType" value={form.transportType} onChange={handleChange} className="input input-bordered w-full" placeholder="Transport Type" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} className="input input-bordered w-full" placeholder="Price" required />
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="input input-bordered w-full" placeholder="Quantity" required />
        <input type="datetime-local" name="departure" value={form.departure} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="image" value={form.image} onChange={handleChange} className="input input-bordered w-full" placeholder="Image URL" />

        <button className="btn btn-primary w-full">
          {isEdit ? "Update Ticket" : "Add Ticket"}
        </button>
      </form>
    </div>
  );
}