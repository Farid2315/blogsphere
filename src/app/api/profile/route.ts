import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get current active promotions for featured section
    let featuredPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
        isPromotion: true,
        promotionEndDate: {
          gte: new Date() // Current active promotions
        }
      },
      select: {
        id: true,
        title: true,
        images: true,
        createdAt: true,
        promotionOfferTag: true,
        promotionEndDate: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6
    })

    // If no active promotions, get recent posts as fallback
    if (featuredPosts.length === 0) {
      featuredPosts = await prisma.post.findMany({
        where: {
          authorId: userId
        },
        select: {
          id: true,
          title: true,
          images: true,
          createdAt: true,
          promotionOfferTag: true,
          promotionEndDate: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 6
      })
    }

    // Get current active promotions (for stats)
    // Fetch all promotions for the user and classify on the server
    const allPromotions = await prisma.post.findMany({
      where: {
        authorId: userId,
        isPromotion: true,
      },
      select: {
        id: true,
        title: true,
        images: true,
        createdAt: true,
        promotionOfferTag: true,
        isPromotion: true,
        promotionStartDate: true,
        promotionEndDate: true,
        promotionStartTime: true,
        promotionEndTime: true,
        offers: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const now = new Date()

    const toStartDate = (date?: Date | null, time?: string | null) => {
      if (!date) return null
      const d = new Date(date)
      if (time && /^(\d{2}):(\d{2})$/.test(time)) {
        const [h, m] = time.split(':').map(Number)
        d.setHours(h, m, 0, 0)
      } else {
        d.setHours(0, 0, 0, 0)
      }
      return d
    }

    const toEndDate = (date?: Date | null, time?: string | null) => {
      if (!date) return null
      const d = new Date(date)
      if (time && /^(\d{2}):(\d{2})$/.test(time)) {
        const [h, m] = time.split(':').map(Number)
        d.setHours(h, m, 59, 999)
      } else {
        d.setHours(23, 59, 59, 999)
      }
      return d
    }

    const getEndFromOffers = (offers: { validTill?: Date | null }[] = []) => {
      const endDates = offers
        .map(o => o.validTill)
        .filter((d): d is Date => !!d)
      if (endDates.length === 0) return null
      const max = new Date(Math.max(...endDates.map(d => d.getTime())))
      return max
    }

    const classifyPromotion = (p: {
      isPromotion?: boolean
      promotionStartDate?: Date | null
      promotionEndDate?: Date | null
      promotionStartTime?: string | null
      promotionEndTime?: string | null
      offers?: { validTill?: Date | null }[]
    }) => {
      if (!p.isPromotion) return 'none'
      const start = toStartDate(p.promotionStartDate ?? null, p.promotionStartTime ?? null)
      const endDirect = toEndDate(p.promotionEndDate ?? null, p.promotionEndTime ?? null)
      const offersEndRaw = getEndFromOffers(p.offers ?? [])
      const offersEnd = offersEndRaw ? toEndDate(offersEndRaw, null) : null
      const end = endDirect || offersEnd

      // If promotion hasn't started yet, don't show it as current/past
      if (start && now < start) return 'none'
      // If no end date, consider it ongoing once started
      if (!end) return 'current'
      return now <= end ? 'current' : 'past'
    }

    const currentPromotions = allPromotions.filter(p => classifyPromotion(p) === 'current')
    const pastPromotions = allPromotions.filter(p => classifyPromotion(p) === 'past')

    // Active promotions count for stats
    const activePromotionsCount = currentPromotions.length

    // Get total posts count
    const totalPosts = await prisma.post.count({
      where: {
        authorId: userId
      }
    })

    // Create mock profile data (since Profile model isn't available yet)
    const profile = {
      id: `profile_${userId}`,
      userId: userId,
      bio: "Welcome to my profile! 🌟 Sharing amazing content and experiences.",
      followersCount: 148,
      followingCount: 42,
      postsCount: totalPosts,
      collabsCount: 4,
      instagramHandle: "user_instagram",
      youtubeHandle: "user_youtube",
      websiteUrl: "https://example.com"
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        },
        profile,
        // Align with UI naming: featuredPosts are current promotions
        featuredPosts: currentPromotions.slice(0, 6),
        pastPromotions: pastPromotions.slice(0, 6),
        stats: {
          totalPosts,
          activePromotions: activePromotionsCount,
          pastPromotions: pastPromotions.length,
          featuredPosts: currentPromotions.length
        }
      }
    })

  } catch (error) {
    console.error('Error fetching profile data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}