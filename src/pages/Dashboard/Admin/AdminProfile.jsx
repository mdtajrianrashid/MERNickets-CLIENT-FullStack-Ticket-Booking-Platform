import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const AdminProfile = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="flex flex-col items-center justify-center pt-10 text-white min-h-[60vh]">
            {/* Profile Card */}
            <div className="bg-gray-900 border border-brand-primary/40 shadow-[0_0_20px_rgba(0,242,255,0.15)] p-10 rounded-2xl flex flex-col items-center max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
                
                {/* Avatar */}
                <div className="avatar mb-6">
                    <div className="w-32 rounded-full ring ring-brand-primary ring-offset-base-100 ring-offset-2 shadow-lg shadow-brand-primary/50">
                        <img src={user?.photoURL} alt="Admin" />
                    </div>
                </div>

                {/* Info */}
                <h2 className="text-4xl font-bold text-white mb-1">{user?.displayName}</h2>
                <p className="text-brand-primary tracking-widest uppercase font-bold text-sm mb-4">{role}</p>
                <p className="text-gray-400 bg-gray-800 px-4 py-1 rounded-full text-sm">{user?.email}</p>

                {/* Stats / Details */}
                <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t border-gray-700 pt-6">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-brand-secondary">ID</span>
                        <span className="text-xs text-gray-500">#{user?.uid?.slice(0,8)}</span>
                    </div>
                    <div className="text-center border-l border-gray-700">
                        <span className="block text-2xl font-bold text-green-400">Active</span>
                        <span className="text-xs text-gray-500">Status</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;