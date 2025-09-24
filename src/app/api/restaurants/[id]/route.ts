import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Fetching restaurant with ID:', id)
    
    // First check if the restaurant exists
    const restaurantExists = await prisma.post.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        authorId: true
      }
    })
    
    console.log('Restaurant exists check:', restaurantExists)
    
    if (!restaurantExists) {
      console.log('Restaurant not found with ID:', id)
      return NextResponse.json(
        { 
          success: false,
          error: 'Restaurant not found' 
        },
        { status: 404 }
      )
    }
    
    const restaurant = await prisma.post.findUnique({
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

    if (!restaurant) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Restaurant not found' 
        },
        { status: 404 }
      )
    }

    // Handle the case where authorId is "anonymous" or author doesn't exist
    let authorData = null
    if (restaurant.authorId && restaurant.authorId !== 'anonymous') {
      try {
        const author = await prisma.user.findUnique({
          where: { id: restaurant.authorId },
          select: {
            id: true,
            name: true,
            image: true
          }
        })
        authorData = author
      } catch (error) {
        console.log('Author not found for ID:', restaurant.authorId)
      }
    }

    // Return restaurant data with proper author handling
    const responseData = {
      ...restaurant,
      author: authorData
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('Error fetching restaurant:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch restaurant' 
      },
      { status: 500 }
    )
  }
}