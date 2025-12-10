import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                Swal.fire("Logged In", "Welcome back!", "success");
                navigate(from, { replace: true });
            })
            .catch(error => Swal.fire("Error", error.message, "error"));
    };

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                // Ideally post user to DB here to sync google users
                navigate(from, { replace: true });
            })
            .catch(error => Swal.fire("Error", error.message, "error"));
    }

    return (
        <div className="hero min-h-screen bg-brand-dark">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-white max-w-md">
                    <h1 className="text-5xl font-bold text-brand-primary">Login Now!</h1>
                    <p className="py-6">Access your dashboard and manage your tickets.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-gray-900 border border-brand-primary/20">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Email</span></label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered bg-gray-800 text-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Password</span></label>
                            <input type="password" {...register("password")} placeholder="password" className="input input-bordered bg-gray-800 text-white" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-brand-primary text-black hover:bg-brand-accent">Login</button>
                        </div>
                        <div className="divider text-gray-500">OR</div>
                        <button type="button" onClick={handleGoogle} className="btn btn-outline border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white">
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-400">
                            New here? <Link to="/register" className="text-brand-primary hover:underline">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;