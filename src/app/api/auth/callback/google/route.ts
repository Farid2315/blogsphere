import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    // Handle OAuth error
    return NextResponse.redirect(new URL('/login?error=oauth_error', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    // Debug environment variables
    console.log('Environment variables:', {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    });

    // Exchange the authorization code for tokens
    const tokenBody = new URLSearchParams({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      grant_type: 'authorization_code',
    });

    console.log('Token exchange request:', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      code_length: code.length,
    });

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenBody,
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorText,
      });
      throw new Error(`Failed to exchange code for tokens: ${tokenResponse.status} ${errorText}`);
    }

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userInfo = await userInfoResponse.json();

    // For now, let's create a simple session without database storage
    // This will work immediately without MongoDB setup issues
    const mockUser = {
      id: Buffer.from(userInfo.email).toString('base64'),
      email: userInfo.email,
      name: userInfo.name,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    console.log('User authenticated:', mockUser.email);

    // Create a simple session token (in production, use proper JWT or session management)
    const sessionToken = Buffer.from(`${mockUser.id}:${Date.now()}`).toString('base64');
    
    // Set session cookie
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_error', request.url));
  }
} 