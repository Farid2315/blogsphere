"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MapPin, Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react"
import { LocationPermission } from "@/components/location-permission"

interface Post {
  id: string
  title: string
  content: string
  images: string[]
  domain: string
  address: string
  locationName: string
  location?: {
    type: string
    coordinates: number[]
  }
  isPromotion: boolean
  promotionOfferTag?: string
  promotionStartDate?: string
  promotionEndDate?: string
  promotionStartTime?: string
  promotionEndTime?: string
  createdAt: string
  author: {
    id: string
    name: string
    image: string
  }
  stats: {
    likes: number
    comments: number
  }
  distance?: number
}

interface UserData {
  id: string
  name: string
  email: string
  image: string
  postsCount: number
  bio?: string
  followersCount?: number
  collabsCount?: number
}

interface UserPostsContentProps {
  userId: string
}

export default function UserPostsContent({ userId }: UserPostsContentProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [activePosts, setActivePosts] = useState<Post[]>([])
  const [regularPosts, setRegularPosts] = useState<Post[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [sortByDistance, setSortByDistance] = useState(false)
  const router = useRouter()

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Add distance to posts if user location is available
  const addDistanceToPosts = useCallback((postsList: Post[]) => {
    if (!userLocation) return postsList

    return postsList.map(post => {
      // Check if post has location coordinates
      if (post.location?.coordinates && Array.isArray(post.location.coordinates)) {
        const [lng, lat] = post.location.coordinates
        if (lat && lng) {
          const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
          return { ...post, distance }
        }
      }
      return post
    }).sort((a, b) => {
      // Sort by distance if available, otherwise maintain original order
      if (sortByDistance && a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance
      }
      return 0
    })
  }, [userLocation, sortByDistance])

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // Fetch user profile data (includes bio, stats, etc.)
        const profileResponse = await fetch(`/api/users/${userId}/profile`)
        if (profileResponse.ok) {
          const profileResult = await profileResponse.json()
          if (profileResult.success) {
            const { user, profile } = profileResult.data
            setUserData({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              postsCount: profile.postsCount,
              bio: profile.bio,
              followersCount: profile.followersCount,
              collabsCount: profile.collabsCount,
            })
          }
        }

        // Fetch user posts
        const postsResponse = await fetch(`/api/posts/user/${userId}`)
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts')
        }
        const postsResult = await postsResponse.json()
        const allPosts = (postsResult && postsResult.data) || []
        
        // Separate active promotions from regular posts
        const now = new Date()
        const active: Post[] = []
        const regular: Post[] = []
        
        allPosts.forEach((post: Post) => {
          if (post.isPromotion && post.promotionEndDate) {
            const endDate = new Date(post.promotionEndDate)
            if (endDate >= now) {
              active.push(post)
            } else {
              regular.push(post)
            }
          } else if (post.isPromotion) {
            active.push(post)
          } else {
            regular.push(post)
          }
        })
        
        // Add distance to posts if location is available
        const activeWithDistance = addDistanceToPosts(active)
        const regularWithDistance = addDistanceToPosts(regular)
        
        setPosts(allPosts)
        setActivePosts(activeWithDistance)
        setRegularPosts(regularWithDistance)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserAndPosts()
    }
  }, [userId, userLocation, sortByDistance])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const PostCard = ({ post }: { post: Post }) => {
    const getDomainRoute = () => {
      const domain = post.domain.toLowerCase()
      if (domain === 'food' || domain === 'restaurant' || domain === 'restaurants') {
        return `/restaurants/${post.id}`
      } else if (domain === 'fashion' || domain === 'cloth') {
        return `/fashion/${post.id}`
      } else if (domain === 'tech') {
        return `/tech/${post.id}`
      } else if (domain === 'gaming') {
        return `/gaming/${post.id}`
      } else if (domain === 'music') {
        return `/music/${post.id}`
      } else if (domain === 'travel' || domain === 'tours') {
        return `/travel/${post.id}`
      }
      return `/restaurants/${post.id}` // default fallback
    }

    return (
      <Link href={getDomainRoute()}>
        <Card className="group cursor-pointer overflow-hidden border-2 border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 bg-card">
          {/* Image Section with Carousel Controls */}
          <div className="relative">
            <div className="relative w-full h-48 sm:h-56 bg-gray-100 dark:bg-gray-800">
              {post.images && post.images.length > 0 ? (
                <>
                  <Image
                    src={post.images[0] || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* Carousel navigation arrows */}
                  {post.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-400/80 hover:bg-gray-500/80 text-white rounded-full p-1 z-10"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-400/80 hover:bg-gray-500/80 text-white rounded-full p-1 z-10"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {post.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            {/* Author Badge */}
            <div className="absolute top-2 left-2 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 shadow-md">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.image} />
                <AvatarFallback>{post.author.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-foreground">@{post.author.name}</span>
            </div>

            {/* Promotion Tag */}
            {post.promotionOfferTag && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {post.promotionOfferTag}
              </div>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-4">
            <div className="mb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-base text-foreground line-clamp-1 flex-1">{post.title}</h3>
                {post.distance !== undefined && (
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {post.distance.toFixed(1)} km
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{post.locationName || post.address}</span>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.stats?.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.stats?.comments || 156}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = getDomainRoute()
              }}
            >
              View Offer Details & Directions
            </Button>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Profile Header */}
        {userData && (
          <div className="mb-8 bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={userData.image} />
                <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-1">{userData.name}</h1>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                  <Button className="sm:w-auto w-full">Follow</Button>
                </div>
                
                {userData.bio && (
                  <p className="text-muted-foreground mb-4">{userData.bio}</p>
                )}
                
                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{posts.length}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  {userData.followersCount !== undefined && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{userData.followersCount}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  )}
                  {userData.collabsCount !== undefined && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{userData.collabsCount}</div>
                      <div className="text-xs text-muted-foreground">Collabs</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Permission */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <LocationPermission />
          
          {userLocation && (
            <Button
              variant={sortByDistance ? "default" : "outline"}
              onClick={() => setSortByDistance(!sortByDistance)}
              className="w-full sm:w-auto"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {sortByDistance ? "Sorted by Distance" : "Sort by Distance"}
            </Button>
          )}
        </div>

        {/* Current Active Promotions */}
        {activePosts.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-xl font-semibold text-foreground">Current Active Promotions</h2>
              <span className="text-sm text-muted-foreground">({activePosts.length})</span>
            </div>
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: false,
                dragFree: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {activePosts.map((post) => (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <PostCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        )}

        {/* All Posts */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {activePosts.length > 0 ? "Past Promotions" : "All Posts"}
            </h2>
            <span className="text-sm text-muted-foreground">({regularPosts.length})</span>
          </div>
          {regularPosts.length > 0 ? (
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: false,
                dragFree: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {regularPosts.map((post) => (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <PostCard post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
