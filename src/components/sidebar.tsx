"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  MapPin,
  Utensils,
  Shirt,
  Plane,
  Gamepad2,
  Laptop,
  Music,
  Star,
  User,
  Settings,
  ChevronDown,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Explore",
    items: [
      { name: "Location", icon: MapPin, href: "/", hasSubmenu: true },
      { name: "Restaurants", icon: Utensils, href: "/restaurants" },
      { name: "Fashion", icon: Shirt, href: "/fashion" },
      { name: "Travel", icon: Plane, href: "/travel" },
      { name: "Gaming", icon: Gamepad2, href: "/gaming" },
      { name: "Tech", icon: Laptop, href: "/tech" },
      { name: "Music", icon: Music, href: "/music" },
      { name: "Product Reviews", icon: Star, href: "/reviews" },
    ],
  },
]

const locations = ["Your Location on Gps", "Bangalore", "Delhi", "Hyderabad", "Rajasthan"]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const [locationOpen, setLocationOpen] = useState(true)

  return (
    <div className="flex h-screen w-64 flex-col bg-background border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold text-foreground">
          Blog<span className="text-muted-foreground">Sphere</span>
        </h1>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.name}>
            <h3 className="px-3 py-2 text-sm font-medium text-muted-foreground">
              {section.name}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/restaurants" && (pathname.startsWith("/restaurant") || pathname === "/")) ||
                  (item.href === "/fashion" && pathname.startsWith("/fashion")) ||
                  (item.href === "/travel" && pathname.startsWith("/travel")) ||
                  (item.href === "/gaming" && pathname.startsWith("/gaming")) ||
                  (item.href === "/tech" && pathname.startsWith("/tech")) ||
                  (item.href === "/music" && pathname.startsWith("/music"))

                if (item.hasSubmenu && item.name === "Location") {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setLocationOpen(!locationOpen)}
                        className={cn(
                          "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                        <ChevronDown
                          className={cn("ml-auto h-4 w-4 transition-transform", locationOpen ? "rotate-180" : "")}
                        />
                      </button>
                      {locationOpen && (
                        <div className="ml-8 space-y-1">
                          {locations.map((location) => (
                            <Link
                              key={location}
                              href="/"
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {location}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Profile and Settings */}
        <div className="mt-8 space-y-1">
          <Link
            href="/profile"
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/profile"
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/settings"
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-accent text-accent-foreground"
                : "text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </div>
      </nav>
    </div>
  )
}
