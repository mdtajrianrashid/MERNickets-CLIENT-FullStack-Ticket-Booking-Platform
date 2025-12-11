// src/components/Loading.jsx
import React from 'react';

export default function Loading({ size = 40, text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg
        style={{ width: size, height: size }}
        className="animate-spin"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25" cy="25" r="20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          fill="none"
        />
      </svg>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">{text}</div>
    </div>
  );
}