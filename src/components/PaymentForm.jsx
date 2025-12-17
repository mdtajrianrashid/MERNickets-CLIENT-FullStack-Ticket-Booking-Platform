import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ bookingId }) {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axiosSecure
      .post("/payments/create-payment-intent", { bookingId })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        setAmount(res.data.totalAmount);
      });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.patch("/bookings/confirm", {
        bookingId,
        transactionId: result.paymentIntent.id,
      });

      navigate("/dashboard/user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded">
      <p className="text-xl font-bold">Pay ${amount}</p>
      <CardElement />
      <button className="btn btn-primary w-full">Pay Now</button>
    </form>
  );
}