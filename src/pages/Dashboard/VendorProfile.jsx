import useAuth from "../../hooks/useAuth";

export default function VendorProfile() {
  const { dbUser } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vendor Profile</h2>
      <p><b>Name:</b> {dbUser?.name}</p>
      <p><b>Email:</b> {dbUser?.email}</p>
      <p><b>Role:</b> {dbUser?.role}</p>
    </div>
  );
}