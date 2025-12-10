import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['approved-tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/approved');
            return res.data;
        }
    });

    const toggleAdvertise = (id, isAdvertised) => {
        // Logic to check limit of 6 can be done in backend or here
        axiosSecure.patch(`/tickets/advertise/${id}`, { advertised: !isAdvertised })
            .then(res => {
                if(res.data.modifiedCount > 0) refetch();
                else Swal.fire("Limit Reached", "Cannot advertise more than 6 tickets.", "warning");
            });
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Advertise Tickets</h2>
            <div className="overflow-x-auto bg-gray-900 rounded-lg">
                <table className="table">
                    <thead><tr className="text-white"><th>Ticket</th><th>Current Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id}>
                                <td>{ticket.title}</td>
                                <td>{ticket.advertised ? <span className="text-green-500 font-bold">Live Ad</span> : <span className="text-gray-500">None</span>}</td>
                                <td>
                                    <button 
                                        onClick={() => toggleAdvertise(ticket._id, ticket.advertised)} 
                                        className={`btn btn-sm ${ticket.advertised ? 'btn-error' : 'btn-success'}`}
                                    >
                                        {ticket.advertised ? "Remove Ad" : "Advertise"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AdvertiseTickets;