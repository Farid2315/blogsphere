import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    console.log('Testing database connection...')
    
    // Try to find any user
    const users = await prisma.user.findMany({
      take: 1,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })
    
    console.log('Found users:', users)
    
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
    
    console.log('Test user created/updated:', testUser)
    
    return NextResponse.json({ 
      message: 'Database connection successful!',
      usersFound: users.length,
      testUser: {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
        createdAt: testUser.createdAt
      }
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}