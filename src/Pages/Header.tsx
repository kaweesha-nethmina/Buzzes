// Header.tsx
'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Calendar, Map, LogOut, Menu, ArrowLeft } from 'lucide-react' // Added ArrowLeft for back button
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define NavItemProps type for the NavItem component
interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
}

export default function Header() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // Confirm with the user before logging out
    if (window.confirm('Are you sure you want to log out?')) {
      // Implement logout logic here (e.g., clearing tokens, etc.)
      navigate('/', { replace: true }) // Navigate to home and prevent back navigation
    }
  }

  const NavItem = ({ icon: Icon, label, path }: NavItemProps) => (
    <Button
      variant="ghost"
      onClick={() => {
        navigate(path)
        setIsOpen(false)
      }}
      className="w-full justify-start text-white hover:bg-gray-800 hover:text-white"
    >
      <Icon className="mr-2 h-5 w-5" />
      <span>{label}</span>
    </Button>
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            {/* Back Navigation Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] bg-black p-0">
                <nav className="flex flex-col space-y-2 p-4">
                  <NavItem icon={Home} label="Home" path="/home" />
                  <NavItem icon={Calendar} label="My Bookings" path="/my-bookings" />
                  <NavItem icon={Map} label="Routes" path="/routes" />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavItem icon={Home} label="Home" path="/home" />
            <NavItem icon={Calendar} label="My Bookings" path="/bookings" />
            <NavItem icon={Map} label="Routes" path="/routes" />
          </nav>

          {/* Profile and Logout */}
          <div className="flex items-center space-x-4">
            <Avatar
              className="h-8 w-8 ring-2 ring-white cursor-pointer"
              onClick={() => navigate('/profile')} // Navigate to profile on click
            >
              <AvatarImage src="/path/to/profile-image.jpg" alt="Profile Picture" />
              <AvatarFallback className="bg-gray-600 text-white">AB</AvatarFallback>
            </Avatar>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 text-black border-white hover:bg-black hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
