// src/pages/Dashboard/Admin/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import axiosSecureInstance from '../../../api/axiosSecure';
import Loading from '../../../components/Loading';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await axiosSecureInstance.get('/users');
        if (mounted) setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return () => (mounted = false);
  }, []);

  const changeRole = async (id, role) => {
    try {
      await axiosSecureInstance.patch(`/users/admin/${id}`, { role });
      setUsers(u => u.map(x => x._id === id ? { ...x, role } : x));
    } catch (err) { console.error(err); alert('Change role failed'); }
  };

  const markFraud = async (id) => {
    if (!confirm('Mark vendor as fraud?')) return;
    try {
      await axiosSecureInstance.patch(`/users/fraud/${id}`);
      setUsers(u => u.map(x => x._id === id ? { ...x, status: 'fraud' } : x));
    } catch (err) { console.error(err); alert('Operation failed'); }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm" onClick={() => changeRole(u._id, 'admin')}>Make Admin</button>
                  <button className="btn btn-sm" onClick={() => changeRole(u._id, 'vendor')}>Make Vendor</button>
                  {u.role === 'vendor' && <button className="btn btn-sm btn-ghost" onClick={() => markFraud(u._id)}>Mark Fraud</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}