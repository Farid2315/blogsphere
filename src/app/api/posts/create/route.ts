// src/app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Body = {
  authorId?: string;
  title: string;
  content: string;
  domain: string;
  locationName: string;
  location?: { longitude: number; latitude: number } | null;
  branches?: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
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
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // basic validation
    if (!body.title || !body.domain || !body.locationName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // transform location to GeoJSON
    const locationGeo = body.location
      ? { type: "Point", coordinates: [body.location.longitude, body.location.latitude] }
      : undefined;

    // build branches data
    const branches = (body.branches || []).map((b) => ({
      name: b.name,
      address: b.address,
      latitude: b.latitude,
      longitude: b.longitude,
    }));

    const post = await prisma.post.create({
      data: {
        authorId: body.authorId ?? "anonymous",
        title: body.title,
        content: body.content ?? "",
        domain: body.domain,
        locationName: body.locationName,
        location: locationGeo as { type: string; coordinates: number[] }, // prisma composite type -> MongoDB doc
        likesCount: 0,
        sharesCount: 0,
        rating: 0,
        companyWebsite: body.companyWebsite,
        promotionLink: body.promotionLink,
        instagramHandle: body.instagramHandle,
        callNumber: body.callNumber,
        branches,
        timings: body.timings ?? undefined,
        offers: body.offers ?? undefined,
        images: body.images ?? [],
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
