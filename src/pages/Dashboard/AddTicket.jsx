// src/pages/Dashboard/AddTicket.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";
import { motion } from "framer-motion";
import {
  TicketIcon,
  MapPinIcon,
  PhotoIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  TruckIcon,
  StarIcon,
  PencilSquareIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";

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
    perks: ["", "", "", "", "", "", ""], // ✅ 7 perks preserved
  });

  useEffect(() => {
    if (isEdit) {
      axiosSecure.get(`/tickets/vendor/${id}`).then(res => {
        const t = res.data;
        setForm({
          ...t,
          perks: t.perks?.length ? t.perks : ["", "", "", "", "", "", ""],
          departure: t.departure?.slice(0, 16),
        });
      });
    }
  }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePerkChange = (i, value) => {
    const perks = [...form.perks];
    perks[i] = value;
    setForm({ ...form, perks });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      perks: form.perks.filter(p => p.trim() !== ""),
    };

    try {
      if (isEdit) {
        await axiosSecure.patch(`/tickets/${id}`, payload);
      } else {
        await axiosSecure.post("/tickets", payload);
      }
      navigate("/dashboard/vendor/my-tickets");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner className="h-[80vh]" />;

  return (
    <div className="max-w-4xl mx-auto p-2">
      
      {/* Page Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
          {isEdit ? <PencilSquareIcon className="w-8 h-8" /> : <PlusCircleIcon className="w-8 h-8" />}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEdit ? "Update Ticket Details" : "Create New Ticket"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {isEdit ? "Modify the existing listing information." : "Fill in the details to list a new journey."}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
              Journey Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Ticket Title</label>
                <div className="relative group">
                  <TicketIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    name="title" 
                    required 
                    value={form.title} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="e.g. Luxury Bus to Cox's Bazar" 
                  />
                </div>
              </div>

              {/* From */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Origin (From)</label>
                <div className="relative group">
                  <MapPinIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    name="from" 
                    required 
                    value={form.from} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                    placeholder="City Name" 
                  />
                </div>
              </div>

              {/* To */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Destination (To)</label>
                <div className="relative group">
                  <MapPinIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    name="to" 
                    required 
                    value={form.to} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                    placeholder="City Name" 
                  />
                </div>
              </div>

              {/* Transport Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Transport Mode</label>
                <div className="relative group">
                  <TruckIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    name="transportType" 
                    required 
                    value={form.transportType} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                    placeholder="Bus, Train, Flight..." 
                  />
                </div>
              </div>

              {/* Departure */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Departure Time</label>
                <div className="relative group">
                  <input 
                    type="datetime-local" 
                    name="departure" 
                    required 
                    value={form.departure} 
                    onChange={handleChange} 
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white dark:[color-scheme:dark]" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Media */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
              Pricing & Assets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Price per Ticket</label>
                <div className="relative group">
                  <CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type="number" 
                    name="price" 
                    required 
                    value={form.price} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white" 
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Total Seats</label>
                <div className="relative group">
                  <ArchiveBoxIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    type="number" 
                    name="ticketQuantity" 
                    required 
                    value={form.ticketQuantity} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white" 
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Cover Image URL</label>
                <div className="relative group">
                  <PhotoIcon className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <input 
                    name="image" 
                    value={form.image} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                    placeholder="https://example.com/bus-image.jpg" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Perks */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-500" /> Included Perks (7 Slots)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {form.perks.map((perk, i) => (
                <div key={i} className="relative group">
                  <div className="absolute left-3 top-3.5 text-xs font-bold text-gray-400">
                    {i + 1}.
                  </div>
                  <input
                    value={perk}
                    onChange={e => handlePerkChange(i, e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white text-sm"
                    placeholder={`Perk details (e.g. AC, Snacks)`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner className="w-6 h-6 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                isEdit ? "Update Ticket Listing" : "Publish Ticket"
              )}
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}