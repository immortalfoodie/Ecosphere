"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Scan,
  Calendar,
  Trophy,
  ShoppingBag,
  Users,
  Leaf,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Heart,
  Award,
  Target,
  BarChart3,
  Recycle,
  TreePine,
  Droplets,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  Lightbulb,
  Wind,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function EcosphereLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    events: 0,
    products: 0,
    trees: 0,
    users: 0,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userLocation, setUserLocation] = useState("Loading...")
  const [nearbyEvents, setNearbyEvents] = useState(3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const animateCounter = (key: keyof typeof counters, target: number) => {
      let current = 0
      const increment = target / 150
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, 15)
    }

    const timer = setTimeout(() => {
      animateCounter("events", 2847)
      animateCounter("products", 18432)
      animateCounter("trees", 1567)
      animateCounter("users", 9234)
    }, 800)

    const clockTimer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    setTimeout(() => {
      setUserLocation("Mumbai, Maharashtra")
      setNearbyEvents(Math.floor(Math.random() * 8) + 2)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(clockTimer)
    }
  }, [])

  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log("[v0] Audio play failed:", error)
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleAudioPlay = () => setIsPlaying(true)
  const handleAudioPause = () => setIsPlaying(false)
  const handleAudioEnded = () => setIsPlaying(false)

  return (
    <div className="min-h-screen bg-background">
      <audio ref={audioRef} loop onPlay={handleAudioPlay} onPause={handleAudioPause} onEnded={handleAudioEnded}>
        <source src="/nature-ambient.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAudio}
          className="bg-background/80 backdrop-blur-sm hover:bg-primary/10"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMute}
          className="bg-background/80 backdrop-blur-sm hover:bg-primary/10"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/mumbai-green-skyline.png"
            alt="Mumbai Green Skyline"
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-10"
          />
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-accent/5 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-chart-3/5 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div
          className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center gap-2 mb-6 group">
            <Leaf className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold text-primary font-mono">Ecosphere India</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight font-serif">
            स्वच्छ भारत के लिए{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              हरित क्रांति
            </span>{" "}
            🇮🇳
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform everyday actions into meaningful environmental impact across India. Scan products, join local
            swachh abhiyan, earn rewards, and connect with communities passionate about sustainability from Kashmir to
            Kanyakumari.
          </p>

          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono">{currentTime.toLocaleTimeString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-mono">{userLocation}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span className="font-mono">{nearbyEvents} events nearby</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scanner">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group hover:scale-105 transition-all duration-300 font-serif"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:bg-primary/5 transition-all duration-300 font-serif"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2 font-mono">
                {counters.users.toLocaleString("en-IN")}+
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 font-serif">
                <Users className="h-4 w-4" />
                Active Users
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent mb-2 font-mono">
                {counters.events.toLocaleString("en-IN")}+
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 font-serif">
                <Calendar className="h-4 w-4" />
                Swachh Events
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-chart-3 mb-2 font-mono">
                {counters.products.toLocaleString("en-IN")}+
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 font-serif">
                <Scan className="h-4 w-4" />
                Products Scanned
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-chart-4 mb-2 font-mono">
                {counters.trees.toLocaleString("en-IN")}+
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 font-serif">
                <TreePine className="h-4 w-4" />
                Trees Planted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/indian-environmental-conservation.png"
              alt="Environmental Conservation in India"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6 font-serif">
            Building a Sustainable Digital Ecosystem for Bharat
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Ecosphere India combines technology, community, and gamification to make eco-friendly living fun, rewarding,
            and impactful across all states and union territories. We create a digital ecosystem where individuals,
            communities, and NGOs collaborate for environmental sustainability from the Himalayas to the Western Ghats.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 font-serif">Global Impact</h3>
              <Progress value={75} className="mb-2" />
              <p className="text-sm text-muted-foreground font-mono">75% towards 2025 goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 font-serif">Community Growth</h3>
              <Progress value={85} className="mb-2" />
              <p className="text-sm text-muted-foreground font-mono">85% monthly growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-chart-3/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="font-semibold mb-2 font-serif">Mission Progress</h3>
              <Progress value={92} className="mb-2" />
              <p className="text-sm text-muted-foreground font-mono">92% user satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 font-serif">
            Six Ways to Make an Impact in India
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/scanner">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Scan className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Scan & Learn</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    AI Powered
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Scan product barcodes to instantly view eco-ratings, sustainability scores, and Indian brand
                    responsibility. Make informed choices while shopping at local markets or online platforms.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <BarChart3 className="h-4 w-4" />
                    <span>Real-time data</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-accent/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Calendar className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Join Swachh Events</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Community
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Discover nearby clean-up drives, tree plantation programs, and Swachh Bharat initiatives. Connect
                    with your local eco-community across Mumbai, Delhi, Bangalore, and beyond.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <MapPin className="h-4 w-4" />
                    <span>Pan-India events</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tracker">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-blue-300/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <BarChart3 className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Track Impact</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Analytics
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Monitor your carbon footprint, waste generation, and green transportation choices. Set goals and
                    track your environmental impact with detailed analytics.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <Target className="h-4 w-4" />
                    <span>Daily tracking</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-chart-3/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-chart-3/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-chart-3/20 transition-colors">
                    <Trophy className="h-8 w-8 text-chart-3 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Gamification</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Rewards
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Earn points, badges, and levels for sustainable actions. Maintain streaks, join seasonal challenges,
                    and compete on community leaderboards.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <Award className="h-4 w-4" />
                    <span>Achievement system</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/learn">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-purple-300/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <BookOpen className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Learn & Grow</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Education
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Access daily eco-tips, environmental news, and interactive courses on sustainability. Stay informed
                    about climate action and green living practices.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <Lightbulb className="h-4 w-4" />
                    <span>Daily insights</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-green-300/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <MapPin className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Local Services</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Mumbai
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Monitor real-time air quality across Mumbai and locate nearby recycling centers. Find e-waste
                    collection points and green service providers in your area.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <Wind className="h-4 w-4" />
                    <span>Live AQI data</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/store">
              <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-2 hover:border-chart-4/20 cursor-pointer">
                <CardHeader>
                  <div className="mx-auto bg-chart-4/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-chart-4/20 transition-colors">
                    <ShoppingBag className="h-8 w-8 text-chart-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="text-xl font-serif">Eco-Bazaar</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-mono">
                    Marketplace
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    Shop curated eco-friendly products from Indian artisans and sustainable brands. A share of profits
                    supports partner NGOs, and you can redeem reward points for discounts. Prices in ₹.
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-mono">
                    <Heart className="h-4 w-4" />
                    <span>NGO support</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Track Your Environmental Impact */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-serif">Track Your Environmental Impact</h2>
          <p className="text-lg text-muted-foreground mb-12">
            See how your daily choices contribute to a cleaner, greener India
          </p>

          <div className="mb-12">
            <img
              src="/indian-environmental-dashboard.png"
              alt="Environmental Impact Dashboard"
              className="w-full max-w-xl mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-serif">Carbon Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2 font-mono">2.4 tons</div>
                <Progress value={68} className="mb-2" />
                <p className="text-sm text-muted-foreground font-mono">This month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-2">
                  <Droplets className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg font-serif">Water Conserved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent mb-2 font-mono">1,250L</div>
                <Progress value={82} className="mb-2" />
                <p className="text-sm text-muted-foreground font-mono">This month</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 mx-auto bg-chart-3/10 rounded-full flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-lg font-serif">Energy Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-3 mb-2 font-mono">340 kWh</div>
                <Progress value={75} className="mb-2" />
                <p className="text-sm text-muted-foreground font-mono">This month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">Join Our Growing Indian Community</h2>
            <p className="text-lg text-muted-foreground">
              Connect with NGOs across India, participate in impactful initiatives, and be part of real change.
            </p>
          </div>

          <div className="mb-12 grid md:grid-cols-2 gap-6">
            <img
              src="/indian-volunteers-beach-tree.png"
              alt="Mumbai Beach Cleanup"
              className="w-full rounded-lg shadow-lg"
            />
            <img
              src="/indian-tree-planting.png"
              alt="Community Tree Planting"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle className="font-serif">NGO Partnerships</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Partner organizations across India list their initiatives and campaigns, creating direct connections
                  between users and impactful environmental work from Rajasthan to West Bengal.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-mono">150+ Partner NGOs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-mono">28 States & 8 UTs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-accent" />
                  <CardTitle className="font-serif">Success Stories</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Ecosphere helped me discover local Swachh Bharat groups in Mumbai and make a real difference in my
                  community. The gamification keeps me motivated to contribute to Clean India mission!"
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="font-mono">
                    Mumbai Resident
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2 font-mono">4.8/5 rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-chart-4" />
                  <CardTitle className="font-serif">Real Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Events Joined</span>
                    <span className="font-semibold text-primary font-mono">
                      {counters.events.toLocaleString("en-IN")}+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Products Scanned</span>
                    <span className="font-semibold text-accent font-mono">
                      {counters.products.toLocaleString("en-IN")}+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Trees Planted</span>
                    <span className="font-semibold text-chart-3 font-mono">
                      {counters.trees.toLocaleString("en-IN")}+
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">CO₂ Reduced</span>
                    <span className="font-semibold text-chart-4 font-mono">45 tonnes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/5 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-24 h-24 bg-green-500/5 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
            Be part of the Ecosphere India Movement 🌱
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            One small action can change India. Start your sustainable journey today and contribute to Swachh Bharat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile">
              <Button
                size="lg"
                className="text-lg px-12 py-6 group hover:scale-105 transition-all duration-300 font-serif"
              >
                Join Now
                <Leaf className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300 bg-transparent font-serif"
            >
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4 group">
                <Leaf className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xl font-bold text-primary font-mono">Ecosphere India</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Building a sustainable future for Bharat through technology and community collaboration.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-mono">Trusted by 9,234+ eco-warriors across India</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-serif">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/scanner" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Scan className="h-4 w-4" />
                    Product Scanner
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Local Events
                  </Link>
                </li>
                <li>
                  <Link href="/tracker" className="hover:text-primary transition-colors flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Impact Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="hover:text-primary transition-colors flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    Local Services
                  </Link>
                </li>
                <li>
                  <Link href="/store" className="hover:text-primary transition-colors flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Eco Store
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-serif">Community</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    NGO Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 font-serif">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p className="font-mono">
              &copy; 2025 Ecosphere India. All rights reserved. Built with 💚 for our planet and Bharat. 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
