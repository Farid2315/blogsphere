// src/app/api/posts/nearby/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { longitude, latitude, radius = 10000 } = await req.json();

    if (typeof longitude !== "number" || typeof latitude !== "number") {
      return NextResponse.json({ error: "Missing location" }, { status: 400 });
    }

    // Use raw MongoDB query for geospatial operations
    const nearbyPosts = await prisma.$runCommandRaw({
      aggregate: "Post",
      pipeline: [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            distanceField: "distance",
            maxDistance: radius,
            spherical: true,
          },
        },
      ],
      cursor: {},
    });

    return NextResponse.json({ nearbyPosts });
  } catch (err) {
    console.error("nearby error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
