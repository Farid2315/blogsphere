"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, MapPin, Tag } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { convertCoordinateStringToAddress } from "@/utils/coordinate-converter"
import { useGeolocation } from "@/hooks/use-geolocation"
import { formatDistance } from "@/utils/distance"

interface Restaurant {
  id: string
  title: string
  content: string
  locationName: string
  address?: string
  images: string[]
  offers: Array<{
    title: string
    description: string
    validTill?: string
    link?: string
  }>
  rating?: number
  likesCount: number
  companyWebsite?: string
  promotionLink?: string
  instagramHandle?: string
  callNumber?: string
  branches: Array<{
    name: string
    address: string
    latitude: number
    longitude: number
  }>
  timings?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  createdAt: string
  distance?: number
  promotionOfferTag?: string // Move to Post level
  author?: {
    id: string
    name?: string
    image?: string
  }
}

export function RestaurantGrid() {
  const [fashion, setfashion] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addressCache, setAddressCache] = useState<{ [key: string]: string }>({})
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [showOfferOverlay, setShowOfferOverlay] = useState<string | null>(null)
  const { latitude, longitude, getCurrentPosition } = useGeolocation()

  // Handle like functionality
  const handleLike = (restaurantId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setLikedPosts(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(restaurantId)) {
        newLiked.delete(restaurantId)
      } else {
        newLiked.add(restaurantId)
      }
      return newLiked
    })
  }

  // Handle double click on image
  const handleDoubleClick = (restaurantId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleLike(restaurantId)
  }

  // Handle offer overlay toggle
  const toggleOfferOverlay = (restaurantId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowOfferOverlay(prev => prev === restaurantId ? null : restaurantId)
  }

  useEffect(() => {
    const fetchfashion = async () => {
      try {
        setLoading(true)
        
        // Build API URL with location parameters if available
        let apiUrl = '/api/fashion'
        const params = new URLSearchParams()
        
        if (latitude && longitude) {
          params.append('latitude', latitude.toString())
          params.append('longitude', longitude.toString())
          params.append('radius', '100000') // 100km radius in meters
        }
        
        if (params.toString()) {
          apiUrl += `?${params.toString()}`
        }
        
        const response = await fetch(apiUrl)
        const data = await response.json()
        
        if (data.success) {
          const fashionData = data.data.fashion
          setfashion(fashionData)
          
          // Convert coordinate strings to addresses
          const newAddressCache: { [key: string]: string } = {}
          for (const restaurant of fashionData) {
            if (restaurant.locationName) {
              try {
                const address = await convertCoordinateStringToAddress(restaurant.locationName)
                newAddressCache[restaurant.id] = address
              } catch (error) {
                console.error('Error converting address for restaurant:', restaurant.id, error)
                newAddressCache[restaurant.id] = restaurant.locationName
              }
            }
          }
          setAddressCache(newAddressCache)
        } else {
          setError(data.error || 'Failed to fetch fashion')
        }
      } catch (err) {
        setError('Failed to fetch fashion')
        console.error('Error fetching fashion:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchfashion()
  }, [latitude, longitude])

  if (loading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse bg-card">
              <div className="h-32 sm:h-36 bg-muted rounded-t-lg"></div>
              <CardContent className="p-0 sm:p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (fashion.length === 0) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No fashion found</p>
          <p className="text-sm text-muted-foreground">
            Be the first to add a restaurant promotion!
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {!latitude && !longitude && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Find nearby fashion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow location access to see fashion sorted by distance</p>
            </div>
            <Button 
              onClick={getCurrentPosition}
              variant="outline"
              size="sm"
              className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Enable Location
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {fashion.map((restaurant) => (
          <Link key={restaurant.id} href={`/fashion/${restaurant.id}`}>
            <Card className="group cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-300 bg-card shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] hover:-translate-y-1 rounded-xl h-fit transform-gpu">
            {/* User Profile Header - Further reduced padding */}
            <div className="flex items-center gap-2 p-1 pb-0 pl-5">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 ">
                {restaurant.author?.image ? (
                  <Image
                    src={restaurant.author.image}
                    alt={restaurant.author?.name || "User"}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                    {(restaurant.author?.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                  @{restaurant.author?.name || "FashionFindsbySarah"}
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 pr-5">
                {restaurant.distance !== undefined && (
                  <>
                    <MapPin className="h-3 w-3" />
                    <span>{formatDistance(restaurant.distance)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Restaurant Image with Offer Overlay - Reduced height */}
            <div className="relative overflow-hidden">
              <Image
                src={restaurant.images[0] || "/placeholder.svg"}
                alt={restaurant.title}
                width={400}
                height={180}
                className="w-full h-32 sm:h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                onDoubleClick={(e) => handleDoubleClick(restaurant.id, e)}
              />
              
              {/* Offer Badge */}
              {(restaurant.offers.length > 0 || restaurant.promotionOfferTag) && (
                <div className="absolute top-2 left-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleOfferOverlay(restaurant.id, e)
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg transition-all duration-200"
                  >
                    <Tag className="h-3 w-3" />
                    {restaurant.promotionOfferTag || "GREAT OFFERS"}
                  </button>
                  
                  {/* Offer Overlay */}
                  {showOfferOverlay === restaurant.id && (
                    <div className="absolute top-full left-0 mt-2 bg-black/90 text-white p-3 rounded-lg shadow-xl z-10 min-w-[200px]">
                      {restaurant.offers.length > 0 ? (
                        <>
                          <p className="text-sm font-semibold mb-1">{restaurant.offers[0].title}</p>
                          <p className="text-xs text-gray-300">{restaurant.offers[0].description}</p>
                          {restaurant.offers[0].validTill && (
                            <p className="text-xs text-orange-300 mt-1">Valid till: {restaurant.offers[0].validTill}</p>
                          )}
                        </>
                      ) : (
                        <p className="text-sm font-semibold">{restaurant.promotionOfferTag}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content Section - Reduced padding */}
            <div className="p-2">
              {/* Title - Increased size */}
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {restaurant.title}
              </h3>
              
              {/* Location - Reduced margin */}
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {addressCache[restaurant.id] || restaurant.locationName}
                </span>
              </div>

              {/* Special Offer Text - Dynamic from database */}
              {restaurant.offers.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1">
                    <span>💡</span>
                    Special Offer: {restaurant.offers[0].title}
                  </p>
                </div>
              )}

              {/* Social Interaction Buttons - Reduced spacing */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleLike(restaurant.id, e)
                    }}
                    className="flex items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`h-4 w-4 ${likedPosts.has(restaurant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {likedPosts.has(restaurant.id) ? restaurant.likesCount + 1 : restaurant.likesCount}
                    </span>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="flex items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <MessageCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">156</span>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="flex items-center gap-1 hover:scale-110 transition-transform"
                  >
                    <Share className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Share</span>
                  </button>
                </div>
              </div>

              {/* View Details Button - Adjusted padding */}
              <div className="mt-2.5 mb-1">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 text-xs rounded-lg mt-2 transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-md">
                  View Offer Details & Directions
                </Button>
              </div>
            </div>
          </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}