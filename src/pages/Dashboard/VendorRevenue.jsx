import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

export default function VendorRevenue() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/bookings/vendor/revenue").then(res => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  if (!stats) return <Spinner />;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card p-4 font-bold">
        Total Revenue: ${stats.revenue}
      </div>
      <div className="card p-4 font-bold">
        Tickets Sold: {stats.ticketsSold}
      </div>
    </div>
  );
}