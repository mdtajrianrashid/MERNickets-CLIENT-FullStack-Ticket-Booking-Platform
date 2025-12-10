import Banner from "./Banner";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Create this similarly to Secure but without interceptors
import { useQuery } from "@tanstack/react-query";
import TicketCard from "../../components/TicketCard";
import Loading from "../../components/Loading";

const Home = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch Advertised Tickets (Req: 7d)
    const { data: advertisedTickets = [], isLoading: loadingAds } = useQuery({
        queryKey: ['advertisedTickets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tickets/advertised');
            return res.data;
        }
    });

    // Fetch Latest Tickets (Req: 2c)
    const { data: latestTickets = [], isLoading: loadingLatest } = useQuery({
        queryKey: ['latestTickets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tickets/latest');
            return res.data;
        }
    });

    if (loadingAds || loadingLatest) return <Loading />;

    return (
        <div className="space-y-12">
            <Banner />
            
            {/* Advertisements Section [cite: 78] */}
            {advertisedTickets.length > 0 && (
                <section className="my-10 px-4 max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-8 text-brand-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.5)]">Featured Journeys</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advertisedTickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
                    </div>
                </section>
            )}

            {/* Latest Tickets Section [cite: 87] */}
            <section className="my-10 px-4 max-w-7xl mx-auto">
                 <h2 className="text-3xl font-bold text-center mb-8">Latest Tickets</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {latestTickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
                 </div>
            </section>
        </div>
    );
};

export default Home;