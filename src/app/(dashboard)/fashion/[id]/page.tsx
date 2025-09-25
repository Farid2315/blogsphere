"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { AppLayout } from "../../../../components/layout/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Globe, Instagram, Heart, Share2, Bookmark } from "lucide-react"

interface FashionDetail {
  id: string
  title: string
  content: string
  locationName: string
  images: string[]
  offers: Array<{
    title: string
    description: string
    validTill?: string
    link?: string
  }>
  rating: number
  likesCount: number
  sharesCount: number
  companyWebsite?: string
  instagramHandle?: string
  promotionOfferTag?: string
  author: {
    name: string
    image?: string
  }
  comments: Array<{
    id: string
    content: string
    rating: number
    author: {
      name: string
      image?: string
    }
    createdAt: string
  }>
}

export default function FashionDetailPage() {
  const params = useParams()
  const [fashion, setFashion] = useState<FashionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFashion = async () => {
      try {
        const response = await fetch(`/api/fashion/${params.id}`)
        const data = await response.json()
        
        if (data.success) {
          setFashion(data.data)
        } else {
          setError(data.error || 'Failed to fetch fashion details')
        }
      } catch (err) {
        setError('Error loading fashion details')
        console.error('Error fetching fashion:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchFashion()
    }
  }, [params.id])

  if (loading) {
    return (
      <AppLayout title="Fashion Details">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (error || !fashion) {
    return (
      <AppLayout title="Fashion Details">
        <div className="p-6 text-center">
          <p className="text-red-500">{error || 'Fashion not found'}</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title={fashion.title}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Image */}
        <div className="relative mb-6">
          <Image
            src={fashion.images?.[0] || "/placeholder.svg"}
            alt={fashion.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          {fashion.promotionOfferTag && (
            <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
              {fashion.promotionOfferTag}
            </Badge>
          )}
        </div>

        {/* Title and Basic Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{fashion.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{fashion.locationName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{fashion.rating || 0}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              {fashion.likesCount || 0}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {fashion.sharesCount || 0}
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{fashion.content}</p>
          </CardContent>
        </Card>

        {/* Offers */}
        {fashion.offers && fashion.offers.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
              <div className="space-y-4">
                {fashion.offers.map((offer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{offer.title}</h3>
                    <p className="text-muted-foreground mb-2">{offer.description}</p>
                    {offer.validTill && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Valid till: {new Date(offer.validTill).toLocaleDateString()}</span>
                      </div>
                    )}
                    {offer.link && (
                      <Button size="sm" className="mt-2" asChild>
                        <a href={offer.link} target="_blank" rel="noopener noreferrer">
                          View Offer
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">By:</span>
                <span>{fashion.author.name}</span>
              </div>
              {fashion.companyWebsite && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={fashion.companyWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {fashion.companyWebsite}
                  </a>
                </div>
              )}
              {fashion.instagramHandle && (
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  <a 
                    href={`https://instagram.com/${fashion.instagramHandle}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{fashion.instagramHandle}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        {fashion.comments && fashion.comments.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {fashion.comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{comment.author.name}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < comment.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}