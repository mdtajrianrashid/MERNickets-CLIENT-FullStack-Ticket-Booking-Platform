import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const MyProfile = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="flex flex-col items-center justify-center pt-10 text-white">
            <div className="avatar mb-6">
                <div className="w-32 rounded-full ring ring-brand-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="Profile" />
                </div>
            </div>
            <h2 className="text-4xl font-bold text-brand-primary">{user?.displayName}</h2>
            <p className="text-xl text-gray-400 mt-2">{user?.email}</p>
            <div className="badge badge-accent badge-lg mt-4 capitalize">{role}</div>
            
            <div className="mt-10 bg-gray-900 p-8 rounded-xl border border-gray-700 max-w-lg w-full">
                <h3 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Account Details</h3>
                <div className="flex justify-between py-2"><span>User ID:</span> <span className="text-gray-400">{user?.uid}</span></div>
                <div className="flex justify-between py-2"><span>Last Login:</span> <span className="text-gray-400">{user?.metadata?.lastSignInTime}</span></div>
            </div>
        </div>
    );
};
export default MyProfile;