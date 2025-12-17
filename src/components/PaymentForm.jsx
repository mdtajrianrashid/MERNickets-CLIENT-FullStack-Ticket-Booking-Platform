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
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ============================
     Create Payment Intent
  ============================ */
  useEffect(() => {
    axiosSecure
      .post("/payments/create-payment-intent", { bookingId })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        setAmount(res.data.totalAmount);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Payment initialization failed");
      });
  }, [bookingId, axiosSecure]);

  /* ============================
     Handle Payment
  ============================ */
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Please enter card details");
      return;
    }

    setProcessing(true);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.patch("/bookings/confirm", {
          bookingId,
          transactionId: paymentIntent.id,
        });

        setSuccess(true);
      } catch (err) {
        setError("Payment succeeded but booking update failed");
      }
    }

    setProcessing(false);
  };

  /* ============================
     SUCCESS MODAL
  ============================ */
  if (success) {
    return (
      <div className="p-8 text-center border rounded">
        <h2 className="text-2xl font-bold text-green-600 mb-3">
          Payment Successful
        </h2>
        <p className="mb-6">Your booking has been confirmed.</p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard/user/transactions")}
        >
          See Transactions
        </button>
      </div>
    );
  }

  /* ============================
     PAYMENT FORM
  ============================ */
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded">
      <h2 className="text-xl font-bold">Pay ${amount}</h2>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
            },
          },
        }}
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        className="btn btn-primary w-full"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}