import { Heart, ShoppingBag, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AvatarWidget from "@/components/AvatarWidget";

const AloApp = () => {
  const filters = [
    "PRODUCT TYPE",
    "SIZE", 
    "COLOR",
    "FABRIC",
    "BRA SUPPORT",
    "LENGTH",
    "SHORTS INSEAM",
    "JUST DROPPED"
  ];

  const products = [
    {
      id: 1,
      name: "Hazy Mock Neck Pullover",
      price: 498,
      memberPrice: 349,
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop",
      colors: ["#5C4033", "#D3D3D3", "#000000", "#654321"],
      moreColors: 2
    },
    {
      id: 2,
      name: "7/8 High-Waist Airlift",
      price: 134,
      memberPrice: 94,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=600&fit=crop",
      colors: ["#5C4033", "#000000", "#654321", "#1E3A8A", "#696969"],
      moreColors: 14
    },
    {
      id: 3,
      name: "Accolade 1/4 Zip Pullover",
      price: 148,
      memberPrice: 104,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      colors: ["#9DB4D4", "#000000", "#D3D3D3", "#1E3A8A", "#696969"],
      moreColors: 0
    },
    {
      id: 4,
      name: "Accolade Straight Leg",
      price: 138,
      memberPrice: 97,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
      colors: ["#9DB4D4", "#000000", "#654321", "#D4B896", "#C0C0C0"],
      moreColors: 8
    },
    {
      id: 5,
      name: "Goddess Legging",
      price: 128,
      memberPrice: 90,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=600&fit=crop",
      colors: ["#000000", "#5C4033", "#1E3A8A"],
      moreColors: 3
    },
    {
      id: 6,
      name: "Airlift Intrigue Bra",
      price: 68,
      memberPrice: 48,
      image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=400&h=600&fit=crop",
      colors: ["#000000", "#D3D3D3", "#5C4033"],
      moreColors: 5
    },
    {
      id: 7,
      name: "High-Waist Moto Legging",
      price: 128,
      memberPrice: 90,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
      colors: ["#000000", "#5C4033", "#1E3A8A", "#696969"],
      moreColors: 6
    },
    {
      id: 8,
      name: "Alosoft Hoodie",
      price: 118,
      memberPrice: 83,
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop",
      colors: ["#5C4033", "#000000", "#D3D3D3"],
      moreColors: 4
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Promo Banner */}
      <div className="bg-[#4A1F1F] text-white text-center py-2 px-4 text-xs md:text-sm">
        FREE 2-DAY SHIPPING + 30% OFF ✨ JOIN TO UNLOCK
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
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


      {/* Main Content - Filters + Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-6">FILTERS</h2>
              <div className="space-y-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className="w-full flex items-center justify-between py-3 border-b border-gray-200 text-left hover:opacity-70 transition-opacity"
                  >
                    <span className="text-sm font-medium">{filter}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white h-8 w-8 rounded-full"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.moreColors > 0 && (
                      <span className="text-xs text-gray-600">+{product.moreColors}</span>
                    )}
                  </div>

                  {/* Member Badge */}
                  <p className="text-xs font-medium mb-2">MEMBERS ONLY 30% OFF</p>

                  {/* Product Info */}
                  <h4 className="text-sm font-medium mb-1">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500 line-through">${product.price}</p>
                    <p className="text-sm font-medium">${product.memberPrice}</p>
                  </div>
                </div>
              ))}
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
