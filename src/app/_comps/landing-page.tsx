"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
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
  Film,
} from "lucide-react"

const categories = [
  {
    name: "Restaurants",
    route: "Restaurants",
    icon: Utensils,
    gradient: "from-orange-400 to-red-500",
    description: "Culinary Magic, Served Fresh.",
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
    route: "gaming",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">BlogSphere</h1>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Button 
                onClick={() => handleAuthClick("login")} 
                variant="outline"
                size="sm"
                className="rounded-lg text-xs px-3"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => handleAuthClick("signup")}
                size="sm"
                className="rounded-lg text-xs px-3"
              >
                Get Started
              </Button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => handleAuthClick("login")} 
                variant="outline"
                className="rounded-xl"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => handleAuthClick("signup")}
                className="rounded-xl"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background">
          {/* Subtle Background with Gentle Movement */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/60 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"></div>
        
        {/* Gentle Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-300/40 to-purple-300/40 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-300/40 to-orange-300/40 dark:from-pink-600/20 dark:to-orange-600/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Share Your Passion with the World
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Discover amazing content from bloggers and vloggers across different domains. Join our community and share
                your passion with the world.
              </p>
              
              {/* Floating Animation Elements */}
              <div className="relative">
                <div className="absolute -top-8 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -top-12 right-1/4 w-3 h-3 bg-accent/40 rounded-full animate-bounce delay-700"></div>
                <div className="absolute -top-6 left-1/3 w-2 h-2 bg-secondary/50 rounded-full animate-bounce delay-1000"></div>
                
                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Button 
                    onClick={() => handleAuthClick("signup")}
                    size="lg"
                    className="rounded-xl px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    Start Your Journey
                  </Button>
                  <Button 
                    onClick={() => handleAuthClick("login")}
                    variant="outline"
                    size="lg"
                    className="rounded-xl px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    Explore Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid - Mobile: 2 cards per row, 2 rows visible */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-card/70 backdrop-blur-sm"
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
                  <CardContent className="p-3 sm:p-6 lg:p-8">
                    {/* Icon with Gradient Background */}
                    <div
                      className={`w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-2 sm:mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-200 leading-tight">
                      {category.name}
                    </h3>

                    {/* Description - Hidden on mobile for better fit */}
                    <p className="hidden sm:block text-muted-foreground text-sm lg:text-base leading-relaxed group-hover:text-foreground transition-colors duration-200">
                      {category.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className="mt-2 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-16 sm:mt-20">
            <div className="bg-card/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-border">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to Share Your Story?</h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of creators who are already sharing their passion and building their audience on
                BlogSphere.
              </p>
              <Button
                size="lg"
                onClick={() => handleAuthClick("signup")}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 BlogSphere. Built with ❤️ for creators everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
