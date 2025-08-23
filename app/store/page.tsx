"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingBag, ArrowLeft, Search, Star, Heart, Leaf, Award, ShoppingCart, Truck } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function EcoStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<string[]>([])

  const products = [
    {
      id: "1",
      name: "Bamboo Fiber Water Bottle",
      description:
        "Sustainable, BPA-free water bottle made from bamboo fiber composite. Perfect for Mumbai's hot climate.",
      price: 1999,
      originalPrice: 2799,
      discount: 29,
      rating: 4.8,
      reviews: 156,
      category: "drinkware",
      ecoScore: 95,
      certifications: ["BPA-Free", "Biodegradable", "Carbon Neutral"],
      image: "/placeholder-vs8uj.png",
      inStock: true,
      pointsReward: 25,
      ngoSupport: "Narmada Bachao Andolan",
    },
    {
      id: "2",
      name: "Khadi Cotton Tote Bag",
      description: "Durable, reusable tote bag made from 100% organic khadi cotton. Support Indian artisans.",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 4.6,
      reviews: 89,
      category: "bags",
      ecoScore: 88,
      certifications: ["Khadi Certified", "Fair Trade"],
      image: "/organic-cotton-tote-bag.png",
      inStock: true,
      pointsReward: 15,
      ngoSupport: "Khadi Gramodyog",
    },
    {
      id: "3",
      name: "Solar Power Bank",
      description:
        "Portable solar charger with 20,000mAh capacity for all your devices. Perfect for India's abundant sunshine.",
      price: 3999,
      originalPrice: 5599,
      discount: 29,
      rating: 4.7,
      reviews: 234,
      category: "electronics",
      ecoScore: 82,
      certifications: ["Energy Star", "RoHS Compliant"],
      image: "/placeholder-rt8re.png",
      inStock: true,
      pointsReward: 50,
      ngoSupport: "Solar Energy Foundation India",
    },
    {
      id: "4",
      name: "Biodegradable Phone Case",
      description:
        "Protective phone case made from plant-based materials that naturally decompose. Designed for popular Indian smartphone models.",
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      rating: 4.5,
      reviews: 67,
      category: "accessories",
      ecoScore: 91,
      certifications: ["Compostable", "Non-Toxic"],
      image: "/placeholder-wrbsh.png",
      inStock: false,
      pointsReward: 20,
      ngoSupport: "Plastic Free India",
    },
    {
      id: "5",
      name: "Recycled Notebook Set",
      description: "Set of 3 notebooks made from 100% recycled paper with natural dyes. Made in Rajasthan.",
      price: 799,
      originalPrice: 1099,
      discount: 27,
      rating: 4.4,
      reviews: 45,
      category: "stationery",
      ecoScore: 86,
      certifications: ["FSC Certified", "Recycled Content"],
      image: "/placeholder-au91l.png",
      inStock: true,
      pointsReward: 12,
      ngoSupport: "Chipko Movement Foundation",
    },
    {
      id: "6",
      name: "Ayurvedic Cleaning Kit",
      description:
        "Complete cleaning kit with plant-based, ayurvedic cleaning products. Chemical-free for Indian homes.",
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      rating: 4.9,
      reviews: 178,
      category: "home",
      ecoScore: 94,
      certifications: ["Ayush Certified", "Cruelty-Free"],
      image: "/eco-friendly-cleaning.png",
      inStock: true,
      pointsReward: 35,
      ngoSupport: "Ganga Action Parivar",
    },
    {
      id: "7",
      name: "Jute Shopping Bag Set",
      description: "Set of 3 jute bags in different sizes. Made by women's cooperatives in West Bengal.",
      price: 649,
      originalPrice: 899,
      discount: 28,
      rating: 4.3,
      reviews: 92,
      category: "bags",
      ecoScore: 89,
      certifications: ["Fair Trade", "Women Empowerment"],
      image: "/handmade-jute-bags-bengal.png",
      inStock: true,
      pointsReward: 10,
      ngoSupport: "Self Employed Women's Association",
    },
    {
      id: "8",
      name: "Copper Water Bottle",
      description: "Traditional copper water bottle with ayurvedic benefits. Handcrafted in Moradabad.",
      price: 1299,
      originalPrice: 1699,
      discount: 24,
      rating: 4.7,
      reviews: 134,
      category: "drinkware",
      ecoScore: 92,
      certifications: ["Pure Copper", "Handcrafted"],
      image: "/placeholder-i9mck.png",
      inStock: true,
      pointsReward: 18,
      ngoSupport: "Traditional Crafts Council",
    },
  ]

  const categories = [
    { id: "all", label: "All Products" },
    { id: "drinkware", label: "Drinkware" },
    { id: "bags", label: "Bags" },
    { id: "electronics", label: "Electronics" },
    { id: "accessories", label: "Accessories" },
    { id: "stationery", label: "Stationery" },
    { id: "home", label: "Home" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: string) => {
    setCart([...cart, productId])
  }

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Eco Bazaar India</h1>
            </div>
          </div>
          <Button variant="outline" className="relative bg-transparent">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Hero Banner */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Shop Sustainably, Support Indian NGOs</h2>
              <p className="text-muted-foreground mb-4">
                Every purchase supports environmental organizations across India and earns you eco-points
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span>Eco-Certified Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>NGO Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Earn Eco-Points</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search eco-friendly products made in India..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <Badge className="absolute top-2 left-2 bg-red-500">-{product.discount}%</Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
                <Button variant="outline" size="sm" className="absolute top-2 right-2 h-8 w-8 p-0 bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <div className={`text-sm font-bold ${getEcoScoreColor(product.ecoScore)}`}>
                    {product.ecoScore}/100
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.certifications.slice(0, 2).map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>+{product.pointsReward} points</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span>Supports {product.ngoSupport}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    <span>Free shipping on orders over ₹1,999</span>
                  </div>
                </div>

                <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product.id)}>
                  {product.inStock ? (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
