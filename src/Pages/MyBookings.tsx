// MyBookings.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, XCircle, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Header from './Header'

type Booking = {
  id: string
  origin: string
  destination: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  token: string
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null) // State for selected booking
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Manage dialog open state

  useEffect(() => {
    const fetchBookings = async () => {
      const mockBookings: Booking[] = [
        { id: "1", origin: "Panadura", destination: "Kaduwela", date: "2024-03-15", time: "09:00 AM", status: "upcoming", token: "ABC123" },
        { id: "2", origin: "Colombo", destination: "Kandy", date: "2024-02-28", time: "10:30 AM", status: "completed", token: "XYZ456" },
        { id: "3", origin: "Galle", destination: "Matara", date: "2024-04-05", time: "02:00 PM", status: "upcoming", token: "LMN789" },
        { id: "4", origin: "Negombo", destination: "Colombo", date: "2024-01-20", time: "07:30 AM", status: "cancelled", token: "DEF101" },
      ]
      setBookings(mockBookings.filter((booking) => booking.status === 'upcoming'))
    }

    fetchBookings()
  }, [])

  const handleCancelBooking = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings
        .map((booking) =>
          booking.id === id ? { ...booking, status: 'cancelled' as 'cancelled' } : booking
        )
        .filter((booking) => booking.status === 'upcoming')
    )
    setSelectedBooking(null) // Close the dialog after confirmation
    setIsDialogOpen(false) // Close dialog
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
          <h2 className="text-3xl font-bold mb-4">My Upcoming Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="bg-white/10 backdrop-blur-lg border-0 p-4">
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>{booking.origin} to {booking.destination}</span>
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

                  {/* View Details Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
                      >
                        <Info className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 text-black">
                        <p><strong>Origin:</strong> {booking.origin}</p>
                        <p><strong>Destination:</strong> {booking.destination}</p>
                        <p><strong>Date:</strong> {booking.date}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                        <p><strong>Token:</strong> {booking.token}</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Cancel Booking Button with Confirmation Dialog */}
                  <Dialog open={isDialogOpen && selectedBooking?.id === booking.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSelectedBooking(booking)
                          setIsDialogOpen(true) // Open dialog
                        }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Cancel Booking</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Cancellation</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 text-black">
                        <p><strong>Are you sure you want to cancel this booking?</strong></p>
                        <p>Origin: {booking.origin}</p>
                        <p>Destination: {booking.destination}</p>
                        <p>Date: {booking.date}</p>
                        <p>Time: {booking.time}</p>
                        <Button
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)} // Confirm cancellation
                          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Confirm
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
