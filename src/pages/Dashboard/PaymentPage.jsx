import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function PaymentPage() {
  const { bookingId } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingId={bookingId} />
    </Elements>
  );
}