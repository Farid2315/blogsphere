// src/components/LocationButton.tsx
"use client";
import React from "react";

type Props = { onGot: (coords: [number, number]) => void };

export default function LocationButton({ onGot }: Props) {
  const handle = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => onGot([pos.coords.longitude, pos.coords.latitude]),
      (err) => alert("Location denied or unavailable")
    );
  };

  return (
    <button onClick={handle} className="px-3 py-2 bg-blue-600 text-white rounded">
      Use my GPS
    </button>
  );
}
