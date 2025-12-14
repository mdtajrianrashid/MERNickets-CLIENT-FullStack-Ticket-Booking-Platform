// src/components/PaymentForm.jsx
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosSecure from "../utils/axiosSecure";
import { useNavigate } from "react-router-dom";

export default function PaymentForm({ bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     Create Payment Intent
  ================================ */
  useEffect(() => {
    if (!bookingId) return;

    axiosSecure
      .post("/payments/create-payment-intent", { bookingId })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setAmount(res.data.totalAmount);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "Payment initialization failed");
      });
  }, [bookingId]);

  /* ===============================
     Submit Payment
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: "MERNickets User",
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
      setLoading(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.patch("/bookings/confirm", {
        bookingId,
        transactionId: result.paymentIntent.id,
      });

      alert("Payment successful!");
      navigate("/dashboard/my-bookings");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Payment Summary
      </h3>

      <div className="mb-4 text-center">
        <p className="text-gray-600">Total Amount</p>
        <p className="text-2xl font-bold">
          {amount !== null ? `$${amount}` : "Loading..."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border rounded">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}