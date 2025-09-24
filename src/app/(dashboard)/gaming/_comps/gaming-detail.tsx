"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Heart, Share, Bookmark, Phone, Globe } from "lucide-react"

interface GamingDetailProps {
  itemId: string
}

const offers = [
  "Gaming bundle deal: Buy any console and get 3 games free with extended warranty",
  "Pre-order special: Reserve upcoming games and save 20% with exclusive in-game content",
]

const addresses = [
  "Gaming Store - Electronics Mall, Level 3, Gaming Zone Section",
  "Game Hub - Tech Plaza, Gaming Accessories and Console Center",
  "Digital Games Outlet - Cyber City, Online Gaming Equipment Store",
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

export function GamingDetail() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gaming Image */}
          <div className="relative">
            <Image src="/gaming-setup.png" alt="Gaming Item" className="w-full h-64 md:h-80 object-cover rounded-lg" width={800} height={320} />
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
            <Button variant="link" className="text-secondary hover:text-primary p-0">
              Visit the promotion 🔗
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button
              variant="outline"
              className="border-secondary text-secondary-foreground hover:bg-secondary/10 bg-transparent"
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
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">@pro_gamer</Button>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
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
