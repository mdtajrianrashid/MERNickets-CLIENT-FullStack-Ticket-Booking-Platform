import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTie, FaBan } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleUpdate = (user, newRole) => {
        Swal.fire({
            title: `Make ${user.name} a ${newRole}?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire('Success', `${user.name} is now a ${newRole}`, 'success');
                        }
                    });
            }
        });
    };

    // Mark as Fraud [cite: 208, 209]
    const handleFraud = (user) => {
        // Logic: Should also update all their tickets to "hidden" (Server side logic)
        axiosSecure.patch(`/users/fraud/${user._id}`)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire('Marked as Fraud', 'User banned and tickets hidden', 'warning');
                }
            })
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Manage Users</h2>
            <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
                <table className="table">
                    <thead className="text-white bg-brand-primary/20">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-800">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize font-bold">{user.role}</td>
                                <td className="flex gap-2">
                                    {/* Make Admin [cite: 207] */}
                                    {user.role !== 'admin' && (
                                        <button onClick={() => handleRoleUpdate(user, 'admin')} className="btn btn-sm bg-orange-500 text-white" title="Make Admin">
                                            <FaUserShield />
                                        </button>
                                    )}
                                    {/* Make Vendor [cite: 207] */}
                                    {user.role !== 'vendor' && (
                                        <button onClick={() => handleRoleUpdate(user, 'vendor')} className="btn btn-sm bg-purple-500 text-white" title="Make Vendor">
                                            <FaUserTie />
                                        </button>
                                    )}
                                    {/* Mark Fraud [cite: 208] */}
                                    {user.role === 'vendor' && (
                                        <button onClick={() => handleFraud(user)} className="btn btn-sm bg-red-600 text-white" title="Mark as Fraud">
                                            <FaBan />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageUsers;