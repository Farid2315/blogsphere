"use client"

import { Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

interface HeaderProps {
  title: string
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export function Header({ title, onMenuClick, showMenuButton }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {showMenuButton && onMenuClick && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick} 
            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </Button>
        )}
        <h1 className="text-lg lg:text-2xl font-bold text-foreground truncate">{title}</h1>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <Link href="/create-promotion">
          <Button variant="default" size="sm" className="bg-gray-600 hover:bg-gray-700 text-white">
            <Plus className="h-4 w-4 lg:mr-2" />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
