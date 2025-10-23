'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Share2, ArrowLeft } from 'lucide-react'

interface Post {
  id: string
  title: string
  images: string[]
  description: string
  isPromotion: boolean
  promotionOfferTag?: string
  promotionEndDate?: string
  author: {
    id: string
    name: string
    image: string
  }
}

interface User {
  id: string
  name: string
  image: string
}

interface AllPostsContentProps {
  userId: string
}

export default function AllPostsContent({ userId }: AllPostsContentProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true)
        
        // Fetch user info
        const userResponse = await fetch(`/api/users/${userId}`)
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user')
        }
        const userData = await userResponse.json()
        setUser(userData)

        // Fetch user's posts
        const postsResponse = await fetch(`/api/posts?authorId=${userId}`)
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts')
        }
        const postsData = await postsResponse.json()
        setPosts(postsData.posts || [])
        
        // Initialize image indices
        const indices: { [key: string]: number } = {}
        postsData.posts?.forEach((post: Post) => {
          indices[post.id] = 0
        })
        setCurrentImageIndex(indices)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUserAndPosts()
    }
  }, [userId])

  const nextImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: (prev[postId] + 1) % totalImages
    }))
  }

  const prevImage = (postId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [postId]: prev[postId] === 0 ? totalImages - 1 : prev[postId] - 1
    }))
  }

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-center">
          <p className="text-xl font-semibold">User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={user.image || '/default-avatar.png'}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">All Posts ({posts.length})</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image Slider */}
                <div className="relative h-64 bg-gray-200">
                  {post.images && post.images.length > 0 ? (
                    <>
                      <Image
                        src={post.images[currentImageIndex[post.id] || 0]}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {post.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(post.id, post.images.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => nextImage(post.id, post.images.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {post.images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === (currentImageIndex[post.id] || 0)
                                    ? 'bg-white'
                                    : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  
                  {/* Promotion Tag */}
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleShare(post)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
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