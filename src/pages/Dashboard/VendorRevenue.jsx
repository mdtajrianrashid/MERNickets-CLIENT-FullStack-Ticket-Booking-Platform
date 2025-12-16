import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

export default function VendorRevenue() {
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/bookings/transactions").then(res => {
      const vendorPaid = res.data.filter(
        b => b.ticketId?.vendorEmail === dbUser.email
      );

      const revenue = vendorPaid.reduce(
        (sum, b) => sum + b.totalPrice, 0
      );

      setStats({
        revenue,
        sold: vendorPaid.length,
      });
    });
  }, [axiosSecure, dbUser.email]);

  if (!stats) return <Spinner />;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card p-4">Total Revenue: ${stats.revenue}</div>
      <div className="card p-4">Tickets Sold: {stats.sold}</div>
    </div>
  );
}
