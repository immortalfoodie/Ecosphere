"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, Trash2, Car, Target, TrendingDown, Award } from "lucide-react"

export default function TrackerPage() {
  const [carbonData, setCarbonData] = useState({
    electricity: 0,
    transport: 0,
    food: 0,
    waste: 0,
  })

  const [wasteData, setWasteData] = useState({
    plastic: 0,
    organic: 0,
    paper: 0,
    electronic: 0,
  })

  const [transportData, setTransportData] = useState({
    walking: 0,
    cycling: 0,
    publicTransport: 0,
    car: 0,
  })

  const [streak, setStreak] = useState(7)
  const [weeklyGoal, setWeeklyGoal] = useState(50)

  const totalCarbon = Object.values(carbonData).reduce((sum, val) => sum + val, 0)
  const totalWaste = Object.values(wasteData).reduce((sum, val) => sum + val, 0)
  const greenTransport = transportData.walking + transportData.cycling + transportData.publicTransport
  const totalTransport = Object.values(transportData).reduce((sum, val) => sum + val, 0)
  const greenPercentage = totalTransport > 0 ? Math.round((greenTransport / totalTransport) * 100) : 0

  const getCarbonLevel = (carbon: number) => {
    if (carbon < 20) return { level: "Excellent", color: "bg-green-500", text: "text-green-700" }
    if (carbon < 40) return { level: "Good", color: "bg-yellow-500", text: "text-yellow-700" }
    return { level: "Needs Improvement", color: "bg-red-500", text: "text-red-700" }
  }

  const carbonLevel = getCarbonLevel(totalCarbon)

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
            <h1 className="text-4xl font-bold text-gray-900 font-serif">EcoTracker</h1>
            <p className="text-gray-600 mt-2">Monitor your environmental impact daily</p>
          </div>
        </div>

        {/* Streak & Goals Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Award className="h-5 w-5" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 font-mono">{streak} days</div>
              <p className="text-sm text-orange-700 mt-1">Keep tracking daily!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Target className="h-5 w-5" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 font-mono">{greenPercentage}%</div>
              <Progress value={greenPercentage} className="mt-2" />
              <p className="text-sm text-green-700 mt-1">Green transport usage</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <TrendingDown className="h-5 w-5" />
                Carbon Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${carbonLevel.color} text-white mb-2`}>{carbonLevel.level}</Badge>
              <div className="text-2xl font-bold text-blue-900 font-mono">{totalCarbon.toFixed(1)} kg CO₂</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="carbon" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="carbon" className="gap-2">
              <Calculator className="h-4 w-4" />
              Carbon Calculator
            </TabsTrigger>
            <TabsTrigger value="waste" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Waste Tracker
            </TabsTrigger>
            <TabsTrigger value="transport" className="gap-2">
              <Car className="h-4 w-4" />
              Transport Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="carbon" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Daily Carbon Footprint Calculator</CardTitle>
                <CardDescription>Track your daily activities and their environmental impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="electricity">Electricity Usage (kWh)</Label>
                    <Input
                      id="electricity"
                      type="number"
                      placeholder="e.g., 15"
                      value={carbonData.electricity || ""}
                      onChange={(e) =>
                        setCarbonData({ ...carbonData, electricity: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-gray-600">Average Mumbai household: 12-20 kWh/day</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transport-carbon">Transport (km driven)</Label>
                    <Input
                      id="transport-carbon"
                      type="number"
                      placeholder="e.g., 25"
                      value={carbonData.transport || ""}
                      onChange={(e) =>
                        setCarbonData({ ...carbonData, transport: Number.parseFloat(e.target.value) * 0.2 || 0 })
                      }
                    />
                    <p className="text-sm text-gray-600">Car emissions: ~0.2 kg CO₂/km</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="food">Food Choices</Label>
                    <Select onValueChange={(value) => setCarbonData({ ...carbonData, food: Number.parseFloat(value) })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2.5">Vegetarian (2.5 kg CO₂)</SelectItem>
                        <SelectItem value="4.0">Mixed Diet (4.0 kg CO₂)</SelectItem>
                        <SelectItem value="6.5">Non-Vegetarian (6.5 kg CO₂)</SelectItem>
                        <SelectItem value="1.8">Vegan (1.8 kg CO₂)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waste-carbon">Waste Generated (kg)</Label>
                    <Input
                      id="waste-carbon"
                      type="number"
                      placeholder="e.g., 2"
                      value={carbonData.waste || ""}
                      onChange={(e) =>
                        setCarbonData({ ...carbonData, waste: Number.parseFloat(e.target.value) * 0.5 || 0 })
                      }
                    />
                    <p className="text-sm text-gray-600">Waste impact: ~0.5 kg CO₂/kg waste</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 font-serif">Today's Carbon Footprint</h3>
                  <div className="text-3xl font-bold text-gray-900 font-mono">{totalCarbon.toFixed(2)} kg CO₂</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Electricity:</span>
                      <span className="font-mono">{(carbonData.electricity * 0.7).toFixed(1)} kg CO₂</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transport:</span>
                      <span className="font-mono">{carbonData.transport.toFixed(1)} kg CO₂</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Food:</span>
                      <span className="font-mono">{carbonData.food.toFixed(1)} kg CO₂</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Waste:</span>
                      <span className="font-mono">{carbonData.waste.toFixed(1)} kg CO₂</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waste" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Daily Waste Tracker</CardTitle>
                <CardDescription>Monitor and categorize your waste generation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plastic">Plastic Waste (grams)</Label>
                    <Input
                      id="plastic"
                      type="number"
                      placeholder="e.g., 150"
                      value={wasteData.plastic || ""}
                      onChange={(e) => setWasteData({ ...wasteData, plastic: Number.parseFloat(e.target.value) || 0 })}
                    />
                    <p className="text-sm text-gray-600">Bottles, bags, packaging</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organic">Organic Waste (grams)</Label>
                    <Input
                      id="organic"
                      type="number"
                      placeholder="e.g., 300"
                      value={wasteData.organic || ""}
                      onChange={(e) => setWasteData({ ...wasteData, organic: Number.parseFloat(e.target.value) || 0 })}
                    />
                    <p className="text-sm text-gray-600">Food scraps, vegetable peels</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paper">Paper Waste (grams)</Label>
                    <Input
                      id="paper"
                      type="number"
                      placeholder="e.g., 100"
                      value={wasteData.paper || ""}
                      onChange={(e) => setWasteData({ ...wasteData, paper: Number.parseFloat(e.target.value) || 0 })}
                    />
                    <p className="text-sm text-gray-600">Newspapers, cardboard, documents</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="electronic">E-Waste (grams)</Label>
                    <Input
                      id="electronic"
                      type="number"
                      placeholder="e.g., 50"
                      value={wasteData.electronic || ""}
                      onChange={(e) =>
                        setWasteData({ ...wasteData, electronic: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-gray-600">Batteries, cables, old devices</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 font-serif">Today's Waste Summary</h3>
                  <div className="text-3xl font-bold text-gray-900 font-mono">{totalWaste.toFixed(0)} grams</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-red-100 rounded-lg">
                      <div className="text-lg font-bold text-red-800 font-mono">{wasteData.plastic}g</div>
                      <div className="text-sm text-red-600">Plastic</div>
                    </div>
                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <div className="text-lg font-bold text-green-800 font-mono">{wasteData.organic}g</div>
                      <div className="text-sm text-green-600">Organic</div>
                    </div>
                    <div className="text-center p-3 bg-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-800 font-mono">{wasteData.paper}g</div>
                      <div className="text-sm text-blue-600">Paper</div>
                    </div>
                    <div className="text-center p-3 bg-purple-100 rounded-lg">
                      <div className="text-lg font-bold text-purple-800 font-mono">{wasteData.electronic}g</div>
                      <div className="text-sm text-purple-600">E-Waste</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Goal:</strong> Reduce total waste by 20% this week. Current: {totalWaste.toFixed(0)}g
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Green Transportation Log</CardTitle>
                <CardDescription>Track your daily commute and transportation choices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="walking">Walking (km)</Label>
                    <Input
                      id="walking"
                      type="number"
                      placeholder="e.g., 2.5"
                      value={transportData.walking || ""}
                      onChange={(e) =>
                        setTransportData({ ...transportData, walking: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-green-600">Zero emissions! 🚶‍♂️</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cycling">Cycling (km)</Label>
                    <Input
                      id="cycling"
                      type="number"
                      placeholder="e.g., 5"
                      value={transportData.cycling || ""}
                      onChange={(e) =>
                        setTransportData({ ...transportData, cycling: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-green-600">Zero emissions! 🚴‍♂️</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="public">Public Transport (km)</Label>
                    <Input
                      id="public"
                      type="number"
                      placeholder="e.g., 15"
                      value={transportData.publicTransport || ""}
                      onChange={(e) =>
                        setTransportData({ ...transportData, publicTransport: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-green-600">Mumbai Local, Bus, Metro</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car-transport">Car/Taxi (km)</Label>
                    <Input
                      id="car-transport"
                      type="number"
                      placeholder="e.g., 10"
                      value={transportData.car || ""}
                      onChange={(e) =>
                        setTransportData({ ...transportData, car: Number.parseFloat(e.target.value) || 0 })
                      }
                    />
                    <p className="text-sm text-red-600">High emissions</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 font-serif">Today's Transport Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-700 font-mono">{greenTransport.toFixed(1)} km</div>
                      <div className="text-sm text-green-600">Green Transport</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-700 font-mono">{transportData.car.toFixed(1)} km</div>
                      <div className="text-sm text-red-600">Car/Taxi</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Green Transport Percentage</span>
                      <span className="font-mono">{greenPercentage}%</span>
                    </div>
                    <Progress value={greenPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="text-center p-2 bg-green-100 rounded">
                      <div className="font-bold text-green-800 font-mono">{transportData.walking}km</div>
                      <div className="text-green-600">Walk</div>
                    </div>
                    <div className="text-center p-2 bg-green-100 rounded">
                      <div className="font-bold text-green-800 font-mono">{transportData.cycling}km</div>
                      <div className="text-green-600">Cycle</div>
                    </div>
                    <div className="text-center p-2 bg-blue-100 rounded">
                      <div className="font-bold text-blue-800 font-mono">{transportData.publicTransport}km</div>
                      <div className="text-blue-600">Public</div>
                    </div>
                    <div className="text-center p-2 bg-red-100 rounded">
                      <div className="font-bold text-red-800 font-mono">{transportData.car}km</div>
                      <div className="text-red-600">Car</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Save Today's Data
          </Button>
          <p className="text-sm text-gray-600 mt-2">Keep tracking daily to maintain your streak and earn rewards!</p>
        </div>
      </div>
    </div>
  )
}
