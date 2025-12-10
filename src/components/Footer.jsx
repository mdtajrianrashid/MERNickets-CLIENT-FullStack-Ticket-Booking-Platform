import { FaFacebook, FaSquareXTwitter, FaInstagram, FaStripe } from "react-icons/fa6"; // Use Fa6 for X logo

const Footer = () => {
    // Determine the current year for the copyright
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="bg-neutral-900 text-white border-t border-brand-primary/30 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* 4-Column Grid (Stacked on Mobile, 4 columns on Desktop)  */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-8">
                    
                    {/* Column 1: Logo + Description [cite: 41] */}
                    <div>
                        {/* Logo on left: “TicketBari” with a small bus/train icon [cite: 35] */}
                        <h2 className="text-3xl font-extrabold text-brand-primary mb-3 flex items-center gap-2">
                            TicketBari
                            <span className="text-xl">🚌</span> {/* Added small icon for flavor */}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Book bus, train, launch & flight tickets easily. [cite: 41]
                        </p>
                    </div>

                    {/* Column 2: Quick Links [cite: 42] */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                        {/* Menu items as per requirement [cite: 42] */}
                        <a href="/" className="text-gray-400 hover:text-brand-primary transition">Home</a>
                        <a href="/all-tickets" className="text-gray-400 hover:text-brand-primary transition">All Tickets</a>
                        <a href="/contact" className="text-gray-400 hover:text-brand-primary transition">Contact Us</a>
                        <a href="/about" className="text-gray-400 hover:text-brand-primary transition">About</a>
                    </div>
                    
                    {/* Column 3: Contact Info [cite: 43] */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Contact Info</h3>
                        <p className="text-gray-400 text-sm mb-1">Email: support@ticketbari.com</p>
                        <p className="text-gray-400 text-sm">Phone: +880 1234 567 890</p>
                        <p className="text-gray-400 text-sm mt-1">Facebook Page: /TicketBariOfficial</p>
                        
                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4 text-2xl">
                            <FaFacebook className="hover:text-blue-500 cursor-pointer transition"/>
                            {/* Use X logo instead of old Twitter bird  */}
                            <FaSquareXTwitter className="hover:text-white/80 cursor-pointer transition"/> 
                            <FaInstagram className="hover:text-pink-500 cursor-pointer transition"/>
                        </div>
                    </div>
                    
                    {/* Column 4: Payment Methods [cite: 44] */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Payment Methods</h3>
                        <div className="flex gap-4 text-4xl text-gray-400">
                            {/* Example payment method: Stripe [cite: 44] */}
                            <FaStripe className="text-purple-500" title="Stripe Accepted" /> 
                            {/* Add more payment icons if desired (e.g., Visa, Mastercard) */}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright  */}
                <div className="text-center mt-10 text-white border-t border-gray-700 pt-4 text-sm">
                    © {currentYear} TicketBari. All rights reserved. 
                </div>
            </div>
        </footer>
    );
};

export default Footer;