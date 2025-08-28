"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { 
  Bell,
  AlertTriangle,
  Instagram,
  Facebook,
  User,
  Settings,
  MapPin,
  Compass,
  Utensils,
  Shirt,
  Plane,
  Gamepad2,
  Smartphone,
  Music,
  Star
} from "lucide-react";

export default function ProfilePage() {
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
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? '' : category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors text-sm ${
                    expandedCategory === category.id 
                      ? 'bg-gray-800 text-white' 
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
              className="w-full flex items-center space-x-2 p-2 rounded-lg bg-gray-800 text-white"
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

      {/* Main Content - Profile Content */}
      <div className="flex-1 bg-black p-6 ml-56">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white border-b-2 border-red-500 pb-1">
                Profile name
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-1.5 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-1.5 text-white hover:bg-gray-800 rounded-lg transition-colors">
                <AlertTriangle size={20} />
              </button>
            </div>
          </div>

          {/* Profile Summary Section */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-4">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-red-500 bg-gray-700 flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
              </div>

              {/* User Information */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white mb-1">Full Name</h2>
                <p className="text-gray-400 text-sm mb-3">City Name, State Name</p>
                
                {/* Social Links */}
                <div className="flex space-x-2 mb-3">
                  <Button size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 text-xs px-3 py-1 h-8">
                    Follow
                  </Button>
                  <Button size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 text-xs px-3 py-1 h-8">
                    <Instagram size={14} className="mr-1.5 text-red-500" />
                    Instagram
                  </Button>
                  <Button size="sm" className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700 text-xs px-3 py-1 h-8">
                    <Facebook size={14} className="mr-1.5 text-red-500" />
                    Facebook
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="text-right space-y-1">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">12</div>
                  <div className="text-gray-400 text-xs">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">148</div>
                  <div className="text-gray-400 text-xs">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">4</div>
                  <div className="text-gray-400 text-xs">Collabs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Featured</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                  <div className="text-center text-gray-800">
                    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-1.5"></div>
                    <p className="text-xs font-medium">Featured Content 1</p>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                  <div className="text-center text-gray-800">
                    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-1.5"></div>
                    <p className="text-xs font-medium">Featured Content 2</p>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                  <div className="text-center text-gray-800">
                    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-1.5"></div>
                    <p className="text-xs font-medium">Featured Content 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Promotions Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Past Promotions</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Brand X Card */}
              <div className="text-center">
                <div className="aspect-square bg-teal-800 rounded-lg flex flex-col items-center justify-center mb-2">
                  <div className="text-3xl font-bold text-white mb-1">X</div>
                  <div className="text-white font-semibold text-sm">BRAND X</div>
                  <div className="text-white text-xs opacity-80">NATURAL NATURAL</div>
                </div>
                <p className="text-gray-400 text-xs">Brand X</p>
              </div>

              {/* Store Y Card */}
              <div className="text-center">
                <div className="aspect-square bg-teal-800 rounded-lg flex flex-col items-center justify-center mb-2">
                  <div className="text-3xl font-bold text-white mb-1">Y</div>
                  <div className="text-white font-semibold text-sm">STORE Y</div>
                  <div className="text-white text-xs opacity-80">MINIMAL, CHIC & MODERN</div>
                </div>
                <p className="text-gray-400 text-xs">Store Y</p>
              </div>

              {/* Restaurant Z Card */}
              <div className="text-center">
                <div className="aspect-square bg-green-700 rounded-lg flex flex-col items-center justify-center mb-2">
                  <div className="text-3xl font-bold text-white mb-1">Z</div>
                  <div className="text-white font-semibold text-sm">RESTAURANT</div>
                  <div className="text-white text-xs opacity-80">DELIGHT, GASTRONOMY</div>
                </div>
                <p className="text-gray-400 text-xs">Restaurant</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Want to go back to dashboard?
            </p>
            <Button 
              onClick={handleDashboardClick}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-red-800 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
