'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Header from './Header'

// Define the Route type to match Roots
type Route = {
  id: number
  origin: string
  destination: string
  time: string
  price: string
  timetable: string[]
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const popularRoutes: Route[] = [
    { id: 1, origin: 'Panadura', destination: 'Kaduwela', time: '40m', price: 'LKR.300', timetable: ['08:00 AM', '10:00 AM', '12:00 PM'] },
    { id: 2, origin: 'Galle', destination: 'Matara', time: '1h', price: 'LKR.150', timetable: ['09:00 AM', '11:00 AM', '01:00 PM'] },
    { id: 3, origin: 'Negombo', destination: 'Colombo', time: '1h 20m', price: 'LKR.200', timetable: ['06:00 AM', '12:00 PM', '06:00 PM'] },
    { id: 4, origin: 'Jaffna', destination: 'Anuradhapura', time: '5h 30m', price: 'LKR.750', timetable: ['08:00 AM', '02:00 PM', '08:00 PM'] },
    { id: 5, origin: 'Badulla', destination: 'Colombo', time: '6h', price: 'LKR.600', timetable: ['07:00 AM', '01:00 PM', '07:00 PM'] },
    { id: 6, origin: 'Kurunegala', destination: 'Kandy', time: '1h 40m', price: 'LKR.250', timetable: ['09:00 AM', '11:00 AM', '03:00 PM'] },
  ]

  const filteredRoutes = popularRoutes.filter((route) =>
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCardClick = (route: Route) => {
    navigate(`/route-details/${route.id}`, { state: route }) // Pass route as state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <Header />
      <div className="container mx-auto px-4 py-8 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          Buzzes
        </motion.h1>
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search routes or destinations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Popular Routes Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Popular Routes</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {filteredRoutes.map((route) => (
                <CarouselItem key={route.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card 
                      onClick={() => handleCardClick(route)} // Pass entire route data here
                      className="bg-white/10 backdrop-blur-lg border-0 cursor-pointer"
                    >
                      <CardHeader>
                        <CardTitle className="text-base md:text-lg text-white">{route.origin} to {route.destination}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs md:text-sm text-gray-200">Travel time: {route.time}</p>
                        <p className="text-base md:text-lg font-semibold mt-2 text-white">{route.price}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 text-xs md:text-sm">
                          Select <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        {/* All Popular Routes List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">All Popular Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutes.map((route) => (
              <Card 
                key={route.id} 
                onClick={() => handleCardClick(route)} // Pass entire route data here
                className="bg-white/10 backdrop-blur-lg border-0 cursor-pointer p-4"
              >
                <CardHeader>
                  <CardTitle className="text-base md:text-lg text-white">{route.origin} to {route.destination}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-gray-200">Travel time: {route.time}</p>
                  <p className="text-base md:text-lg font-semibold mt-2 text-white">{route.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 text-xs md:text-sm">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
