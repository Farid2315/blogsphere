"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // ✅ Our BetterAuth client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  // Google login
  // const handleGoogleLogin = async () => {
  //   setIsGoogleLoading(true);
  //   try {
  //     const result = await authClient.signIn.social({ provider: "google" });
  //     if (!result.error) {
  //       // Wait a moment for the session to be established
  //       setTimeout(() => {
  //         router.push("/dashboard");
  //       }, 1000);
  //     } else {
  //       alert(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     alert("Failed to login with Google. Please try again.");
  //   } finally {
  //     setIsGoogleLoading(false);
  //   }
  // };
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/restaurants", // ✅ Ensure redirect happens correctly
      });
      // No code below this line will execute, as the browser will redirect away
    } catch (error) {
      console.error("Google login error:", error);
      alert("Failed to login with Google. Please try again.");
      setIsGoogleLoading(false); // ✅ Only needed on failure
    }
  };
  
  // Email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (!result.error) {
        // Wait a moment for the session to be established
        setTimeout(() => {
          router.push("/restaurants");
        }, 1000);
      } else {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Email login error:", error);
      alert("Failed to login. Please check your credentials.");
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">BlogSphere</h1>
          </div>
          <h2 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
            Login to BlogSphere
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
            Or{" "}
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="bg-gray-800 dark:bg-gray-800 light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-200 shadow-2xl">
          <CardContent className="p-6">

            
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              variant="outline"
              className="w-full bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:bg-gray-200 hover:border-gray-500 dark:hover:border-gray-500 light:hover:border-gray-400 mb-6 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center space-x-2">
                {isGoogleLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span>{isGoogleLoading ? "Signing in..." : "Login with Google"}</span>
              </div>
            </Button>

            {/* Separator */}
            <div className="relative mb-6">
              <Separator className="bg-gray-600 dark:bg-gray-600 light:bg-gray-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge className="bg-gray-800 dark:bg-gray-800 light:bg-gray-100 text-gray-400 dark:text-gray-400 light:text-gray-600 border-gray-600 dark:border-gray-600 light:border-gray-300">
                  OR
                </Badge>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white dark:text-white light:text-gray-900 text-sm font-medium"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@companyname.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-700 dark:bg-gray-700 light:bg-white border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-white dark:text-white light:text-gray-900 text-sm font-medium"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-700 dark:bg-gray-700 light:bg-white border-gray-600 dark:border-gray-600 light:border-gray-300 text-white dark:text-white light:text-gray-900 placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isEmailLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEmailLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 