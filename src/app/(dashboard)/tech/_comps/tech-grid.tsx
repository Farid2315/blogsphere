"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import Image from "next/image"

const techItems = [
  {
    id: 1,
    name: "Tech Store",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "Latest gadgets 40% off, extended warranty included..T&C",
  },
  {
    id: 2,
    name: "Mobile Hub",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "Smartphone deals 50% off, trade-in offers available..T&C",
  },
  {
    id: 3,
    name: "Laptop Center",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "Gaming laptops 35% off, free software installation..T&C",
  },
  {
    id: 4,
    name: "Smart Home",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "IoT devices 60% off, free home setup service included..T&C",
  },
  {
    id: 5,
    name: "Audio Zone",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "Premium headphones 45% off, sound testing available..T&C",
  },
  {
    id: 6,
    name: "Camera World",
    location: "Location",
    image: "/modern-tech-store-with-laptops-and-gadgets.jpg",
    offer: "DSLR cameras 55% off, photography workshop included..T&C",
  },
]

export function TechGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techItems.map((item) => (
          <Link key={item.id} href={`/tech/${item.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 bg-card">
              <div className="relative">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
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
