"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Star, 
  MapPin, 
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Camera,
  Watch
} from "lucide-react";

const techStores = [
  {
    id: "1",
    name: "TechHub Electronics",
    category: "Smartphones & Accessories",
    rating: 4.8,
    reviews: 1250,
    location: "Tech Mall, Downtown",
    offer: "iPhone 15 Pro - 30% off",
    icon: Smartphone,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: "2", 
    name: "Gaming Paradise",
    category: "Gaming & Consoles",
    rating: 4.9,
    reviews: 890,
    location: "Gaming District",
    offer: "PS5 Bundle - Free games included",
    icon: Gamepad2,
    gradient: "from-green-500 to-blue-600"
  },
  {
    id: "3",
    name: "Laptop World",
    category: "Laptops & Computers", 
    rating: 4.7,
    reviews: 2100,
    location: "Business Center",
    offer: "MacBook Air M3 - Student discount",
    icon: Laptop,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: "4",
    name: "Audio Zone",
    category: "Headphones & Audio",
    rating: 4.6,
    reviews: 670,
    location: "Music Street",
    offer: "AirPods Pro 2 - Buy 1 Get 1 50% off",
    icon: Headphones,
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "5",
    name: "Camera Corner",
    category: "Cameras & Photography",
    rating: 4.8,
    reviews: 450,
    location: "Arts District",
    offer: "Canon EOS R5 - Professional bundle",
    icon: Camera,
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: "6",
    name: "Smart Wearables",
    category: "Smartwatches & Fitness",
    rating: 4.5,
    reviews: 320,
    location: "Health Plaza",
    offer: "Apple Watch Series 9 - Health bundle",
    icon: Watch,
    gradient: "from-indigo-500 to-purple-600"
  }
];

export function TechGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techStores.map((store) => {
        const IconComponent = store.icon;
        return (
          <Card key={store.id} className="bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
            <CardContent className="p-0">
              {/* Header with gradient background */}
              <div className={`bg-gradient-to-r ${store.gradient} p-6 rounded-t-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="h-8 w-8 text-primary-foreground" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-2">{store.name}</h3>
                <p className="text-primary-foreground/80 text-sm">{store.category}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating and Location */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="text-foreground text-sm font-medium">{store.rating}</span>
                    <span className="text-muted-foreground text-sm">({store.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate max-w-[120px]">{store.location}</span>
                  </div>
                </div>

                {/* Current Offer */}
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    {store.offer}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link href={`/tech/${store.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Store
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-accent"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}