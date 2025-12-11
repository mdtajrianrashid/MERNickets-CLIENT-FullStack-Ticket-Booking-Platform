// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import TicketCard from '../../components/TicketCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading';

export default function Home() {
  const api = useAxiosPublic();
  const [advertised, setAdvertised] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [advRes, latestRes] = await Promise.all([
          api.get('/tickets/advertised'),
          api.get('/tickets', { params: { page: 1, limit: 8 } })
        ]);
        if (!mounted) return;
        setAdvertised(Array.isArray(advRes.data) ? advRes.data : advRes.data.items || []);
        // tickets endpoint returns { items, total,... } — support both shapes
        setLatest(latestRes.data.items || latestRes.data || []);
      } catch (err) {
        console.error('Home load error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      <Banner />
      <section>
        <h2 className="text-2xl font-semibold mb-4">Advertisement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advertised.length ? advertised.map(t => <TicketCard key={t._id} ticket={t} />) : <div>No advertised tickets</div>}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.length ? latest.map(t => <TicketCard key={t._id} ticket={t} />) : <div>No tickets</div>}
        </div>
      </section>
    </div>
  );
}