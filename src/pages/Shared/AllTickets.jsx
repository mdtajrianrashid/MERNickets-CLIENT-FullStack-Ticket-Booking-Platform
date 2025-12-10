import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../../components/TicketCard";
import Loading from "../../components/Loading";

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchFrom, setSearchFrom] = useState("");
    const [searchTo, setSearchTo] = useState("");
    const [transportFilter, setTransportFilter] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // 'asc' or 'desc'
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        setLoading(true);
        // Using query params for server-side filtering (efficient)
        const query = `/tickets?from=${searchFrom}&to=${searchTo}&type=${transportFilter}&sort=${sortOrder}`;
        
        axiosPublic.get(query)
            .then(res => {
                setTickets(res.data);
                setLoading(false);
            });
    }, [searchFrom, searchTo, transportFilter, sortOrder, axiosPublic]);

    return (
        <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-10">All Available Tickets</h2>

            {/* Filters Bar [cite: 247] */}
            <div className="bg-base-200 p-4 rounded-xl flex flex-wrap gap-4 justify-center items-center mb-8 shadow-lg border border-brand-primary/20">
                <input type="text" placeholder="From (Location)" className="input input-bordered w-full max-w-xs" onChange={e => setSearchFrom(e.target.value)} />
                <input type="text" placeholder="To (Location)" className="input input-bordered w-full max-w-xs" onChange={e => setSearchTo(e.target.value)} />
                
                <select className="select select-bordered" onChange={e => setTransportFilter(e.target.value)}>
                    <option value="">All Transport</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="air">Air</option>
                </select>

                <select className="select select-bordered" onChange={e => setSortOrder(e.target.value)}>
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {loading ? <Loading /> : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
                </div>
            )}
        </div>
    );
};

export default AllTickets;