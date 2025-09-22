"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star, 
  Bookmark, 
  Share2, 
  Heart,
  Smartphone,
  Cpu,
  Wifi,
  Battery
} from "lucide-react";

interface TechDetailProps {
  techId: string;
}

export function TechDetail({ techId }: TechDetailProps) {
  // Mock data - in a real app, this would come from an API
  const offers = [
    "Latest iPhone 15 Pro Max - 50% off",
    "Samsung Galaxy S24 Ultra - Buy 1 Get 1 Free",
    "MacBook Air M3 - Student discount available",
    "Gaming PC Setup - Complete bundle deal"
  ];

  const addresses = [
    "Apple Store, Tech Mall, Downtown",
    "Samsung Experience Center, City Plaza",
    "Best Buy Electronics, Shopping District",
    "Micro Center, Tech Hub Avenue"
  ];

  const timings = [
    "Mon-Fri: 10:00 AM - 9:00 PM",
    "Saturday: 9:00 AM - 10:00 PM", 
    "Sunday: 11:00 AM - 8:00 PM",
    "Holiday hours may vary"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Tech Store #{techId}</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span>4.8 (2.1k reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5 text-red-400" />
              <span>Tech District, Downtown</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Cpu className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Latest Tech Collection</h3>
                    <p className="text-blue-200">Smartphones, Laptops, Gaming & More</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Offers */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-400" />
                  Current Tech Offers
                </h3>
                <div className="grid gap-3">
                  {offers.map((offer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-200">{offer}</span>
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        Limited Time
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Store Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <Wifi className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Free WiFi</span>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <Battery className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Device Testing</span>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <Cpu className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Tech Support</span>
                  </div>
                  <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                    <Smartphone className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Trade-in</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Store
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Store Locations */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-400" />
                  Store Locations
                </h3>
                <div className="space-y-3">
                  {addresses.map((address, index) => (
                    <div key={index} className="text-sm text-gray-300 p-2 bg-gray-700/30 rounded">
                      {address}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Store Hours */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  Store Hours
                </h3>
                <div className="space-y-2">
                  {timings.map((timing, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {timing}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}