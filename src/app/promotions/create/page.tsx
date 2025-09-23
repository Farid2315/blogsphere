// src/app/promotions/create/page.tsx
"use client";
import React, { useState } from "react";
import LocationButton from "@/components/LocationButton";
import BranchRow from "@/components/promotion/BranchRow";
import OfferRow from "@/components/promotion/OfferRow";
import ImageListInput from "@/components/promotion/ImageListInput";

type Branch = { name: string; address: string; latitude?: number; longitude?: number };
type Offer = { title: string; description: string; validTill?: string; link?: string };

export default function CreatePromotionPage() {
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("food");
  const [content, setContent] = useState("");
  const [locationName, setLocationName] = useState("");
  const [coords, setCoords] = useState<[number, number] | null>(null); // [lon, lat]

  const [branches, setBranches] = useState<Branch[]>([
    { name: "", address: "", latitude: undefined, longitude: undefined },
  ]);

  const [timings, setTimings] = useState({
    monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: ""
  });

  const [offers, setOffers] = useState<Offer[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [promotionLink, setPromotionLink] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [callNumber, setCallNumber] = useState("");

  // preview mode
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateBranch = (i: number, b: Branch) => setBranches((s) => s.map((x, idx) => (idx === i ? b : x)));
  const addBranch = () => setBranches((s) => [...s, { name: "", address: "", latitude: undefined, longitude: undefined }]);
  const removeBranch = (i: number) => setBranches((s) => s.filter((_, idx) => idx !== i));
  const addOffer = () => setOffers((s) => [...s, { title: "", description: "", validTill: undefined }]);
  const updateOffer = (i: number, o: Offer) => setOffers((s) => s.map((x, idx) => (idx === i ? o : x)));
  const removeOffer = (i: number) => setOffers((s) => s.filter((_, idx) => idx !== i));

  const onGotCoords = (c: [number, number]) => {
    setCoords(c);
    // set locationName automatically if blank
    if (!locationName) setLocationName(`${c[1].toFixed(4)}, ${c[0].toFixed(4)}`);
  };

  const buildPayload = () => ({
    title,
    content,
    domain,
    locationName,
    location: coords ? { longitude: coords[0], latitude: coords[1] } : null,
    branches: branches.filter(b => b.name || b.address),
    timings,
    offers: offers.filter(o => o.title),
    images,
    companyWebsite: companyWebsite || null,
    promotionLink: promotionLink || null,
    instagramHandle: instagramHandle || null,
    callNumber: callNumber || null,
  });

  const submit = async () => {
    setSubmitting(true);
    const payload = buildPayload();
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Create failed");
      alert("Created post!");
      console.log("created:", data.post);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert("Error: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Promotion</h1>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Basic Info</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="w-full p-2 border rounded mb-2" />
        <select value={domain} onChange={(e) => setDomain(e.target.value)} className="p-2 border rounded mb-2">
          <option value="food">Food</option>
          <option value="cloth">Cloth</option>
          <option value="trends">Trends</option>
          <option value="tours">Tours</option>
          <option value="random">Random</option>
        </select>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={4} className="w-full p-2 border rounded" />
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Location</h2>
        <div className="flex gap-2 mb-2">
          <input value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Location Name (e.g., MG Road, Bangalore)" className="flex-1 p-2 border rounded" />
          <LocationButton onGot={onGotCoords} />
        </div>
        <div className="flex gap-2 text-sm">
          <input value={coords?.[1] ?? ""} readOnly placeholder="Latitude" className="p-2 border rounded w-1/2" />
          <input value={coords?.[0] ?? ""} readOnly placeholder="Longitude" className="p-2 border rounded w-1/2" />
        </div>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Branches</h2>
        {branches.map((b, i) => (
          <BranchRow key={i} index={i} branch={b} onChange={updateBranch} onRemove={removeBranch} />
        ))}
        <div className="mt-2">
          <button onClick={addBranch} className="px-3 py-2 bg-blue-600 text-white rounded">Add Branch</button>
        </div>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Timings</h2>
        <div className="grid grid-cols-2 gap-2">
          {(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const).map(day => (
            <input key={day} value={timings[day]} onChange={(e)=>setTimings({...timings, [day]: e.target.value})} placeholder={`${day} (e.g., 09:00 - 22:00 or Closed)`} className="p-2 border rounded" />
          ))}
        </div>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Offers</h2>
        {offers.map((o, i) => <OfferRow key={i} index={i} offer={o} onChange={updateOffer} onRemove={removeOffer} />)}
        <div className="mt-2">
          <button onClick={addOffer} className="px-3 py-2 bg-blue-600 text-white rounded">Add Offer</button>
        </div>
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Media</h2>
        <ImageListInput value={images} onChange={setImages} />
      </section>

      <section className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Business Info</h2>
        <input value={companyWebsite} onChange={(e)=>setCompanyWebsite(e.target.value)} placeholder="Company Website" className="w-full p-2 border rounded mb-2"/>
        <input value={promotionLink} onChange={(e)=>setPromotionLink(e.target.value)} placeholder="Promotion Link" className="w-full p-2 border rounded mb-2"/>
        <input value={instagramHandle} onChange={(e)=>setInstagramHandle(e.target.value)} placeholder="Instagram Handle" className="w-full p-2 border rounded mb-2"/>
        <input value={callNumber} onChange={(e)=>setCallNumber(e.target.value)} placeholder="Call Number" className="w-full p-2 border rounded mb-2"/>
      </section>

      <div className="flex gap-2">
        <button onClick={()=>setPreview(p=>!p)} className="px-4 py-2 bg-gray-200 rounded">{preview ? "Hide Preview" : "Preview JSON"}</button>
        <button onClick={submit} disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded">
          {submitting ? "Submitting..." : "Create Promotion"}
        </button>
      </div>

      {preview && (
        <section className="mt-6 p-4 bg-slate-50 border rounded">
          <h3 className="font-semibold mb-2">Preview JSON</h3>
          <pre className="text-xs overflow-auto max-h-96 p-2 bg-white border rounded">
            {JSON.stringify(buildPayload(), null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
