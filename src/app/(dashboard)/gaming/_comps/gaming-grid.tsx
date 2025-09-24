"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

const gamingItems = [
  {
    id: 1,
    name: "Gaming Arena",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "Gaming sessions 50% off, free snacks with 3+ hour bookings..T&C",
  },
  {
    id: 2,
    name: "Esports Center",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "Tournament entry 40% off, coaching sessions included..T&C",
  },
  {
    id: 3,
    name: "VR Experience",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "VR gaming packages 60% off, group discounts available..T&C",
  },
  {
    id: 4,
    name: "Retro Arcade",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "All-day arcade pass 35% off, vintage game tournaments..T&C",
  },
  {
    id: 5,
    name: "Console Lounge",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "Console gaming 45% off, multiplayer sessions included..T&C",
  },
  {
    id: 6,
    name: "PC Gaming Hub",
    location: "Location",
    image: "/gaming-setup.png",
    offer: "High-end PC gaming 55% off, streaming setup available..T&C",
  },
]

export function GamingGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gamingItems.map((item) => (
          <Link key={item.id} href={`/gaming/${item.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-300 bg-card">
              <div className="relative">
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
