import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTicket = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // 1. Upload Image [cite: 167]
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        if (res.data.success) {
            // 2. Prepare Data [cite: 159-169]
            const ticketData = {
                title: data.title,
                from: data.from,
                to: data.to,
                type: data.type,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                departureDate: data.departureDate,
                perks: [data.ac ? 'AC' : '', data.wifi ? 'WiFi' : ''].filter(Boolean), // Checkboxes [cite: 166]
                image: res.data.data.display_url,
                vendorName: user?.displayName,
                vendorEmail: user?.email,
                status: 'pending', // Verification status [cite: 171]
                advertised: false
            };

            // 3. Post to DB
            const ticketRes = await axiosSecure.post('/tickets', ticketData);
            if (ticketRes.data.insertedId) {
                reset();
                Swal.fire('Success', 'Ticket Added! Waiting for Admin Approval.', 'success');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-brand-primary">Add New Ticket</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Form Fields [cite: 159-166] */}
                <div className="form-control">
                    <label className="label">Ticket Title</label>
                    <input {...register("title", { required: true })} placeholder="e.g., Dhaka to Sylhet Express" className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">Transport Type</label>
                    <select {...register("type")} className="select select-bordered">
                        <option value="bus">Bus</option>
                        <option value="train">Train</option>
                        <option value="air">Flight</option>
                    </select>
                </div>

                <div className="form-control"><label className="label">From</label><input {...register("from", { required: true })} className="input input-bordered" /></div>
                <div className="form-control"><label className="label">To</label><input {...register("to", { required: true })} className="input input-bordered" /></div>
                
                <div className="form-control"><label className="label">Price (per unit)</label><input type="number" {...register("price", { required: true })} className="input input-bordered" /></div>
                <div className="form-control"><label className="label">Quantity</label><input type="number" {...register("quantity", { required: true })} className="input input-bordered" /></div>
                
                <div className="form-control"><label className="label">Departure Date & Time</label><input type="datetime-local" {...register("departureDate", { required: true })} className="input input-bordered" /></div>
                
                <div className="form-control"><label className="label">Image</label><input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" /></div>

                {/* Checkboxes for Perks [cite: 166] */}
                <div className="col-span-full flex gap-4">
                    <label className="cursor-pointer label"><span className="label-text mr-2">AC</span><input type="checkbox" {...register("ac")} className="checkbox checkbox-primary" /></label>
                    <label className="cursor-pointer label"><span className="label-text mr-2">WiFi</span><input type="checkbox" {...register("wifi")} className="checkbox checkbox-primary" /></label>
                </div>

                <div className="col-span-full mt-4">
                    <button className="btn bg-brand-primary text-black w-full font-bold text-lg">Add Ticket</button>
                </div>
            </form>
        </div>
    );
};
export default AddTicket;