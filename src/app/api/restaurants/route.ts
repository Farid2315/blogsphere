import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const location = searchParams.get('location')
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const radius = parseInt(searchParams.get('radius') || '10000') // Default 10km radius
    
    const skip = (page - 1) * limit

    // If coordinates are provided, use geospatial search
    if (latitude && longitude) {
      const lat = parseFloat(latitude)
      const lng = parseFloat(longitude)

      if (isNaN(lat) || isNaN(lng)) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid latitude or longitude' 
          },
          { status: 400 }
        )
      }

      // Since we can't create 2dsphere index, use a simpler approach
      // Filter restaurants by approximate distance using bounding box
      const earthRadius = 6371000 // Earth's radius in meters
      const latDelta = (radius / earthRadius) * (180 / Math.PI)
      const lngDelta = (radius / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180)

      const minLat = lat - latDelta
      const maxLat = lat + latDelta
      const minLng = lng - lngDelta
      const maxLng = lng + lngDelta

      // Use aggregation to filter by location bounds
      const nearbyRestaurants = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: "food",
              location: { $exists: true },
              "location.coordinates.1": { $gte: minLat, $lte: maxLat },
              "location.coordinates.0": { $gte: minLng, $lte: maxLng }
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
              // Calculate approximate distance using Haversine formula
              distance: {
                $multiply: [
                  earthRadius,
                  {
                    $acos: {
                      $add: [
                        {
                          $multiply: [
                            { $sin: { $multiply: [{ $degreesToRadians: lat }, 1] } },
                            { $sin: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } }
                          ]
                        },
                        {
                          $multiply: [
                            { $cos: { $multiply: [{ $degreesToRadians: lat }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $subtract: [lng, { $arrayElemAt: ["$location.coordinates", 0] }] } }, 1] } }
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

      // Get total count for nearby restaurants
      const totalCountResult = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: "food",
              location: { $exists: true },
              "location.coordinates.1": { $gte: minLat, $lte: maxLat },
              "location.coordinates.0": { $gte: minLng, $lte: maxLng }
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
                            { $sin: { $multiply: [{ $degreesToRadians: lat }, 1] } },
                            { $sin: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } }
                          ]
                        },
                        {
                          $multiply: [
                            { $cos: { $multiply: [{ $degreesToRadians: lat }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $arrayElemAt: ["$location.coordinates", 1] } }, 1] } },
                            { $cos: { $multiply: [{ $degreesToRadians: { $subtract: [lng, { $arrayElemAt: ["$location.coordinates", 0] }] } }, 1] } }
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
          { $count: "total" }
        ]
      })

      const totalCount = Array.isArray(totalCountResult) && totalCountResult.length > 0 
        ? (totalCountResult[0] as any).total 
        : 0
      const totalPages = Math.ceil(totalCount / limit)

      return NextResponse.json({
        success: true,
        data: {
          restaurants: nearbyRestaurants,
          pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          },
          searchType: 'nearby',
          searchRadius: radius
        }
      })
    }

    // Fallback to regular search if no coordinates provided
    // Build query filters
    const where: any = {
      domain: 'food'
    }

    // Add location filter if provided
    if (location) {
      where.locationName = {
        contains: location,
        mode: 'insensitive'
      }
    }

    // Fetch restaurants with pagination
    const restaurants = await prisma.post.findMany({
      where: {
        ...where,
        // Remove author filter to handle posts without authors
      },
      select: {
        id: true,
        title: true,
        content: true,
        locationName: true,
        images: true,
        offers: true,
        rating: true,
        likesCount: true,
        companyWebsite: true,
        promotionLink: true,
        instagramHandle: true,
        callNumber: true,
        branches: true,
        timings: true,
        createdAt: true,
        authorId: true, // Include authorId to check if author exists
        // Remove author relation to avoid null author error in Atlas DB
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Get total count for pagination
    const totalCount = await prisma.post.count({
      where: {
        ...where,
        // Remove author filter to handle posts without authors
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: {
        restaurants,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        searchType: 'standard'
      }
    })

  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch restaurants' 
      },
      { status: 500 }
    )
  }
}