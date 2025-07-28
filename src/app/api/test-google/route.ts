import { NextResponse } from "next/server";

export async function GET() {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent('http://localhost:3001/api/auth/callback/google')}` +
    `&response_type=code` +
    `&scope=openid email profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.json({
    googleAuthUrl,
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: 'http://localhost:3001/api/auth/callback/google',
  });
} 