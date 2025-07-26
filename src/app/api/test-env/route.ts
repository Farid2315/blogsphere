import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  });
} 