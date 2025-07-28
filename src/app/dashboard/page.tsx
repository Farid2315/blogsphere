"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Home, 
  Search, 
  Compass, 
  Play, 
  MessageCircle, 
  Heart, 
  Plus, 
  Settings,
  Grid3X3,
  Bookmark,
  User,
  LogOut,
  Camera,
  Edit3
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, isLoading, signOut } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (!isLoading && !session?.user) {
      router.push("/login");
    }
  }, [session, isLoading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 border-r border-gray-800 p-4 fixed h-full">
        <div className="space-y-6">
          {/* Logo */}
          <div className="text-2xl font-bold mb-8">
            BlogSphere
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <Home size={24} />
              <span>Home</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <Search size={24} />
              <span>Search</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <Compass size={24} />
              <span>Explore</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <Play size={24} />
              <span>Reels</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <div className="relative">
                <MessageCircle size={24} />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  4
                </div>
              </div>
              <span>Messages</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <div className="relative">
                <Heart size={24} />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2 h-2"></div>
              </div>
              <span>Notifications</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <Plus size={24} />
              <span>Create</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <User size={16} />
              </div>
              <span>Profile</span>
            </div>
          </nav>

          {/* Sign Out */}
          <div className="pt-6 border-t border-gray-800">
            <div 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut size={24} />
              <span>Sign Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-start space-x-8 mb-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
                {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-light">{session.user.name || 'User'}</h1>
                <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Edit3 size={16} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
                  <Settings size={16} />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex space-x-8 mb-4">
                <div className="text-center">
                  <span className="font-semibold">0</span>
                  <div className="text-gray-400 text-sm">posts</div>
                </div>
                <div className="text-center">
                  <span className="font-semibold">0</span>
                  <div className="text-gray-400 text-sm">followers</div>
                </div>
                <div className="text-center">
                  <span className="font-semibold">0</span>
                  <div className="text-gray-400 text-sm">following</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <div className="font-semibold">{session.user.name || 'User'}</div>
                <div className="text-gray-400 text-sm">{session.user.email}</div>
                <div className="text-gray-400 text-sm">Member since {new Date(session.user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="border-t border-gray-800">
            <div className="flex justify-center space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center space-x-2 py-4 border-t-2 ${
                  activeTab === 'posts' ? 'border-white' : 'border-transparent'
                }`}
              >
                <Grid3X3 size={16} />
                <span className="text-sm font-medium">POSTS</span>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center space-x-2 py-4 border-t-2 ${
                  activeTab === 'saved' ? 'border-white' : 'border-transparent'
                }`}
              >
                <Bookmark size={16} />
                <span className="text-sm font-medium">SAVED</span>
              </button>
              <button
                onClick={() => setActiveTab('tagged')}
                className={`flex items-center space-x-2 py-4 border-t-2 ${
                  activeTab === 'tagged' ? 'border-white' : 'border-transparent'
                }`}
              >
                <User size={16} />
                <span className="text-sm font-medium">TAGGED</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-8">
            {activeTab === 'posts' && (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-light mb-2">Share Photos</h3>
                <p className="text-gray-400">When you share photos, they will appear on your profile.</p>
                <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                  <Plus size={16} className="mr-2" />
                  Create Post
                </Button>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-light mb-2">Save Photos</h3>
                <p className="text-gray-400">Save photos and videos that you want to see again.</p>
              </div>
            )}

            {activeTab === 'tagged' && (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-gray-400" />
                </div>
                                 <h3 className="text-2xl font-light mb-2">Photos of You</h3>
                 <p className="text-gray-400">When people tag you in photos, they&apos;ll appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Home size={24} className="text-white" />
          <Search size={24} className="text-gray-400" />
          <Plus size={24} className="text-gray-400" />
          <Heart size={24} className="text-gray-400" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
} 