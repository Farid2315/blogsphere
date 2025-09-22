"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"

export function CreatePromotionForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    promotionLink: "",
    terms: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Promotion Title */}
            <div>
              <Label htmlFor="title" className="text-foreground text-sm sm:text-base">
                Promotion Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a catchy title for your promotion"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-foreground text-sm sm:text-base">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your promotion..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-foreground text-sm sm:text-base">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter the location of the promotion"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="startDate" className="text-foreground text-sm sm:text-base">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="mt-2 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-foreground text-sm sm:text-base">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="mt-2 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Time Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="startTime" className="text-foreground text-sm sm:text-base">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="mt-2 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-foreground text-sm sm:text-base">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="mt-2 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Promotion Link */}
            <div>
              <Label htmlFor="promotionLink" className="text-foreground text-sm sm:text-base">
                Link to Promotion Post
              </Label>
              <Input
                id="promotionLink"
                placeholder="Paste the link to your promotion post"
                value={formData.promotionLink}
                onChange={(e) => setFormData({ ...formData, promotionLink: e.target.value })}
                className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <Label className="text-foreground text-sm sm:text-base">Upload Images</Label>
          <Card className="mt-2 border-2 border-dashed border-blue-500 bg-gray-900">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-500 mb-2 sm:mb-4" />
              <p className="text-white mb-2 text-sm sm:text-base">Drag and drop images here, or click to browse</p>
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 text-sm sm:text-base"
              >
                Upload
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Terms & Conditions */}
        <div>
          <Label htmlFor="terms" className="text-foreground text-sm sm:text-base">
            Terms & Conditions
          </Label>
          <Textarea
            id="terms"
            placeholder="Enter terms and conditions..."
            rows={3}
            value={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
            className="mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2 text-sm sm:text-base w-full sm:w-auto"
          >
            Publish Promotion
          </Button>
        </div>
      </form>
    </div>
  )
}
