"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  MapPin,
  Wind,
  Recycle,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Phone,
  Clock,
  Star,
  Search,
} from "lucide-react"

export default function ServicesPage() {
  const [currentAQI, setCurrentAQI] = useState(89)
  const [aqiStatus, setAqiStatus] = useState("Moderate")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("all")

  // Simulate real-time AQI updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newAQI = Math.floor(Math.random() * 50) + 70 // 70-120 range for Mumbai
      setCurrentAQI(newAQI)

      if (newAQI <= 50) setAqiStatus("Good")
      else if (newAQI <= 100) setAqiStatus("Moderate")
      else if (newAQI <= 150) setAqiStatus("Unhealthy for Sensitive")
      else setAqiStatus("Unhealthy")
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return { bg: "bg-green-500", text: "text-green-700", border: "border-green-200" }
    if (aqi <= 100) return { bg: "bg-yellow-500", text: "text-yellow-700", border: "border-yellow-200" }
    if (aqi <= 150) return { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-200" }
    return { bg: "bg-red-500", text: "text-red-700", border: "border-red-200" }
  }

  const aqiColor = getAQIColor(currentAQI)

  const aqiLocations = [
    { area: "Bandra", aqi: 92, status: "Moderate", trend: "improving" },
    { area: "Andheri", aqi: 105, status: "Unhealthy for Sensitive", trend: "stable" },
    { area: "Colaba", aqi: 78, status: "Moderate", trend: "improving" },
    { area: "Powai", aqi: 85, status: "Moderate", trend: "worsening" },
    { area: "Thane", aqi: 98, status: "Moderate", trend: "stable" },
    { area: "Navi Mumbai", aqi: 82, status: "Moderate", trend: "improving" },
  ]

  const recyclingCenters = [
    {
      name: "Mumbai Waste Management Ltd",
      type: "General Recycling",
      address: "Kurla West, Mumbai - 400070",
      phone: "+91 98765 43210",
      hours: "9:00 AM - 6:00 PM",
      rating: 4.5,
      distance: "2.3 km",
      accepts: ["Plastic", "Paper", "Metal", "Glass"],
      area: "kurla",
    },
    {
      name: "E-Waste Collection Center",
      type: "Electronic Waste",
      address: "Bandra East, Mumbai - 400051",
      phone: "+91 98765 43211",
      hours: "10:00 AM - 5:00 PM",
      rating: 4.8,
      distance: "3.1 km",
      accepts: ["Computers", "Phones", "Batteries", "Cables"],
      area: "bandra",
    },
    {
      name: "Green Earth Recyclers",
      type: "Organic Waste",
      address: "Andheri West, Mumbai - 400058",
      phone: "+91 98765 43212",
      hours: "8:00 AM - 7:00 PM",
      rating: 4.3,
      distance: "4.2 km",
      accepts: ["Food Waste", "Garden Waste", "Compostables"],
      area: "andheri",
    },
    {
      name: "Plastic Free Mumbai",
      type: "Plastic Recycling",
      address: "Colaba, Mumbai - 400001",
      phone: "+91 98765 43213",
      hours: "9:30 AM - 6:30 PM",
      rating: 4.6,
      distance: "5.8 km",
      accepts: ["PET Bottles", "Plastic Bags", "Containers"],
      area: "colaba",
    },
    {
      name: "Paper Recycle Hub",
      type: "Paper & Cardboard",
      address: "Powai, Mumbai - 400076",
      phone: "+91 98765 43214",
      hours: "9:00 AM - 5:30 PM",
      rating: 4.4,
      distance: "6.5 km",
      accepts: ["Newspapers", "Cardboard", "Office Paper"],
      area: "powai",
    },
    {
      name: "Metal Scrap Collectors",
      type: "Metal Recycling",
      address: "Thane West, Mumbai - 400601",
      phone: "+91 98765 43215",
      hours: "8:30 AM - 6:00 PM",
      rating: 4.2,
      distance: "8.1 km",
      accepts: ["Aluminum", "Steel", "Copper", "Iron"],
      area: "thane",
    },
  ]

  const filteredCenters = recyclingCenters.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.accepts.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesArea = selectedArea === "all" || center.area === selectedArea
    return matchesSearch && matchesArea
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif">Local Services</h1>
            <p className="text-gray-600 mt-2">Air quality monitoring and recycling centers in Mumbai</p>
          </div>
        </div>

        <Tabs defaultValue="air-quality" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="air-quality" className="gap-2">
              <Wind className="h-4 w-4" />
              Air Quality Monitor
            </TabsTrigger>
            <TabsTrigger value="recycling" className="gap-2">
              <Recycle className="h-4 w-4" />
              Recycling Locator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="air-quality" className="space-y-6">
            {/* Current AQI Card */}
            <Card className={`${aqiColor.border} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Wind className="h-5 w-5" />
                  Mumbai Air Quality Index
                </CardTitle>
                <CardDescription>Real-time air quality data updated every 10 seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold font-mono mb-2">{currentAQI}</div>
                    <Badge className={`${aqiColor.bg} text-white`}>{aqiStatus}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                    <div className="text-sm font-mono">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 font-mono">PM2.5</div>
                    <div className="text-sm text-gray-600">45 μg/m³</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 font-mono">PM10</div>
                    <div className="text-sm text-gray-600">78 μg/m³</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800 font-mono">O₃</div>
                    <div className="text-sm text-gray-600">32 μg/m³</div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${aqiColor.border.replace("border", "bg").replace("200", "50")}`}>
                  <h4 className="font-semibold mb-2 font-serif">Health Recommendations</h4>
                  <p className="text-sm leading-relaxed">
                    {currentAQI <= 50 && "Air quality is good. Perfect for outdoor activities and exercise."}
                    {currentAQI > 50 &&
                      currentAQI <= 100 &&
                      "Air quality is moderate. Sensitive individuals should consider limiting prolonged outdoor activities."}
                    {currentAQI > 100 &&
                      currentAQI <= 150 &&
                      "Unhealthy for sensitive groups. Children, elderly, and people with respiratory conditions should limit outdoor activities."}
                    {currentAQI > 150 &&
                      "Air quality is unhealthy. Everyone should avoid prolonged outdoor activities."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Area-wise AQI */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Area-wise Air Quality</CardTitle>
                <CardDescription>AQI levels across different areas in Mumbai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aqiLocations.map((location, index) => {
                    const locationColor = getAQIColor(location.aqi)
                    return (
                      <div key={index} className={`p-4 rounded-lg border ${locationColor.border}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold font-serif">{location.area}</h4>
                          <Badge className={`${locationColor.bg} text-white text-xs`}>{location.status}</Badge>
                        </div>
                        <div className="text-2xl font-bold font-mono mb-2">{location.aqi}</div>
                        <div className="flex items-center gap-1 text-sm">
                          {location.trend === "improving" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {location.trend === "worsening" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          {location.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                          <span className="capitalize text-gray-600">{location.trend}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recycling" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Find Recycling Centers</CardTitle>
                <CardDescription>Locate nearby recycling facilities in Mumbai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name, type, or material..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="bandra">Bandra</SelectItem>
                      <SelectItem value="andheri">Andheri</SelectItem>
                      <SelectItem value="colaba">Colaba</SelectItem>
                      <SelectItem value="kurla">Kurla</SelectItem>
                      <SelectItem value="powai">Powai</SelectItem>
                      <SelectItem value="thane">Thane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recycling Centers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCenters.map((center, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-serif">{center.name}</CardTitle>
                        <CardDescription>{center.type}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-mono">{center.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm">{center.address}</div>
                        <div className="text-xs text-green-600 font-mono">{center.distance} away</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-mono">{center.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{center.hours}</span>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-2">Accepts:</div>
                      <div className="flex flex-wrap gap-1">
                        {center.accepts.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Navigation className="h-4 w-4 mr-1" />
                        Get Directions
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCenters.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2 font-serif">No centers found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or area selection.</p>
                </CardContent>
              </Card>
            )}

            {/* Quick Tips */}
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="font-serif">Recycling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Before You Go:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Clean containers thoroughly</li>
                      <li>• Remove labels and caps</li>
                      <li>• Sort materials by type</li>
                      <li>• Call ahead to confirm acceptance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What to Bring:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Valid ID for e-waste</li>
                      <li>• Separate bags for different materials</li>
                      <li>• Receipt for tax benefits</li>
                      <li>• Reusable bags for transport</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
