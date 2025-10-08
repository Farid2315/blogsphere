"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, Bookmark, Phone, Globe, Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AddressDisplay } from "@/components/AddressDisplay"
import { convertCoordinateStringToAddress } from "@/utils/coordinate-converter"

interface FashionDetailProps {
  fashionId: string
}

interface Fashion {
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

export function FashionDetail({ fashionId }: FashionDetailProps) {
  const [fashion, setFashion] = useState<Fashion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayAddress, setDisplayAddress] = useState<string>("")

  useEffect(() => {
    const fetchFashion = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/fashion/${fashionId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch fashion details')
        }
        
        const data = await response.json()
        if (data.success && data.data) {
          const fashionData = data.data
          setFashion(fashionData)
          
          // Convert coordinate string to address if needed
          if (fashionData.locationName) {
            try {
              const address = await convertCoordinateStringToAddress(fashionData.locationName)
              setDisplayAddress(address)
            } catch (error) {
              console.error('Error converting address:', error)
              setDisplayAddress(fashionData.locationName)
            }
          }
        } else {
          throw new Error(data.error || 'Failed to fetch fashion details')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (fashionId) {
      fetchFashion()
    }
  }, [fashionId])

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

  if (!fashion) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Fashion not found</p>
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
          {/* Fashion Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{fashion.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{fashion.address || displayAddress || fashion.locationName}</span>
              {fashion.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{fashion.rating.toFixed(1)}</span>
                </div>
              )}
              <span>{fashion.likesCount} likes</span>
            </div>
          </div>

          {/* Fashion Image */}
          <div className="relative">
            <Image
              src={fashion.images?.[0] || "/placeholder.svg"}
              alt={fashion.title}
              width={800}
              height={320}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Description */}
          {fashion.content && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground">{fashion.content}</p>
            </div>
          )}

          {/* Offers Section */}
          {fashion.offers && fashion.offers.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Current Offers</h2>
              <div className="space-y-3">
                {fashion.offers.map((offer, index) => (
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
            {fashion.promotionLink && (
              <Button 
                variant="link" 
                className="text-secondary hover:text-primary p-0"
                onClick={() => window.open(fashion.promotionLink, '_blank')}
              >
                Visit the promotion 🔗
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {fashion.callNumber && (
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={() => window.open(`tel:${fashion.callNumber}`, '_self')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call
              </Button>
            )}
            {(fashion.companyWebsite || fashion.promotionLink) && (
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary-foreground hover:bg-secondary/20 bg-transparent px-8 py-3"
                onClick={() => window.open(fashion.companyWebsite || fashion.promotionLink, '_blank')}
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
            {fashion.instagramHandle && (
              <Button 
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
                onClick={() => fashion.instagramHandle && window.open(`https://instagram.com/${fashion.instagramHandle.replace('@', '')}`, '_blank')}
              >
                {fashion.instagramHandle}
              </Button>
            )}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              Like ({fashion.likesCount})
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
          {fashion.branches && fashion.branches.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {fashion.branches.length === 1 ? 'Address' : 'Locations'}
              </h3>
              <div className="space-y-3">
                {fashion.branches.map((branch, index) => (
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
          {fashion.timings && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Timings</h3>
              <div className="space-y-2">
                {Object.entries(fashion.timings).map(([day, time]) => (
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
          {fashion.comments && fashion.comments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {fashion.comments.slice(0, 3).map((comment) => (
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