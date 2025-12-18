// src/pages/Payment/PaymentForm.jsx (or wherever you use it)
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LockClosedIcon, 
  CreditCardIcon, 
  CheckBadgeIcon, 
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";

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
  const [loadingData, setLoadingData] = useState(true);

  /* ============================
      Create Payment Intent
  ============================ */
  useEffect(() => {
    if(!bookingId) return;
    
    setLoadingData(true);
    axiosSecure
      .post("/payments/create-payment-intent", { bookingId })
      .then(res => {
        setClientSecret(res.data.clientSecret);
        setAmount(res.data.totalAmount);
        setLoadingData(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Payment initialization failed");
        setLoadingData(false);
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
        setError("Payment succeeded but booking update failed. Please contact support.");
      }
    }

    setProcessing(false);
  };

  /* ============================
      Stripe Element Styling
  ============================ */
  // Custom styling to make the iframe match the theme
  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937", // Gray-900
        fontFamily: "'Inter', sans-serif",
        "::placeholder": {
          color: "#9ca3af", // Gray-400
        },
      },
      invalid: {
        color: "#ef4444", // Red-500
      },
    },
  };

  // While fetching the intent
  if (loadingData) return <div className="h-64 flex items-center justify-center"><Spinner /></div>;

  /* ============================
      SUCCESS VIEW
  ============================ */
  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-green-100 dark:border-green-900/30 max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckBadgeIcon className="w-12 h-12" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your booking has been confirmed and your ticket is ready.
        </p>

        <button
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
          onClick={() => navigate("/dashboard/user/transactions")}
        >
          See Receipt
        </button>
      </motion.div>
    );
  }

  /* ============================
      PAYMENT FORM
  ============================ */
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-700 text-center">
         <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            <LockClosedIcon className="w-4 h-4" /> Secure Checkout
         </div>
         <div className="flex flex-col items-center">
             <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount</span>
             <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                ${amount}
             </span>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Card Input Wrapper */}
        <div className="space-y-2">
           <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
              <CreditCardIcon className="w-4 h-4" /> Card Details
           </label>
           
           <div className="p-4 bg-gray-50 dark:bg-gray-100 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              {/* Note: CardElement works best with light backgrounds for contrast consistency */}
              <CardElement options={cardStyle} />
           </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg flex items-start gap-2"
            >
               <ShieldCheckIcon className="w-5 h-5 flex-shrink-0" />
               <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
             <>
               <Spinner className="w-5 h-5 !p-0 border-white border-t-transparent" />
               Processing...
             </>
          ) : (
             `Pay $${amount}`
          )}
        </button>

        <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
        </div>

      </form>
    </motion.div>
  );
}