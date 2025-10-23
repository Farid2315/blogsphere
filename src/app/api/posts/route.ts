import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get('domain')
    const authorId = searchParams.get('authorId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = parseInt(searchParams.get('radius') || '10000') // 10km default

    const skip = (page - 1) * limit

    // If authorId is provided, fetch posts by specific author
    if (authorId) {
      const posts = await prisma.post.findMany({
        where: {
          authorId: authorId
        },
        include: {
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
        skip,
        take: limit
      })

      const totalCount = await prisma.post.count({
        where: {
          authorId: authorId
        }
      })

      return NextResponse.json({
        posts,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      })
    }

    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 })
    }

    // If location is provided, use geospatial search
    if (lat && lng) {
      const latitude = parseFloat(lat)
      const longitude = parseFloat(lng)

      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
      }

      const earthRadius = 6371000 // Earth's radius in meters

      // Use MongoDB aggregation for geospatial search
      const posts = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: domain,
              location: { $exists: true }
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author"
            }
          },
          {
            $unwind: {
              path: "$author",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields: {
              distance: {
                $multiply: [
                  earthRadius,
                  {
                    $acos: {
                      $add: [
                        {
                          $multiply: [
                            { $sin: { $multiply: [{ $degreesToRadians: latitude }, 1] } },
                            { $sin: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } }
                          ]
                        },
                        {
                          $multiply: [
                            { $cos: { $multiply: [{ $degreesToRadians: latitude }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $subtract: [{ $arrayElemAt: ["$location.coordinates", 0] }, longitude] } }, 1] } }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            $match: {
              distance: { $lte: radius }
            }
          },
          {
            $sort: { distance: 1 }
          },
          {
            $project: {
              id: { $toString: "$_id" },
              title: 1,
              content: 1,
              locationName: 1,
              address: 1,
              images: 1,
              offers: 1,
              rating: 1,
              likesCount: 1,
              companyWebsite: 1,
              promotionLink: 1,
              instagramHandle: 1,
              callNumber: 1,
              branches: 1,
              timings: 1,
              createdAt: 1,
              distance: 1,
              promotionOfferTag: 1,
              author: {
                id: { $toString: "$author._id" },
                name: "$author.name",
                image: "$author.image"
              }
            }
          },
          { $skip: skip },
          { $limit: limit }
        ]
      })

      // Get total count for posts with location
      const totalCountResult = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: domain,
              location: { $exists: true }
            }
          },
          {
            $addFields: {
              distance: {
                $multiply: [
                  earthRadius,
                  {
                    $acos: {
                      $add: [
                        {
                          $multiply: [
                            { $sin: { $multiply: [{ $degreesToRadians: latitude }, 1] } },
                            { $sin: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } }
                          ]
                        },
                        {
                          $multiply: [
                            { $cos: { $multiply: [{ $degreesToRadians: latitude }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $subtract: [{ $arrayElemAt: ["$location.coordinates", 0] }, longitude] } }, 1] } }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            $match: {
              distance: { $lte: radius }
            }
          },
          {
            $count: "total"
          }
        ]
      })

      const totalCount = Array.isArray(totalCountResult) && totalCountResult.length > 0 
        ? (totalCountResult[0] as { total: number }).total 
        : 0

      return NextResponse.json({
        posts: Array.isArray(posts) ? posts : [],
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        }
      })
    }

    // Regular search without location
    const posts = await prisma.post.findMany({
      where: {
        domain: domain
      },
      include: {
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
      skip,
      take: limit
    })

    const totalCount = await prisma.post.count({
      where: {
        domain: domain
      }
    })

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}