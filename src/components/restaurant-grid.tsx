"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Star, MapPin } from "lucide-react"
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
  author: {
    id: string
    name?: string
    image?: string
  }
}

export function RestaurantGrid() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addressCache, setAddressCache] = useState<{ [key: string]: string }>({})
  const { latitude, longitude, getCurrentPosition } = useGeolocation()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true)
        
        // Build API URL with location parameters if available
        let apiUrl = '/api/restaurants'
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
          const restaurantsData = data.data.restaurants
          setRestaurants(restaurantsData)
          
          // Convert coordinate strings to addresses
          const newAddressCache: { [key: string]: string } = {}
          for (const restaurant of restaurantsData) {
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
          setError(data.error || 'Failed to fetch restaurants')
        }
      } catch (err) {
        setError('Failed to fetch restaurants')
        console.error('Error fetching restaurants:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [latitude, longitude])

  if (loading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse bg-card">
              <div className="h-40 sm:h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-3 sm:p-4">
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

  if (restaurants.length === 0) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No restaurants found</p>
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
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Find nearby restaurants</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow location access to see restaurants sorted by distance</p>
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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-300 bg-card shadow-md hover:shadow-xl hover:-translate-y-1">
              <div className="relative">
                <Image
                  src={restaurant.images[0] || "/placeholder.svg"}
                  alt={restaurant.title}
                  width={400}
                  height={192}
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-3 bg-black/60 hover:bg-black/80 text-white h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // Handle bookmark
                  }}
                >
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <CardContent className="p-2 sm:p-4">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-sm sm:text-base lg:text-lg truncate leading-tight">{restaurant.title}</h3>
                    <div className="flex items-center gap-2 mt-1 min-w-0">
                      {restaurant.distance !== undefined && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shrink-0">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          <span className="font-medium">{formatDistance(restaurant.distance)}</span>
                        </div>
                      )}
                      {addressCache[restaurant.id] && (
                        <div className="text-xs text-muted-foreground truncate flex-1 min-w-0 overflow-hidden whitespace-nowrap" title={addressCache[restaurant.id]}>
                          {addressCache[restaurant.id]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground ml-2 flex items-center gap-1 shrink-0">
                    {restaurant.rating && restaurant.rating > 0 && (
                      <>
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-foreground">{restaurant.rating.toFixed(1)}</span>
                      </>
                    )}
                    {restaurant.likesCount > 0 && (
                      <span className="text-xs font-medium">{restaurant.likesCount} likes</span>
                    )}
                  </div>
                </div>

                <div className="mb-2 sm:mb-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="text-xs sm:text-sm font-bold text-blue-800 dark:text-blue-300 mb-1 sm:mb-2">
                      {restaurant.offers.length > 0 ? "🎉 Special Offer" : "📝 About"}
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 line-clamp-1 leading-relaxed">
                      {restaurant.offers.length > 0 
                        ? restaurant.offers[0].description.length > 35 
                          ? restaurant.offers[0].description.substring(0, 35) + "..."
                          : restaurant.offers[0].description
                        : restaurant.content.length > 35 
                          ? restaurant.content.substring(0, 35) + "..."
                          : restaurant.content
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs py-1 sm:py-1.5 font-semibold rounded-md sm:rounded-lg border border-primary/20"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (restaurant.callNumber) {
                        window.open(`tel:${restaurant.callNumber}`, '_self')
                      }
                    }}
                  >
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs py-1 sm:py-1.5 font-semibold rounded-md sm:rounded-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Open Google Maps with the restaurant address
                      const address = restaurant.address || restaurant.locationName
                      if (address) {
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
                        window.open(mapsUrl, '_blank')
                      }
                    }}
                  >
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}