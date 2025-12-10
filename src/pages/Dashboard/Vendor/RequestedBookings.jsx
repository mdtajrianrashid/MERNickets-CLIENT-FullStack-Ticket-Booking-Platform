import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['booking-requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/vendor/${user.email}`);
            return res.data;
        }
    });

    const handleStatus = (id, status) => {
        axiosSecure.patch(`/bookings/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire("Updated", `Booking has been ${status}`, "success");
                }
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-brand-secondary">Requested Bookings</h2>
            <div className="overflow-x-auto bg-gray-900 rounded-lg">
                <table className="table">
                    <thead className="text-white bg-brand-secondary/20">
                        <tr>
                            <th>User</th>
                            <th>Ticket</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>{req.userName}<br/><span className="text-xs opacity-50">{req.userEmail}</span></td>
                                <td>{req.ticketTitle}</td>
                                <td>{req.quantity}</td>
                                <td>${req.totalPrice}</td>
                                <td className="flex gap-2">
                                    {req.status === 'pending' ? (
                                        <>
                                            <button onClick={() => handleStatus(req._id, 'accepted')} className="btn btn-xs btn-success text-white">Accept</button>
                                            <button onClick={() => handleStatus(req._id, 'rejected')} className="btn btn-xs btn-error text-white">Reject</button>
                                        </>
                                    ) : <span className="badge badge-ghost capitalize">{req.status}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default RequestedBookings;