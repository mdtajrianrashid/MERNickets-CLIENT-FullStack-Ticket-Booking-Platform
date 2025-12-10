import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-brand-dark text-white">
            <Navbar />
            <div className="flex-grow pt-20"> {/* Padding for fixed navbar */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;