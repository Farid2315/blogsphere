"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

const fashionItems = [
  {
    id: 1,
    name: "Fashion Brand",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "Up to 70% off on summer collection, buy 2 get 1 free on selected items..T&C",
  },
  {
    id: 2,
    name: "Style Boutique",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "Flat 50% off on designer wear, additional 20% off on accessories..T&C",
  },
  {
    id: 3,
    name: "Trendy Wear",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "New arrivals 40% off, exclusive member discount available..T&C",
  },
  {
    id: 4,
    name: "Elite Fashion",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "Premium collection 60% off, free styling consultation included..T&C",
  },
  {
    id: 5,
    name: "Urban Style",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "Street style collection 45% off, buy 3 get 2 free on casual wear..T&C",
  },
  {
    id: 6,
    name: "Chic Couture",
    location: "Location",
    image: "/fashion-clothing-store-interior.jpg",
    offer: "Designer collection 55% off, complimentary alterations available..T&C",
  },
]

export function FashionGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fashionItems.map((item) => (
          <Link key={item.id} href={`/fashion/${item.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 bg-card">
              <div className="relative">
                <Image 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.name} 
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover" 
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">rating</div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-1">Offer:</h4>
                  <p className="text-xs text-muted-foreground">{item.offer}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    @userld
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
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
