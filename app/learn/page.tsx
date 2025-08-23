"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Newspaper, Lightbulb, Play, Clock, Users, Star, ChevronRight } from "lucide-react"

export default function LearnPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [tipOfDay, setTipOfDay] = useState(0)

  const ecoTips = [
    {
      title: "Switch to LED Bulbs",
      description:
        "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs. A single LED can save ₹2,000 over its lifetime.",
      category: "Energy",
      impact: "High",
      difficulty: "Easy",
    },
    {
      title: "Start Composting Kitchen Waste",
      description:
        "Turn your vegetable peels and food scraps into nutrient-rich compost. Reduces waste by 30% and creates free fertilizer for plants.",
      category: "Waste",
      impact: "Medium",
      difficulty: "Medium",
    },
    {
      title: "Use Public Transport in Mumbai",
      description:
        "Mumbai Local trains carry 7.5 million passengers daily with minimal carbon footprint per person. Switch from car to train for 50% emission reduction.",
      category: "Transport",
      impact: "High",
      difficulty: "Easy",
    },
    {
      title: "Install a Water Filter",
      description:
        "Avoid plastic bottles by filtering tap water. A good filter saves ₹15,000 annually and prevents 1,500 plastic bottles from entering landfills.",
      category: "Water",
      impact: "Medium",
      difficulty: "Easy",
    },
    {
      title: "Grow Indoor Plants",
      description:
        "Plants like Money Plant and Snake Plant purify indoor air naturally. They remove toxins and increase oxygen levels in your Mumbai home.",
      category: "Air Quality",
      impact: "Low",
      difficulty: "Easy",
    },
  ]

  const courses = [
    {
      id: "composting",
      title: "Home Composting Mastery",
      description: "Learn to turn kitchen waste into black gold for your plants",
      duration: "2 hours",
      modules: 6,
      difficulty: "Beginner",
      enrolled: 1247,
      rating: 4.8,
      progress: 0,
      image: "/indian-home-composting.png",
    },
    {
      id: "solar",
      title: "Solar Energy for Mumbai Homes",
      description: "Complete guide to installing and maintaining solar panels in urban India",
      duration: "3 hours",
      modules: 8,
      difficulty: "Intermediate",
      enrolled: 892,
      rating: 4.9,
      progress: 25,
      image: "/mumbai-rooftop-solar.png",
    },
    {
      id: "water",
      title: "Water Conservation Techniques",
      description: "Practical methods to reduce water usage and harvest rainwater",
      duration: "1.5 hours",
      modules: 5,
      difficulty: "Beginner",
      enrolled: 2156,
      rating: 4.7,
      progress: 60,
      image: "/rainwater-harvesting.png",
    },
    {
      id: "waste",
      title: "Zero Waste Living",
      description: "Transform your lifestyle to minimize waste and maximize sustainability",
      duration: "4 hours",
      modules: 10,
      difficulty: "Advanced",
      enrolled: 634,
      rating: 4.9,
      progress: 0,
      image: "/zero-waste-sustainable-living.png",
    },
  ]

  const news = [
    {
      title: "Mumbai's Air Quality Improves by 15% This Monsoon",
      summary:
        "Recent data shows significant improvement in AQI levels across Mumbai due to increased green cover and reduced vehicular emissions.",
      source: "Times of India",
      time: "2 hours ago",
      category: "Local",
      image: "/mumbai-air-quality-improvement.png",
    },
    {
      title: "India Launches World's Largest Solar Park in Rajasthan",
      summary:
        "The 2,000 MW solar park will power 2 million homes and reduce carbon emissions by 4 million tons annually.",
      source: "Economic Times",
      time: "5 hours ago",
      category: "National",
      image: "/india-solar-park-rajasthan.png",
    },
    {
      title: "Plastic Ban Implementation Shows 40% Reduction in Mumbai",
      summary:
        "Maharashtra's plastic ban has led to significant reduction in single-use plastic consumption across major cities.",
      source: "Indian Express",
      time: "1 day ago",
      category: "Policy",
      image: "/mumbai-plastic-reduction.png",
    },
    {
      title: "Mangrove Restoration Project Protects Mumbai Coastline",
      summary:
        "New initiative plants 50,000 mangrove saplings to protect against rising sea levels and coastal erosion.",
      source: "Hindustan Times",
      time: "2 days ago",
      category: "Conservation",
      image: "/mangrove-restoration-mumbai.png",
    },
  ]

  const nextTip = () => {
    setTipOfDay((prev) => (prev + 1) % ecoTips.length)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <h1 className="text-4xl font-bold text-gray-900 font-serif">EcoLearn Hub</h1>
            <p className="text-gray-600 mt-2">Expand your environmental knowledge and skills</p>
          </div>
        </div>

        <Tabs defaultValue="tips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tips" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Daily Eco-Tips
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Green Courses
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="h-4 w-4" />
              Environmental News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-serif">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-green-600" />
                    Today's Eco-Tip
                  </span>
                  <Button variant="outline" size="sm" onClick={nextTip}>
                    Next Tip
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 mb-3">
                    <Badge className={getDifficultyColor(ecoTips[tipOfDay].difficulty)}>
                      {ecoTips[tipOfDay].difficulty}
                    </Badge>
                    <Badge className={getImpactColor(ecoTips[tipOfDay].impact)}>
                      {ecoTips[tipOfDay].impact} Impact
                    </Badge>
                    <Badge variant="outline">{ecoTips[tipOfDay].category}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 font-serif">{ecoTips[tipOfDay].title}</h3>
                  <p className="text-green-700 leading-relaxed">{ecoTips[tipOfDay].description}</p>
                  <Button className="bg-green-600 hover:bg-green-700">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecoTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex gap-2 mb-2">
                      <Badge className={getDifficultyColor(tip.difficulty)} variant="secondary">
                        {tip.difficulty}
                      </Badge>
                      <Badge className={getImpactColor(tip.impact)} variant="secondary">
                        {tip.impact}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-serif">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant="outline">{tip.category}</Badge>
                      <Button variant="ghost" size="sm" className="text-green-600">
                        Try This <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{course.difficulty}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-mono">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="font-serif">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrolled.toLocaleString()} enrolled
                        </span>
                      </div>

                      {course.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span className="font-mono">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedCourse(course.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {course.progress > 0 ? "Continue Learning" : "Start Course"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedCourse && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="font-serif">Course Preview</CardTitle>
                  <CardDescription>You selected: {courses.find((c) => c.id === selectedCourse)?.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 mb-4">
                    This course includes interactive modules, practical exercises, and real-world applications
                    specifically designed for Indian environmental conditions and Mumbai's urban challenges.
                  </p>
                  <div className="flex gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">Enroll Now - Free</Button>
                    <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                      Close Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {news.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="flex gap-4 p-6">
                    <div className="flex-shrink-0">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-24 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500 font-mono">{article.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 font-serif leading-tight">{article.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-gray-500">{article.source}</span>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Read More <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
              <CardHeader>
                <CardTitle className="font-serif">Stay Updated</CardTitle>
                <CardDescription>
                  Get personalized environmental news based on your interests and location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap mb-4">
                  <Badge variant="outline">Mumbai</Badge>
                  <Badge variant="outline">Air Quality</Badge>
                  <Badge variant="outline">Solar Energy</Badge>
                  <Badge variant="outline">Waste Management</Badge>
                  <Badge variant="outline">Climate Policy</Badge>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Customize News Feed</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
