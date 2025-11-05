"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, Bookmark, Phone, Globe, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AddressDisplay } from "@/components/AddressDisplay"
import { convertCoordinateStringToAddress } from "@/utils/coordinate-converter"

interface GamingDetailProps {
  gamingId: string
}

interface Gaming {
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
  author?: {
    id: string
    name?: string
    image?: string
  }
  comments: Array<{
    id: string
    content: string
    rating?: number
    author: {
      name?: string
      image?: string
    }
    createdAt: string
  }>
}

export function GamingDetail({ gamingId }: GamingDetailProps) {
  const [gaming, setGaming] = useState<Gaming | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayAddress, setDisplayAddress] = useState<string>("")

  useEffect(() => {
    const fetchGaming = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/gaming/${gamingId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch gaming details')
        }
        
        const data = await response.json()
        if (data.success && data.data) {
          const gamingData = data.data
          setGaming(gamingData)
          
          // Convert coordinate string to address if needed
          if (gamingData.locationName) {
            try {
              const address = await convertCoordinateStringToAddress(gamingData.locationName)
              setDisplayAddress(address)
            } catch (error) {
              console.error('Error converting address:', error)
              setDisplayAddress(gamingData.locationName)
            }
          }
        } else {
          throw new Error(data.error || 'Failed to fetch gaming details')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (gamingId) {
      fetchGaming()
    }
  }, [gamingId])

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-80 bg-muted rounded-lg mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Card className="border-gray-200 bg-gray-50 dark:bg-gray-950/20">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">Error: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!gaming) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Gaming not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gaming Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{gaming.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{gaming.address || displayAddress || gaming.locationName}</span>
              {gaming.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{gaming.rating.toFixed(1)}</span>
                </div>
              )}
              <span>{gaming.likesCount} likes</span>
            </div>
          </div>

          {/* Gaming Image */}
          <div className="relative">
            <Image
              src={gaming.images?.[0] || "/placeholder.svg"}
              alt={gaming.title}
              width={800}
              height={320}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          {gaming.content && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground">{gaming.content}</p>
            </div>
          )}

          {/* Offers Section */}
          {gaming.offers && gaming.offers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Current Offers</h2>
              <div className="space-y-3">
                {gaming.offers.map((offer, index) => (
                  <Card key={index} className="border-l-4 border-l-secondary bg-card">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-1">{offer.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                      {offer.validTill && (
                        <p className="text-xs text-gray-600">Valid till: {new Date(offer.validTill).toLocaleDateString()}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* More Info */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">For more info</h3>
            {gaming.promotionLink && (
              <Button 
                variant="link" 
                className="text-secondary hover:text-primary p-0"
                onClick={() => window.open(gaming.promotionLink, '_blank')}
              >
                Visit the promotion 🔗
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {gaming.callNumber && (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={() => window.open(`tel:${gaming.callNumber}`, '_self')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Button>
            )}
            {(gaming.companyWebsite || gaming.promotionLink) && (
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary-foreground hover:bg-secondary/20 bg-transparent px-8 py-3"
                onClick={() => window.open(gaming.companyWebsite || gaming.promotionLink, '_blank')}
              >
                <Globe className="mr-2 h-5 w-5" />
                Visit Website
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="space-y-3">
            {gaming.instagramHandle && (
              <Button 
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
                onClick={() => gaming.instagramHandle && window.open(`https://instagram.com/${gaming.instagramHandle.replace('@', '')}`, '_blank')}
              >
                {gaming.instagramHandle}
              </Button>
            )}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              Like ({gaming.likesCount})
            </Button>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>

          {/* Address */}
          {gaming.branches && gaming.branches.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {gaming.branches.length === 1 ? 'Address' : 'Locations'}
              </h3>
              <div className="space-y-3">
                {gaming.branches.map((branch, index) => (
                  <Card key={index} className="border-l-4 border-l-gray-500 bg-card cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          const query = encodeURIComponent(branch.address);
                          const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
                          window.open(url, '_blank');
                        }}>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-foreground text-sm mb-1">{branch.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2 hover:text-foreground transition-colors">{branch.address}</p>
                      {branch.latitude && branch.longitude && (
                        <AddressDisplay 
                          latitude={branch.latitude} 
                          longitude={branch.longitude}
                          className="text-xs"
                          shortFormat={true}
                        />
                      )}
                      <p className="text-xs text-muted-foreground mt-2 opacity-70">Click to open in Google Maps</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Timings */}
          {gaming.timings && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Timings</h3>
              <div className="space-y-2">
                {Object.entries(gaming.timings).map(([day, time]) => (
                  time && (
                    <div key={day} className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground capitalize">{day}</span>
                      <span className="text-sm text-foreground">{time}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Recent Comments */}
          {gaming.comments && gaming.comments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {gaming.comments.slice(0, 3).map((comment) => (
                  <Card key={comment.id} className="bg-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {comment.author.image && (
                          <Image
                            src={comment.author.image}
                            alt={comment.author.name || 'User'}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-sm font-medium text-foreground">
                          {comment.author.name || 'Anonymous'}
                        </span>
                        {comment.rating && (
                          <div className="flex items-center gap-1 ml-auto">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{comment.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}