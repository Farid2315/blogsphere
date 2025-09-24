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
  Globe,
  Smile,
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
      icon: Globe,
      title: "Global Reach",
      description: "Share your stories with the world, anytime, anywhere.",
    },
    {
      icon: Smile,
      title: "Express Yourself",
      description: "Post, share, and inspire like never before.",
    },
    {
      icon: Sparkles,
      title: "Your Digital Playground",
      description: "Explore, create, and connect endlessly.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <MessageSquare className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">BlogSphere</h1>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  Join the World of{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Exploration
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Create your account and share your world on BlogSphere.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border"
                    >
                      <Icon className="w-6 h-6 text-primary mb-2" />
                      <h3 className="text-foreground font-semibold text-sm mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side */}
            <Card className="bg-card border-border shadow-2xl">
              <CardContent className="p-8">

                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Create Account
                  </h3>
                  <p className="text-muted-foreground">
                    Get started in just a few steps
                  </p>
                </div>

                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-foreground text-sm font-medium"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Bruce Wayne"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-foreground text-sm font-medium"
                      >
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="brucewayne"
                          value={formData.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="bruce@wayne.enterprises"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-foreground text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-10 pr-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                  <div className="bg-secondary rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="captcha"
                        checked={isHuman}
                        onCheckedChange={(checked) =>
                          setIsHuman(checked as boolean)
                        }
                        className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor="captcha"
                        className="text-foreground text-sm"
                      >
                        I am human and agree to the terms
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isEmailLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEmailLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
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
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:text-primary/80 font-semibold transition-colors"
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
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
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