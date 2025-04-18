import React from 'react';
import { MapIcon } from '@heroicons/react/24/solid';

export default function EmergencyIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-full shadow-lg ring-4 ring-blue-300 hover:ring-indigo-400 hover:scale-105 transition-all duration-300 ease-in-out animate-pulse"
      title="Show Nearby Hospitals Map"
    >
      <MapIcon className="h-7 w-7" />
    </button>
  );
}
