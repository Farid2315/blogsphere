import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Try to create a test user
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json({ 
      message: 'Database connection successful!',
      user: {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name
      }
    })
    
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 