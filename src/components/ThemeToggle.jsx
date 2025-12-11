import React from 'react';
import useTheme from '../hooks/useTheme';

export default function ThemeToggle() {
  const { dark, setDark } = useTheme();
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}