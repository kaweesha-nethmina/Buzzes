// route_details.tsx
'use client'

import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from './Header'

// Sample route data with additional timetable and seat layout
const routeData = [
  { 
    id: 1, 
    origin: 'Panadura', 
    destination: 'Kaduwela', 
    time: '40m', 
    price: 300, // numeric value for easier calculation
    currency: 'LKR',
    timetable: ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM'],
    seats: Array.from({ length: 30 }, (_, i) => ({ seatNumber: i + 1, available: i % 3 !== 0 })) // every 3rd seat is unavailable
  },
  { 
    id: 2, 
    origin: 'Los Angeles', 
    destination: 'San Francisco', 
    time: '6h 15m', 
    price: 65, // numeric value for easier calculation
    currency: '$',
    timetable: ['09:00 AM', '01:00 PM', '05:00 PM'],
    seats: Array.from({ length: 30 }, (_, i) => ({ seatNumber: i + 1, available: i % 4 !== 0 })) // every 4th seat is unavailable
  },
  // Add more route data as needed
]

export default function RouteDetails() {
  const { routeId } = useParams<{ routeId: string }>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [showBill, setShowBill] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [uniqueToken, setUniqueToken] = useState('')
  const route = routeData.find((r) => r.id === parseInt(routeId || '0', 10))

  if (!route) {
    return <div>Route not found</div>
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setSelectedSeats([]) // reset selected seats when a new time is chosen
  }

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber) // deselect if already selected
        : [...prevSelectedSeats, seatNumber] // select new seat
    )
  }

  const handleBookClick = () => {
    setShowBill(true) // show the bill popup
  }

  const handleConfirmPurchase = () => {
    // Generate a unique token for the booking confirmation
    const token = Math.random().toString(36).substring(2, 10).toUpperCase()
    setUniqueToken(token)
    
    // Slide out the bill modal and show the confirmation modal
    setShowBill(false)
    setTimeout(() => setShowConfirmation(true), 300) // add delay for slide-out effect
  }

  const totalCost = selectedSeats.length * route.price

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
        <Header />
      <Card className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg border-0 mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">{route.origin} to {route.destination}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-200">Travel time: {route.time}</p>
          <p className="text-lg text-gray-200">Price per seat: {route.currency} {route.price}</p>
          
          {/* Timetable */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Select a Time</h3>
            <ul className="text-gray-200 space-y-2">
              {route.timetable.map((time, index) => (
                <li
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className={`cursor-pointer p-2 rounded-lg ${
                    selectedTime === time ? 'bg-purple-700 text-white' : 'bg-white/10 text-gray-200'
                  }`}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>

          {/* Seat Selection */}
          {selectedTime && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Select Seats</h3>
              <div className="grid grid-cols-5 gap-2">
                {route.seats.map((seat) => (
                  <div
                    key={seat.seatNumber}
                    onClick={() => seat.available && handleSeatSelect(seat.seatNumber)}
                    className={`p-2 rounded-lg text-center cursor-pointer ${
                      !seat.available ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 
                      selectedSeats.includes(seat.seatNumber) ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-200'
                    }`}
                  >
                    {seat.seatNumber}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {selectedSeats.length} seat(s) selected
              </p>
            </div>
          )}
        </CardContent>
        
        {/* Book Ticket Button */}
        <Button
          className="w-full mt-4 bg-white text-purple-600 hover:bg-gray-100"
          disabled={!selectedTime || selectedSeats.length === 0}
          onClick={handleBookClick}
        >
          {selectedTime ? `Book ${selectedSeats.length} Seat(s) for ${selectedTime}` : 'Select a Time and Seats to Book'}
        </Button>
      </Card>

      {/* Bill Modal */}
      {showBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-transform transform translate-y-0">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
            <p className="mb-2">Route: {route.origin} to {route.destination}</p>
            <p className="mb-2">Time: {selectedTime}</p>
            <p className="mb-2">Seats: {selectedSeats.join(', ')}</p>
            <p className="mb-2">Price per seat: {route.currency} {route.price}</p>
            <p className="mb-4 font-semibold">Total: {route.currency} {totalCost}</p>
            <div className="flex justify-end">
              <Button className="mr-2" onClick={() => setShowBill(false)}>Close</Button>
              <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={handleConfirmPurchase}>
                Confirm Purchase
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-transform transform translate-y-0">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Booking Confirmed</h2>
            <p className="mb-2">Unique Token: <span className="font-semibold">{uniqueToken}</span></p>
            <p className="mb-2">Route: {route.origin} to {route.destination}</p>
            <p className="mb-2">Time: {selectedTime}</p>
            <p className="mb-2">Seats: {selectedSeats.join(', ')}</p>
            <p className="font-semibold mt-4">Thank you for your purchase!</p>
            <div className="flex justify-end mt-4">
              <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => setShowConfirmation(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}