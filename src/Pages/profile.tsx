// Profile.tsx
'use client'

import { useState, useEffect } from 'react'
import { User, Calendar, Clock, Phone, Edit2, Save } from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from './Header'

type Booking = {
  id: string
  origin: string
  destination: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

type UserData = {
  name: string
  email: string
  phone: string
  avatar: string
  bookings: Booking[]
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData | null>(null)

  useEffect(() => {
    // Simulating an API call to fetch user data
    const fetchUserData = async () => {
      const mockUserData: UserData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (123) 456-7890",
        avatar: "/path/to/avatar.jpg",
        bookings: [
          { id: "1", origin: "Panadura", destination: "Kaduwela", date: "2024-03-15", time: "09:00 AM", status: "upcoming" },
          { id: "2", origin: "Colombo", destination: "Kandy", date: "2024-02-28", time: "10:30 AM", status: "completed" },
          { id: "3", origin: "Galle", destination: "Matara", date: "2024-04-05", time: "02:00 PM", status: "upcoming" },
          { id: "4", origin: "Negombo", destination: "Colombo", date: "2024-01-20", time: "07:30 AM", status: "cancelled" },
        ]
      }
      setUserData(mockUserData)
      setFormData(mockUserData) // Initialize form data
    }

    fetchUserData()
  }, [])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSave = () => {
    if (formData) {
      setUserData(formData) // Update user data with form data
      setIsEditing(false) // Exit edit mode
    }
  }

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-500'
      case 'completed':
        return 'text-green-500'
      case 'cancelled':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <Header />
      <div className="container mx-auto px-4 py-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-0 p-4">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl font-bold">
                  {isEditing ? (
                    <Input 
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      className="text-black"
                    />
                  ) : (
                    userData.name
                  )}
                </CardTitle>
                <p className="text-lg">
                  {isEditing ? (
                    <Input
                      name="email"
                      value={formData?.email || ''}
                      onChange={handleInputChange}
                      className="text-black"
                    />
                  ) : (
                    userData.email
                  )}
                </p>
                <div className="flex items-center mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData?.phone || ''}
                      onChange={handleInputChange}
                      className="text-black"
                    />
                  ) : (
                    userData.phone
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={isEditing ? handleSave : handleEditToggle}
                className="mt-4 sm:mt-0 text-black border-white hover:bg-white hover:text-purple-600"
              >
                {isEditing ? <Save className="mr-2" /> : <Edit2 className="mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.bookings.map((booking) => (
              <Card key={booking.id} className="bg-white/10 backdrop-blur-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{booking.origin} to {booking.destination}</span>
                    <span className={`text-sm font-normal ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{booking.time}</span>
                  </div>
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
