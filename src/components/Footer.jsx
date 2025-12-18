import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <span className="bg-blue-600 text-white rounded-lg px-2 py-1">
              🎟️
            </span>
            <span>MERNickets</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed">
            MERNickets is a modern online ticket booking platform for bus, train,
            launch, and flight journeys — fast, secure, and reliable.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <SocialIcon href="#" label="Facebook">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" label="Twitter / X">
              <FaXTwitter />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <FaLinkedinIn />
            </SocialIcon>
            <SocialIcon href="#" label="GitHub">
              <FaGithub />
            </SocialIcon>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/tickets" className="hover:underline">All Tickets</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:underline">About Us</Link></li>
            <li><Link to="#" className="hover:underline">Careers</Link></li>
            <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="#" className="hover:underline">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact & Payments */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Contact & Payments
          </h4>

          <p className="text-sm">📧 mernickets@gmail.com</p>
          <p className="text-sm">📞 +44 213512 7157</p>

          <p className="text-sm mt-4 mb-2">
            Secure payments powered by
          </p>
          <img
            src="/payment-icons/stripe.svg"
            alt="Stripe"
            className="h-8"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 dark:bg-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">MERNickets</span> — Modern Online Ticket
        Booking Platform. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------- Social Icon Button ---------- */
function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-9 h-9 flex items-center justify-center rounded-full
        bg-blue-100 text-blue-600
        hover:bg-blue-600 hover:text-white
        dark:bg-blue-900/30 dark:text-blue-400
        dark:hover:bg-blue-600 dark:hover:text-white
        transition-all
      "
    >
      <span className="text-lg">{children}</span>
    </a>
  );
}