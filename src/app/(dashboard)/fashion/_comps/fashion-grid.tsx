"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Star } from "lucide-react"

interface Fashion {
  id: string
  title: string
  locationName: string
  images: string[]
  offers: Array<{
    title: string
    description: string
  }>
  rating: number
  author: {
    name: string
    image?: string
  }
  promotionOfferTag?: string
}

export function FashionGrid() {
  const [fashions, setFashions] = useState<Fashion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFashions = async () => {
      try {
        const response = await fetch('/api/fashion')
        const data = await response.json()
        
        if (data.success) {
          setFashions(data.data.fashions || [])
        } else {
          setError('Failed to fetch fashion data')
        }
      } catch (err) {
        setError('Error loading fashion data')
        console.error('Error fetching fashions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFashions()
  }, [])

  if (loading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 sm:h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-3 sm:p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {fashions.map((fashion) => (
          <Link key={fashion.id} href={`/fashion/${fashion.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 bg-card">
              <div className="relative">
                <Image
                  src={fashion.images?.[0] || "/placeholder.svg"}
                  alt={fashion.title}
                  width={400}
                  height={192}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                {fashion.promotionOfferTag && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {fashion.promotionOfferTag}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 sm:h-10 sm:w-10"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle bookmark
                  }}
                >
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{fashion.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{fashion.locationName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {fashion.rating || 0}
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1">
                    {fashion.offers?.[0]?.title || "Special Offer"}:
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {fashion.offers?.[0]?.description || "Check out our latest fashion collection!"}
                  </p>
                </div>

                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1 text-xs sm:text-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs sm:text-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    @{fashion.author?.name || 'user'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {fashions.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No fashion items found. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  )
}
