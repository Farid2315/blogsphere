"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { 
  MapPin,
  Compass,
  Utensils,
  Shirt,
  Plane,
  Gamepad2,
  Smartphone,
  Music,
  Star,
  User,
  Settings,
  Bookmark,
  Bell
} from "lucide-react";

export default function RestaurantPage() {
  const { user, loading, authenticated, logout } = useAuth();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState('location');

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading, router]);

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const categories = [
    {
      id: 'location',
      name: 'Location',
      icon: MapPin,
      expanded: expandedCategory === 'location',
      subItems: [
        { name: 'Your Location on GPS', icon: Compass },
        { name: 'Bangalore' },
        { name: 'Delhi' },
        { name: 'Hyderabad' },
        { name: 'Rajasthan' }
      ]
    },
    { id: 'restaurants', name: 'Restaurants', icon: Utensils },
    { id: 'fashion', name: 'Fashion', icon: Shirt },
    { id: 'travel', name: 'Travel', icon: Plane },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'tech', name: 'Tech', icon: Smartphone },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'reviews', name: 'Product Reviews', icon: Star }
  ];

  // Restaurant data
  const restaurants = [
    { name: "Spice Garden", location: "Bangalore", offer: "50% off on main course", image: "restaurant1" },
    { name: "Urban Cafe", location: "Delhi", offer: "Buy 1 Get 1 Free", image: "restaurant2" },
    { name: "Coastal Kitchen", location: "Mumbai", offer: "Launch Offer - 30% off", image: "restaurant3" },
    { name: "Royal Diner", location: "Hyderabad", offer: "Weekend Special - 25% off", image: "restaurant4" },
    { name: "Fusion House", location: "Chennai", offer: "Happy Hours - 40% off", image: "restaurant5" },
    { name: "Heritage Bistro", location: "Jaipur", offer: "Student Discount - 20% off", image: "restaurant6" },
    { name: "Tandoor House", location: "Pune", offer: "Family Package - 35% off", image: "restaurant7" },
    { name: "Seafood Paradise", location: "Kochi", offer: "Fresh Catch Special", image: "restaurant8" },
    { name: "Street Food Hub", location: "Kolkata", offer: "Street Food Festival", image: "restaurant9" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Navigation - Fixed */}
      <div className="w-56 bg-gray-900 fixed h-full overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Logo */}
          <div className="text-xl font-bold text-white">
            BlogSphere
          </div>

          {/* Explore Section */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
              Explore
            </h3>
            
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (category.subItems) {
                      setExpandedCategory(expandedCategory === category.id ? '' : category.id);
                    } else if (category.id === 'restaurants') {
                      // Already on restaurant page
                    } else {
                      router.push(`/${category.id}`);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors text-sm ${
                    expandedCategory === category.id 
                      ? 'bg-gray-800 text-white' 
                      : category.id === 'restaurants'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {category.icon && <category.icon size={16} />}
                    <span>{category.name}</span>
                  </div>
                  {category.subItems && (
                    <span className={`transform transition-transform text-xs ${
                      expandedCategory === category.id ? 'rotate-180' : ''
                    }`}>
                      ▼
                    </span>
                  )}
                </button>
                
                {/* Sub-items */}
                {category.subItems && expandedCategory === category.id && (
                  <div className="ml-6 space-y-1">
                    {category.subItems.map((item, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center space-x-2 p-1.5 rounded-lg text-left text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        {item.icon && <item.icon size={14} />}
                        <span className="text-xs">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Profile and Settings Navigation */}
          <div className="pt-6 border-t border-gray-700 space-y-2">
            <button 
              onClick={() => router.push("/profile")}
              className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <User size={16} />
              <span className="text-sm">Profile</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Settings size={16} />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
        
        {/* Red accent line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500"></div>
      </div>

      {/* Main Content - Restaurant Content */}
      <div className="flex-1 bg-black p-6 ml-56">
        <div className="max-w-6xl mx-auto">
          {/* Restaurant Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-white border-b-2 border-red-500 pb-1">
                Food & Restaurant
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Bookmark size={20} />
              </button>
            </div>
          </div>

          {/* Restaurant Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                {/* Card Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800">
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                      <Bookmark size={16} className="text-white" />
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm">{restaurant.image}</p>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{restaurant.location}</p>
                  <p className="text-gray-300 text-sm mb-3">
                    <span className="font-medium">Offer:</span> {restaurant.offer}
                  </p>
                  
                  {/* User Tags */}
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">@userid1</span>
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">@userid2</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Want to explore other categories?
            </p>
            <Button 
              onClick={handleDashboardClick}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
