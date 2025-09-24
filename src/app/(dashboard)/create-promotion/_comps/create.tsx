// src/app/promotions/create/page.tsx
"use client";
import React, { useState } from "react";
import LocationButton from "@/components/LocationButton";
import BranchRow from "@/components/promotion/BranchRow";
import OfferRow from "@/components/promotion/OfferRow";
import ImageListInput from "@/components/promotion/ImageListInput";
import { Upload, Calendar, Clock, Plus, Eye, EyeOff } from "lucide-react";

type Branch = { name: string; address: string; latitude?: number; longitude?: number };
type Offer = { title: string; description: string; validTill?: string; link?: string };

export function CreatePromotionPage() {
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("food");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState(""); // New address field
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState(""); // Separate latitude field
  const [longitude, setLongitude] = useState(""); // Separate longitude field
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

  // New fields for the improved UI
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    // Populate the separate latitude and longitude fields
    setLongitude(c[0].toString());
    setLatitude(c[1].toString());
    // Don't automatically set coordinates as locationName - let user enter a human-readable location
  };

  const buildPayload = () => ({
    title,
    content,
    domain,
    address, // Include address in payload
    locationName,
    location: (latitude && longitude) ? { 
      longitude: parseFloat(longitude), 
      latitude: parseFloat(latitude) 
    } : (coords ? { longitude: coords[0], latitude: coords[1] } : null),
    branches: branches.filter(b => b.name || b.address),
    timings,
    offers: offers.filter(o => o.title),
    images,
    companyWebsite: companyWebsite || null,
    promotionLink: promotionLink || null,
    instagramHandle: instagramHandle || null,
    callNumber: callNumber || null,
    startDate: startDate || null,
    endDate: endDate || null,
    startTime: startTime || null,
    endTime: endTime || null,
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Promotion</h1>
          <p className="text-muted-foreground">Fill in the details to create your promotion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Promotion Title */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Promotion Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a catchy title for your promotion"
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Description</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your promotion..."
                rows={4}
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors resize-none"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Category</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
              >
                <option value="food">Food</option>
                <option value="restaurant">Restaurant</option>
                <option value="fashion">Fashion</option>
                <option value="travel">Travel</option>
                <option value="gaming">Gaming</option>
                <option value="tech">Tech</option>
                <option value="music">Music</option>
                <option value="cloth">Cloth</option>
                <option value="trends">Trends</option>
                <option value="tours">Tours</option>
                <option value="others">Others</option>
                <option value="random">Random</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Location</label>
              <input
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Enter the location of the promotion"
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the full address (e.g., 123 Main St, Koramangala, Bangalore)"
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>

            {/* Latitude and Longitude */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-foreground font-medium text-lg">Coordinates</label>
                <LocationButton onGot={onGotCoords} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 12.9716"
                    className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., 77.5946"
                    className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                  />
                </div>
              </div>
              {(latitude && longitude) && (
                <div className="mt-2 p-3 bg-muted border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    📍 Coordinates: {latitude}, {longitude}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Date/Time and Link */}
          <div className="space-y-6">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-4 bg-card border border-border rounded-lg text-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-4 bg-card border border-border rounded-lg text-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Start Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 bg-card border border-border rounded-lg text-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">End Time</label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-4 bg-card border border-border rounded-lg text-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Link to Promotion Post */}
            <div className="space-y-2">
              <label className="text-foreground font-medium text-lg">Link to Promotion Post</label>
              <input
                value={promotionLink}
                onChange={(e) => setPromotionLink(e.target.value)}
                placeholder="Paste the link to your promotion post"
                className="w-full p-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Upload Images Section */}
        <div className="mt-8 space-y-4">
          <label className="text-foreground font-medium text-lg">Upload Images</label>
          <div className="border-2 border-dashed border-primary rounded-lg p-8 bg-card/50">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div>
                <p className="text-foreground text-lg">Drag and drop images here, or click to browse</p>
                <p className="text-muted-foreground text-sm mt-1">Support for multiple image formats</p>
              </div>
              <button className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors">
                Upload
              </button>
            </div>
          </div>
          <ImageListInput value={images} onChange={setImages} />
        </div>

        {/* Collapsible Sections */}
        <div className="mt-8 space-y-6">
          {/* Branches Section */}
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Branches</h3>
            <div className="space-y-4">
              {branches.map((b, i) => (
                <BranchRow key={i} index={i} branch={b} onChange={updateBranch} onRemove={removeBranch} />
              ))}
              <button
                onClick={addBranch}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Branch
              </button>
            </div>
          </div>

          {/* Timings Section */}
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Business Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const).map(day => (
                <div key={day} className="space-y-1">
                  <label className="text-muted-foreground text-sm capitalize">{day}</label>
                  <input
                    value={timings[day]}
                    onChange={(e) => setTimings({ ...timings, [day]: e.target.value })}
                    placeholder="09:00 - 22:00 or Closed"
                    className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Offers Section */}
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Special Offers</h3>
            <div className="space-y-4">
              {offers.map((o, i) => (
                <OfferRow key={i} index={i} offer={o} onChange={updateOffer} onRemove={removeOffer} />
              ))}
              <button
                onClick={addOffer}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Offer
              </button>
            </div>
          </div>

          {/* Business Info Section */}
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-muted-foreground text-sm">Company Website</label>
                <input
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-muted-foreground text-sm">Instagram Handle</label>
                <input
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="@yourbusiness"
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-muted-foreground text-sm">Contact Number</label>
                <input
                  value={callNumber}
                  onChange={(e) => setCallNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => setPreview(p => !p)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? "Hide Preview" : "Preview JSON"}
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-colors font-medium"
          >
            {submitting ? "Creating..." : "Create Promotion"}
          </button>
        </div>

        {/* Preview Section */}
        {preview && (
          <div className="mt-8 bg-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Preview JSON</h3>
            <pre className="text-sm overflow-auto max-h-96 p-4 bg-muted border border-border rounded-lg text-muted-foreground">
              {JSON.stringify(buildPayload(), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
