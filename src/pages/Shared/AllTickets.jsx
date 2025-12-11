import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../../components/TicketCard";

export default function AllTickets() {
  const axiosPublic = useAxiosPublic();

  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const params = { page, limit: perPage };
      if (q) params.search = q;
      if (transport) params.transport = transport;
      if (sort) params.sort = sort;

      const res = await axiosPublic.get("/tickets", { params });
      setTickets(res.data.items);
      setTotal(res.data.total);
    };

    fetchData();
  }, [q, transport, sort, page, axiosPublic]);

  const pages = Math.ceil(total / perPage);

  return (
    <div>
      {/* filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search from or to"
          className="input w-full col-span-2"
        />

        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="select w-full"
        >
          <option value="">All transport</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="launch">Launch</option>
          <option value="plane">Plane</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select w-full"
        >
          <option value="">Sort</option>
          <option value="asc">Price Low → High</option>
          <option value="desc">Price High → Low</option>
        </select>
      </div>

      {/* tickets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <TicketCard key={t._id} ticket={t} />
        ))}
      </div>

      {/* pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <div>
          Page {page} / {pages || 1}
        </div>

        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}