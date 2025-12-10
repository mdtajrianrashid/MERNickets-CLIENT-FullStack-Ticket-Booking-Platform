import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const TicketDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch Ticket Data
    const { data: ticket, isLoading } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    // Validation Logic
    const departureTime = new Date(ticket.departureDate).getTime();
    const now = new Date().getTime();
    const isExpired = now > departureTime;
    const isSoldOut = ticket.quantity === 0;

    const handleBooking = async (e) => {
        e.preventDefault();
        const form = e.target;
        const quantity = parseInt(form.quantity.value);

        // Validation
        if (quantity > ticket.quantity) {
            return Swal.fire("Error", "Cannot book more than available seats!", "error");
        }

        const bookingData = {
            ticketId: ticket._id,
            ticketTitle: ticket.title,
            image: ticket.image,
            from: ticket.from,
            to: ticket.to,
            departureDate: ticket.departureDate,
            unitPrice: ticket.price,
            quantity,
            totalPrice: ticket.price * quantity,
            userEmail: user.email,
            userName: user.displayName,
            vendorEmail: ticket.vendorEmail,
            status: "pending",
            bookingDate: new Date()
        };

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            if (res.data.insertedId) {
                Swal.fire("Success", "Booking Request Sent! Check Dashboard.", "success");
                document.getElementById('booking_modal').close();
                navigate('/dashboard/my-booked-tickets');
            }
        } catch (err) {
            Swal.fire("Error", "Booking failed. Try again.", "error");
        }
    };

    return (
        <div className="pt-24 max-w-5xl mx-auto px-4 text-white">
            <div className="card lg:card-side bg-base-100 shadow-xl shadow-brand-primary/20 border border-brand-primary/30">
                <figure className="lg:w-1/2">
                    <img src={ticket.image} alt="Transport" className="h-full w-full object-cover" />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-4xl text-brand-primary">{ticket.title}</h2>
                    <p className="text-xl">Route: <span className="font-bold">{ticket.from} ➝ {ticket.to}</span></p>
                    <p>Price: <span className="text-brand-accent font-bold">${ticket.price}</span> / seat</p>
                    <p>Available Seats: {ticket.quantity}</p>
                    <p>Departure: {new Date(ticket.departureDate).toLocaleString()}</p>
                    
                    {/* Countdown Logic (Simple Render) */}
                    <div className="bg-gray-800 p-3 rounded-lg mt-4 text-center">
                        <span className="text-sm text-gray-400">Time until departure:</span>
                        <div className="text-2xl font-mono text-brand-secondary">
                            {isExpired ? "EXPIRED" : "Countdown logic here (use React Countdown)"}
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button 
                            disabled={isExpired || isSoldOut} 
                            onClick={() => document.getElementById('booking_modal').showModal()}
                            className="btn bg-brand-primary text-black hover:bg-brand-accent w-full font-bold"
                        >
                            {isSoldOut ? "Sold Out" : isExpired ? "Expired" : "Book Now"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="booking_modal" className="modal">
                <div className="modal-box border border-brand-primary">
                    <h3 className="font-bold text-lg text-brand-primary">Confirm Booking</h3>
                    <form onSubmit={handleBooking} className="py-4 space-y-4">
                        <div className="form-control">
                            <label className="label">Your Email</label>
                            <input type="text" value={user?.email} disabled className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">Quantity (Max: {ticket.quantity})</label>
                            <input type="number" name="quantity" min="1" max={ticket.quantity} required className="input input-bordered" />
                        </div>
                        <button className="btn bg-brand-primary text-black w-full">Confirm & Book</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog"><button className="btn">Close</button></form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default TicketDetails;