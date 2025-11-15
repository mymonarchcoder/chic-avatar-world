import { useState } from "react";
import { Heart, ShoppingBag, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AvatarWidget from "@/components/AvatarWidget";

const AloApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "New Arrivals",
    "Leggings",
    "Sports Bras",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Sale"
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Airlift Legging",
      price: 118,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Accolade Sweatpant",
      price: 128,
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Alosoft Bra",
      price: 68,
      image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=400&h=600&fit=crop"
    },
    {
      id: 4,
      name: "High-Waist Moto Legging",
      price: 128,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Promo Banner */}
      <div className="bg-[#4A1F1F] text-white text-center py-2 px-4 text-xs md:text-sm">
        FREE 2-DAY SHIPPING + 30% OFF ✨ JOIN TO UNLOCK
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold lowercase tracking-tight">alo</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider">
                Women
              </button>
              <button className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider">
                Men
              </button>
              <button className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider">
                Shoes
              </button>
              <button className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider">
                Gift Guide
              </button>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden md:flex text-xs uppercase tracking-wider">
                Sign In to Get Rewards
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Width Image */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&h=900&fit=crop"
          alt="Singles Day Collection"
          className="w-full h-[60vh] md:h-[80vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-sm uppercase tracking-widest mb-2">Ending Soon</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">SINGLES DAY</h2>
            <p className="text-xl md:text-2xl mb-2">30% OFF sitewide</p>
            <p className="text-sm uppercase tracking-wider mb-6">Exclusively for Members</p>
            <Button className="bg-white text-black hover:bg-gray-100 uppercase tracking-wider px-8">
              Join Now to Shop
            </Button>
          </div>
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center uppercase tracking-wider">
          Trending Now
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-muted">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white h-8 w-8"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <h4 className="text-sm font-medium mb-1">{product.name}</h4>
              <p className="text-sm text-muted-foreground">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="container mx-auto px-4 py-12 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop"
              alt="Yoga"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h4 className="text-white text-2xl font-bold uppercase tracking-wider">Yoga</h4>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=600&fit=crop"
              alt="Running"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h4 className="text-white text-2xl font-bold uppercase tracking-wider">Running</h4>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
              alt="Lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <h4 className="text-white text-2xl font-bold uppercase tracking-wider">Lounge</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padding for Avatar Widget */}
      <div className="h-32" />

      {/* Avatar Widget */}
      <AvatarWidget />
    </div>
  );
};

export default AloApp;
