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
      {/* Mobile App Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <h1 className="text-xl font-bold" style={{ letterSpacing: '-0.05em' }}>
            Alo Yoga
          </h1>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 bg-muted/50 border-0"
            />
          </div>
        </div>

        {/* Category Scroll */}
        <div className="flex overflow-x-auto gap-2 px-4 pb-3 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="whitespace-nowrap rounded-full text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </header>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="p-6 pt-20">
            <nav className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="block text-lg font-medium hover:text-primary transition-colors w-full text-left"
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop"
          alt="New Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
          <div className="p-6 w-full">
            <h2 className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.05em' }}>
              Spring Collection
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Fresh styles for your active lifestyle
            </p>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-bold mb-4" style={{ letterSpacing: '-0.05em' }}>
          Trending Now
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] mb-2 overflow-hidden rounded-lg bg-muted">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
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

      {/* More Categories */}
      <div className="px-4 py-6 border-t border-border">
        <h3 className="text-lg font-bold mb-4" style={{ letterSpacing: '-0.05em' }}>
          Shop by Category
        </h3>
        <div className="space-y-3">
          <div className="relative h-32 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=300&fit=crop"
              alt="Yoga"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent flex items-center">
              <h4 className="text-lg font-bold ml-4">Yoga</h4>
            </div>
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&h=300&fit=crop"
              alt="Running"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent flex items-center">
              <h4 className="text-lg font-bold ml-4">Running</h4>
            </div>
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop"
              alt="Lounge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent flex items-center">
              <h4 className="text-lg font-bold ml-4">Lounge</h4>
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
