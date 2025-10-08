"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

const fashions = [
  {
    id: 1,
    name: "Fashion Name",
    location: "Location",
    image: "/modern-fashion-interior.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
  {
    id: 2,
    name: "Fashion Name",
    location: "Location",
    image: "/elegant-fashion-dining.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
  {
    id: 3,
    name: "Fashion Name",
    location: "Location",
    image: "/placeholder-6p0x1.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
  {
    id: 4,
    name: "Fashion Name",
    location: "Location",
    image: "/fine-dining-fashion.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
  {
    id: 5,
    name: "Fashion Name",
    location: "Location",
    image: "/placeholder-2em4e.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
  {
    id: 6,
    name: "Fashion Name",
    location: "Location",
    image: "/trendy-fashion-interior.png",
    offer: "offer type like 50% or by 1 get 1 or launch offer etc..T&C",
  },
]

export function FashionGrid() {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {fashions.map((fashion) => (
          <Link key={fashion.id} href={`/fashion/${fashion.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-gray-500/20 hover:border-gray-500/40 transition-all duration-300 bg-card">
              <div className="relative">
                <Image
                  src={fashion.image || "/placeholder.svg"}
                  alt={fashion.name}
                  width={400}
                  height={192}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white h-8 w-8 sm:h-10 sm:w-10"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle bookmark
                  }}
                >
                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{fashion.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{fashion.location}</p>
                  </div>
                  <div className="text-xs text-muted-foreground ml-2">rating</div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground mb-1">Offer:</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{fashion.offer}</p>
                </div>

                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1 text-xs sm:text-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    @userld
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1 text-xs sm:text-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    @userld
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
