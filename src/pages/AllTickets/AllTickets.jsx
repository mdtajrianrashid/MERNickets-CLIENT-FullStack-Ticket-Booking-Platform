// src/pages/AllTickets/AllTickets.jsx
import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../utils/axiosPublic";
import Spinner from "../../components/Spinner";
import { Link, useSearchParams } from "react-router-dom";

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  // filters
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  const [transport, setTransport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [sort, setSort] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  // 🔹 Read query params on load
  useEffect(() => {
    setQueryFrom(searchParams.get("from") || "");
    setQueryTo(searchParams.get("to") || "");
    setTransport(searchParams.get("transport") || "");
    setDepartureDate(searchParams.get("date") || "");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/tickets")
      .then(res => setTickets(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let arr = [...tickets];

    if (queryFrom)
      arr = arr.filter(t =>
        t.from?.toLowerCase().includes(queryFrom.toLowerCase())
      );

    if (queryTo)
      arr = arr.filter(t =>
        t.to?.toLowerCase().includes(queryTo.toLowerCase())
      );

    if (transport)
      arr = arr.filter(
        t => t.transportType?.toLowerCase() === transport.toLowerCase()
      );

    if (departureDate)
      arr = arr.filter(t =>
        new Date(t.departure).toISOString().slice(0, 10) === departureDate
      );

    if (sort === "price_asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") arr.sort((a, b) => b.price - a.price);

    return arr;
  }, [tickets, queryFrom, queryTo, transport, departureDate, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          value={queryFrom}
          onChange={e => setQueryFrom(e.target.value)}
          placeholder="From"
          className="input input-bordered"
        />
        <input
          value={queryTo}
          onChange={e => setQueryTo(e.target.value)}
          placeholder="To"
          className="input input-bordered"
        />
        <select
          value={transport}
          onChange={e => setTransport(e.target.value)}
          className="input input-bordered"
        >
          <option value="">All Transport</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>
        <input
          type="date"
          value={departureDate}
          onChange={e => setDepartureDate(e.target.value)}
          className="input input-bordered"
        />
      </div>

      {/* Sort */}
      <div className="flex justify-between items-center mb-4">
        <div>{filtered.length} tickets found</div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="input input-bordered w-48"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      {/* Tickets */}
      <div className="grid md:grid-cols-3 gap-6">
        {paginated.map(ticket => (
          <div
            key={ticket._id}
            className="card shadow p-4 bg-white dark:bg-gray-900"
          >
            <img
              src={ticket.image || "/placeholder.jpg"}
              alt={ticket.title}
              className="w-full h-40 object-cover mb-3 rounded"
            />

            <h3 className="font-semibold text-lg">{ticket.title}</h3>
            <p className="text-sm">
              {ticket.from} → {ticket.to}
            </p>

            <p className="text-sm mt-1">
              <strong>Transport:</strong> {ticket.transportType}
            </p>

            <p className="text-sm">
              <strong>Departure:</strong>{" "}
              {new Date(ticket.departure).toLocaleString()}
            </p>

            <p className="text-sm">
              <strong>Available:</strong> {ticket.ticketQuantity}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-lg font-bold">${ticket.price}</span>
              <Link to={`/ticket/${ticket._id}`} className="btn btn-sm">
                See details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}