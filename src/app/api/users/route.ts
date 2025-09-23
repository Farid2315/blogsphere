import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Database functionality removed - using session-only auth',
    note: 'User data is stored in session, not database'
  })
}