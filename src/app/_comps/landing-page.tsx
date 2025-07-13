"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Utensils,
  Shirt,
  TrendingUp,
  MapPin,
  Shuffle,
  Gamepad2,
  BookOpen,
  Music,
  Smartphone,
  Camera,
  Star,
  User,
  Film,
} from "lucide-react"

const categories = [
  {
    name: "Food",
    route: "food",
    icon: Utensils,
    gradient: "from-orange-400 to-red-500",
    description: "Culinary adventures & recipes",
  },
  {
    name: "Fashion",
    route: "fashion",
    icon: Shirt,
    gradient: "from-pink-400 to-purple-500",
    description: "Style trends & fashion tips",
  },
  {
    name: "Trends",
    route: "trends",
    icon: TrendingUp,
    gradient: "from-blue-400 to-cyan-500",
    description: "What's hot right now",
  },
  {
    name: "Tours & Travel",
    route: "tours-travel",
    icon: MapPin,
    gradient: "from-green-400 to-teal-500",
    description: "Explore the world",
  },
  {
    name: "Random Feed",
    route: "random",
    icon: Shuffle,
    gradient: "from-purple-400 to-indigo-500",
    description: "Discover something new",
  },
  {
    name: "Gaming",
    route: "gaming",
    icon: Gamepad2,
    gradient: "from-red-400 to-pink-500",
    description: "Gaming news & reviews",
  },
  {
    name: "Books & Writing",
    route: "books-writing",
    icon: BookOpen,
    gradient: "from-amber-400 to-orange-500",
    description: "Literary world & writing tips",
  },
  {
    name: "Music",
    route: "music",
    icon: Music,
    gradient: "from-violet-400 to-purple-500",
    description: "Beats, artists & playlists",
  },
  {
    name: "Tech & Gadgets",
    route: "tech-gadgets",
    icon: Smartphone,
    gradient: "from-slate-400 to-gray-600",
    description: "Latest tech innovations",
  },
  {
    name: "Photography",
    route: "photography",
    icon: Camera,
    gradient: "from-emerald-400 to-green-500",
    description: "Capture life's moments",
  },
  {
    name: "Product Reviews",
    route: "product-reviews",
    icon: Star,
    gradient: "from-yellow-400 to-orange-500",
    description: "Honest product insights",
  },
  {
    name: "Self-improvement",
    route: "self-improvement",
    icon: User,
    gradient: "from-teal-400 to-cyan-500",
    description: "Personal growth journey",
  },
  {
    name: "Film & TV Reviews",
    route: "film-tv",
    icon: Film,
    gradient: "from-indigo-400 to-blue-500",
    description: "Entertainment reviews",
  },
]

export default function LandingPage() {
  const router = useRouter()

  const handleCategoryClick = (route: string) => {
    router.push(`/${route}`)
  }

  const handleAuthClick = (type: "login" | "signup") => {
    router.push(`/${type}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BlogSphere
              </h1>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => handleAuthClick("login")}
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Login
              </Button>
              <Button
                onClick={() => handleAuthClick("signup")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BlogSphere
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing content from bloggers and vloggers across different domains. Join our community and share
            your passion with the world.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-white/70 backdrop-blur-sm"
                onClick={() => handleCategoryClick(category.route)}
                tabIndex={0}
                role="button"
                aria-label={`Navigate to ${category.name} section`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleCategoryClick(category.route)
                  }
                }}
              >
                <CardContent className="p-6 sm:p-8">
                  {/* Icon with Gradient Background */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                    {category.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to Share Your Story?</h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of creators who are already sharing their passion and building their audience on
              BlogSphere.
            </p>
            <Button
              size="lg"
              onClick={() => handleAuthClick("signup")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 BlogSphere. Built with ❤️ for creators everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
