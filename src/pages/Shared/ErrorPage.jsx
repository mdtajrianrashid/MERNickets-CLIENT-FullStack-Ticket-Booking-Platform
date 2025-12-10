import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-brand-primary">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl mt-4 text-white">Oops! The destination you are looking for does not exist.</p>
            <Link to="/" className="btn btn-outline border-brand-primary text-brand-primary mt-8">Go Home</Link>
        </div>
    );
};
export default ErrorPage;