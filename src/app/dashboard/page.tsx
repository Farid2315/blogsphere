"use client";

import { useAuth } from "@/components/auth/session-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { session, signOut } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!session.isLoading && !session.user) {
      router.push("/login");
    }
  }, [session, router]);



  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (session.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session.user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BlogSphere Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session.user.name || session.user.email}
              </span>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-gray-700 hover:text-red-600"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{session.user.email}</p>
              </div>
              {session.user.name && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{session.user.name}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Account Type</label>
                <p className="text-gray-900 capitalize">
                  {session.user.provider || "Email/Password"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Session Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
              <CardDescription>Current session details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="text-gray-900 font-mono text-sm">{session.user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created At</label>
                <p className="text-gray-900">
                  {session.user.createdAt 
                    ? new Date(session.user.createdAt).toLocaleDateString()
                    : "N/A"
                  }
                </p>
              </div>
            </CardContent>
          </Card>



          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Create New Post
              </Button>
              <Button className="w-full" variant="outline">
                View My Posts
              </Button>
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to BlogSphere! 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                You're now successfully authenticated. You can start creating posts, exploring content, 
                and connecting with other creators in the BlogSphere community.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Creating
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                  Explore Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 