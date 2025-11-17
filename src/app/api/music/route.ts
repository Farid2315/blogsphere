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
      // Filter musics by approximate distance using bounding box
      // Calculate bounding box deltas (currently unused but kept for potential future optimization)
      // const earthRadius = 6371000 // Earth's radius in meters
      // const latDelta = radius / earthRadius * (180 / Math.PI)
      // const lngDelta = (radius / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180)

      // Bounding box coordinates (currently unused but kept for potential future optimization)
      // const minLat = lat - latDelta
      // const maxLat = lat + latDelta
      // const minLng = lng - lngDelta
      // const maxLng = lng + lngDelta

      // Use aggregation to get all musics and calculate distance
      const nearbyMusics = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: { $in: ["music", "style"] }
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
              // Optimized distance calculation: compute once and choose minimum
              distance: {
                $let: {
                  vars: {
                    // Location coordinates
                    locLat: { $convert: { input: { $arrayElemAt: ["$location.coordinates", 1] }, to: "double", onError: null, onNull: null } },
                    locLng: { $convert: { input: { $arrayElemAt: ["$location.coordinates", 0] }, to: "double", onError: null, onNull: null } },
                    // First valid branch coordinates (if any)
                    firstBranch: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$branches",
                            as: "b",
                            cond: {
                              $and: [
                                { $ne: ["$$b.latitude", null] },
                                { $ne: ["$$b.longitude", null] }
                              ]
                            }
                          }
                        },
                        0
                      ]
                    }
                  },
                  in: {
                    $let: {
                      vars: {
                        // Location distance
                        locDist: {
                          $cond: [
                            { $and: [ { $ne: ["$$locLat", null] }, { $ne: ["$$locLng", null] } ] },
                            {
                              $multiply: [
                                6371000,
                                {
                                  $multiply: [
                                    2,
                                    {
                                      $asin: {
                                        $sqrt: {
                                          $add: [
                                            { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$locLat" }, { $degreesToRadians: lat } ] }, 2 ] } }, 2 ] },
                                            { $multiply: [ { $cos: { $degreesToRadians: lat } }, { $cos: { $degreesToRadians: "$$locLat" } }, { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$locLng" }, { $degreesToRadians: lng } ] }, 2 ] } }, 2 ] } ] }
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                }
                              ]
                            },
                            null
                          ]
                        },
                        // Branch distance (first valid branch only for performance)
                        branchDist: {
                          $cond: [
                            { $ne: ["$$firstBranch", null] },
                            {
                              $let: {
                                vars: {
                                  bLat: { $convert: { input: "$$firstBranch.latitude", to: "double", onError: null, onNull: null } },
                                  bLng: { $convert: { input: "$$firstBranch.longitude", to: "double", onError: null, onNull: null } }
                                },
                                in: {
                                  $cond: [
                                    { $and: [ { $ne: ["$$bLat", null] }, { $ne: ["$$bLng", null] } ] },
                                    {
                                      $multiply: [
                                        6371000,
                                        {
                                          $multiply: [
                                            2,
                                            {
                                              $asin: {
                                                $sqrt: {
                                                  $add: [
                                                    { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$bLat" }, { $degreesToRadians: lat } ] }, 2 ] } }, 2 ] },
                                                    { $multiply: [ { $cos: { $degreesToRadians: lat } }, { $cos: { $degreesToRadians: "$$bLat" } }, { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$bLng" }, { $degreesToRadians: lng } ] }, 2 ] } }, 2 ] } ] }
                                                  ]
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    null
                                  ]
                                }
                              }
                            },
                            null
                          ]
                        }
                      },
                      in: {
                        // Return minimum of branch and location distance, or whichever is available
                        $cond: [
                          { $and: [ { $ne: ["$$branchDist", null] }, { $ne: ["$$locDist", null] } ] },
                          { $min: [ "$$branchDist", "$$locDist" ] },
                          { $ifNull: [ "$$branchDist", "$$locDist" ] }
                        ]
                      }
                    }
                  }
                }
              }
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

      // Get total count for all musics
      const totalCountResult = await prisma.post.aggregateRaw({
        pipeline: [
          {
            $match: {
              domain: { $in: ["music", "style"] }
            }
          },
          {
            $addFields: {
              // Simplified distance calculation for count (main location only)
              distance: {
                $let: {
                  vars: {
                    locLat: { $convert: { input: { $arrayElemAt: ["$location.coordinates", 1] }, to: "double", onError: null, onNull: null } },
                    locLng: { $convert: { input: { $arrayElemAt: ["$location.coordinates", 0] }, to: "double", onError: null, onNull: null } }
                  },
                  in: {
                    $cond: [
                      { $and: [ { $ne: ["$$locLat", null] }, { $ne: ["$$locLng", null] } ] },
                      {
                        $multiply: [
                          6371000,
                          {
                            $multiply: [
                              2,
                              {
                                $asin: {
                                  $sqrt: {
                                    $add: [
                                      { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$locLat" }, { $degreesToRadians: lat } ] }, 2 ] } }, 2 ] },
                                      { $multiply: [ { $cos: { $degreesToRadians: lat } }, { $cos: { $degreesToRadians: "$$locLat" } }, { $pow: [ { $sin: { $divide: [ { $subtract: [ { $degreesToRadians: "$$locLng" }, { $degreesToRadians: lng } ] }, 2 ] } }, 2 ] } ] }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        ]
                      },
                      null
                    ]
                  }
                }
              }
            }
          },
          { $count: "total" }
        ]
      })

      const totalCount = Array.isArray(totalCountResult) && totalCountResult.length > 0 
        ? (totalCountResult[0] as { total: number }).total 
        : 0
      const totalPages = Math.ceil(totalCount / limit)

      return NextResponse.json({
        success: true,
        data: {
          musics: nearbyMusics,
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
    const where: {
      domain: {
        in: string[]
      }
      locationName?: {
        contains: string
        mode: 'insensitive'
      }
    } = {
      domain: {
        in: ['music', 'style']
      }
    }

    // Add location filter if provided
    if (location) {
      where.locationName = {
        contains: location,
        mode: 'insensitive'
      }
    }

    // Fetch musics with pagination
    const musics = await prisma.post.findMany({
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
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        promotionOfferTag: true, // Include promotion offer tag from Post model
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
        musics,
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
    console.error('Error fetching musics:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch musics' 
      },
      { status: 500 }
    )
  }
}