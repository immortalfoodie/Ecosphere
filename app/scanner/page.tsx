"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Scan,
  Camera,
  Leaf,
  CheckCircle,
  Star,
  ArrowLeft,
  Search,
  BarChart3,
  Recycle,
  Factory,
  Truck,
  Award,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ProductScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const mockProducts = [
    {
      id: "1",
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      barcode: "123456789012",
      ecoScore: 92,
      carbonFootprint: "2.1 kg CO₂",
      waterUsage: "45L",
      recyclable: true,
      certifications: ["GOTS", "Fair Trade", "Carbon Neutral"],
      description: "Made from 100% organic cotton with sustainable manufacturing processes.",
      alternatives: ["Hemp T-Shirt", "Bamboo Fiber Tee"],
    },
    {
      id: "2",
      name: "Plastic Water Bottle",
      brand: "AquaCorp",
      barcode: "987654321098",
      ecoScore: 23,
      carbonFootprint: "8.7 kg CO₂",
      waterUsage: "180L",
      recyclable: true,
      certifications: [],
      description: "Single-use plastic bottle with high environmental impact.",
      alternatives: ["Reusable Steel Bottle", "Glass Water Bottle", "Bamboo Bottle"],
    },
  ]

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScannedProduct(mockProducts[Math.floor(Math.random() * mockProducts.length)])
    }, 2000)
  }

  const handleSearch = () => {
    if (searchQuery) {
      const product = mockProducts.find((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setScannedProduct(product || mockProducts[0])
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const }
    if (score >= 60) return { label: "Good", variant: "secondary" as const }
    return { label: "Poor", variant: "destructive" as const }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Scan className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Product Scanner</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Scanner Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Scan or Search Product
            </CardTitle>
            <CardDescription>Scan a barcode or search for a product to view its environmental impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search product name or enter barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <Button onClick={handleScan} disabled={isScanning} size="lg" className="w-full max-w-xs">
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="h-5 w-5 mr-2" />
                    Start Camera Scan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Results */}
        {scannedProduct && (
          <div className="space-y-6">
            {/* Product Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{scannedProduct.name}</CardTitle>
                    <CardDescription className="text-lg">{scannedProduct.brand}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(scannedProduct.ecoScore)}`}>
                      {scannedProduct.ecoScore}/100
                    </div>
                    <Badge {...getScoreBadge(scannedProduct.ecoScore)}>
                      {getScoreBadge(scannedProduct.ecoScore).label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{scannedProduct.description}</p>
                <div className="flex flex-wrap gap-2">
                  {scannedProduct.certifications.map((cert: string) => (
                    <Badge key={cert} variant="outline" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                  {scannedProduct.recyclable && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Recycle className="h-3 w-3" />
                      Recyclable
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Factory className="h-5 w-5 text-red-500" />
                    Carbon Footprint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500 mb-2">{scannedProduct.carbonFootprint}</div>
                  <Progress value={scannedProduct.ecoScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Manufacturing to disposal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-500" />
                    Water Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500 mb-2">{scannedProduct.waterUsage}</div>
                  <Progress value={scannedProduct.ecoScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Production process</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    Eco Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(scannedProduct.ecoScore)}`}>
                    {scannedProduct.ecoScore}/100
                  </div>
                  <Progress value={scannedProduct.ecoScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">Overall sustainability</p>
                </CardContent>
              </Card>
            </div>

            {/* Alternatives */}
            {scannedProduct.alternatives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Eco-Friendly Alternatives
                  </CardTitle>
                  <CardDescription>Consider these more sustainable options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {scannedProduct.alternatives.map((alt: string, index: number) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{alt}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Better environmental impact</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1">
                <Star className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Share Results
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
