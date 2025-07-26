import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Decode the session token
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [userId] = decoded.split(':');

    // For now, return a mock user based on the session token
    // In production, you would look up the user in the database
    const mockUser = {
      id: userId,
      email: Buffer.from(userId, 'base64').toString('utf-8'),
      name: "Google User",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ user: mockUser });

  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
} 