'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Share2, ArrowLeft } from 'lucide-react'

interface Post {
  id: string
  title: string
  images: string[]
  content: string
  isPromotion: boolean
  promotionOfferTag?: string
  promotionEndDate?: string
  author: {
    id: string
    name: string
    image: string
  }
}

interface AllPostsContentProps {
  userId: string
}

export default function AllPostsContent({ userId }: AllPostsContentProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts/user/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts((data && data.data) || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchPosts()
    }
  }, [userId])

  const nextImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + totalImages) % totalImages
    }))
  }

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Profile
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Posts</h1>
            <p className="text-muted-foreground">View all posts from this user</p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image Carousel */}
                <div className="relative aspect-square">
                  {post.images && post.images.length > 0 ? (
                    <>
                      <Image
                        src={post.images[currentImageIndex[post.id] || 0] || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Navigation arrows */}
                      {post.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(post.id, post.images.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => nextImage(post.id, post.images.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {post.images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === (currentImageIndex[post.id] || 0) 
                                    ? 'bg-white' 
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">No image</p>
                    </div>
                  )}
                  
                  {/* Promotion tag */}
                  {post.isPromotion && post.promotionOfferTag && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                        {post.promotionOfferTag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    
                    {/* Author info */}
                    <div className="flex items-center space-x-2">
                      <Image
                        src={post.author.image || '/placeholder-user.jpg'}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{post.author.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}