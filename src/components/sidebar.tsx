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
import { useTheme } from "next-themes"

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
  const { theme, resolvedTheme } = useTheme()
  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <div
      className="flex h-screen w-64 flex-col"
      style={{
        backgroundColor: isDark ? "#1a1a1a" : "#f3f4f6",
        color: isDark ? "#ffffff" : "#111827",
      }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold">
          Blog<span className={isDark ? "text-gray-300" : "text-gray-600"}>Sphere</span>
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
            <h3 className={`px-3 py-2 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
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
                          "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
                          isActive
                            ? isDark
                              ? "bg-gray-700 text-white"
                              : "bg-gray-200 text-gray-900"
                            : isDark
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
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
                              className={`block rounded-md px-3 py-2 text-sm ${
                                isDark
                                  ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                              }`}
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
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? isDark
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                        : isDark
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
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
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/profile"
                ? isDark
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
                : isDark
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
            )}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/settings"
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/settings"
                ? isDark
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
                : isDark
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900",
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
