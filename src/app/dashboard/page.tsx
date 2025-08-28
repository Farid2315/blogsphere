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
  Settings
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading, authenticated, logout } = useAuth();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState('location');

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading, router]);

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'restaurants') {
      router.push("/restaurant");
    } else if (categoryId === 'fashion') {
      router.push("/fashion");
    } else if (categoryId === 'travel') {
      router.push("/travel");
    } else if (categoryId === 'gaming') {
      router.push("/gaming");
    } else if (categoryId === 'tech') {
      router.push("/tech");
    } else if (categoryId === 'music') {
      router.push("/music");
    } else if (categoryId === 'reviews') {
      router.push("/reviews");
    }
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
                  onClick={() => {
                    if (category.subItems) {
                      setExpandedCategory(expandedCategory === category.id ? '' : category.id);
                    } else {
                      handleCategoryClick(category.id);
                    }
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
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
              onClick={handleProfileClick}
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

      {/* Main Content - Dashboard Overview */}
      <div className="flex-1 bg-black p-6 ml-56">
        <div className="max-w-5xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-3">
              Welcome to BlogSphere
            </h1>
            <p className="text-gray-400 text-lg">
              Discover amazing content, explore different categories, and connect with creators
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div 
              onClick={() => router.push("/restaurant")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <Utensils size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Restaurants</h3>
              </div>
              <p className="text-gray-400 text-sm">Explore amazing dining experiences and food offers</p>
            </div>

            <div 
              onClick={() => router.push("/fashion")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shirt size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Fashion</h3>
              </div>
              <p className="text-gray-400 text-sm">Discover the latest trends and style inspiration</p>
            </div>

            <div 
              onClick={() => router.push("/travel")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Plane size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Travel</h3>
              </div>
              <p className="text-gray-400 text-sm">Plan your next adventure with amazing travel deals</p>
            </div>

            <div 
              onClick={() => router.push("/gaming")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Gaming</h3>
              </div>
              <p className="text-gray-400 text-sm">Level up with gaming events and tournaments</p>
            </div>

            <div 
              onClick={() => router.push("/tech")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Smartphone size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Tech</h3>
              </div>
              <p className="text-gray-400 text-sm">Stay ahead with cutting-edge technology solutions</p>
            </div>

            <div 
              onClick={() => router.push("/music")}
              className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                  <Music size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Music</h3>
              </div>
              <p className="text-gray-400 text-sm">Immerse yourself in the world of music and sound</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-400">New restaurant added: Spice Garden in Bangalore</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Fashion collection updated with summer styles</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Travel package launched for Goa monsoon season</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 