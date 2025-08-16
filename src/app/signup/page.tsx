"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MessageSquare,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isHuman, setIsHuman] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHuman) {
      alert("Please confirm you are human.");
      return;
    }

    setIsEmailLoading(true);
    try {
      const result = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
      });

      if (!result.error) {
        // Wait a moment for the session to be established
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Email signup error:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Real-time messaging with instant delivery",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption for all conversations",
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description: "Smart features to enhance your experience",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">BlogSphere</h1>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  Join the Future of{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Communication
                  </span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Create your account and start connecting with the world
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
                    >
                      <Icon className="w-6 h-6 text-blue-400 mb-2" />
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side */}
            <Card className="bg-gray-800 dark:bg-gray-800 light:bg-white border-gray-700 dark:border-gray-700 light:border-gray-200 shadow-2xl">
              <CardContent className="p-8">

                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    Create Account
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                    Get started in just a few steps
                  </p>
                </div>

                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-white text-sm font-medium"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Bruce Wayne"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-white text-sm font-medium"
                      >
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="brucewayne"
                          value={formData.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="bruce@wayne.enterprises"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-white text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="captcha"
                        checked={isHuman}
                        onCheckedChange={(checked) =>
                          setIsHuman(checked as boolean)
                        }
                        className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label
                        htmlFor="captcha"
                        className="text-white text-sm"
                      >
                        I am human and agree to the terms
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEmailLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 