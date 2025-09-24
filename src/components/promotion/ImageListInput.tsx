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
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL" className="flex-1 p-2 border-border bg-background text-foreground placeholder-muted-foreground rounded focus:border-primary focus:ring-primary" />
        <button onClick={add} className="px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded">Add</button>
      </div>
      <ul>
        {value.map((u, i) => (
          <li key={i} className="mb-2 flex items-center gap-3">
            <img src={u} alt={`img-${i}`} className="w-16 h-16 object-cover rounded border border-border" />
            <div className="flex-1 text-foreground">{u}</div>
            <button onClick={() => remove(i)} className="text-destructive hover:text-destructive/80 transition-colors">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
