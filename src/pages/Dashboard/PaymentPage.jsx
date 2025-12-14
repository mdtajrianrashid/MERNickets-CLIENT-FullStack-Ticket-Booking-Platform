// src/pages/Dashboard/PaymentPage.jsx
import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/PaymentForm";

export default function PaymentPage() {
  const { bookingId } = useParams();

  // Safety check
  if (!bookingId) {
    return <Navigate to="/dashboard/my-bookings" replace />;
  }

  // Load Stripe once
  const stripePromise = useMemo(() => {
    return loadStripe(import.meta.env.VITE_STRIPE_PK);
  }, []);

  // Stripe appearance (fixes messy UI)
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#2563eb", // blue-600
      colorBackground: "#ffffff",
      colorText: "#111827",
      colorDanger: "#dc2626",
      fontFamily: "Inter, system-ui, sans-serif",
      borderRadius: "8px",
    },
  };

  const options = {
    appearance,
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your Payment
      </h2>

      <Elements stripe={stripePromise} options={options}>
        <PaymentForm bookingId={bookingId} />
      </Elements>
    </div>
  );
}