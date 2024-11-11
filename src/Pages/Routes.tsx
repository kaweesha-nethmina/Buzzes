// Routes.tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Roots() {
  const [searchQuery, setSearchQuery] = useState('')

  const highwayRoutes = [
    { id: 1, origin: 'Colombo', destination: 'Matara', time: '1h 40m', price: 'LKR.450' },
    { id: 2, origin: 'Colombo', destination: 'Galle', time: '1h 20m', price: 'LKR.400' },
    { id: 3, origin: 'Kottawa', destination: 'Kadawatha', time: '30m', price: 'LKR.300' },
    { id: 4, origin: 'Colombo', destination: 'Katunayake', time: '40m', price: 'LKR.300' },
    { id: 5, origin: 'Kottawa', destination: 'Galle', time: '1h 10m', price: 'LKR.350' },
    { id: 6, origin: 'Kadawatha', destination: 'Matara', time: '2h', price: 'LKR.500' },
  ]

  const filteredRoutes = highwayRoutes.filter((route) =>
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="container mx-auto px-4 py-8 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          Sri Lankan Highway Routes
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
              placeholder="Search highway routes or destinations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Route Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredRoutes.map((route) => (
            <Card 
              key={route.id} 
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
        </motion.div>
      </div>
    </div>
  )
}
