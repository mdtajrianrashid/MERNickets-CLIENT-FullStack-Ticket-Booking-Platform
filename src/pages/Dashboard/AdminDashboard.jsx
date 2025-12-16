import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();
  const { dbUser } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/tickets/admin").then(res => setTickets(res.data));
    axiosSecure.get("/auth/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="container mx-auto space-y-10">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* PROFILE */}
      <div className="card p-4">
        <h3 className="font-semibold">Admin Profile</h3>
        <p><b>Name:</b> {dbUser?.name}</p>
        <p><b>Email:</b> {dbUser.email}</p>
        <p><b>Role:</b> {dbUser.role}</p>
      </div>

      {/* MANAGE TICKETS */}
      <div>
        <h3 className="font-semibold mb-2">Manage Tickets</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.status}</td>
                <td>{t.advertised ? "Yes" : "No"}</td>
                <td className="space-x-2">
                  <button onClick={() =>
                    axiosSecure.patch(`/tickets/approve/${t._id}`)
                  }>Approve</button>
                  <button onClick={() =>
                    axiosSecure.patch(`/tickets/reject/${t._id}`)
                  }>Reject</button>
                  <button onClick={() =>
                    axiosSecure.patch(`/tickets/advertise/${t._id}`)
                  }>Toggle Ad</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MANAGE USERS */}
      <div>
        <h3 className="font-semibold mb-2">Manage Users</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="space-x-2">
                  <button onClick={() =>
                    axiosSecure.patch(`/auth/users/role/${u._id}`, { role: "admin" })
                  }>Make Admin</button>
                  <button onClick={() =>
                    axiosSecure.patch(`/auth/users/role/${u._id}`, { role: "vendor" })
                  }>Make Vendor</button>
                  {u.role === "vendor" && (
                    <button onClick={() =>
                      axiosSecure.patch(`/auth/users/fraud/${u._id}`)
                    }>Mark Fraud</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}