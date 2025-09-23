// src/app/api/posts/[id]/comment/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Body = { authorId?: string; rating: number; content: string };

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = (await req.json()) as Body;

    if (!body.rating || body.rating < 1 || body.rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // create comment
    const comment = await prisma.comment.create({
      data: {
        postId: id,
        authorId: body.authorId ?? "anonymous",
        rating: body.rating,
        content: body.content ?? "",
      },
    });

    // aggregate average rating
    const agg = await prisma.comment.aggregate({
      where: { postId: id },
      _avg: { rating: true },
    });

    const avg = agg._avg.rating ?? 0;

    await prisma.post.update({
      where: { id },
      data: { rating: avg },
    });

    return NextResponse.json({ comment, newAvgRating: avg });
  } catch (err) {
    console.error("comment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
