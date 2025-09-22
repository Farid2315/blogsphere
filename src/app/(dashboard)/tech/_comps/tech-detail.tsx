"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, Bookmark, Phone, Globe } from "lucide-react"
import Image from "next/image"

interface TechDetailProps {
  techId: string
}

const offers = [
  "Tech upgrade deal: Trade in your old device and get up to 40% off on new tech products",
  "Student discount: Show valid student ID and receive 15% off on all laptops and tablets",
]

const addresses = [
  "Tech Store - Innovation Center, Silicon Valley Plaza, Electronics Wing",
  "Digital Hub - Technology Park, Smart Devices and Gadgets Section",
  "Tech Repair Center - Computer Mall, Technical Support and Sales Counter",
]

const timings = [
  "monday: 10AM - 8PM",
  "tuesday: 10AM - 8PM",
  "wednesday: 10AM - 8PM",
  "thursday: 10AM - 8PM",
  "friday: 10AM - 9PM",
  "saturday: 9AM - 9PM",
  "sunday: 11AM - 7PM",
]

    export function TechDetail({ techId }: TechDetailProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tech Image */}
          <div className="relative">
            <Image
              src="/modern-tech-store-with-laptops-and-gadgets.jpg"
              alt="Tech Product"
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
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
            >
              <Globe className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">@tech_reviewer</Button>
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
            <div className="space-y-1">
              {timings.map((day, index) => (
                <p key={index} className="text-sm text-muted-foreground capitalize">
                  {day}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
