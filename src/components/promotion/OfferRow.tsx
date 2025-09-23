// src/components/promotion/OfferRow.tsx
"use client";
import React from "react";

type Offer = { title: string; description: string; validTill?: string; link?: string };
type Props = {
  index: number;
  offer: Offer;
  onChange: (i: number, o: Offer) => void;
  onRemove: (i: number) => void;
};

export default function OfferRow({ index, offer, onChange, onRemove }: Props) {
  return (
    <div className="border p-3 rounded mb-3">
      <div className="flex justify-between items-center mb-2">
        <strong>Offer #{index + 1}</strong>
        <button onClick={() => onRemove(index)} className="text-red-500">Remove</button>
      </div>

      <input
        value={offer.title}
        onChange={(e) => onChange(index, { ...offer, title: e.target.value })}
        placeholder="Offer title"
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        value={offer.description}
        onChange={(e) => onChange(index, { ...offer, description: e.target.value })}
        placeholder="Offer description"
        className="w-full mb-2 p-2 border rounded"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={offer.validTill ?? ""}
          onChange={(e) => onChange(index, { ...offer, validTill: e.target.value })}
          className="w-1/2 p-2 border rounded"
        />
        <input
          value={offer.link ?? ""}
          onChange={(e) => onChange(index, { ...offer, link: e.target.value })}
          placeholder="Offer link (optional)"
          className="w-1/2 p-2 border rounded"
        />
      </div>
    </div>
  );
}
