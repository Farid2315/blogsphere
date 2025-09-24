"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

const musicItems = [
  {
    id: 1,
    name: "Music Studio",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Recording sessions 40% off, mixing and mastering included..T&C",
  },
  {
    id: 2,
    name: "Concert Hall",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Live concert tickets 30% off, VIP seating available..T&C",
  },
  {
    id: 3,
    name: "Music Academy",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Music lessons 50% off, instrument rental included..T&C",
  },
  {
    id: 4,
    name: "DJ Services",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Event DJ booking 35% off, sound system included..T&C",
  },
  {
    id: 5,
    name: "Karaoke Lounge",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Karaoke rooms 45% off, unlimited songs and snacks..T&C",
  },
  {
    id: 6,
    name: "Instrument Store",
    location: "Location",
    image: "/music-store-with-instruments-and-audio-equipment.jpg",
    offer: "Musical instruments 60% off, free maintenance service..T&C",
  },
]

export function MusicGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {musicItems.map((item) => (
          <Link key={item.id} href={`/music/${item.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 bg-card">
              <div className="relative px-2">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
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
