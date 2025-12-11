import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function AddTicket() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    title: '',
    from: '',
    to: '',
    transportType: 'bus',
    price: '',
    quantity: 1,
    departureTime: '',
    perks: []
  });

  const [imageFile, setImageFile] = useState(null);
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append('image', imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
      { method: 'POST', body: fd }
    );

    const data = await res.json();
    return data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await handleImageUpload();

      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
        image: imageUrl,
        vendorEmail: user.email,
        vendorName: user.displayName || user.email
      };

      await axiosSecure.post('/tickets', payload);

      toast.success('Ticket added (pending verification)');
    } catch (err) {
      console.error(err);
      toast.error('Add failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <input
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="input w-full"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          required
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          placeholder="From"
          className="input w-full"
        />

        <input
          required
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          placeholder="To"
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={form.transportType}
          onChange={(e) => setForm({ ...form, transportType: e.target.value })}
          className="select w-full"
        >
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>

        <input
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="input w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          placeholder="Quantity"
          className="input w-full"
        />

        <input
          type="datetime-local"
          required
          value={form.departureTime}
          onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Perks (comma separated)</label>
        <input
          value={form.perks}
          onChange={(e) =>
            setForm({
              ...form,
              perks: e.target.value.split(',').map((s) => s.trim())
            })
          }
          placeholder="AC, Breakfast, WiFi"
          className="input w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button className="btn">Add Ticket</button>
    </form>
  );
}