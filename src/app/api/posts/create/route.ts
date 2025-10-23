// src/app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

type Body = {
  authorId?: string;
  title: string;
  content: string;
  domain: string;
  address?: string; // New address field
  locationName: string;
  offerTag?: string; // New offer tag field
  location?: { longitude: number; latitude: number } | null;
  branches?: {
    name: string;
    address: string;
    latitude?: number;
    longitude?: number;
  }[];
  timings?: {
    monday?: string; tuesday?: string; wednesday?: string;
    thursday?: string; friday?: string; saturday?: string; sunday?: string;
  } | null;
  offers?: { title: string; description: string; validTill?: string; link?: string }[];
  images?: string[];
  companyWebsite?: string | null;
  promotionLink?: string | null;
  instagramHandle?: string | null;
  callNumber?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
};

export async function POST(req: Request) {
  try {
    // Get session from BetterAuth
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    // Extract user ID from session
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = (await req.json()) as Body;

    // Validate required fields
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.content?.trim()) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }
    if (!body.offerTag?.trim()) {
      return NextResponse.json({ error: "Offer tag is required" }, { status: 400 });
    }
    if (!body.locationName?.trim()) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }
    if (!body.address?.trim()) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }
    if (!body.domain) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    
    // Validate mandatory date/time fields
    if (!body.startDate) {
      return NextResponse.json({ error: "Start date is required" }, { status: 400 });
    }
    if (!body.endDate) {
      return NextResponse.json({ error: "End date is required" }, { status: 400 });
    }
    if (!body.startTime?.trim()) {
      return NextResponse.json({ error: "Start time is required" }, { status: 400 });
    }
    if (!body.endTime?.trim()) {
      return NextResponse.json({ error: "End time is required" }, { status: 400 });
    }
    
    // Validate mandatory coordinates
    if (!body.location || typeof body.location.latitude !== 'number' || typeof body.location.longitude !== 'number') {
      return NextResponse.json({ error: "Coordinates (latitude and longitude) are required" }, { status: 400 });
    }

    // transform location to GeoJSON
    const locationGeo = body.location
      ? { type: "Point", coordinates: [body.location.longitude, body.location.latitude] }
      : undefined;

    // build branches data
    const branches = (body.branches || []).map((b) => ({
      name: b.name,
      address: b.address,
      latitude: b.latitude ?? 0, // provide default value if missing
      longitude: b.longitude ?? 0, // provide default value if missing
    }));

    const post = await prisma.post.create({
      data: {
        authorId: userId, // Use the authenticated user's ID
        title: body.title,
        content: body.content ?? "",
        domain: body.domain,
        address: body.address, // Include address field - now required
        locationName: body.locationName,
        promotionOfferTag: body.offerTag, // Store offer tag in Post model
        isPromotion: !!body.offerTag || !!body.startDate || !!body.endDate,
        promotionStartDate: new Date(body.startDate), // Now required
        promotionEndDate: new Date(body.endDate), // Now required
        promotionStartTime: body.startTime, // Now required
        promotionEndTime: body.endTime, // Now required
        location: locationGeo as { type: string; coordinates: number[] }, // Now required
        likesCount: 0,
        sharesCount: 0,
        rating: 0,
        companyWebsite: body.companyWebsite,
        promotionLink: body.promotionLink,
        instagramHandle: body.instagramHandle,
        callNumber: body.callNumber,
        branches,
        timings: body.timings ?? undefined,
        offers: (body.offers || []).map(offer => ({
          title: offer.title,
          description: offer.description,
          validTill: offer.validTill ? new Date(offer.validTill) : undefined,
          link: offer.link,
        })),
        images: body.images ?? [],
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
