// src/pages/Shared/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg mb-4">Page not found</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
}