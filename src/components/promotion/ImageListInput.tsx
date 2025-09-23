// src/components/promotion/ImageListInput.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageListInput({ value = [], onChange }: { value?: string[]; onChange: (v: string[]) => void }) {
  const [url, setUrl] = useState("");
  const add = () => {
    if (!url) return;
    onChange([...value, url]);
    setUrl("");
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL" className="flex-1 p-2 border rounded" />
        <button onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
      <ul>
        {value.map((u, i) => (
          <li key={i} className="mb-2 flex items-center gap-3">
            <Image src={u} alt={`img-${i}`} width={64} height={64} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">{u}</div>
            <button onClick={() => remove(i)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
