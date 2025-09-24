// src/components/promotion/BranchRow.tsx
"use client";
import React from "react";

type Props = {
  index: number;
  branch: { name: string; address: string; latitude?: number; longitude?: number };
  onChange: (i: number, b: any) => void;
  onRemove: (i: number) => void;
};

export default function BranchRow({ index, branch, onChange, onRemove }: Props) {
  return (
    <div className="border p-3 rounded mb-3">
      <div className="flex justify-between items-center mb-2">
        <strong>Branch #{index + 1}</strong>
        <button onClick={() => onRemove(index)} className="text-red-500">Remove</button>
      </div>

      <input
        value={branch.name}
        onChange={(e) => onChange(index, { ...branch, name: e.target.value })}
        placeholder="Branch name"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        value={branch.address}
        onChange={(e) => onChange(index, { ...branch, address: e.target.value })}
        placeholder="Address"
        className="w-full mb-2 p-2 border rounded"
      />
      <div className="flex gap-2">
        <input
          type="number"
          value={branch.latitude ?? ""}
          onChange={(e) =>
            onChange(index, { ...branch, latitude: parseFloat(e.target.value || "0") })
          }
          placeholder="Latitude (optional)"
          className="w-1/2 p-2 border rounded text-sm"
        />
        <input
          type="number"
          value={branch.longitude ?? ""}
          onChange={(e) =>
            onChange(index, { ...branch, longitude: parseFloat(e.target.value || "0") })
          }
          placeholder="Longitude (optional)"
          className="w-1/2 p-2 border rounded text-sm"
        />
      </div>
    </div>
  );
}
