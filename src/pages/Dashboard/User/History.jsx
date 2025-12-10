import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const History = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Payment History</h2>
            <div className="overflow-x-auto bg-gray-900 rounded-lg">
                <table className="table text-white">
                    <thead className="bg-brand-primary/20 text-white">
                        <tr><th>#</th><th>Transaction ID</th><th>Ticket</th><th>Amount</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                        {payments.map((pay, index) => (
                            <tr key={pay._id}>
                                <th>{index + 1}</th>
                                <td className="font-mono text-yellow-500">{pay.transactionId}</td>
                                <td>{pay.ticketTitle}</td>
                                <td>${pay.price}</td>
                                <td>{new Date(pay.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default History;