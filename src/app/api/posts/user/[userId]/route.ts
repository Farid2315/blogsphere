import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Fetch user posts with promotion details
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform posts to include promotion status
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      images: post.images || [],
      domain: post.domain,
      promotionOfferTag: post.promotionOfferTag,
      promotionStartDate: post.promotionStartDate,
      promotionEndDate: post.promotionEndDate,
      isPromotion: !!post.promotionOfferTag,
      isActive: post.promotionEndDate ? new Date(post.promotionEndDate) > new Date() : false,
      createdAt: post.createdAt,
      author: post.author,
      stats: {
        likes: post._count.likes,
        comments: post._count.comments
      }
    }))

    return NextResponse.json({
      success: true,
      data: transformedPosts
    })

  } catch (error) {
    console.error('Error fetching user posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user posts' },
      { status: 500 }
    )
  }
}