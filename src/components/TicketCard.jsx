import { Link } from "react-router-dom";
import { FaBus, FaPlane, FaTrain, FaShip } from "react-icons/fa";

const TicketCard = ({ ticket }) => {
    const { _id, title, image, price, quantity, type, perks, from, to } = ticket;

    // Icon mapping
    const icons = { bus: <FaBus/>, air: <FaPlane/>, train: <FaTrain/>, launch: <FaShip/> };

    return (
        <div className="card bg-gray-900 border border-brand-primary/30 shadow-[0_0_10px_rgba(0,242,255,0.1)] hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all duration-300">
            <figure className="h-48 overflow-hidden relative">
                <img src={image} alt={title} className="object-cover w-full h-full transform hover:scale-110 transition duration-500" />
                <div className="absolute top-2 right-2 badge badge-secondary badge-lg">{type}</div>
            </figure>
            <div className="card-body p-5">
                <h2 className="card-title text-brand-primary">{title}</h2>
                <p className="text-gray-300 text-sm">{from} ➝ {to}</p>
                
                <div className="flex justify-between items-center my-2">
                    <span className="text-2xl font-bold text-white">${price}</span>
                    <span className={`badge ${quantity > 0 ? 'badge-accent' : 'badge-error'}`}>
                        {quantity > 0 ? `${quantity} Seats Left` : 'Sold Out'}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                    {perks?.map((perk, idx) => <span key={idx} className="border border-gray-600 px-2 py-1 rounded">{perk}</span>)}
                </div>

                <div className="card-actions mt-4">
                    <Link to={`/ticket/${_id}`} className="btn bg-brand-primary text-black w-full hover:bg-brand-accent font-bold">
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default TicketCard;