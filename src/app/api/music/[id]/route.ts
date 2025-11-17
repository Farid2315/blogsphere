import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Fetching music with ID:', id)
    
    // First check if the music exists
    const musicExists = await prisma.post.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        authorId: true
      }
    })
    
    console.log('Music exists check:', musicExists)
    
    if (!musicExists) {
      console.log('Music not found with ID:', id)
      return NextResponse.json(
        { 
          success: false,
          error: 'Music not found' 
        },
        { status: 404 }
      )
    }
    
    const music = await prisma.post.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        content: true,
        domain: true,
        locationName: true,
        location: true,
        likesCount: true,
        sharesCount: true,
        rating: true,
        companyWebsite: true,
        promotionLink: true,
        instagramHandle: true,
        callNumber: true,
        branches: true,
        timings: true,
        offers: true,
        images: true,
        createdAt: true,
        updatedAt: true,
        authorId: true, // Include authorId to check if author exists
        comments: {
          select: {
            id: true,
            content: true,
            rating: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        }
      }
    })

    if (!music) {
      return NextResponse.json(
        { 
          success: false,
          error: 'music not found' 
        },
        { status: 404 }
      )
    }

    // Handle the case where authorId is "anonymous" or author doesn't exist
    let authorData = null
    if (music.authorId && music.authorId !== 'anonymous') {
      try {
        const author = await prisma.user.findUnique({
          where: { id: music.authorId },
          select: {
            id: true,
            name: true,
            image: true
          }
        })
        authorData = author
      } catch {
        console.log('Author not found for ID:', music.authorId)
      }
    }

    // Return music data with proper author handling
    const responseData = {
      ...music,
      author: authorData
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('Error fetching music:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch music' 
      },
      { status: 500 }
    )
  }
}