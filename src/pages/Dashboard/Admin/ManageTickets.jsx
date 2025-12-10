import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['all-tickets-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/admin/all'); // Backend endpoint fetching all tickets
            return res.data;
        }
    });

    const handleAction = (id, status) => {
        axiosSecure.patch(`/tickets/status/${id}`, { status })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire("Success", `Ticket ${status} successfully!`, "success");
                }
            })
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Manage All Tickets</h2>
            <div className="overflow-x-auto bg-gray-900 rounded-lg">
                <table className="table">
                    <thead><tr className="text-white"><th>Title</th><th>Vendor</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.vendorEmail}</td>
                                <td><span className={`badge ${ticket.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>{ticket.status}</span></td>
                                <td>
                                    {ticket.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleAction(ticket._id, 'approved')} className="btn btn-xs btn-success">Approve</button>
                                            <button onClick={() => handleAction(ticket._id, 'rejected')} className="btn btn-xs btn-error">Reject</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageTickets;