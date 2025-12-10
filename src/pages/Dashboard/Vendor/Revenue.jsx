import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyBill, FaTicketAlt } from "react-icons/fa";

const Revenue = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['vendor-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stats/vendor/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-6 text-white">
            <h2 className="text-3xl font-bold mb-8">Revenue Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-gradient-to-r from-blue-900 to-black border border-blue-500 rounded-xl">
                    <div className="stat-figure text-blue-500"><FaMoneyBill className="text-4xl" /></div>
                    <div className="stat-title text-gray-400">Total Revenue</div>
                    <div className="stat-value text-blue-400">${stats.revenue || 0}</div>
                </div>
                <div className="stat bg-gradient-to-r from-purple-900 to-black border border-purple-500 rounded-xl">
                    <div className="stat-figure text-purple-500"><FaTicketAlt className="text-4xl" /></div>
                    <div className="stat-title text-gray-400">Tickets Sold</div>
                    <div className="stat-value text-purple-400">{stats.sold || 0}</div>
                </div>
            </div>
            {/* Add Recharts component here if needed for visual graph */}
        </div>
    );
};
export default Revenue;