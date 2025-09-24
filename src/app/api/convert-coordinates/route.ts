import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { convertCoordinateStringToAddress, isCoordinateString } from '@/utils/coordinate-converter'

export async function POST(request: NextRequest) {
  try {
    // Get all posts with coordinate strings as locationName
    const posts = await prisma.post.findMany({
      where: {
        domain: 'food'
      },
      select: {
        id: true,
        locationName: true
      }
    })

    const updates = []
    let convertedCount = 0

    for (const post of posts) {
      if (isCoordinateString(post.locationName)) {
        try {
          const humanReadableAddress = await convertCoordinateStringToAddress(post.locationName)
          
          // Only update if we got a different result (actual address)
          if (humanReadableAddress !== post.locationName) {
            updates.push({
              id: post.id,
              oldLocationName: post.locationName,
              newLocationName: humanReadableAddress
            })

            await prisma.post.update({
              where: { id: post.id },
              data: { locationName: humanReadableAddress }
            })

            convertedCount++
          }
          
          // Add delay to avoid overwhelming the geocoding API
          await new Promise(resolve => setTimeout(resolve, 200))
        } catch (error) {
          console.error(`Error converting coordinates for post ${post.id}:`, error)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully converted ${convertedCount} coordinate strings to addresses`,
      updates
    })

  } catch (error) {
    console.error('Error converting coordinates:', error)
    return NextResponse.json(
      { error: 'Failed to convert coordinates' },
      { status: 500 }
    )
  }
}