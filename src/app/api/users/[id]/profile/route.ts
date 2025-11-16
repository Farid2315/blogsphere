import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

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

      // If promotion hasn't started yet, show it as upcoming (include in current)
      if (start && now < start) return 'upcoming'
      // If no end date, consider it ongoing once started
      if (!end) return 'current'
      return now <= end ? 'current' : 'past'
    }

    const currentPromotions = allPromotions.filter(p => {
      const status = classifyPromotion(p)
      return status === 'current' || status === 'upcoming'
    })
    const pastPromotions = allPromotions.filter(p => classifyPromotion(p) === 'past')

    // Get total posts count
    const totalPosts = await prisma.post.count({
      where: {
        authorId: userId
      }
    })

    // Try to get profile from database, or create mock data
    let profile = await prisma.profile.findUnique({
      where: { userId: userId }
    })

    // If no profile exists, create mock profile data
    if (!profile) {
      profile = {
        id: `profile_${userId}`,
        userId: userId,
        bio: "Welcome to my profile! 🌟 Sharing amazing content and experiences.",
        followersCount: 0,
        followingCount: 0,
        postsCount: totalPosts,
        collabsCount: 0,
        instagramHandle: null,
        youtubeHandle: null,
        websiteUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } else {
      // Update posts count
      profile.postsCount = totalPosts
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
        profile: {
          bio: profile.bio || "Welcome to my profile! 🌟 Sharing amazing content and experiences.",
          followersCount: profile.followersCount,
          followingCount: profile.followingCount,
          postsCount: profile.postsCount,
          collabsCount: profile.collabsCount,
          instagramHandle: profile.instagramHandle,
          youtubeHandle: profile.youtubeHandle,
          websiteUrl: profile.websiteUrl
        },
        featuredPosts: currentPromotions.slice(0, 6),
        pastPromotions: pastPromotions.slice(0, 6),
        stats: {
          totalPosts,
          activePromotions: currentPromotions.length,
          pastPromotions: pastPromotions.length,
          featuredPosts: currentPromotions.length
        }
      }
    })

  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
