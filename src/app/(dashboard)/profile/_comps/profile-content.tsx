"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LocationPermission } from "@/components/location-permission"
import Image from "next/image"

const featuredImages = ["/fashion-model-portrait.png", "/business-woman-professional.jpg", "/casual-lifestyle-photo.jpg"]

const pastPromotions = [
  { name: "Brand X", logo: "/brand-logo-x.jpg" },
  { name: "Store Y", logo: "/store-logo-y.jpg" },
  { name: "Restaurant Z", logo: "/restaurant-logo-z.jpg" },
]

export function ProfileContent() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/diverse-profile-avatars.png" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Full Name</h1>
              <p className="text-muted-foreground">City Name, State Name</p>

              <div className="flex gap-4 mt-4">
                <Button variant="outline">Follow</Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">📷 Instagram</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">📘 Facebook</Button>
              </div>
            </div>
          </div>

          {/* Featured Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Featured</h2>
            <div className="grid grid-cols-3 gap-4">
              {featuredImages.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Featured ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Past Promotions */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Past Promotions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pastPromotions.map((promotion, index) => (
                <Card key={index} className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold mb-2">
                      {promotion.name === "Brand X" && "BRAND X"}
                      {promotion.name === "Store Y" && "Y"}
                      {promotion.name === "Restaurant Z" && "Z"}
                    </div>
                    <p className="text-sm opacity-90">{promotion.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Location Permission */}
          <LocationPermission />
          
          <div className="text-center space-y-4">
            <div>
              <div className="text-2xl font-bold text-foreground">42</div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">148</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Collabs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
