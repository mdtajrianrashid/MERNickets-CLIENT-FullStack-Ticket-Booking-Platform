import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['my-tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/vendor/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?", text: "You won't be able to revert this!", icon: "warning", showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">My Added Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    <div key={ticket._id} className="card bg-gray-900 border border-brand-primary/20 shadow-lg">
                        <figure className="h-40 overflow-hidden"><img src={ticket.image} alt="Ticket" className="w-full h-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-white">{ticket.title}</h2>
                            <p>Price: ${ticket.price}</p>
                            <div className="badge badge-outline mb-4">
                                Status: <span className={ticket.status === 'approved' ? 'text-green-500' : ticket.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>{ticket.status}</span>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/dashboard/update-ticket/${ticket._id}`}>
                                    <button disabled={ticket.status === 'rejected'} className="btn btn-sm btn-info">Update</button>
                                </Link>
                                <button disabled={ticket.status === 'rejected'} onClick={() => handleDelete(ticket._id)} className="btn btn-sm btn-error">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MyAddedTickets;