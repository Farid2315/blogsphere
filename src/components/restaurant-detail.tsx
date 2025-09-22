"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, Bookmark, Phone, Globe } from "lucide-react"
import Image from "next/image"
interface RestaurantDetailProps {
  restaurantId: string
}

const offers = [
  "Special dining offer: Get 50% off on main course with any appetizer order",
  "Happy hour special: Buy 1 get 1 free on selected beverages from 4-7 PM",
]

const addresses = [
  "Main Restaurant - Downtown Plaza, Fine Dining Experience Center",
  "Branch Location - Shopping Mall, Level 3, Food Court Premium Section",
  "Takeaway Counter - Business District, Quick Service and Delivery Hub",
]

const timings = [
  "monday: 11AM - 10PM",
  "tuesday: 11AM - 10PM",
  "wednesday: 11AM - 10PM",
  "thursday: 11AM - 10PM",
  "friday: 11AM - 11PM",
  "saturday: 10AM - 11PM",
  "sunday: 12PM - 9PM",
]

export function RestaurantDetail({}: RestaurantDetailProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Restaurant Image */}
          <div className="relative">
            <Image
              src="/modern-restaurant-interior.png"
              alt="Restaurant"
              width={800}
              height={320}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Offers Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Offers</h2>
            <div className="space-y-3">
              {offers.map((offer, index) => (
                <Card key={index} className="border-l-4 border-l-red-500 bg-card">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{offer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* More Info */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">For more info</h3>
            <Button variant="link" className="text-red-500 hover:text-red-600 p-0">
              Visit the promotion 🔗
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-red-500 text-red-500  hover:bg-red-50 dark:hover:bg-red-950 bg-transparent px-8 py-3"
            >
              <Globe className="mr-2 h-5 w-5" />
              Visit Website
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">@restaurant_chef</Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Address</h3>
            <div className="space-y-3">
              {addresses.map((address, index) => (
                <Card key={index} className="border-l-4 border-l-red-500 bg-card">
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">{address}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timings */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Timings</h3>
            <div className="space-y-2">
              {timings.map((timing, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground capitalize">
                    {timing.split(":")[0]}
                  </span>
                  <span className="text-sm text-foreground">{timing.split(":").slice(1).join(":")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}