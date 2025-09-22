"use client"

import { Bell, Bookmark, Plus, Menu } from "lucide-react"
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
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg lg:text-2xl font-bold text-foreground truncate">{title}</h1>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <Link href="/create-promotion">
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 lg:mr-2" />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        </Link>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Bookmark className="h-5 w-5" />
          <span className="sr-only">Saved</span>
        </Button>
      </div>
    </header>
  )
}
