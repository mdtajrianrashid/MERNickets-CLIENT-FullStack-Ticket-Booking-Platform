import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FaStore } from "react-icons/fa";

const VendorProfile = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="flex flex-col items-center justify-center pt-10 text-white min-h-[60vh]">
             {/* Profile Card */}
             <div className="bg-gray-900 border border-brand-secondary/40 shadow-[0_0_20px_rgba(255,0,255,0.15)] p-10 rounded-2xl flex flex-col items-center max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
                
                {/* Avatar */}
                <div className="avatar mb-6">
                    <div className="w-32 rounded-full ring ring-brand-secondary ring-offset-base-100 ring-offset-2 shadow-lg shadow-brand-secondary/50">
                        <img src={user?.photoURL} alt="Vendor" />
                    </div>
                </div>

                {/* Info */}
                <h2 className="text-4xl font-bold text-white mb-1 flex items-center gap-2">
                    {user?.displayName} <FaStore className="text-brand-secondary text-2xl"/>
                </h2>
                <p className="text-brand-secondary tracking-widest uppercase font-bold text-sm mb-4">{role}</p>
                <p className="text-gray-400 bg-gray-800 px-4 py-1 rounded-full text-sm">{user?.email}</p>

                {/* Account Details */}
                <div className="w-full mt-8 bg-black/30 p-4 rounded-lg text-sm text-gray-300 space-y-2">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span>Last Login:</span>
                        <span className="text-white">{user?.metadata?.lastSignInTime?.slice(0,16)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span>Account Created:</span>
                        <span className="text-white">{user?.metadata?.creationTime?.slice(0,16)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;