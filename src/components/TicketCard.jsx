import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function TicketCard({ ticket }) {
  return (
    <div className="card bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
      <img src={ticket.image} alt={ticket.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{ticket.title}</h3>
        <p className="text-sm text-gray-500">{ticket.from} → {ticket.to}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-teal-600 font-bold">${ticket.price.toFixed(2)}</div>
            <div className="text-sm text-gray-500">{ticket.transportType}</div>
          </div>
          <Link to={`/ticket/${ticket._id}`} className="btn btn-sm">See details</Link>
        </div>
      </div>
    </div>
  );
}