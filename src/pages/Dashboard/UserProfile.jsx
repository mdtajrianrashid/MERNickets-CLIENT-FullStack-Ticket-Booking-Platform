import useAuth from "../../hooks/useAuth";

export default function UserProfile() {
  const { user, dbUser } = useAuth();

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            user?.photoURL ||
            `https://avatars.dicebear.com/api/initials/${user?.email}.svg`
          }
          alt="avatar"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">
            {user?.displayName || "No name"}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <p>
          <strong>Role:</strong> {dbUser?.role}
        </p>
        <p>
          <strong>UID:</strong> {user?.uid}
        </p>
      </div>
    </div>
  );
}