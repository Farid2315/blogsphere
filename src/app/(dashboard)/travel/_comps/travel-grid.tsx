"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import Image from "next/image"

const travelItems = [
  {
    id: 1,
    name: "Adventure Tours",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Book now get 40% off on adventure packages, free travel insurance..T&C",
  },
  {
    id: 2,
    name: "Luxury Resorts",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Early bird discount 50% off, complimentary spa sessions included..T&C",
  },
  {
    id: 3,
    name: "City Breaks",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Weekend getaway packages 35% off, free city tours included..T&C",
  },
  {
    id: 4,
    name: "Beach Holidays",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Summer special 60% off on beach resorts, all meals included..T&C",
  },
  {
    id: 5,
    name: "Mountain Retreats",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Hill station packages 45% off, adventure activities included..T&C",
  },
  {
    id: 6,
    name: "Cultural Tours",
    location: "Location",
    image: "/beautiful-travel-destination-landscape.jpg",
    offer: "Heritage tour packages 30% off, expert guide services included..T&C",
  },
]

export function TravelGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelItems.map((item) => (
          <Link key={item.id} href={`/travel/${item.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 bg-card">
              <div className="relative px-2">
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
