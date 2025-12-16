import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

export default function AddTicket() {
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post("/tickets", form);
      alert("Ticket added successfully. Waiting for admin approval.");
      setForm({
        title: "",
        from: "",
        to: "",
        transportType: "",
        price: "",
        quantity: "",
        departure: "",
        image: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add ticket");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Ticket Title" className="input input-bordered w-full" value={form.title} onChange={handleChange} required />
        <input name="from" placeholder="From" className="input input-bordered w-full" value={form.from} onChange={handleChange} required />
        <input name="to" placeholder="To" className="input input-bordered w-full" value={form.to} onChange={handleChange} required />
        <input name="transportType" placeholder="Transport Type" className="input input-bordered w-full" value={form.transportType} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" className="input input-bordered w-full" value={form.price} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Ticket Quantity" className="input input-bordered w-full" value={form.quantity} onChange={handleChange} required />
        <input type="datetime-local" name="departure" className="input input-bordered w-full" value={form.departure} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" className="input input-bordered w-full" value={form.image} onChange={handleChange} />

        <input value={dbUser?.email} readOnly className="input input-bordered w-full bg-gray-100" />

        <button className="btn btn-primary w-full">Add Ticket</button>
      </form>
    </div>
  );
}