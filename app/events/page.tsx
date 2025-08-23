"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Search,
  TreePine,
  Recycle,
  Droplets,
  Heart,
  Share,
  Star,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const events = [
    {
      id: "1",
      title: "Community Beach Cleanup",
      description: "Join us for a morning of cleaning up our local beach and protecting marine life.",
      date: "2025-01-15",
      time: "09:00 AM",
      location: "Sunset Beach, California",
      distance: "2.3 km away",
      attendees: 45,
      maxAttendees: 60,
      category: "cleanup",
      organizer: "Ocean Guardians NGO",
      points: 50,
      image: "/beach-cleanup-volunteers.png",
      tags: ["Beach", "Marine Life", "Community"],
    },
    {
      id: "2",
      title: "Urban Tree Planting Drive",
      description: "Help us plant 100 native trees in downtown parks to improve air quality.",
      date: "2025-01-18",
      time: "08:00 AM",
      location: "Central Park, Downtown",
      distance: "5.1 km away",
      attendees: 32,
      maxAttendees: 50,
      category: "planting",
      organizer: "Green City Initiative",
      points: 75,
      image: "/tree-planting-volunteers.png",
      tags: ["Trees", "Air Quality", "Urban"],
    },
    {
      id: "3",
      title: "Sustainable Living Workshop",
      description: "Learn practical tips for reducing waste and living more sustainably at home.",
      date: "2025-01-20",
      time: "02:00 PM",
      location: "Community Center, Main St",
      distance: "1.8 km away",
      attendees: 28,
      maxAttendees: 40,
      category: "workshop",
      organizer: "EcoLife Education",
      points: 30,
      image: "/sustainability-workshop.png",
      tags: ["Education", "Zero Waste", "Lifestyle"],
    },
    {
      id: "4",
      title: "River Restoration Project",
      description: "Help restore native vegetation along the riverbank and remove invasive species.",
      date: "2025-01-22",
      time: "10:00 AM",
      location: "Riverside Trail, North End",
      distance: "7.2 km away",
      attendees: 18,
      maxAttendees: 25,
      category: "restoration",
      organizer: "River Keepers Alliance",
      points: 100,
      image: "/river-restoration-volunteers.png",
      tags: ["Water", "Habitat", "Conservation"],
    },
  ]

  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "cleanup", label: "Cleanup", icon: Recycle },
    { id: "planting", label: "Planting", icon: TreePine },
    { id: "workshop", label: "Workshop", icon: Users },
    { id: "restoration", label: "Restoration", icon: Droplets },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      cleanup: "bg-blue-100 text-blue-800",
      planting: "bg-green-100 text-green-800",
      workshop: "bg-purple-100 text-purple-800",
      restoration: "bg-teal-100 text-teal-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Environmental Events</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{event.points} points</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{event.distance}</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Join Event
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">Organized by {event.organizer}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
