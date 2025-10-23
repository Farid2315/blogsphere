"use client"

import { Button } from "@/components/ui/button"
//import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LocationPermission } from "@/components/location-permission"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useEffect, useState } from "react"

// const featuredImages = ["/fashion-model-portrait.png", "/business-woman-professional.jpg", "/casual-lifestyle-photo.jpg"]

// const pastPromotions = [
//   { name: "Brand X", logo: "/brand-logo-x.jpg" },
//   { name: "Store Y", logo: "/store-logo-y.jpg" },
//   { name: "Restaurant Z", logo: "/restaurant-logo-z.jpg" },
// ]

interface ProfileData {
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
  profile: {
    bio: string
    followersCount: number
    followingCount: number
    postsCount: number
    collabsCount: number
    instagramHandle: string
    youtubeHandle: string
    websiteUrl: string
  }
  featuredPosts: Array<{
    id: string
    title: string
    images: string[]
    createdAt: string
    promotionOfferTag?: string
    promotionEndDate?: string
  }>
  pastPromotions: Array<{
    id: string
    title: string
    images: string[]
    promotionOfferTag: string
    createdAt: string
    promotionEndDate?: string
  }>
  stats: {
    totalPosts: number
    activePromotions: number
    pastPromotions: number
    featuredPosts: number
  }
}

export function ProfileContent() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch profile data')
        }
        const result = await response.json()
        if (result.success) {
          setProfileData(result.data)
        } else {
          throw new Error(result.error || 'Failed to load profile')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center text-red-500">
          {error || 'Failed to load profile data'}
        </div>
      </div>
    )
  }

  const { user, profile, featuredPosts, pastPromotions } = profileData

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image || "/diverse-profile-avatars.png"} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{user.name || "Full Name"}</h1>
              <p className="text-muted-foreground mt-1 mb-2">
                {profile.bio || "Welcome to my profile! 🌟 Sharing amazing content and experiences."}
              </p>
              <p className="text-muted-foreground text-sm">{user.email}</p>

              <div className="flex gap-4 mt-4">
                <Button variant="outline">Follow</Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = `/${user.id}`}
                >
                  See All Posts
                </Button>
              </div>
              <div className="flex gap-2 mt-2 mb-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // TODO: Implement edit bio functionality
                    alert("Edit bio functionality coming soon!")
                  }}
                >
                  Edit Bio
                </Button>
              </div>
              <div className="flex gap-2">
                {profile.instagramHandle && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => window.open(`https://instagram.com/${profile.instagramHandle}`, '_blank')}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Button>
                )}
                {profile.youtubeHandle && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => window.open(`https://youtube.com/@${profile.youtubeHandle}`, '_blank')}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Current Active Promotions */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Current Active Promotions</h2>
            {featuredPosts.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredPosts.map((post) => (
                    <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={post.images[0] || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                          priority
                        />
                        {post.promotionOfferTag && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                            {post.promotionOfferTag}
                          </div>
                        )}
                        {/* Active promotion overlay with title */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                          <div className="p-3 text-white w-full">
                            <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No active promotions
              </div>
            )}
          </div>

          {/* Past Promotions */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Past Promotions</h2>
            {pastPromotions.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {pastPromotions.map((promotion) => (
                    <CarouselItem key={promotion.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={promotion.images[0] || "/placeholder.svg"}
                          alt={promotion.title}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                        />
                        {/* Orange offer tag for past promotions */}
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {promotion.promotionOfferTag || "OFFER"}
                        </div>
                        {/* Past promotion overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                          <div className="p-3 text-white w-full">
                            <div className="text-xs bg-red-600 px-2 py-1 rounded-full inline-block mb-2">
                              EXPIRED
                            </div>
                            <p className="text-sm font-medium line-clamp-2">{promotion.title}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No past promotions yet
              </div>
            )}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Location Permission */}
          <LocationPermission />
          
          <div className="text-center space-y-4">
            <div>
              <div className="text-2xl font-bold text-foreground">{profile.postsCount}</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{profile.followersCount}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{profile.collabsCount}</div>
              <div className="text-sm text-muted-foreground">Collabs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
