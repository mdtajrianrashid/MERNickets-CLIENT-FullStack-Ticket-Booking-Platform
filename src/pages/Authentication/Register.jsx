import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // Create user entry in DB
                        const userInfo = { name: data.name, email: data.email, role: 'user' };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire("Success", "Account Created!", "success");
                                    navigate('/');
                                }
                            });
                    });
            })
            .catch(error => Swal.fire("Error", error.message, "error"));
    };

    return (
        <div className="hero min-h-screen bg-brand-dark">
            <div className="hero-content flex-col">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gray-900 border border-brand-primary/20">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-3xl font-bold text-center text-brand-secondary mb-4">Register</h1>
                        
                        <div className="form-control">
                            <label className="label">Name</label>
                            <input {...register("name", { required: true })} className="input input-bordered bg-gray-800" />
                        </div>
                        <div className="form-control">
                            <label className="label">Photo URL</label>
                            <input {...register("photoURL", { required: true })} className="input input-bordered bg-gray-800" />
                        </div>
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input type="email" {...register("email", { required: true })} className="input input-bordered bg-gray-800" />
                        </div>
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input type="password" 
                                {...register("password", { 
                                    required: true, 
                                    minLength: 6, 
                                    pattern: /(?=.*[A-Z])(?=.*[a-z])/ 
                                })} 
                                className="input input-bordered bg-gray-800" />
                            {errors.password?.type === 'minLength' && <span className="text-red-500 text-xs mt-1">Min 6 characters required</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500 text-xs mt-1">Must have uppercase & lowercase</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-brand-secondary text-white">Register</button>
                        </div>
                        <p className="mt-4 text-center text-sm">
                            Already have an account? <Link to="/login" className="text-brand-secondary">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Register;