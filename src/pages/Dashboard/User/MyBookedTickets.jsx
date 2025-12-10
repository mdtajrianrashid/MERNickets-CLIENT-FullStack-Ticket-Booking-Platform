import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-8 text-brand-primary">My Booked Tickets</h2>
            {/* 3 Column Grid [cite: 128] */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map(booking => (
                    <div key={booking._id} className="card bg-gray-900 border border-brand-primary/20 shadow-xl">
                        <figure className="h-48 overflow-hidden">
                            <img src={booking.image} alt="ticket" className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-white">{booking.ticketTitle}</h2>
                            <p className="text-sm text-gray-400">{booking.from} ➝ {booking.to}</p>
                            
                            <div className="my-2">
                                <p>Quantity: <span className="font-bold text-brand-accent">{booking.quantity}</span></p>
                                <p>Total: <span className="font-bold text-brand-accent">${booking.totalPrice}</span></p>
                                <p>Date: {new Date(booking.departureDate).toLocaleString()}</p>
                            </div>

                            {/* Status Logic [cite: 135] */}
                            <div className="badge badge-outline mb-4">
                                Status: <span className={`font-bold ml-2 ${
                                    booking.status === 'pending' ? 'text-yellow-400' :
                                    booking.status === 'accepted' ? 'text-green-400' :
                                    booking.status === 'paid' ? 'text-blue-400' : 'text-red-400'
                                }`}>{booking.status}</span>
                            </div>

                            <div className="card-actions justify-end">
                                {/* Pay Button Logic [cite: 137] */}
                                {booking.status === 'accepted' && (
                                    <Link to={`/dashboard/payment/${booking._id}`} className="btn btn-sm bg-brand-primary text-black w-full animate-pulse">
                                        Pay Now
                                    </Link>
                                )}
                                {booking.status === 'pending' && <button disabled className="btn btn-sm btn-disabled w-full">Waiting for Approval</button>}
                                {booking.status === 'rejected' && <button disabled className="btn btn-sm btn-error w-full">Cancelled</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyBookedTickets;